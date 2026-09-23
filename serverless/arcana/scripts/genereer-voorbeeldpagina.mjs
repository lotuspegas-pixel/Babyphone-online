// Genereert dist/voorbeeld/index.html: een volledig voorbeeldrapport als
// statische, zonder-JavaScript-crawlbare HTML (taak 12, E §5.9). De bron is een
// bestaande gouden fixture — al deterministisch en getest — zodat er geen
// engine bij de build hoeft te draaien en de tekst nooit afwijkt van wat een
// echte deelnemer zou krijgen. De pagina zegt expliciet dat het een voorbeeld
// is, en linkt terug naar de test.
//
//   node scripts/genereer-voorbeeldpagina.mjs        (draait na `vite build`)

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = (process.env.VITE_SITE_URL || 'https://arcanaprofile.com').replace(/\/+$/, '');
const FIXTURE = join(ROOT, 'src', 'test', 'golden', 'balanced-je.md');
const DIST = join(ROOT, 'dist');
const UIT = join(DIST, 'voorbeeld');

// De twaalf hoofddimensies met hun leesbare label (spiegelt MAIN_DIMENSIONS in
// src/data/arcanaDimensions.ts). De markdown-export toont interne id's; op een
// publieke pagina horen de gewone namen. Blijft dit achter bij de bron, dan
// valt het op: een onbekende id wordt letterlijk getoond.
const DIM_LABEL = {
  innerMotor: 'Innerlijke motor',
  socialPattern: 'Sociale energie',
  thinkingStyle: 'Denkstijl',
  emotionalSensitivityMain: 'Emotionele gevoeligheid',
  controlAndSecurity: 'Controle en zekerheid',
  conflictStyle: 'Conflictstijl',
  selfImage: 'Zelfbeeld',
  shadowPattern: 'Schaduwkant',
  relationshipPattern: 'Relatiepatroon',
  workStyle: 'Werkstijl',
  stressPattern: 'Stressreactie',
  growthPath: 'Groeipad',
};

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Zet de eenvoudige export-markdown om naar semantische HTML. */
function markdownNaarHtml(md) {
  const regels = md.split(/\r?\n/);
  const html = [];
  let inLijst = false;
  const sluitLijst = () => {
    if (inLijst) {
      html.push('</ul>');
      inLijst = false;
    }
  };
  for (let regel of regels) {
    // Score-overzicht: interne id → leesbaar label.
    const score = regel.match(/^- ([a-zA-Z]+): (\d+)\/100$/);
    if (score && DIM_LABEL[score[1]]) {
      regel = `- ${DIM_LABEL[score[1]]}: ${score[2]}/100`;
    }
    if (regel.startsWith('### ')) {
      sluitLijst();
      html.push(`<h3>${escape(regel.slice(4))}</h3>`);
    } else if (regel.startsWith('## ')) {
      sluitLijst();
      html.push(`<h2>${escape(regel.slice(3))}</h2>`);
    } else if (regel.startsWith('# ')) {
      sluitLijst();
      html.push(`<h1>${escape(regel.slice(2))}</h1>`);
    } else if (regel.startsWith('- ')) {
      if (!inLijst) {
        html.push('<ul>');
        inLijst = true;
      }
      html.push(`<li>${escape(regel.slice(2))}</li>`);
    } else if (regel.trim() === '---') {
      sluitLijst();
      html.push('<hr />');
    } else if (regel.trim() === '') {
      sluitLijst();
    } else {
      sluitLijst();
      html.push(`<p>${escape(regel)}</p>`);
    }
  }
  sluitLijst();
  return html.join('\n');
}

// De bron, met de kop vervangen door een voorbeeld-kader. De eerste regels van
// de export zijn de titel + "Gegenereerd op {datum}" + de drie archetyperegels;
// die datum is fictief en hoort niet op een voorbeeldpagina.
const bron = readFileSync(FIXTURE, 'utf8');
const zonderKop = bron
  .split(/\r?\n/)
  .filter((r) => !/^# Arcana Profile/.test(r) && !/^Gegenereerd op:/.test(r))
  .join('\n')
  .replace(/^\s+/, '');

const rapportHtml = markdownNaarHtml(zonderKop);

// De gebouwde stylesheet (met de designtokens, licht én donker) meelinken.
const cssBestand = readdirSync(join(DIST, 'assets')).find((n) => /^style-.*\.css$/.test(n));
const cssHref = cssBestand ? `/assets/${cssBestand}` : '';

const html = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#fbf8f3" />
    <script>
      (function () {
        var t = null;
        try { var raw = localStorage.getItem('arcana_theme'); t = raw ? JSON.parse(raw) : null; } catch (e) {}
        var root = document.documentElement;
        if (t === 'dark' || t === 'light') root.setAttribute('data-theme', t);
        var dark = t === 'dark' || (t !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', dark ? '#16130f' : '#fbf8f3');
      })();
    </script>
    <title>Voorbeeldrapport — zo ziet een Arcana Profile-uitslag eruit</title>
    <meta name="description" content="Een volledig voorbeeldrapport van Arcana Profile, uit verzonnen antwoorden. Alle 33 hoofdstukken, de cijfers erbij — lees het voordat je één vraag beantwoordt." />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${SITE}/voorbeeld/" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Arcana Profile" />
    <meta property="og:locale" content="nl_NL" />
    <meta property="og:title" content="Voorbeeldrapport — zo ziet een Arcana Profile-uitslag eruit" />
    <meta property="og:description" content="Een volledig voorbeeldrapport uit verzonnen antwoorden. Alle 33 hoofdstukken, de cijfers erbij." />
    <meta property="og:url" content="${SITE}/voorbeeld/" />
    ${cssHref ? `<link rel="stylesheet" href="${cssHref}" />` : ''}
    <style>
      body { background: var(--bg, #fbf8f3); color: var(--ink, #241f1a); font-family: var(--font-body, system-ui, sans-serif); margin: 0; }
      .voorbeeld { max-width: 46rem; margin: 0 auto; padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2rem) 4rem; }
      .voorbeeld__kader { border: 1px solid var(--gold, #7f4c04); border-radius: 0.5rem; padding: 1rem 1.2rem; margin-bottom: 2rem; background: var(--bg-wash, #f7ecd9); }
      .voorbeeld__kader strong { color: var(--ink, #241f1a); }
      .voorbeeld__kader p { margin: 0.3rem 0 0; color: var(--ink-soft, #554d44); font-size: 0.95rem; line-height: 1.6; }
      .voorbeeld__cta { display: inline-block; margin-top: 0.8rem; padding: 0.7rem 1.3rem; border-radius: 999px; background: var(--btn-bg, #5e3a05); color: var(--btn-fg, #fbf8f3); text-decoration: none; font-weight: 600; }
      .voorbeeld h1 { font-family: var(--font-display, Georgia, serif); font-weight: 500; font-size: clamp(1.9rem, 5vw, 2.8rem); line-height: 1.1; margin: 0 0 1rem; }
      .voorbeeld h2 { font-family: var(--font-display, Georgia, serif); font-weight: 600; font-size: clamp(1.4rem, 3vw, 1.8rem); margin: 2.2rem 0 0.6rem; line-height: 1.2; }
      .voorbeeld h3 { font-family: var(--font-display, Georgia, serif); font-weight: 600; font-size: 1.2rem; margin: 1.5rem 0 0.4rem; }
      .voorbeeld p { color: var(--ink-soft, #554d44); line-height: 1.7; margin: 0 0 0.9rem; max-width: 62ch; }
      .voorbeeld ul { color: var(--ink-soft, #554d44); line-height: 1.65; padding-left: 1.2rem; margin: 0 0 1rem; }
      .voorbeeld li { margin: 0 0 0.5rem; max-width: 62ch; }
      .voorbeeld hr { border: none; border-top: 1px solid var(--hairline, #e4d8c2); margin: 2rem 0; }
    </style>
  </head>
  <body>
    <main class="voorbeeld">
      <div class="voorbeeld__kader">
        <strong>Dit is een voorbeeld, geen echte uitslag.</strong>
        <p>Dit rapport is gemaakt uit verzonnen antwoorden, zodat je kunt zien wat je krijgt voordat je één vraag beantwoordt. Alle 33 hoofdstukken staan er, met de cijfers erbij. Je eigen rapport staat na de 120 vragen bovenaan je scherm en blijft op je eigen apparaat.</p>
        <a class="voorbeeld__cta" href="/">Begin met de 120 vragen →</a>
      </div>
      <h1>Voorbeeldrapport</h1>
      ${rapportHtml}
      <hr />
      <div class="voorbeeld__kader">
        <strong>Nogmaals: dit is een voorbeeld.</strong>
        <p>Je eigen rapport wordt uit jouw antwoorden berekend — dezelfde antwoorden geven altijd hetzelfde rapport. Er komt geen taalmodel aan te pas en je gegevens blijven op je eigen apparaat.</p>
        <a class="voorbeeld__cta" href="/">Begin met de 120 vragen →</a>
      </div>
    </main>
  </body>
</html>
`;

mkdirSync(UIT, { recursive: true });
writeFileSync(join(UIT, 'index.html'), html);
const woorden = zonderKop.split(/\s+/).filter(Boolean).length;
console.log(`Voorbeeldpagina gegenereerd: dist/voorbeeld/index.html (${woorden} woorden, bron balanced-je.md, css ${cssHref || 'GEEN'}).`);
