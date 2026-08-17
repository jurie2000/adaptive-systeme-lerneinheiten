# Spec: Lernseite

## ADDED Requirements

### Requirement: Statische Auslieferung ohne Build

Die Seite MUSS ohne Build-Schritt, ohne Paketmanager und ohne lokalen Server nutzbar sein.

#### Scenario: Öffnen per Doppelklick

- **WHEN** `index.html` direkt im Dateisystem geöffnet wird
- **THEN** erscheint die Übersicht aller Module vollständig gestaltet
- **AND** die Navigation ist bedienbar

#### Scenario: Auslieferung über GitHub Pages

- **WHEN** das Repository über GitHub Pages veröffentlicht ist
- **THEN** sind Shell und alle Module über ihre URLs erreichbar
- **AND** es werden keine Dateien angefordert, die nicht im Repository liegen

---

### Requirement: Eigenständigkeit der Module

Jede Moduldatei MUSS ohne die Shell vollständig funktionsfähig sein.

#### Scenario: Modul einzeln aufrufen

- **WHEN** eine Datei aus `lectures/` direkt geöffnet wird
- **THEN** sind Gestaltung, Abschnittsstruktur und Animation vollständig vorhanden
- **AND** es entstehen keine Fehler wegen fehlender Shell-Ressourcen

#### Scenario: Einbettung in Notion

- **WHEN** die URL eines Moduls in Notion als Embed eingefügt wird
- **THEN** ist das Modul bei etwa 700 px Breite ohne horizontales Scrollen bedienbar

---

### Requirement: Additive Erweiterbarkeit

Das Hinzufügen einer Vorlesung MUSS ohne Änderung bestehender Moduldateien möglich sein.

#### Scenario: Neue Vorlesung ergänzen

- **WHEN** eine neue Moduldatei angelegt und ein Manifest-Eintrag angehängt wird
- **THEN** erscheint das Modul in Navigation, Übersicht und Suche
- **AND** keine vorhandene Moduldatei wurde verändert

#### Scenario: Modul fehlt

- **WHEN** das Manifest ein Modul nennt, dessen Datei nicht existiert
- **THEN** zeigt die Shell einen verständlichen Hinweis mit dem erwarteten Dateinamen
- **AND** die übrige Navigation bleibt bedienbar

---

### Requirement: Einheitliche Abschnittsstruktur

Jedes Vorlesungsmodul MUSS die in `design.md` Abschnitt 5 festgelegte Abschnittsfolge in
unveränderter Reihenfolge enthalten.

#### Scenario: Struktur eines fertigen Moduls

- **WHEN** ein als `fertig` markiertes Modul geöffnet wird
- **THEN** sind Kernidee, Begriffe, Bestandteile, Ablauf, Animation, Verbindungen,
  Prüfungsfragen und Typische Fallen vorhanden
- **AND** bei vorhandenem Praktikum zusätzlich der Abschnitt Praktikum

#### Scenario: Kernidee als Einstieg

- **WHEN** ein Modul geöffnet wird
- **THEN** steht die Kernidee in höchstens drei Sätzen an erster Stelle
- **AND** vor ihr steht keine Formel

---

### Requirement: Erklärung vor Formel

Inhalte MÜSSEN primär sprachlich erklärt sein; formale Notation ist ergänzend.

#### Scenario: Darstellung eines Mechanismus

- **WHEN** ein Verfahrensschritt beschrieben wird
- **THEN** liegt eine Beschreibung in deutscher Prosa vor
- **AND** eine eventuelle Formel steht nachgeordnet und ersetzt die Beschreibung nicht

#### Scenario: Bestandteile benennen

- **WHEN** ein Algorithmus dargestellt wird
- **THEN** ist jeder Bestandteil einzeln benannt und mit seiner Aufgabe beschrieben

---

### Requirement: Schrittweise steuerbare Animation

Jedes Modul MUSS eine Visualisierung enthalten, die schrittweise bedienbar ist.

#### Scenario: Einzelschritt betrachten

- **WHEN** Justin einen Schritt vorwärts auslöst
- **THEN** verändert sich die Darstellung um genau einen nachvollziehbaren Schritt
- **AND** eine Textzeile beschreibt in Prosa, was in diesem Schritt geschieht

#### Scenario: Zurücksetzen

- **WHEN** Zurücksetzen ausgelöst wird
- **THEN** ist der Ausgangszustand vollständig wiederhergestellt
- **AND** die Animation läuft nicht von selbst weiter

#### Scenario: Reduzierte Bewegung

- **WHEN** das System reduzierte Bewegung signalisiert
- **THEN** startet keine Animation automatisch
- **AND** die Schrittsteuerung bleibt uneingeschränkt nutzbar

#### Scenario: Ruhezustand

- **WHEN** ein Modul nicht sichtbar ist
- **THEN** läuft keine Animationsschleife im Hintergrund weiter

---

### Requirement: Prüfungsfragen mit gesprochener Musterantwort

Jedes Modul MUSS mindestens acht Prüfungsfragen mit verdeckter Musterantwort enthalten.

#### Scenario: Fragetypen

- **WHEN** die Fragen eines Moduls betrachtet werden
- **THEN** sind Definitions-, Abgrenzungs- und Anwendungsfragen vertreten

#### Scenario: Antwort aufdecken

- **WHEN** eine Frage angeklickt wird
- **THEN** erscheint eine Musterantwort von drei bis sechs Sätzen in Fließtext
- **AND** die Antwort ist als sprechbarer Text formuliert, nicht als Stichpunktliste

#### Scenario: Antwort standardmäßig verdeckt

- **WHEN** ein Modul frisch geladen wird
- **THEN** ist keine Musterantwort sichtbar

---

### Requirement: Querverweise zwischen Modulen

Module MÜSSEN die durchgehenden Themenstränge des Kurses sichtbar machen.

#### Scenario: TSP-Strang

- **WHEN** ein Modul zu Hill Climbing, evolutionären Algorithmen, lokaler Suche oder ACO
  geöffnet wird
- **THEN** verweist der Abschnitt Verbindungen auf die anderen Verfahren desselben Strangs
- **AND** benennt das Vergleichskriterium

#### Scenario: Zoo-Datensatz-Strang

- **WHEN** ein Modul zu Wettbewerbslernen, Entscheidungsbaum oder k-Means/kNN geöffnet wird
- **THEN** ist der gemeinsame Datensatz benannt
- **AND** die Einordnung überwacht/unüberwacht ist erkennbar

---

### Requirement: Gemeinsames Design-System

Farben, Abstände und Typografie MÜSSEN aus einer einzigen geteilten Stilquelle stammen.

#### Scenario: Zentrale Farbänderung

- **WHEN** eine Farbrolle in der geteilten Stildatei geändert wird
- **THEN** ändert sich die Darstellung in allen Modulen
- **AND** keine Moduldatei musste angefasst werden

#### Scenario: Semantische Farben

- **WHEN** eine der semantischen Farben für Begriff, Ablauf oder Achtung erscheint
- **THEN** trägt sie die in `design.md` festgelegte Bedeutung
- **AND** wird nicht dekorativ verwendet

---

### Requirement: Dunkelmodus

Shell und Module MÜSSEN in hellem und dunklem Erscheinungsbild lesbar sein.

#### Scenario: Umschalten

- **WHEN** Justin das Erscheinungsbild umschaltet
- **THEN** wechseln Shell und eingebettetes Modul gemeinsam
- **AND** die Auswahl bleibt beim nächsten Öffnen erhalten

#### Scenario: Einzelmodul im Dunkelmodus

- **WHEN** ein Modul einzeln im dunklen Erscheinungsbild geöffnet wird
- **THEN** sind Text, Grafik und Bedienelemente ausreichend kontrastreich

---

### Requirement: Fortschrittsmarkierung

Justin MUSS Module als durchgearbeitet markieren können, ohne Konto oder Server.

#### Scenario: Markieren und wiederkehren

- **WHEN** ein Modul als durchgearbeitet markiert und die Seite neu geladen wird
- **THEN** ist die Markierung weiterhin sichtbar

#### Scenario: Übersicht

- **WHEN** die Startansicht geöffnet wird
- **THEN** ist erkennbar, wie viele Module bereits durchgearbeitet sind

---

### Requirement: Suche über Modul-Metadaten

Die Shell MUSS eine Suche über Titel, Kurzbeschreibung und Schlagworte bieten.

#### Scenario: Suche nach Fachbegriff

- **WHEN** ein Schlagwort wie „Pheromon" eingegeben wird
- **THEN** bleiben nur Module mit diesem Schlagwort in der Liste

#### Scenario: Kein Treffer

- **WHEN** die Eingabe zu keinem Modul passt
- **THEN** erscheint ein Hinweis statt einer leeren Liste

---

### Requirement: Kennzeichnung unfertiger Module

Module im Entwurfsstatus MÜSSEN als solche erkennbar sein.

#### Scenario: Entwurf in der Übersicht

- **WHEN** ein Modul im Manifest den Status `entwurf` trägt
- **THEN** ist es in Übersicht und Navigation sichtbar gekennzeichnet

---

### Requirement: Fehlerfreiheit im Betrieb

Das Laden und Bedienen der Seite MUSS ohne Konsolenfehler erfolgen.

#### Scenario: Durchklicken eines Moduls

- **WHEN** ein Modul geladen und seine Animation vollständig durchgeschaltet wird
- **THEN** bleibt die Browser-Konsole frei von Fehlern
