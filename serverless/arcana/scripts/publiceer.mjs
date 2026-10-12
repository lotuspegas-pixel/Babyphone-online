// Publiceert de gebouwde site naar de branch die Hostinger uitcheckt.
//
//   npm run publiceer
//
// Hostinger's Git-koppeling kloont een repo ín een map en draait zelf geen
// build. De branch die hij uitcheckt moet dus de kant-en-klare site zijn, met
// index.html in de wortel — niet de broncode. Vandaar deze aparte branch
// (`live`): hij bevat precies de inhoud van dist/ en niets anders.
//
// De broncode blijft op zijn eigen branch staan; die twee hebben met opzet
// geen gedeelde geschiedenis. Elke publicatie is één commit op `live` met de
// vorige publicatie als ouder, zodat Hostinger gewoon kan pullen.
//
// Werkwijze (git-plumbing, zodat de werkmap onaangeroerd blijft):
//   1. dist/ als los index-bestand inlezen
//   2. die boom committen met de vorige `live` als ouder
//   3. de branch verzetten en pushen

import { execFileSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const BRANCH = process.env.ARCANA_LIVE_BRANCH ?? 'live';
const ARCANA = process.cwd();
const DIST = join(ARCANA, 'dist');
const REPO = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('Geen dist/index.html gevonden. Draai eerst `npm run build`.');
  process.exit(1);
}

const git = (args, env) =>
  execFileSync('git', args, { cwd: REPO, encoding: 'utf8', env: { ...process.env, ...env } }).trim();

/** Eigen index, zodat de echte staging-area van de werkmap met rust blijft. */
const INDEX = join(ARCANA, '.git-live-index');
rmSync(INDEX, { force: true });
const env = { GIT_INDEX_FILE: INDEX };

try {
  // De inhoud van dist/ wordt de wortel van de branch.
  git(['--work-tree', DIST, 'add', '--all', '--force', '.'], env);
  const boom = git(['write-tree'], env);

  let ouder = null;
  try {
    ouder = git(['rev-parse', '--verify', `refs/heads/${BRANCH}`]);
  } catch {
    // Nog geen live-branch: dit wordt de eerste publicatie.
  }

  if (ouder) {
    const vorigeBoom = git(['rev-parse', `${ouder}^{tree}`]);
    if (vorigeBoom === boom) {
      console.log(`Niets te publiceren: ${BRANCH} is al gelijk aan de huidige build.`);
      process.exit(0);
    }
  }

  const bron = git(['rev-parse', '--short', 'HEAD']);
  const bericht = `Publicatie ${new Date().toISOString().slice(0, 16).replace('T', ' ')} (uit ${bron})`;
  const commit = git(['commit-tree', boom, ...(ouder ? ['-p', ouder] : []), '-m', bericht], env);
  git(['update-ref', `refs/heads/${BRANCH}`, commit]);

  console.log(`${BRANCH} bijgewerkt: ${commit.slice(0, 7)} — ${bericht}`);
  git(['push', 'origin', `${BRANCH}:${BRANCH}`]);
  console.log(`Gepusht naar origin/${BRANCH}. Hostinger kan nu deployen.`);
} finally {
  rmSync(INDEX, { force: true });
}
