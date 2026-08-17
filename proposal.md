# Proposal: Statische Lernseite „Adaptive Systeme"

**Change-ID:** `adaptive-systeme-lernseite`
**Autor:** Justin Riedel
**Zielrepo:** `https://github.com/jurie2000/adaptive-systeme-lerneinheiten`
**Prüfungsform:** Mündliche Prüfung (SoSe 2026, FH Dortmund, Klaus Kaiser)

---

## Warum

Der Lernstoff für „Adaptive Systeme" ist aktuell über drei Orte verstreut: Vorlesungs-PDFs,
eine Notion-Seite mit Unterseiten, und einzelne HTML-Widgets (VL 05, VL 06) im GitHub-Repo.
Beim Lernen für eine **mündliche** Prüfung ist das teuer: Es gibt keinen Ort, an dem sich
Konzept, zugehörige Praktikumsaufgabe und eine visuelle Erklärung nebeneinander abrufen lassen.

Zusätzlich wächst der bisherige Ansatz schlecht: Jede neue Vorlesung als separates,
eigenständig gestaltetes Widget führt zu uneinheitlichem Aussehen und uneinheitlicher
Struktur — man weiß nie, wo in einem Widget die Prüfungsfragen stehen.

## Was

Eine **statische, dateibasierte Lernseite** mit einer Shell (`index.html`) und pro
Vorlesung genau einem eigenständigen Modul. Die Seite läuft auf GitHub Pages, jedes Modul
ist zusätzlich einzeln per `/embed` in Notion einbindbar.

Kernentscheidung: **Additive Architektur.** Eine neue Vorlesung hinzuzufügen bedeutet
genau zwei Aktionen — eine neue Moduldatei anlegen und einen Eintrag im Manifest ergänzen.
Bestehende Moduldateien werden dabei **nie** angefasst. Damit bleiben Erweiterungen
konstant günstig, statt mit jeder Vorlesung teurer zu werden.

## Nicht-Ziele

- **Kein Build-Schritt.** Kein npm, kein Bundler, kein Framework-Toolchain. Die Seite muss
  durch Doppelklick auf `index.html` funktionieren.
- **Kein Backend, keine Datenbank, kein Login.**
- **Keine Ablösung von Notion.** Notion bleibt Justins Notizort; die Lernseite ist die
  interaktive Ergänzung, die per Embed dort auftaucht.
- **Kein Nachbau der PDFs.** Die Module sind Verdichtung und Visualisierung, keine
  Folienkopie.
- **Keine formalen Herleitungen als Kernelement.** Siehe „Didaktische Leitlinie".

## Didaktische Leitlinie (bindend für allen Inhalt)

Die Prüfung ist mündlich. Justin muss Algorithmen **erklären**, nicht vorrechnen.
Daraus folgt für jedes Modul:

1. **Prosa vor Formel.** Jeder Mechanismus wird zuerst in klarem Deutsch beschrieben —
   so, wie man ihn im Prüfungsgespräch sagen würde. Formeln dürfen ergänzend erscheinen,
   nie allein stehen und nie der Einstieg sein.
2. **Bestandteile benennbar machen.** Für jeden Algorithmus muss die Seite die Frage
   „Aus welchen Teilen besteht er und was macht jeder Teil?" beantworten.
3. **Animation als Erklärhilfe.** Die Visualisierungen existieren, damit Justin beim
   Zuschauen die Sätze findet, mit denen er den Ablauf beschreibt — nicht um Zahlen
   auszurechnen.
4. **Übungsaufgaben als visuelle Lernhilfe.** Die Praktikumsaufgaben werden nicht als
   Programmieraufgaben aufbereitet, sondern als laufende Demonstration dessen, was die
   Vorlesung theoretisch behandelt hat.

## Inhaltsumfang

11 Vorlesungen, 11 Übungsblätter. Vollständiges Inventar mit Zuordnung siehe
[`design.md`](./design.md), Abschnitt „Inventar".

## Auswirkung

**Neu:** `index.html`, `assets/` (gemeinsames CSS/JS), `lectures/` (Module),
`content/manifest.js`, `README.md`.

**Bestehend:** Die vorhandenen Widgets für VL 05 und VL 06 werden **migriert**, nicht neu
gebaut — ihre Animationslogik wird in das Modulformat überführt. Alte Notion-Embeds dürfen
brechen; Justin aktualisiert die Embed-URLs nach dem Umzug.

## Offene Punkte für Justin (vor Start klären)

1. **PDF-Ablage:** Claude Code hat keinen Zugriff auf Justins Notion/Claude-Projektwissen.
   Die PDFs müssen vorher lokal ins Repo unter `content/pdf/` gelegt werden
   (Benennung siehe `design.md`).
2. **Nummerierungskonflikt:** Zwei Übungsblätter tragen beide die Aufschrift „10. Übung"
   (einmal Entscheidungsbaum, einmal k-Means/kNN). Vermutlich ist eines davon Blatt 11.
   Justin klärt die Zuordnung; bis dahin wird das Entscheidungsbaum-Blatt als Blatt 10
   und k-Means/kNN als Blatt 11 geführt.
3. **VL 12+:** Falls das Semester über VL 11 hinausgeht, werden weitere Module nach dem
   gleichen Verfahren ergänzt — die Spec deckt das ohne Änderung ab.
