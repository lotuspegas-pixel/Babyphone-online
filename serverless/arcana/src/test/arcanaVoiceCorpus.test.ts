import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { toFormal } from '../lib/arcanaVoice';

/**
 * Bewaakt de u-vorm over de hele tekstverzameling, niet alleen over losse
 * voorbeeldzinnen.
 *
 * Aanleiding: de omzetter van "je" naar "u" werkte met een whitelist van
 * werkwoorden. Elk werkwoord dat daar niet in stond, sloeg om naar het
 * bezittelijke "uw" — waardoor zinnen als "Hoe je bent wanneer je alleen bent"
 * in de u-vorm "Hoe u bent wanneer uw alleen bent" werden. Dat stond live.
 *
 * Deze test haalt alle Nederlandse zinnen uit de databestanden, zet ze om, en
 * controleert de uitkomst op patronen die grammaticaal niet kunnen. Voegt
 * iemand later een zin toe met een werkwoord dat de omzetter niet kent, dan
 * valt deze test om in plaats van dat de fout stilletjes meegaat naar productie.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..');

function collectFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!/node_modules|golden|test$/.test(p)) collectFiles(p, out);
    } else if (/\.(ts|tsx)$/.test(name) && !/\.test\./.test(name)) {
      out.push(p);
    }
  }
  return out;
}

/** Haalt de Nederlandse zinnen uit de bronbestanden (lange string-literals). */
function collectSentences(): string[] {
  const sentences: string[] = [];
  for (const file of collectFiles(SRC)) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/'((?:[^'\\]|\\.){25,})'|`((?:[^`\\$]|\\.){25,})`/g)) {
      const text = (m[1] ?? m[2]).replace(/\\'/g, "'").replace(/\\n/g, ' ');
      // Alleen echte zinnen: minstens één "je" en geen code-achtige inhoud.
      if (/\bje\b/i.test(text) && !/[<>{}]|=>|\$\{/.test(text)) sentences.push(text);
    }
  }
  return sentences;
}

/**
 * Zelfstandige naamwoorden op -t die in deze teksten na "je" voorkomen. Alleen
 * hier mag "uw" gevolgd worden door een woord op -t.
 */
const NOUNS_ON_T = new Set([
  'rapport', 'kracht', 'inzet', 'overzicht', 'houvast', 'schaduwkant',
  'standpunt', 'zoektocht', 'gemakzucht', 'aandacht', 'onrust', 'verdriet',
  'buurt', 'inzicht', 'last', 'apparaat', 'contact', 'rust', 'kant', 'punt',
  'hart', 'gezicht', 'gevecht', 'licht', 'zicht', 'gebrek', 'conflict',
  'effect', 'moment', 'talent', 'geduld', 'gedrag', 'gevoeligheid',
  'stabiliteit', 'identiteit', 'kwaliteit', 'impulsiviteit', 'test',
  'zelfvertrouwen', 'start', 'antwoord', 'verstand', 'document', 'meest',
  'project', 'inzicht', 'instinct', 'respect', 'gedicht', 'bezit',
]);

describe('u-vorm over de hele tekstverzameling', () => {
  const sentences = collectSentences();

  it('vindt voldoende zinnen om iets te bewijzen', () => {
    expect(sentences.length).toBeGreaterThan(200);
  });

  it('zet "uw" nooit vóór een vervoegd werkwoord', () => {
    const fouten: string[] = [];
    for (const zin of sentences) {
      const u = toFormal(zin);
      for (const m of u.matchAll(/\buw ([a-zà-ÿ]+)/gi)) {
        const w = m[1].toLowerCase();
        if (!w.endsWith('t') || NOUNS_ON_T.has(w)) continue;
        fouten.push(`"uw ${w}" in: ${u.slice(Math.max(0, m.index - 40), m.index + 60)}`);
      }
    }
    expect(fouten.slice(0, 12).join('\n'), `${fouten.length} fout(en)`).toBe('');
  });

  it('laat geen kale werkwoordsstam vóór "u" staan (inversie)', () => {
    // "weet" staat hier bewust niet in: de stam eindigt al op -t, dus "weet u"
    // ("Weet u zeker dat…") is correcte inversie, geen kale stam. Hij stond er
    // wel, en dat viel niet op omdat de zinnen met "Weet je zeker" toevallig
    // buiten de scan vielen door een losse apostrof eerder in hetzelfde
    // bestand — de scanner op string-literals is daar gevoelig voor.
    const stammen = ['voel', 'denk', 'kun', 'zul', 'wil', 'ben', 'heb', 'ga', 'zie', 'kom', 'neem', 'geef', 'lees'];
    const fouten: string[] = [];
    for (const zin of sentences) {
      const u = toFormal(zin);
      for (const stam of stammen) {
        // "voel u" mag niet; "voelt u" wel. "Lees uw rapport" is bezit en valt
        // hier dus niet onder.
        const re = new RegExp(`\\b${stam} u\\b`, 'gi');
        for (const m of u.matchAll(re)) {
          fouten.push(`"${m[0]}" in: ${u.slice(Math.max(0, m.index - 40), m.index + 60)}`);
        }
      }
    }
    expect(fouten.slice(0, 12).join('\n'), `${fouten.length} fout(en)`).toBe('');
  });

  it('verandert niets aan zinnen zonder "je"', () => {
    const zonderJe = 'Dit is een zin zonder tweede persoon erin.';
    expect(toFormal(zonderJe)).toBe(zonderJe);
  });

  it('laat geen enkele "je", "jij", "jou" of "jouw" achter', () => {
    const achtergebleven: string[] = [];
    for (const zin of sentences) {
      const u = toFormal(zin);
      if (/\b(je|jij|jou|jouw|jezelf)\b/i.test(u)) achtergebleven.push(u.slice(0, 90));
    }
    expect(achtergebleven.slice(0, 8).join('\n'), `${achtergebleven.length} zin(nen)`).toBe('');
  });
});
