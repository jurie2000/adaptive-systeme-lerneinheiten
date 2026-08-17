/*
  Adaptive Systeme – Shell-Logik (nur für index.html).
  Liest das über assets/manifest.js eingebundene window.AS_MANIFEST, rendert
  Übersicht/Navigation/Suche/Fortschritt und bettet einzelne Module über ein iframe ein.
*/

(function () {
  "use strict";

  var PROGRESS_KEY = "as-fortschritt";

  var state = {
    module: [],
    gefiltert: [],
    fortschritt: {}
  };

  var el = {
    sidebar: document.getElementById("as-sidebar"),
    main: document.getElementById("as-main"),
    suche: document.getElementById("as-suche"),
    themeToggle: document.getElementById("as-theme-toggle"),
    headerZurueck: document.getElementById("as-header-zurueck")
  };

  function ladeFortschritt() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function speichereFortschritt() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.fortschritt));
    } catch (e) {
      /* localStorage nicht verfügbar - Fortschritt bleibt Sitzung-lokal */
    }
  }

  function moduleId(entry) {
    return entry.datei.replace(/\.html?$/i, "");
  }

  function toggleFortschritt(entry) {
    var id = moduleId(entry);
    if (state.fortschritt[id]) {
      delete state.fortschritt[id];
    } else {
      state.fortschritt[id] = true;
    }
    speichereFortschritt();
  }

  function istDurchgearbeitet(entry) {
    return !!state.fortschritt[moduleId(entry)];
  }

  // ---------- Manifest lesen ----------
  // window.AS_MANIFEST wird von content/manifest.js gesetzt, das index.html per
  // <script src> vor shell.js einbindet. Kein fetch()/XHR: beides schlägt bei
  // file://-Aufruf in Safari zuverlässig fehl, ein <script>-Tag nicht.

  function ladeManifest() {
    if (window.AS_MANIFEST && Array.isArray(window.AS_MANIFEST.module)) {
      return window.AS_MANIFEST.module;
    }
    throw new Error("window.AS_MANIFEST fehlt oder ist ungültig");
  }

  // ---------- Suche ----------

  function passtZuSuche(entry, begriff) {
    if (!begriff) return true;
    var haystack = [
      entry.titel,
      entry.kurzbeschreibung,
      (entry.schlagworte || []).join(" ")
    ]
      .join(" ")
      .toLowerCase();
    return haystack.indexOf(begriff.toLowerCase()) !== -1;
  }

  function wendeSucheAn() {
    var begriff = el.suche.value.trim();
    state.gefiltert = state.module.filter(function (entry) {
      return passtZuSuche(entry, begriff);
    });
    renderSidebar();
    if (!istModulAnsicht()) renderHome();
  }

  // ---------- Routing ----------

  function aktuelleModulId() {
    var hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    return hash || null;
  }

  function istModulAnsicht() {
    return !!aktuelleModulId();
  }

  function gehezu(entry) {
    location.hash = moduleId(entry);
  }

  function gehezuUebersicht() {
    location.hash = "";
  }

  function onRoute() {
    var id = aktuelleModulId();
    el.headerZurueck.hidden = !id;
    el.sidebar.hidden = !!id;

    if (!id) {
      renderHome();
      renderSidebar();
      return;
    }
    var entry = state.module.filter(function (e) { return moduleId(e) === id; })[0];
    if (!entry) {
      renderUnbekannteModulId(id);
      renderSidebar();
      return;
    }
    renderModulAnsicht(entry);
    renderSidebar();
  }

  // ---------- Rendern: Sidebar ----------

  function renderSidebar() {
    var aktiveId = aktuelleModulId();
    el.sidebar.innerHTML = "";
    if (state.gefiltert.length === 0) {
      var leer = document.createElement("p");
      leer.className = "as-kein-treffer";
      leer.textContent = "Kein Modul passt zur Suche.";
      el.sidebar.appendChild(leer);
      return;
    }
    state.gefiltert.forEach(function (entry) {
      var id = moduleId(entry);
      var btn = document.createElement("button");
      btn.className = "as-sidebar__eintrag";
      btn.type = "button";
      btn.setAttribute("aria-current", String(id === aktiveId));

      var titelZeile = document.createElement("span");
      titelZeile.className = "as-sidebar__titel";

      var haken = document.createElement("span");
      haken.textContent = istDurchgearbeitet(entry) ? "✓" : "○";
      haken.setAttribute("aria-hidden", "true");
      titelZeile.appendChild(haken);

      var titelText = document.createElement("span");
      titelText.textContent = "VL " + entry.nummer + " – " + entry.titel;
      titelZeile.appendChild(titelText);

      if (entry.status === "entwurf") {
        var badge = document.createElement("span");
        badge.className = "as-badge as-badge--entwurf";
        badge.textContent = "Entwurf";
        titelZeile.appendChild(badge);
      }

      btn.appendChild(titelZeile);

      if (entry.uebung) {
        var uebung = document.createElement("span");
        uebung.className = "as-sidebar__uebung";
        uebung.textContent = "Übung " + entry.uebung.nummer + " – " + entry.uebung.thema;
        btn.appendChild(uebung);
      }

      btn.addEventListener("click", function () {
        gehezu(entry);
      });

      el.sidebar.appendChild(btn);
    });
  }

  // ---------- Rendern: Startübersicht ----------

  function renderHome() {
    el.main.innerHTML = "";

    var anzahlFertig = state.module.filter(istDurchgearbeitet).length;
    var leiste = document.createElement("p");
    leiste.className = "as-fortschritt-leiste";
    leiste.textContent = anzahlFertig + " von " + state.module.length + " Modulen durchgearbeitet";
    el.main.appendChild(leiste);

    if (state.gefiltert.length === 0) {
      var leer = document.createElement("p");
      leer.className = "as-kein-treffer";
      leer.textContent = "Kein Modul passt zur Suche.";
      el.main.appendChild(leer);
      return;
    }

    var grid = document.createElement("div");
    grid.className = "as-kachel-grid";

    state.gefiltert.forEach(function (entry) {
      var karte = document.createElement("article");
      karte.className = "as-karte as-kachel";
      karte.tabIndex = 0;
      karte.setAttribute("role", "button");

      var kopf = document.createElement("div");
      kopf.className = "as-kachel__kopf";

      var titel = document.createElement("h3");
      titel.textContent = "VL " + entry.nummer + " – " + entry.titel;
      kopf.appendChild(titel);

      if (entry.status === "entwurf") {
        var badge = document.createElement("span");
        badge.className = "as-badge as-badge--entwurf";
        badge.textContent = "Entwurf";
        kopf.appendChild(badge);
      } else {
        var badgeFertig = document.createElement("span");
        badgeFertig.className = "as-badge as-badge--fertig";
        badgeFertig.textContent = "Fertig";
        kopf.appendChild(badgeFertig);
      }

      karte.appendChild(kopf);

      var beschreibung = document.createElement("p");
      beschreibung.textContent = entry.kurzbeschreibung;
      karte.appendChild(beschreibung);

      if (entry.uebung) {
        var uebung = document.createElement("p");
        uebung.className = "as-sidebar__uebung";
        uebung.textContent = "Übung " + entry.uebung.nummer + " – " + entry.uebung.thema;
        karte.appendChild(uebung);
      }

      var fortschrittZeile = document.createElement("label");
      fortschrittZeile.className = "as-kachel__fortschritt";
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = istDurchgearbeitet(entry);
      checkbox.addEventListener("click", function (ev) {
        ev.stopPropagation();
        toggleFortschritt(entry);
        renderHome();
        renderSidebar();
      });
      fortschrittZeile.appendChild(checkbox);
      fortschrittZeile.appendChild(document.createTextNode(" durchgearbeitet"));
      fortschrittZeile.addEventListener("click", function (ev) {
        ev.stopPropagation();
      });
      karte.appendChild(fortschrittZeile);

      karte.addEventListener("click", function () {
        gehezu(entry);
      });
      karte.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          gehezu(entry);
        }
      });

      grid.appendChild(karte);
    });

    el.main.appendChild(grid);
  }

  // ---------- Rendern: Modulansicht ----------

  function renderUnbekannteModulId(id) {
    el.main.innerHTML = "";
    var hinweis = document.createElement("div");
    hinweis.className = "as-hinweiskasten as-fehlender-hinweis";
    hinweis.innerHTML =
      "<p>Für <code>" + escapeHtml(id) + "</code> ist kein Modul im Manifest hinterlegt.</p>";
    el.main.appendChild(hinweis);
  }

  function renderModulAnsicht(entry) {
    el.main.innerHTML = "";
    var url = "lectures/" + entry.datei;

    var leiste = document.createElement("div");
    leiste.className = "as-modul-ansicht__leiste";

    var fortschrittLabel = document.createElement("label");
    fortschrittLabel.className = "as-kachel__fortschritt";
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = istDurchgearbeitet(entry);
    checkbox.addEventListener("change", function () {
      toggleFortschritt(entry);
      renderSidebar();
    });
    fortschrittLabel.appendChild(checkbox);
    fortschrittLabel.appendChild(document.createTextNode(" durchgearbeitet"));
    leiste.appendChild(fortschrittLabel);

    el.main.appendChild(leiste);

    pruefeUndLadeModul(entry, url);
  }

  function pruefeUndLadeModul(entry, url) {
    if (location.protocol === "file:") {
      // fetch()/HEAD ist unter file:// unzuverlässig - z. B. liefert Safari dort ein
      // "nicht ok"-Ergebnis auch für Dateien, die tatsächlich existieren (siehe
      // design.md Abschnitt 6/7). Direkt laden und den Inhalt prüfen ist die einzige
      // verlässliche Methode für diesen Fall.
      ladeIframe(url, true);
      return;
    }
    fetch(url, { method: "HEAD", cache: "no-store" })
      .then(function (res) {
        if (res.ok) {
          ladeIframe(url, false);
        } else {
          zeigeFehlendesModul(url);
        }
      })
      .catch(function () {
        ladeIframe(url, true);
      });
  }

  function ladeIframe(url, unsicher) {
    var iframe = document.createElement("iframe");
    iframe.className = "as-modul-iframe";
    iframe.title = "Modulinhalt";
    iframe.src = url;

    if (unsicher) {
      iframe.addEventListener(
        "load",
        function () {
          var fehlt = false;
          try {
            var doc = iframe.contentDocument;
            if (!doc || !doc.body || doc.body.textContent.trim().length === 0) {
              fehlt = true;
            }
          } catch (e) {
            fehlt = true;
          }
          if (fehlt) {
            iframe.remove();
            zeigeFehlendesModul(url);
          }
        },
        { once: true }
      );
    }

    el.main.appendChild(iframe);
  }

  function zeigeFehlendesModul(url) {
    var hinweis = document.createElement("div");
    hinweis.className = "as-hinweiskasten as-fehlender-hinweis";
    hinweis.innerHTML =
      "<p>Diese Moduldatei existiert noch nicht.</p>" +
      "<p>Erwarteter Pfad: <code>" + escapeHtml(url) + "</code></p>";
    el.main.appendChild(hinweis);
  }

  function escapeHtml(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  // ---------- Start ----------

  function start() {
    if (window.ASModule) {
      window.ASModule.initTheme(el.themeToggle);
    }

    state.fortschritt = ladeFortschritt();

    try {
      var module = ladeManifest();
      module.sort(function (a, b) { return a.nummer.localeCompare(b.nummer); });
      state.module = module;
      state.gefiltert = module;
      onRoute();
    } catch (err) {
      el.main.innerHTML =
        '<div class="as-hinweiskasten as-fehlender-hinweis">' +
        "<p>Das Manifest (<code>content/manifest.js</code>) konnte nicht geladen werden.</p>" +
        "<p>" + escapeHtml(String(err && err.message ? err.message : err)) + "</p>" +
        "</div>";
    }

    el.suche.addEventListener("input", wendeSucheAn);
    el.headerZurueck.addEventListener("click", gehezuUebersicht);
    window.addEventListener("hashchange", onRoute);
  }

  document.addEventListener("DOMContentLoaded", start);
})();
