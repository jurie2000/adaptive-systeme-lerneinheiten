# Tasks: Statische Lernseite „Adaptive Systeme"

Abarbeitungsreihenfolge für Claude Code. Phase 1 und 2 werden **einmal** erledigt,
Phase 3 wiederholt sich pro Vorlesung.

---

## Phase 0 — Voraussetzungen (durch Justin)

- [ ] 0.1 Vorlesungs- und Übungs-PDFs unter `content/pdf/` ablegen, benannt nach der
      Tabelle in `design.md` Abschnitt 2
- [ ] 0.2 Zuordnung der beiden mit „10. Übung" beschrifteten Blätter bestätigen
- [ ] 0.3 Repository lokal ausgecheckt und beschreibbar

> Claude Code beginnt erst, wenn mindestens die PDFs der zu bearbeitenden Vorlesung
> vorliegen. Fehlt eine PDF, wird das Modul **nicht** aus Allgemeinwissen erfunden —
> stattdessen wird der Task blockiert gemeldet.

---

## Phase 1 — Fundament

- [ ] 1.1 Verzeichnisstruktur nach `design.md` Abschnitt 3 anlegen, inklusive `.nojekyll`
- [ ] 1.2 Geteiltes Design-System als Stildatei umsetzen: alle Farbrollen aus
      `design.md` Abschnitt 4, helles und dunkles Erscheinungsbild, Rücksicht auf
      reduzierte Bewegung
- [ ] 1.3 Manifest anlegen mit allen 11 Vorlesungen, zunächst durchgehend im Status
      `entwurf`; Felder gemäß `design.md` Abschnitt 6
- [ ] 1.4 Shell umsetzen: Startübersicht, Seitennavigation, Suche, Fortschrittsmarkierung,
      Umschalter für das Erscheinungsbild, direkte Verlinkbarkeit einzelner Module
- [ ] 1.5 Fehlerfall abdecken: im Manifest genanntes, aber fehlendes Modul erzeugt einen
      verständlichen Hinweis
- [ ] 1.6 Geteilte Modul-Hilfen bereitstellen (Aufklappen der Prüfungsfragen,
      Karten- und Schrittsteuerungs-Bausteine), damit sie nicht in jedem Modul neu
      entstehen

**Abnahme Phase 1:** Shell öffnet per Doppelklick, zeigt elf Entwurfs-Kacheln, Suche und
Umschalter funktionieren, Konsole fehlerfrei.

---

## Phase 2 — Referenzmodul

- [ ] 2.1 **VL 03 – Evolutionäre Algorithmen I** als erstes vollständiges Modul umsetzen
- [ ] 2.2 Alle neun Abschnitte gemäß Modul-Vertrag befüllen
- [ ] 2.3 Animation: der EA-Grundzyklus am TSP — Population, Elternselektion,
      Rekombination, Mutation, Umweltselektion, jeweils einzeln schaltbar mit erklärender
      Textzeile
- [ ] 2.4 Abschnitt Praktikum aus Übung 3 (Hill Climbing und erster EA am TSP)
- [ ] 2.5 Mindestens acht Prüfungsfragen aller drei Typen
- [ ] 2.6 Manifest-Eintrag auf `fertig` setzen
- [ ] 2.7 Screenshot-Beleg: Shell-Ansicht, Einzelaufruf, ein mittlerer Animationsschritt,
      Dunkelmodus

> **Warum VL 03 zuerst:** Der Stoff ist inhaltlich reich genug, um alle Abschnitte des
> Vertrags echt zu belasten, und er ist der Beginn des TSP-Strangs. Was hier trägt, trägt
> auch bei den übrigen Modulen.

**Abnahme Phase 2:** Justin sieht sich das Modul an und gibt das Format frei. Erst danach
Phase 3. Änderungen am Vertrag werden in `design.md` nachgezogen, nicht nur im Modul.

---

## Phase 3 — Module (je Vorlesung wiederholen)

Für jede Vorlesung gilt derselbe Ablauf:

- [ ] 3.x.1 Vorlesungs-PDF und zugehöriges Übungsblatt lesen
- [ ] 3.x.2 Inhalt auf die neun Abschnitte des Modul-Vertrags verteilen
- [ ] 3.x.3 Modul umsetzen, Gestaltung ausschließlich über das geteilte Design-System
- [ ] 3.x.4 Animation gemäß Kurzbeschreibung unten
- [ ] 3.x.5 Querverweise setzen (TSP-Strang bzw. Zoo-Strang)
- [ ] 3.x.6 Manifest-Eintrag anhängen bzw. auf `fertig` setzen
- [ ] 3.x.7 Prüfen: Einzelaufruf, 700-px-Breite, Dunkelmodus, Konsole
- [ ] 3.x.8 Bestehende Moduldateien wurden nicht verändert — kontrollieren

### Reihenfolge und Animations-Kurzbeschreibungen

| Reihenfolge | Modul | Animation zeigt |
|---|---|---|
| 1 | VL 03 – Evolutionäre Algorithmen I | EA-Grundzyklus am TSP (Phase 2) |
| 2 | VL 04 – Evolutionäre Algorithmen II | Operatoren im Vergleich: verschiedene Mutations-, Rekombinations- und Selektionsverfahren nebeneinander am selben TSP; sichtbar machen, warum ein einzelner Operator in lokale Optima führt |
| 3 | VL 05 – Evolutionäre Algorithmen III | Neu aus den Vorlesungsfolien gebaut (nicht migriert, s. u.): GA, ES, GP und lokale Suche |
| 4 | VL 06 – Schwarmintelligenz | Neu aus den Vorlesungsfolien gebaut (nicht migriert, s. u.): PSO, ACO, SDS |
| 5 | VL 02 – Fuzzy Logic | Die Kette Fuzzifizierung → Regelauswertung → Defuzzifizierung am Schwimmbad-Beispiel; Zugehörigkeitsfunktionen und aktive Regeln bei veränderlicher Temperatur |
| 6 | VL 07 – Neuronale Netze I | Vom MCP-Neuron zu logischen Gattern, Hebbsches Lernen, Perzeptron mit wandernder Trenngerade |
| 7 | VL 08 – Neuronale Netze II | Mehrschichtiges Netz: Vorwärtsrechnung und Fehlerrückführung schrittweise, Gewichtsänderungen sichtbar |
| 8 | VL 01 – Einführung | Die drei Adaptivitätsstufen (kontext-adaptierbar → adaptiv → selbst-adaptiv); Einordnung aller Kursverfahren in eine Landkarte (Inhalt korrigiert: Die Folien zeigen keinen Wahrnehmung/Bewertung/Anpassung-Regelkreis, sondern die genannte Stufen-Taxonomie sowie eine KI/CI-Begriffslandkarte, s. design.md Abschnitt 2) |
| 9 | VL 09 – Machine Learning I | Wettbewerbslernen am Zoo-Datensatz: Gewinnerneuron und Verschiebung der Gewichtsvektoren |
| 10 | VL 10 – Machine Learning II | k-Nearest-Neighbor und k-Means nebeneinander am Zoo-Datensatz — Kern der Abgrenzung unüberwacht/überwacht (Inhalt korrigiert, s. design.md Abschnitt 2: VL10 behandelt tatsächlich Nearest Neighbour/k-Means, nicht Entscheidungsbäume) |
| 11 | VL 11 – Machine Learning III | Entscheidungsbaum nach „gain of order" am Blutdruckbeispiel: Attributwahl und wachsender Baum Schritt für Schritt (Inhalt korrigiert, s. design.md Abschnitt 2: VL11 behandelt tatsächlich Entscheidungsbäume, nicht k-Means/kNN) |

> **Begründung der Reihenfolge:** Zuerst die Vorlesungen, zu denen bereits Material
> existiert oder die den TSP-Strang bilden — dort ist der Ertrag pro Aufwand am höchsten.
> VL 01 kommt bewusst spät: Die Einführung ist als Landkarte am wertvollsten, wenn die
> Ziele der Landkarte schon existieren und verlinkt werden können.

> **Abweichung VL 05/VL 06 (Migration entfällt):** Die in `proposal.md` und `design.md`
> vorausgesetzten alten Widgets für VL 05 und VL 06 liegen nicht im lokalen Repo und sind
> für Claude Code nicht erreichbar (nur im GitHub-Repo `jurie2000/adaptive-systeme-lerneinheiten`,
> zu dem kein Zugriff besteht). Justin hat entschieden: Beide Module werden stattdessen
> neu aus den Vorlesungsfolien gebaut, im selben Format wie die übrigen Module — keine
> Migration bestehender Animationslogik. Die früheren Widgets bleiben unberührt.

---

## Phase 4 — Abschluss

- [ ] 4.1 `README.md` schreiben: wie eine Vorlesung ergänzt wird, wie veröffentlicht wird,
      wie ein Modul in Notion eingebettet wird
- [ ] 4.2 Alle Module gegen die Abnahmeliste in `design.md` Abschnitt 8 prüfen
- [ ] 4.3 GitHub Pages aktivieren und die Erreichbarkeit aller Modul-URLs prüfen
- [ ] 4.4 Embed-URL-Liste für Notion erzeugen — eine Zeile je Modul, direkt kopierbar
- [ ] 4.5 Vollständigkeit prüfen: elf Module `fertig`, Querverweise beidseitig gesetzt,
      keine toten Verweise

---

## Arbeitsregeln für Claude Code

1. **Ein Modul pro Durchgang.** Nicht mehrere Vorlesungen in einem Zug bearbeiten — die
   inhaltliche Qualität pro Modul geht sonst verloren.
2. **Nichts erfinden.** Inhalte stammen aus den PDFs. Ist etwas unklar, wird es als offene
   Frage vermerkt, statt plausibel ergänzt zu werden.
3. **Bestehende Module sind unantastbar.** Ausnahme: eine Änderung am Modul-Vertrag,
   die Justin ausdrücklich beschlossen hat — dann werden alle Module gemeinsam nachgezogen.
4. **Chirurgische Änderungen.** Bestehende Dateien werden punktuell bearbeitet, nicht
   vollständig neu geschrieben.
5. **Prosa in deutscher Sprache.** Fachbegriffe bleiben in ihrer üblichen Form; die
   Erklärung drumherum ist deutsch.
6. **Bei jeder Abweichung von dieser Spec:** erst `design.md` bzw. `spec.md` anpassen,
   dann umsetzen. Die Spec bleibt die Wahrheit.
