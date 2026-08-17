# So übergibst du das an Claude Code

## Was hier liegt

| Datei                     | Inhalt                                                                 |
| ------------------------- | ---------------------------------------------------------------------- |
| `proposal.md`             | Warum die Seite gebaut wird, was dazugehört, was ausdrücklich nicht    |
| `design.md`               | Architektur, vollständiges Kurs-Inventar, Design-System, Modul-Vertrag |
| `specs/lernseite/spec.md` | Prüfbare Anforderungen mit Szenarien                                   |
| `tasks.md`                | Abarbeitungsreihenfolge inklusive Animations-Briefing pro Vorlesung    |

## Vorher erledigen

1. Die 22 PDFs unter `content/pdf/` ablegen — **mit den Dateinamen aus `design.md`,
   Abschnitt 2.** Claude Code hat keinen Zugriff auf dein Claude-Projektwissen oder
   Notion; ohne die Dateien im Repo kann es die Inhalte nicht lesen.
2. Klären, welches der beiden mit „10. Übung" beschrifteten Blätter eigentlich Blatt 11 ist.

## Erster Aufruf in Claude Code

> Lies `openspec/changes/adaptive-systeme-lernseite/` vollständig — proposal, design,
> spec und tasks. Führe dann Phase 1 aus `tasks.md` aus. Halte an, bevor du Phase 2
> beginnst, und zeig mir das Ergebnis.

## Danach

Für jedes weitere Modul reicht ein kurzer Aufruf:

> Führe Phase 3, Schritt 5 aus `tasks.md` aus (VL 02 – Fuzzy Logic).

Der Punkt der Aufteilung: Jeder dieser Aufrufe ist gleich teuer, egal ob es das zweite
oder das elfte Modul ist. Nach jedem Modul kannst du aufhören und später weitermachen.

## Wenn dir am fertigen Format etwas nicht passt

Nicht das einzelne Modul korrigieren lassen, sondern `design.md` Abschnitt 5 ändern und
Claude Code anweisen, die Module nachzuziehen. Sonst driften die elf Kapitel wieder
auseinander — genau das Problem, das diese Struktur verhindern soll.

## Notion-Einbindung

Nach Phase 4 liegt eine Liste der Embed-URLs vor. Pro Vorlesung eine Zeile, die du in
deiner Notion-Unterseite als `/embed` einfügst. Deine bestehenden Embeds für VL 05 und
VL 06 zeigen danach ins Leere — die URLs musst du einmalig ersetzen.
