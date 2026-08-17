/*
  Adaptive Systeme – Manifest (einzige Wahrheit für Navigation, design.md Abschnitt 6).
  Als window.AS_MANIFEST statt als reinem JSON abgelegt, weil fetch()/XMLHttpRequest
  gegen lokale file://-Pfade in Safari zuverlässig fehlschlagen ("XHR fehlgeschlagen"),
  ein normales <script>-Tag davon aber nicht betroffen ist. Inhaltlich identisch zu
  einer JSON-Datei - nur der äußere Rahmen unterscheidet sich.
*/
window.AS_MANIFEST = {
  "module": [
    {
      "nummer": "01",
      "titel": "Einführung",
      "datei": "vl01-einfuehrung.html",
      "kurzbeschreibung": "Was ein adaptives System ausmacht und wie die Verfahren des Kurses zusammenhängen.",
      "schlagworte": ["adaptives System", "Adaptivitätsstufen", "Computational Intelligence", "Übersicht", "Landkarte"],
      "uebung": { "nummer": "01", "thema": "TSP-Grundlagen" },
      "status": "fertig"
    },
    {
      "nummer": "02",
      "titel": "Fuzzy Logic",
      "datei": "vl02-fuzzy-logic.html",
      "kurzbeschreibung": "Unscharfe Mengen, Fuzzifizierung, Regelauswertung und Defuzzifizierung.",
      "schlagworte": ["Fuzzy Logic", "Fuzzifizierung", "Zugehörigkeitsfunktion", "Defuzzifizierung", "Regelbasis"],
      "uebung": { "nummer": "02", "thema": "Fuzzy-Inferenz, Temperatursteuerung" },
      "status": "fertig"
    },
    {
      "nummer": "03",
      "titel": "Evolutionäre Algorithmen I",
      "datei": "vl03-evolutionaere-algorithmen-i.html",
      "kurzbeschreibung": "Der EA-Grundzyklus: Population, Selektion, Rekombination und Mutation am Beispiel des TSP.",
      "schlagworte": ["Evolutionärer Algorithmus", "Selektion", "Rekombination", "Mutation", "TSP", "Hill Climbing"],
      "uebung": { "nummer": "03", "thema": "Hill Climbing, erster EA für TSP" },
      "status": "fertig"
    },
    {
      "nummer": "04",
      "titel": "Evolutionäre Algorithmen II",
      "datei": "vl04-evolutionaere-algorithmen-ii.html",
      "kurzbeschreibung": "Operatorenvielfalt bei Mutation, Rekombination und Selektion sowie Umgang mit dynamischen Problemen.",
      "schlagworte": ["Evolutionärer Algorithmus", "Mutationsoperator", "Rekombinationsoperator", "Umweltselektion", "dynamisches Problem", "TSP"],
      "uebung": { "nummer": "04", "thema": "Erweitertes TSP, Operatorenvergleich, dynamisches Problem" },
      "status": "fertig"
    },
    {
      "nummer": "05",
      "titel": "Evolutionäre Algorithmen III",
      "datei": "vl05-evolutionaere-algorithmen-iii.html",
      "kurzbeschreibung": "Genetische Algorithmen, Evolutionsstrategien, genetisches Programmieren und lokale Suche im Vergleich.",
      "schlagworte": ["Genetischer Algorithmus", "Evolutionsstrategie", "genetisches Programmieren", "lokale Suche", "Akzeptanzfunktion", "TSP"],
      "uebung": { "nummer": "05", "thema": "Lokale Suche mit Akzeptanzfunktionen" },
      "status": "fertig"
    },
    {
      "nummer": "06",
      "titel": "Schwarmintelligenz",
      "datei": "vl06-schwarmintelligenz.html",
      "kurzbeschreibung": "Populationsbasierte Verfahren ohne zentrale Steuerung: Partikelschwarm, Ameisenkolonie und Stochastic Diffusion Search.",
      "schlagworte": ["Schwarmintelligenz", "PSO", "Partikelschwarm", "ACO", "Ameisenkolonie", "Pheromon", "SDS", "TSP"],
      "uebung": { "nummer": "06", "thema": "PSO (Rosenbrock) und ACO (TSP)" },
      "status": "fertig"
    },
    {
      "nummer": "07",
      "titel": "Neuronale Netze I",
      "datei": "vl07-neuronale-netze-i.html",
      "kurzbeschreibung": "Vom MCP-Neuron über Hebbsches Lernen zum Perzeptron als linearem Klassifikator.",
      "schlagworte": ["MCP-Neuron", "Hebbsches Lernen", "Perzeptron", "Perzeptron-Lernregel", "lineare Trennbarkeit"],
      "uebung": { "nummer": "07", "thema": "Perzeptron, SONAR-Datensatz, Online vs. Batch" },
      "status": "fertig"
    },
    {
      "nummer": "08",
      "titel": "Neuronale Netze II",
      "datei": "vl08-neuronale-netze-ii.html",
      "kurzbeschreibung": "Mehrschichtige Netze, Vorwärtsrechnung und Fehlerrückführung (Backpropagation), Grundlagen von CNNs.",
      "schlagworte": ["Mehrschichtiges Netz", "Backpropagation", "Fehlerrückführung", "CNN", "Objektdetektion", "PyTorch"],
      "uebung": { "nummer": "08", "thema": "CNNs mit PyTorch, Objektdetektion" },
      "status": "fertig"
    },
    {
      "nummer": "09",
      "titel": "Machine Learning I",
      "datei": "vl09-machine-learning-i.html",
      "kurzbeschreibung": "Unüberwachtes Lernen durch Wettbewerb: Gewinnerneuron und Verschiebung der Gewichtsvektoren.",
      "schlagworte": ["Wettbewerbslernen", "unüberwachtes Lernen", "Gewinnerneuron", "Zoo-Datensatz"],
      "uebung": { "nummer": "09", "thema": "Wettbewerbslernen, Zoo-Datensatz" },
      "status": "fertig"
    },
    {
      "nummer": "10",
      "titel": "Machine Learning II",
      "datei": "vl10-machine-learning-ii.html",
      "kurzbeschreibung": "Nearest Neighbour und k-Means: Klassifikation und Clustering anhand von Distanzen im Vergleich.",
      "schlagworte": ["Nearest Neighbour", "k-Nearest-Neighbor", "kNN", "k-Means", "Clustering", "Distanzfunktion", "Voronoi", "Zoo-Datensatz"],
      "uebung": { "nummer": "11", "thema": "k-Means und k-Nearest-Neighbor (Zoo, sonar, iris, wine)" },
      "status": "fertig"
    },
    {
      "nummer": "11",
      "titel": "Machine Learning III",
      "datei": "vl11-machine-learning-iii.html",
      "kurzbeschreibung": "Entscheidungsbäume nach dem Gain-of-order-Verfahren, Attributwahl und Baumaufbau.",
      "schlagworte": ["Entscheidungsbaum", "gain of order", "Attributwahl", "überwachtes Lernen", "Empfehlungssystem", "Zoo-Datensatz"],
      "uebung": { "nummer": "10", "thema": "Entscheidungsbaum \"gain of order\", Blutdruck- und Zoo-Datensatz" },
      "status": "fertig"
    }
  ]
};
