# 30-15 IFT Diagnostik App 🏃‍♂️💨

Eine hochmoderne, webbasierte Applikation zur digitalen Durchführung und Auswertung des **30-15 Intermittent Fitness Test (IFT)** nach Martin Buchheit.

Vorbei sind die Zeiten von Klemmbrett, Stoppuhr und komplizierten Excel-Listen. Diese App automatisiert den gesamten Ablauf: Vom Anlegen des Kaders über die Drop-Out-Erfassung während des Tests bis hin zur automatischen Berechnung der VO₂max.

## 🌟 Features

- **Kaderverwaltung (Dashboard):** Schnelles Anlegen von Spielern (Name, Alter, Gewicht, Geschlecht).
- **Integrierter Live-Test:** 
  - Auswahl der Startgeschwindigkeit (8 km/h oder 10 km/h).
  - Synchronisation mit den offiziellen Audio-Signalen.
  - One-Click "Drop-Out" Funktion für Athleten, die ausscheiden.
- **Automatische Auswertung:** 
  - Berechnung der **VO₂max** basierend auf der offiziellen Buchheit-Formel (2008).
  - Normierte Bewertung anhand der ACSM-Tabellen (von "Schlecht" bis "Überragend") abhängig von Alter und Geschlecht.
- **CSV-Export:** Ergebnisse lassen sich direkt für Trainer-Auswertungen oder Vereinsdatenbanken exportieren.
- **Mehrsprachigkeit (i18n):** Die App erkennt automatisch die Browsersprache und unterstützt nativ **Deutsch** und **Englisch**.

## 🛠️ Tech Stack

- **Framework:** SvelteKit + Svelte 5 (inklusive neuer Svelte Runes `$state`, `$derived`, `$effect`)
- **Styling:** Vanilla CSS (ohne schwere UI-Frameworks, optimiert für extreme Performance)
- **Icons:** Lucide Svelte

## 🚀 Lokale Installation & Start

### Voraussetzungen
Stelle sicher, dass **Node.js** (Empfohlen: v20 oder neuer) auf deinem Rechner installiert ist.

### 1. Repository klonen & Abhängigkeiten installieren
```bash
npm install
```

### 2. Audio-Dateien hinzufügen
Damit der Live-Test funktioniert, benötigst du die offiziellen Audio-Dateien des Tests.
Kopiere diese beiden Dateien in den `static/` Ordner deines Projekts:
- `40m_en_8.mp3` (Für den Start bei 8 km/h)
- `40m_en_10.mp3` (Für den Start bei 10 km/h)

*(Diese Dateien können von Trainern lizenziert oder auf der offiziellen Website von Martin Buchheit gefunden werden).*

Zudem kannst du ein Erklärungsbild für das Dashboard unter `static/erklaerung.png` ablegen.

### 3. Entwicklungsserver starten
```bash
npm run dev
```

Die App ist nun unter `http://localhost:5173` erreichbar!

### 4. Build für Produktion
Um die App für die Produktion zu bauen (z.B. für Vercel, Netlify oder einen eigenen Server):
```bash
npm run build
```

## ⚖️ Wissenschaftlicher Hintergrund & Credits
Der **30-15 Intermittent Fitness Test (IFT)** wurde von dem renommierten Sportwissenschaftler Martin Buchheit entwickelt. 
Er ist der Goldstandard zur Ermittlung der Ausdauerleistungsfähigkeit in intermittierenden Sportarten wie Fußball, Handball oder Basketball.

Weitere Informationen:
- [Offizielle 30-15 IFT Website](https://30-15ift.com/)
- [Martin Buchheit Blog](https://martin-buchheit.net/)
