# Design: Statische Lernseite „Adaptive Systeme"

Dieses Dokument legt Architektur, Inventar, Design-System und den Modul-Vertrag fest.
Es beschreibt **was** gebaut wird und **welche Regeln** dabei gelten — nicht wie der Code
im Detail aussieht. Implementierungsfreiheit liegt bei Claude Code, solange die hier
festgelegten Verträge eingehalten werden.

---

## 1. Architekturentscheidung

### Gewählt: Shell + additive Module

Eine `index.html` dient als Hülle (Navigation, Suche, Fortschritt). Jede Vorlesung liegt
als eigene, vollständig eigenständige HTML-Datei unter `lectures/`. Ein Manifest listet
alle vorhandenen Module.

**Begründung.** Der Engpass ist nicht die Darstellung, sondern die Kosten jeder
Erweiterung. Bei einer einzigen großen Datei muss zum Anfügen von VL 09 die gesamte
Datei gelesen und neu geschrieben werden — der Aufwand wächst mit jedem Kapitel. Bei
getrennten Modulen ist der Aufwand für die zwölfte Vorlesung identisch mit dem für die
zweite. Zusätzlich fällt die Notion-Einbindung als Nebeneffekt ab: Eine eigenständige
Moduldatei ist genau das, was `/embed` braucht.

### Verworfene Alternativen

| Alternative | Warum verworfen |
|---|---|
| Eine große HTML-Datei | Erweiterungskosten wachsen linear; ein Fehler beim Neuschreiben gefährdet bereits fertige Kapitel |
| Static-Site-Generator (Astro, Eleventy) | Build-Schritt und Node-Abhängigkeit widersprechen dem Ziel „läuft per Doppelklick"; Justin müsste eine Toolchain pflegen |
| Reines Notion ohne Seite | Notion kann keine Animationen — genau die sind der Kern des Lernnutzens |
| SPA mit Framework | Kein Mehrwert für statischen Inhalt, dafür CDN-Abhängigkeit und Build |

### Konsequenz für die Modul-Einbindung

Module müssen **zweifach nutzbar** sein: eingebettet in der Shell und einzeln aufgerufen
(für Notion-Embed und direktes Verlinken). Daraus folgt die harte Regel:

> Jede Moduldatei ist ohne die Shell vollständig funktionsfähig. Sie darf kein CSS und
> kein Skript der Shell voraussetzen. Gemeinsames Aussehen entsteht über eine geteilte
> Stylesheet-Datei, die das Modul selbst einbindet — nicht über Vererbung aus der Shell.

Die Shell bindet Module über einen isolierenden Rahmen ein (iframe), nicht durch
Hineinkopieren von Markup. Das verhindert, dass sich Animationen zweier Module
gegenseitig stören.

---

## 2. Inventar

Alle 22 Dokumente des Kurses, wie sie in Justins Projektwissen vorliegen. Claude Code
erwartet sie unter `content/pdf/` **mit exakt diesen Dateinamen** (Justin legt sie dort ab).

### Vorlesungen

| Nr. | Titel | Erwarteter Dateiname | Status |
|---|---|---|---|
| 01 | Einführung | `VL01-Einfuehrung.pdf` | offen |
| 02 | Fuzzy Logic | `VL02-Fuzzy-Logic.pdf` | offen |
| 03 | Evolutionäre Algorithmen I | `VL03-Evolutionaere-Algorithmen-I.pdf` | offen |
| 04 | Evolutionäre Algorithmen II | `VL04-Evolutionaere-Algorithmen-II.pdf` | offen |
| 05 | Evolutionäre Algorithmen III | `VL05-Evolutionaere-Algorithmen-III.pdf` | Widget nicht erreichbar → neu gebaut (s. `tasks.md`) |
| 06 | Schwarmintelligenz | `VL06-Schwarmintelligenz.pdf` | Widget nicht erreichbar → neu gebaut (s. `tasks.md`) |
| 07 | Neuronale Netze I | `VL07-Neuronale-Netze-I.pdf` | Notion-Notizen vorhanden |
| 08 | Neuronale Netze II | `VL08-Neuronale-Netze-II.pdf` | offen |
| 09 | Machine Learning I | `VL09-Machine-Learning-I.pdf` | offen |
| 10 | Machine Learning II | `VL10-Machine-Learning-II.pdf` | offen |
| 11 | Machine Learning III | `VL11-Machine-Learning-III.pdf` | offen |

### Übungen / Praktika

| Nr. | Thema | Erwarteter Dateiname | Gehört zu |
|---|---|---|---|
| 01 | TSP-Datenstruktur und Darstellung (Python empfohlen) | `UE01-TSP-Grundlagen.pdf` | VL 01 |
| 02 | Fuzzy-Inferenz, Temperatursteuerung (skfuzzy) | `UE02-Fuzzy-Logic.pdf` | VL 02 |
| 03 | Hill Climbing, erster EA für TSP | `UE03-Hill-Climbing-EA.pdf` | VL 03 |
| 04 | Erweitertes TSP, Operatorenvergleich, dynamisches Problem | `UE04-Erweitertes-TSP.pdf` | VL 04 |
| 05 | Lokale Suche mit Akzeptanzfunktionen | `UE05-Lokale-Suche.pdf` | VL 05 |
| 06 | PSO (Rosenbrock) und ACO (TSP) | `UE06-PSO-ACO.pdf` | VL 06 |
| 07 | Perzeptron, SONAR-Datensatz, Online vs. Batch | `UE07-Perzeptron.pdf` | VL 07 |
| 08 | CNNs mit PyTorch, Objektdetektion | `UE08-CNN.pdf` | VL 08 |
| 09 | Wettbewerbslernen, Zoo-Datensatz | `UE09-Wettbewerbslernen.pdf` | VL 09 |
| 10 | Entscheidungsbaum „gain of order", Blutdruck- und Zoo-Datensatz | `UE10-Entscheidungsbaum.pdf` | VL 11 |
| 11 | k-Means und k-Nearest-Neighbor (Zoo, sonar, iris, wine) | `UE11-kMeans-kNN.pdf` | VL 10 |

> **Achtung:** Die Blätter 10 und 11 tragen im Original beide die Aufschrift „10. Übung".
> Die obige Zuordnung ist eine Annahme. Claude Code übernimmt sie unverändert und
> markiert sie im Modul für VL 11 mit einem sichtbaren Hinweis, bis Justin bestätigt.

> **Zweite Abweichung entdeckt (2026-08-16):** Die Spalte „Gehört zu" wurde ursprünglich
> ohne Lektüre der tatsächlichen VL10/VL11-PDFs geplant und ging von „VL 10 =
> Entscheidungsbaum, VL 11 = k-Means/kNN" aus. Beim tatsächlichen Lesen der Foliensätze
> zeigt sich das Gegenteil: `VL10-Machine-Learning-II.pdf` behandelt Nearest Neighbour,
> k-NN und k-Means; `VL11-Machine-Learning-III.pdf` behandelt Entscheidungsbäume,
> Empfehlungs- und Beratersysteme. Die Dateinamen der Vorlesungsfolien selbst sind
> korrekt und bleiben unverändert (sie tragen exakt diese Titel auf ihrer ersten Folie) -
> nur die inhaltliche Zuordnung zu den Übungen oben wurde entsprechend korrigiert.

### Wiederkehrende rote Fäden

Diese Verbindungen sind für die mündliche Prüfung besonders wertvoll und **müssen** in
den Modulen als Querverweise auftauchen:

- **Das TSP zieht sich durch Übung 1 → 3 → 4 → 5 → 6.** Dasselbe Problem wird nacheinander
  mit Hill Climbing, EA, lokaler Suche und ACO angegriffen. Das ist die natürliche
  Vergleichsachse für die Frage „Wann nimmt man welches Verfahren?".
- **Der Zoo-Datensatz** taucht in Übung 9, 10 und 11 auf — Wettbewerbslernen,
  Entscheidungsbaum, k-Means/kNN am selben Datensatz. Ideal für die Frage
  „Überwacht vs. unüberwacht".
- **Evolutionäre Algorithmen** belegen drei Vorlesungen (03–05) und laufen in
  Schwarmintelligenz (06) weiter — beides sind populationsbasierte Verfahren.

---

## 3. Dateistruktur

```
adaptive-systeme-lerneinheiten/
├── index.html                  Shell: Navigation, Suche, Fortschritt
├── README.md                   Anleitung zum Erweitern
├── assets/
│   ├── theme.css               Gemeinsames Design-System (einzige Stilquelle)
│   ├── shell.js                Nur Shell-Logik: Manifest laden, Navigation, Suche
│   └── module.js               Von Modulen geteilte Hilfen (Tabs, Karten, Quiz-Verhalten)
├── lectures/
│   ├── vl01-einfuehrung.html
│   ├── vl02-fuzzy-logic.html
│   └── …                       eine Datei pro Vorlesung
├── content/
│   ├── manifest.js             Verzeichnis aller Module (einzige Wahrheit für Navigation)
│   └── pdf/                    Quell-PDFs (von Justin abgelegt, nicht generiert)
└── .nojekyll                   damit GitHub Pages Unterordner ausliefert
```

**Regel:** `assets/theme.css` ist die **einzige** Quelle für Farben, Abstände und
Typografie. Kein Modul definiert eigene Farbwerte. Wird das Design geändert, wirkt die
Änderung sofort auf alle Module — das ist der Zweck der Trennung.

---

## 4. Design-System

Anschluss an die Kursunterlagen: Die FH-Dortmund-Folien nutzen ein kräftiges Orange auf
Weiß mit dunkelgrauer Schrift. Die Lernseite greift das auf, damit Folie und Lernseite
sich beim Lernen nicht fremd anfühlen.

### Farbrollen

| Rolle | Wert | Verwendung |
|---|---|---|
| Akzent (Primär) | `#E8500F` | Überschriften, aktive Navigation, Rahmen von Kernaussagen |
| Akzent gedeckt | `#FDF0E9` | Hintergrund von Hinweiskästen |
| Text | `#2B2B2B` | Fließtext |
| Text gedämpft | `#6B6B6B` | Bildunterschriften, Metadaten |
| Fläche | `#FFFFFF` | Seitenhintergrund |
| Fläche erhöht | `#F7F7F5` | Karten, Codeblöcke |
| Rahmen | `#E2E2DF` | Trennlinien |
| Semantisch: Begriff | `#1F6FB2` | Fachbegriffe, Glossarverweise |
| Semantisch: Ablauf | `#2E8B57` | Schritte eines Algorithmus |
| Semantisch: Achtung | `#C4342B` | typische Fehler, Prüfungsfallen |

**Regel:** Die drei semantischen Farben haben feste Bedeutung und werden **nie** dekorativ
eingesetzt. Wenn Justin in einem Modul Grün sieht, ist das ein Verfahrensschritt — quer
über alle elf Vorlesungen.

### Weitere Festlegungen

- **Schrift:** Systemschriften-Stapel, keine Web-Fonts (offline-Tauglichkeit).
- **Textbreite:** Fließtext maximal ca. 70 Zeichen pro Zeile.
- **Dunkelmodus:** Pflicht, umschaltbar, Auswahl wird lokal gemerkt. Grund: Notion-Nutzer
  im Dark Mode bekommen sonst ein grell leuchtendes Embed.
- **Reduzierte Bewegung:** Wenn das System reduzierte Bewegung signalisiert, starten
  Animationen nicht automatisch; die Schritt-für-Schritt-Bedienung bleibt nutzbar.
- **Breite:** Module müssen ab 320 px lesbar sein und in einem Notion-Embed von etwa
  700 px Breite ohne horizontales Scrollen funktionieren.

---

## 5. Modul-Vertrag

Jedes Vorlesungsmodul folgt **derselben** Abschnittsfolge, in dieser Reihenfolge. Der Wert
liegt in der Wiederholung: Justin weiß nach dem zweiten Modul, wo er was findet.

| # | Abschnitt | Inhalt | Pflicht |
|---|---|---|---|
| 1 | **Kernidee in drei Sätzen** | Worum geht es, warum gibt es das Verfahren, wann nimmt man es. Bewusst knapp — das ist die Antwort auf „Erzählen Sie mal etwas zu …". | ja |
| 2 | **Begriffe** | Die Fachbegriffe der Vorlesung, je mit einer Ein-Satz-Definition in Alltagssprache. | ja |
| 3 | **Bestandteile** | Aus welchen Teilen besteht das Verfahren und welche Aufgabe hat jeder Teil. Bei EA z. B. Selektion, Rekombination, Mutation, Umweltselektion. | ja |
| 4 | **Ablauf** | Der Algorithmus als nummerierte Schrittfolge in Prosa, kein Pseudocode als Hauptdarstellung. | ja |
| 5 | **Animation** | Interaktive Visualisierung des Ablaufs. Anforderungen siehe unten. | ja |
| 6 | **Praktikum** | Die zugehörige Übungsaufgabe: Was war gefordert, was zeigt sie anschaulich, welche Beobachtung ist prüfungsrelevant. | wenn Übung existiert |
| 7 | **Verbindungen** | Verweise auf andere Module (roter Faden TSP, Zoo-Datensatz, verwandte Verfahren). | ja |
| 8 | **Prüfungsfragen** | Aufklappbare Fragen mit Musterantwort. Format siehe unten. | ja |
| 9 | **Typische Fallen** | Verwechslungsgefahren und Punkte, an denen man im Gespräch stolpert. | ja |

### Anforderungen an die Animation (Abschnitt 5)

- **Schrittsteuerung ist Pflicht**, Abspielen ist optional. Justin muss einen einzelnen
  Schritt anhalten und betrachten können, während er ihn laut erklärt.
- **Jeder Schritt trägt eine Textzeile**, die in Prosa sagt, was gerade passiert. Diese
  Zeile ist der eigentliche Lerninhalt — die Grafik illustriert sie.
- **Zurücksetzen** muss vorhanden sein und den Zustand vollständig herstellen.
- **Keine Bibliothek**, wo Bordmittel reichen. Zeichnung über Canvas oder SVG.
  Externe Abhängigkeiten nur, wenn ohne sie unverhältnismäßiger Aufwand entsteht — und
  dann ausschließlich über CDN, nie als lokale Kopie.
- **Kein Dauerlauf im Hintergrund.** Läuft ein Modul nicht sichtbar, ruht die Animation.

### Format der Prüfungsfragen (Abschnitt 8)

Pro Modul mindestens acht Fragen, gemischt aus drei Typen:

1. **Definitionsfrage** — „Was versteht man unter …?"
2. **Abgrenzungsfrage** — „Worin unterscheidet sich X von Y?"
3. **Anwendungsfrage** — „Sie haben Problem Z, welches Verfahren wählen Sie und warum?"

Die Antwort ist zunächst verborgen und wird auf Klick sichtbar. Sie ist als **gesprochener
Text** formuliert, nicht als Stichpunktliste — Justin soll sie laut nachsprechen können.
Länge: drei bis sechs Sätze.

---

## 6. Manifest

`content/manifest.js` ist die einzige Wahrheit darüber, welche Module existieren. Die
Shell liest ausschließlich diese Datei; ein Modul, das nicht im Manifest steht, existiert
für die Navigation nicht.

> **Format-Hinweis (Abweichung von der ursprünglichen Planung):** Das Manifest war
> zunächst als reines `manifest.json` geplant, von `shell.js` per `fetch`/`XMLHttpRequest`
> geladen. Das scheitert beim Öffnen per Doppelklick (`file://`) in Safari zuverlässig —
> beide Wege sind für lokale Dateien blockiert, mit Fehlermeldung "XHR fehlgeschlagen"
> (beobachtet und bestätigt am 2026-08-15). Deshalb liegt das Manifest als
> `content/manifest.js` vor: dieselbe Datenstruktur, nur als Zuweisung an
> `window.AS_MANIFEST` statt als reines JSON, geladen über ein normales `<script>`-Tag.
> Skript-Einbindung unterliegt nicht denselben `file://`-Beschränkungen wie `fetch`/XHR
> und funktioniert deshalb browser- und protokollübergreifend ohne lokalen Server. Der
> Dateiinhalt bleibt inhaltlich identisch zu einer JSON-Datei — nur der äußere Rahmen
> (`window.AS_MANIFEST = { ... };` statt reinem `{ ... }`) unterscheidet sich.

Je Eintrag werden folgende Angaben geführt:

| Feld | Bedeutung |
|---|---|
| Nummer | Vorlesungsnummer, zweistellig, zur Sortierung |
| Titel | Anzeigename in der Navigation |
| Datei | Pfad zur Moduldatei unterhalb von `lectures/` |
| Kurzbeschreibung | Ein Satz, erscheint in Übersicht und Suchergebnis |
| Schlagworte | Begriffe für die Suche (z. B. Selektion, Pheromon, Perzeptron) |
| Übung | Nummer und Thema des zugehörigen Praktikums, falls vorhanden |
| Status | `fertig` oder `entwurf` — die Shell zeigt Entwürfe sichtbar gekennzeichnet |

**Regel:** Beim Anlegen eines neuen Moduls wird der Manifest-Eintrag **angehängt**.
Bestehende Einträge werden nicht umgeschrieben.

---

## 7. Shell-Verhalten

- **Navigation:** Seitenleiste mit allen Modulen aus dem Manifest, nach Nummer sortiert,
  Übungszuordnung als Untertitel sichtbar.
- **Startansicht:** Kachelübersicht aller Vorlesungen mit Kurzbeschreibung. Sichtbar
  markiert, welche Module noch Entwurf sind.
- **Suche:** Filtert über Titel, Kurzbeschreibung und Schlagworte aus dem Manifest.
  Eine Volltextsuche in den Modulinhalten ist **nicht** gefordert.
- **Fortschritt:** Justin kann Module als „durchgearbeitet" markieren; der Stand wird
  lokal im Browser gehalten. Kein Server, kein Konto.
- **Verlinkbarkeit:** Jedes Modul ist über die Adresszeile direkt ansteuerbar, sodass
  Justin sich einzelne Vorlesungen als Lesezeichen ablegen kann.
- **Robustheit:** Fehlt eine im Manifest genannte Moduldatei, zeigt die Shell einen
  klaren Hinweis statt einer leeren Fläche.

---

## 8. Verifikation

Die Arbeit gilt erst als fertig, wenn folgendes nachweislich geprüft wurde:

1. Die Shell öffnet sich per Doppelklick auf `index.html` ohne lokalen Server.
2. Jedes Modul öffnet sich **auch einzeln** und sieht dabei vollständig gestaltet aus.
3. In der Animation lässt sich schrittweise vor- und zurückgehen; Zurücksetzen stellt den
   Ausgangszustand her.
4. Bei 700 px Breite entsteht kein horizontales Scrollen.
5. Dunkelmodus ist in Shell und Einzelmodul lesbar.
6. Die Browser-Konsole bleibt beim Laden und beim Durchklicken fehlerfrei.

Punkt 1–6 werden mit einem Screenshot je Modul belegt.
