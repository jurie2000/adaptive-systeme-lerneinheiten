# Adaptive Systeme – Lernseite

Statische, dateibasierte Lernseite für die mündliche Prüfung in „Adaptive Systeme"
(FH Dortmund, SoSe 2026). Läuft ohne Build-Schritt, ohne Server, per Doppelklick auf
`index.html`. Details zu Motivation und Architektur: [`proposal.md`](proposal.md) und
[`design.md`](design.md).

## Öffnen

Lokal: `index.html` doppelklicken. Kein `npm install`, kein Server nötig.

Veröffentlicht: über GitHub Pages, sobald aktiviert (Settings → Pages → Branch `main`,
Ordner `/` – die Datei `.nojekyll` sorgt dafür, dass Unterordner wie `assets/` und
`lectures/` mit ausgeliefert werden).

## Eine neue Vorlesung ergänzen

Zwei Schritte, in dieser Reihenfolge. Bestehende Dateien werden dabei **nicht**
verändert:

1. **Moduldatei anlegen** unter `lectures/vlNN-kurztitel.html`. Kopiere den Aufbau eines
   bestehenden Moduls (z. B. `lectures/vl03-evolutionaere-algorithmen-i.html`) als
   Vorlage – er bindet nur `../assets/theme.css` und `../assets/module.js` ein, keine
   Shell-Ressourcen. Die neun Abschnitte aus `design.md` Abschnitt 5 (Kernidee,
   Begriffe, Bestandteile, Ablauf, Animation, Praktikum, Verbindungen, Prüfungsfragen,
   Typische Fallen) müssen in dieser Reihenfolge vorhanden sein.
2. **Manifest-Eintrag anhängen** in `content/manifest.js` (Feld `window.AS_MANIFEST.module`,
   ans Ende des Arrays). Felder: `nummer`, `titel`, `datei`, `kurzbeschreibung`,
   `schlagworte`, `uebung` (optional), `status` (`entwurf` oder `fertig`).

Danach erscheint das Modul automatisch in Übersicht, Navigation und Suche der Shell –
ohne dass `index.html`, `shell.js` oder andere Module angefasst werden müssen.

**Warum `manifest.js` und nicht `manifest.json`:** `fetch()`/`XMLHttpRequest` gegen
lokale `file://`-Pfade schlagen in Safari beim Doppelklick-Öffnen zuverlässig fehl. Das
Manifest liegt deshalb als `window.AS_MANIFEST = {...}` vor, eingebunden über ein
normales `<script>`-Tag – das funktioniert browser- und protokollübergreifend ohne
Server. Näheres in `design.md` Abschnitt 6.

## Design ändern

`assets/theme.css` ist die einzige Quelle für Farben, Abstände und Typografie. Eine
Änderung dort wirkt sofort auf alle Module. Kein Modul definiert eigene Farbwerte.

## Modul in Notion einbetten

Jedes Modul ist unter seiner eigenen URL erreichbar, z. B.
`https://<username>.github.io/<repo>/lectures/vl03-evolutionaere-algorithmen-i.html`.
Diese URL in Notion per `/embed` einfügen – Module sind bis 320 px Breite lesbar und
funktionieren ab ca. 700 px Breite ohne horizontales Scrollen.

## Struktur

```
index.html                  Shell: Übersicht, Navigation, Suche, Fortschritt
assets/
  theme.css                 Design-System (einzige Stilquelle)
  shell.js                  Shell-Logik (Manifest laden, Navigation, Suche)
  module.js                 Von Modulen geteilte Hilfen (Dark Mode, Quiz, Schrittsteuerung)
lectures/vlNN-*.html         Ein eigenständiges Modul pro Vorlesung
content/
  manifest.js                Verzeichnis aller Module (einzige Wahrheit für Navigation)
  pdf/                       Quell-PDFs (Vorlesungsfolien und Übungsblätter)
```

Vollständiger Modul-Vertrag, Farbrollen und Abnahmekriterien: [`design.md`](design.md).
