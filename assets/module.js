/*
  Adaptive Systeme – geteilte Modul-Hilfen (module.js)
  Wird von jedem Modul unter lectures/ eingebunden. Setzt keine Shell voraus
  und funktioniert, wenn die Datei einzeln geöffnet wird (design.md Abschnitt 5).
*/

(function (global) {
  "use strict";

  var THEME_KEY = "as-theme";

  // ---------- Dark Mode ----------

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(value) {
    try {
      if (value) {
        localStorage.setItem(THEME_KEY, value);
      } else {
        localStorage.removeItem(THEME_KEY);
      }
    } catch (e) {
      /* localStorage nicht verfügbar (z. B. eingeschränkter Kontext) - Auswahl bleibt Sitzung-lokal */
    }
  }

  function applyTheme(value) {
    var root = document.documentElement;
    if (value === "dark" || value === "light") {
      root.setAttribute("data-theme", value);
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function currentEffectiveTheme() {
    var stored = getStoredTheme();
    if (stored === "dark" || stored === "light") return stored;
    return global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  /**
   * Initialisiert den Dark-Mode-Zustand und verdrahtet optional einen Umschalt-Button.
   * @param {HTMLElement} [toggleButton] Button, der beim Klick zwischen hell/dunkel wechselt.
   */
  function initTheme(toggleButton) {
    applyTheme(getStoredTheme());

    if (toggleButton) {
      updateToggleLabel(toggleButton);
      toggleButton.addEventListener("click", function () {
        var next = currentEffectiveTheme() === "dark" ? "light" : "dark";
        setStoredTheme(next);
        applyTheme(next);
        updateToggleLabel(toggleButton);
      });
    }

    if (global.matchMedia) {
      var mq = global.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function () {
        if (!getStoredTheme()) {
          applyTheme(null);
          if (toggleButton) updateToggleLabel(toggleButton);
        }
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  function updateToggleLabel(button) {
    var dark = currentEffectiveTheme() === "dark";
    button.setAttribute("aria-pressed", String(dark));
    button.textContent = dark ? "☀️ Helles Erscheinungsbild" : "🌙 Dunkles Erscheinungsbild";
  }

  // ---------- Prüfungsfragen (Quiz) ----------

  /**
   * Verdrahtet Aufklapp-Verhalten für Prüfungsfragen.
   * Erwartet Markup: .as-quiz-item > .as-quiz-frage + .as-quiz-antwort
   * @param {string|HTMLElement} [scope] Container oder Selektor, Default: gesamtes Dokument.
   */
  function initQuiz(scope) {
    var root = typeof scope === "string" ? document.querySelector(scope) : scope || document;
    var items = root.querySelectorAll(".as-quiz-item");
    items.forEach(function (item) {
      var frage = item.querySelector(".as-quiz-frage");
      var antwort = item.querySelector(".as-quiz-antwort");
      if (!frage || !antwort) return;

      item.setAttribute("data-offen", "false");
      frage.setAttribute("aria-expanded", "false");
      if (!antwort.id) {
        antwort.id = "as-quiz-antwort-" + Math.random().toString(36).slice(2, 9);
      }
      frage.setAttribute("aria-controls", antwort.id);

      frage.addEventListener("click", function () {
        var offen = item.getAttribute("data-offen") === "true";
        item.setAttribute("data-offen", String(!offen));
        frage.setAttribute("aria-expanded", String(!offen));
      });
    });
  }

  // ---------- Schrittsteuerung für Animationen ----------

  /**
   * Generischer Schritt-Controller für Animationen (design.md Abschnitt 5).
   * Startet nie automatisch, pausiert wenn das Modul nicht sichtbar ist.
   *
   * @param {Object} options
   * @param {number} options.stepCount Anzahl der Schritte (0-basiert bis stepCount - 1).
   * @param {function(number)} options.onRender Wird bei jedem Schrittwechsel mit dem Schrittindex aufgerufen.
   * @param {number} [options.autoplayMs=1200] Intervall zwischen Schritten im Abspiel-Modus.
   * @returns {{next:function, prev:function, reset:function, goTo:function, play:function, pause:function, current:function}}
   */
  function createStepController(options) {
    var stepCount = options.stepCount;
    var onRender = options.onRender;
    var autoplayMs = options.autoplayMs || 1200;
    var index = 0;
    var timer = null;

    function render() {
      onRender(index);
    }

    function pause() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function goTo(i) {
      index = Math.max(0, Math.min(stepCount - 1, i));
      render();
    }

    function next() {
      if (index >= stepCount - 1) {
        pause();
        return;
      }
      index += 1;
      render();
    }

    function prev() {
      pause();
      index = Math.max(0, index - 1);
      render();
    }

    function reset() {
      pause();
      index = 0;
      render();
    }

    function play() {
      if (timer || index >= stepCount - 1) return;
      timer = setInterval(function () {
        next();
        if (index >= stepCount - 1) pause();
      }, autoplayMs);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pause();
    });

    render();

    return { next: next, prev: prev, reset: reset, goTo: goTo, play: play, pause: pause, current: function () { return index; } };
  }

  global.ASModule = {
    initTheme: initTheme,
    initQuiz: initQuiz,
    createStepController: createStepController,
    prefersReducedMotion: function () {
      return !!(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  };
})(window);
