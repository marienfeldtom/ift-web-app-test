import { browser } from '$app/environment';

export type Language = 'de' | 'en';

export const translations = {
  de: {
    // Layout
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.live_test': 'Live-Test',
    'nav.results': 'Ergebnisse',
    
    // Landing Page
    'landing.title': 'Profi-Diagnostik leicht gemacht.',
    'landing.subtitle': 'Führe den legendären <strong>30-15 Intermittent Fitness Test (IFT)</strong> nach Martin Buchheit komplett digital durch. Keine Klemmbretter, keine fehleranfälligen Excel-Listen.',
    'landing.cta': 'Jetzt Diagnostik starten',
    'landing.why.title': 'Warum dieses Tool?',
    'landing.why.subtitle': 'Von der Seitenlinie direkt in die Auswertung.',
    'landing.old.title': 'Früher: Excel & Klemmbrett',
    'landing.old.desc': 'Trainer mussten mit dem Klemmbrett an der Linie stehen, Drop-Outs notieren und alle Daten mühsam in Excel übertragen. Die komplizierte VO₂max-Formel erforderte Sportwissenschaftler, was die Hürde für viele Teams zu hoch machte.',
    'landing.new.title': 'Heute: Vollautomatisch',
    'landing.new.desc': 'Ein Klick in der App reicht. Wir tracken die Zeit, ordnen Drop-Outs zu und berechnen die VO₂max mit sofortigem, alters- und geschlechtsnormiertem Benchmark. Volle Diagnostik, für jedes Team zugänglich.',
    'landing.test.title': 'Der 30-15 IFT in Kürze',
    'landing.test.desc1': 'Der Test besteht aus <strong>30 Sekunden Belastung (Laufen)</strong> gefolgt von <strong>15 Sekunden Erholung (Gehen)</strong>. Mit jeder Stufe (45s) erhöht sich die Geschwindigkeit um 0,5 km/h.',
    'landing.test.desc2': 'Aktuell unterstützt die App den klassischen Ablauf auf einem normalen <strong>Handballfeld (40x20m)</strong>. Andere Feldmaße werden bald folgen.',
    'landing.science.title': 'Wissenschaftliches Fundament',
    'landing.science.buchheit': 'Wir verdanken diesen revolutionären Test der Arbeit des Sportwissenschaftlers Martin Buchheit. Er hat den Goldstandard für intermittierende Sportarten wie Fußball, Handball und Basketball geschaffen.',
    'landing.science.link1': 'Offizielle 30-15 IFT Website ↗',
    'landing.science.link2': 'Martin Buchheit Blog ↗',
    'landing.science.studies': 'Referenzstudien',
    'landing.footer': 'IFT 30-15 Diagnostik App. Basierend auf dem Protokoll von Martin Buchheit.',
    
    // Dashboard
    'dashboard.title': 'IFT 30-15 Diagnostik',
    'dashboard.about.title': 'Über den IFT 30-15 Test',
    'dashboard.about.desc1': 'Der Intermittent Fitness Test (30-15 IFT) nach Martin Buchheit evaluiert die maximale aerobe und anaerobe Leistungsfähigkeit sowie die Erholungsfähigkeit von Athleten.',
    'dashboard.about.list1': '<strong>Ablauf:</strong> 30 Sekunden Laufen, gefolgt von 15 Sekunden passivem Gehen (Erholung).',
    'dashboard.about.list2': '<strong>Steigerung:</strong> Die Geschwindigkeit erhöht sich in jeder Stufe (alle 45 Sekunden) um 0,5 km/h.',
    'dashboard.about.list3': '<strong>Abbruch:</strong> Ein Spieler scheidet aus, wenn er die vorgegebene Linie zweimal hintereinander nicht rechtzeitig erreicht.',
    'dashboard.about.highlight': 'Füge unten deine Spieler hinzu und klicke anschließend auf den großen "Test Starten" Button.',
    'dashboard.form.add': 'Neuen Spieler hinzufügen',
    'dashboard.form.edit': 'Spieler bearbeiten',
    'dashboard.form.name': 'Name',
    'dashboard.form.name_placeholder': 'Max Mustermann',
    'dashboard.form.age': 'Alter (Jahre, optional)',
    'dashboard.form.weight': 'Gewicht (kg, optional)',
    'dashboard.form.gender': 'Geschlecht',
    'dashboard.form.gender_male': 'Männlich',
    'dashboard.form.gender_female': 'Weiblich',
    'dashboard.form.submit_add': 'Hinzufügen',
    'dashboard.form.submit_edit': 'Änderungen speichern',
    'dashboard.form.cancel': 'Abbrechen',
    'dashboard.list.title': 'Aktueller Kader',
    'dashboard.list.empty': 'Keine Spieler im Kader. Füge Spieler hinzu, um zu beginnen.',
    'dashboard.list.years': 'Jahre',
    'dashboard.list.gender_m': 'M',
    'dashboard.list.gender_f': 'W',
    'dashboard.list.edit': 'Edit',
    'dashboard.cta': 'Zum Test Setup & Start',
    'dashboard.modal.missing_title': 'Fehlende Angaben',
    'dashboard.modal.missing_desc': 'Du hast weder Alter noch Gewicht angegeben. Ohne diese Werte kann am Ende des Tests <strong style="color: #fff;">keine VO2max berechnet und keine Bewertung</strong> durchgeführt werden.',
    'dashboard.modal.cancel': 'Abbrechen',
    'dashboard.modal.save': 'Trotzdem speichern',
    'dashboard.modal.close': 'Schließen',
    'dashboard.modal.empty_squad_title': 'Kein Kader vorhanden',
    'dashboard.modal.empty_squad_desc': 'Bitte füge mindestens einen Spieler hinzu, bevor du den Test startest.',
    'dashboard.img_alt': 'IFT 30-15 Test Erklärung Skizze',
    'dashboard.img_alt_enlarged': 'IFT 30-15 Test Erklärung Skizze (vergrößert)',
    
    // Test View
    'test.setup.title': 'Test Setup',
    'test.setup.speed_label': 'Startgeschwindigkeit (km/h)',
    'test.setup.start_btn': 'Audio & Test Starten',
    'test.setup.missing_audio': 'Die Audiodatei für {speed} km/h wurde nicht gefunden. Bitte lade sie als "30-15_IFT_Stage_{speed}.mp3" in den static-Ordner hoch.',
    'test.active.title': 'Test Läuft',
    'test.active.volume': 'Lautstärke',
    'test.active.current_speed': 'Aktuelle Geschwindigkeit',
    'test.active.time': 'Vergangene Zeit',
    'test.active.status_running': 'In Bewegung (30s)',
    'test.active.status_resting': 'Erholung (15s)',
    'test.active.status_starting': 'Test startet gleich...',
    'test.active.players_active': 'Aktive Spieler',
    'test.active.dropout_btn': 'Raus',
    'test.active.cancel_btn': 'Test Abbrechen',
    'test.active.finish_btn': 'Test Beenden',
    'test.active.to_results_btn': 'Zu den Ergebnissen',
    'test.active.dropped_out': 'Ausgeschieden',
    
    // Results View
    'results.title': 'Test Ergebnisse',
    'results.back_btn': 'Zum Dashboard',
    'results.export_btn': 'Als CSV Exportieren',
    'results.empty': 'Keine Ergebnisse vorhanden. Bitte führe zuerst den Test durch.',
    'results.table.name': 'Name',
    'results.table.age': 'Alter',
    'results.table.weight': 'Gewicht (kg)',
    'results.table.gender': 'Geschlecht',
    'results.table.speed': 'Final Speed (km/h)',
    'results.table.vo2max': 'VO2max (ml/kg/min)',
    'results.table.rating': 'Bewertung',
    'results.table.missing_data': 'Fehlende Angaben',
    'results.legend.gender': '<strong>G:</strong> Geschlecht (1 = Männlich, 2 = Weiblich)',
    'results.legend.age': '<strong>Alter:</strong> in Jahren',
    'results.legend.weight': '<strong>Gewicht:</strong> in Kilogramm',
    'results.legend.vift': '<strong>V<sub>IFT</sub>:</strong> Erreichte Endgeschwindigkeit in km/h',
    'results.bar.poor': 'Schlecht',
    'results.bar.fair': 'Mittelmaß',
    'results.bar.good': 'Gut',
    'results.bar.excellent': 'Exzellent',
    'results.bar.superior': 'Überragend',
    
    // Rating labels
    'rating.poor': 'Schlecht',
    'rating.fair': 'Mittelmaß',
    'rating.good': 'Gut',
    'rating.excellent': 'Exzellent',
    'rating.superior': 'Überragend'
  },
  en: {
    // Layout
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.live_test': 'Live Test',
    'nav.results': 'Results',
    
    // Landing Page
    'landing.title': 'Pro Diagnostics Made Easy.',
    'landing.subtitle': 'Run the legendary <strong>30-15 Intermittent Fitness Test (IFT)</strong> by Martin Buchheit completely digitally. No clipboards, no error-prone Excel sheets.',
    'landing.cta': 'Start Diagnostics Now',
    'landing.why.title': 'Why this Tool?',
    'landing.why.subtitle': 'From the sideline straight to the analysis.',
    'landing.old.title': 'Before: Excel & Clipboards',
    'landing.old.desc': 'Coaches had to stand on the sideline with a clipboard, note drop-outs, and manually enter all data into Excel. The complex VO₂max formula required sports scientists, making the barrier too high for many teams.',
    'landing.new.title': 'Today: Fully Automated',
    'landing.new.desc': 'One tap in the app is all it takes. We track the time, assign drop-outs, and calculate the VO₂max with an immediate, age- and gender-normalized benchmark. Full diagnostics, accessible to every team.',
    'landing.test.title': 'The 30-15 IFT in a Nutshell',
    'landing.test.desc1': 'The test consists of <strong>30 seconds of effort (running)</strong> followed by <strong>15 seconds of recovery (walking)</strong>. With each stage (45s), the speed increases by 0.5 km/h.',
    'landing.test.desc2': 'Currently, the app supports the classic setup on a normal <strong>handball court (40x20m)</strong>. Other field dimensions will follow soon.',
    'landing.science.title': 'Scientific Foundation',
    'landing.science.buchheit': 'We owe this revolutionary test to the work of sports scientist Martin Buchheit. He created the gold standard for intermittent sports like soccer, handball, and basketball.',
    'landing.science.link1': 'Official 30-15 IFT Website ↗',
    'landing.science.link2': 'Martin Buchheit Blog ↗',
    'landing.science.studies': 'Reference Studies',
    'landing.footer': 'IFT 30-15 Diagnostics App. Based on the protocol by Martin Buchheit.',
    
    // Dashboard
    'dashboard.title': 'IFT 30-15 Diagnostics',
    'dashboard.about.title': 'About the IFT 30-15 Test',
    'dashboard.about.desc1': 'The Intermittent Fitness Test (30-15 IFT) by Martin Buchheit evaluates the maximum aerobic and anaerobic performance, as well as the recovery capacity of athletes.',
    'dashboard.about.list1': '<strong>Procedure:</strong> 30 seconds of running, followed by 15 seconds of passive walking (recovery).',
    'dashboard.about.list2': '<strong>Progression:</strong> The speed increases in each stage (every 45 seconds) by 0.5 km/h.',
    'dashboard.about.list3': '<strong>Termination:</strong> A player drops out if they fail to reach the target line on time twice in a row.',
    'dashboard.about.highlight': 'Add your players below and then click the large "Start Test" button.',
    'dashboard.form.add': 'Add New Player',
    'dashboard.form.edit': 'Edit Player',
    'dashboard.form.name': 'Name',
    'dashboard.form.name_placeholder': 'John Doe',
    'dashboard.form.age': 'Age (Years, optional)',
    'dashboard.form.weight': 'Weight (kg, optional)',
    'dashboard.form.gender': 'Gender',
    'dashboard.form.gender_male': 'Male',
    'dashboard.form.gender_female': 'Female',
    'dashboard.form.submit_add': 'Add Player',
    'dashboard.form.submit_edit': 'Save Changes',
    'dashboard.form.cancel': 'Cancel',
    'dashboard.list.title': 'Current Squad',
    'dashboard.list.empty': 'No players in the squad. Add players to begin.',
    'dashboard.list.years': 'years',
    'dashboard.list.gender_m': 'M',
    'dashboard.list.gender_f': 'F',
    'dashboard.list.edit': 'Edit',
    'dashboard.cta': 'To Test Setup & Start',
    'dashboard.modal.missing_title': 'Missing Information',
    'dashboard.modal.missing_desc': 'You have not provided age or weight. Without these values, <strong style="color: #fff;">no VO2max calculation or rating</strong> can be performed at the end of the test.',
    'dashboard.modal.cancel': 'Cancel',
    'dashboard.modal.save': 'Save Anyway',
    'dashboard.modal.close': 'Close',
    'dashboard.modal.empty_squad_title': 'Empty Squad',
    'dashboard.modal.empty_squad_desc': 'Please add at least one player before starting the test.',
    'dashboard.img_alt': 'IFT 30-15 Test Explanation Sketch',
    'dashboard.img_alt_enlarged': 'IFT 30-15 Test Explanation Sketch (Enlarged)',
    
    // Test View
    'test.setup.title': 'Test Setup',
    'test.setup.speed_label': 'Start Speed (km/h)',
    'test.setup.start_btn': 'Start Audio & Test',
    'test.setup.missing_audio': 'The audio file for {speed} km/h was not found. Please upload it as "30-15_IFT_Stage_{speed}.mp3" into the static folder.',
    'test.active.title': 'Test Running',
    'test.active.volume': 'Volume',
    'test.active.current_speed': 'Current Speed',
    'test.active.time': 'Elapsed Time',
    'test.active.status_running': 'In Motion (30s)',
    'test.active.status_resting': 'Recovery (15s)',
    'test.active.status_starting': 'Test starting soon...',
    'test.active.players_active': 'Active Players',
    'test.active.dropout_btn': 'Out',
    'test.active.cancel_btn': 'Cancel Test',
    'test.active.finish_btn': 'Finish Test',
    'test.active.to_results_btn': 'To Results',
    'test.active.dropped_out': 'Dropped out',
    
    // Results View
    'results.title': 'Test Results',
    'results.back_btn': 'To Dashboard',
    'results.export_btn': 'Export as CSV',
    'results.empty': 'No results available. Please run the test first.',
    'results.table.name': 'Name',
    'results.table.age': 'Age',
    'results.table.weight': 'Weight (kg)',
    'results.table.gender': 'Gender',
    'results.table.speed': 'Final Speed (km/h)',
    'results.table.vo2max': 'VO2max (ml/kg/min)',
    'results.table.rating': 'Rating',
    'results.table.missing_data': 'Missing Data',
    'results.legend.gender': '<strong>G:</strong> Gender (1 = Male, 2 = Female)',
    'results.legend.age': '<strong>Age:</strong> in years',
    'results.legend.weight': '<strong>Weight:</strong> in kilograms',
    'results.legend.vift': '<strong>V<sub>IFT</sub>:</strong> Final velocity reached in km/h',
    'results.bar.poor': 'Poor',
    'results.bar.fair': 'Fair',
    'results.bar.good': 'Good',
    'results.bar.excellent': 'Excellent',
    'results.bar.superior': 'Superior',
    
    // Rating labels
    'rating.poor': 'Poor',
    'rating.fair': 'Fair',
    'rating.good': 'Good',
    'rating.excellent': 'Excellent',
    'rating.superior': 'Superior'
  }
} as const;

export type TranslationKey = keyof typeof translations.de;

let currentLang = $state<Language>('de');

if (browser) {
  const saved = localStorage.getItem('app-lang') as Language;
  if (saved && (saved === 'de' || saved === 'en')) {
    currentLang = saved;
  } else {
    const sysLang = navigator.language.slice(0, 2).toLowerCase();
    currentLang = sysLang === 'en' ? 'en' : 'de';
  }
}

export const locale = {
  get current() {
    return currentLang;
  },
  set current(lang: Language) {
    currentLang = lang;
    if (browser) {
      localStorage.setItem('app-lang', lang);
    }
  }
};

export function t(key: TranslationKey, vars?: Record<string, string | number>): string {
  let text = translations[currentLang][key] || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}
