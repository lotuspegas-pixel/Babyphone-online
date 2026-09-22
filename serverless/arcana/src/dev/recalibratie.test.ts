import { test } from 'vitest';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import { calculateSubDimensions, average } from '../lib/arcanaScoringEngine';
import { ARCHETYPES, ARCHETYPE_INVERTED_TARGETS } from '../data/arcanaArchetypes';
import { generateDummyAnswers } from '../lib/arcanaDummyAnswers';
import type { ArcanaAnswerMap, SubDimensionId } from '../types/arcana';

/**
 * PROTOTYPE — niets hiervan zit in de app. Dit bestand vergelijkt de huidige
 * scoreberekening met een voorgestelde herijking, om te meten wat de
 * herijking doet met de spreiding van de scores.
 *
 * Het voorstel rust op één regel: de punten die een vraag uitdeelt moeten
 * optellen tot nul. Dan ligt het midden van de schaal per constructie op 50
 * en kan willekeurig invullen niet stelselmatig hoog uitkomen.
 *
 * - Likert voldoet daar al aan (1..7 wordt -3..+3, met 4 = 0).
 * - Keuzevragen niet: de gekozen optie krijgt +3, de niet-gekozen optie
 *   krijgt niets. Voorstel: niet-gekozen opties krijgen samen -3, verdeeld
 *   over het aantal afgewezen opties.
 * - Rangschikvragen niet: alle posities geven punten tussen +3 en +0,3.
 *   Voorstel: posities lopen lineair van +3 (eerste) naar -3 (laatste).
 */

const WEIGHTS = [1.0, 0.7, 0.4];
function weightForIndex(i: number): number {
  return i < WEIGHTS.length ? WEIGHTS[i] : 0.2;
}

const LIKERT: Record<number, number> = { 1: -3, 2: -2, 3: -1, 4: 0, 5: 1, 6: 2, 7: 3 };

/** Scoreberekening met de voorgestelde, op nul gecentreerde puntentoekenning. */
function scoreProposed(answers: ArcanaAnswerMap): Record<SubDimensionId, number> {
  const raw: Record<string, number> = {};
  const max: Record<string, number> = {};
  for (const id of SUB_DIMENSION_IDS) {
    raw[id] = 0;
    max[id] = 0;
  }

  const add = (target: string, points: number, weight: number) => {
    if (raw[target] === undefined) return;
    raw[target] += points * weight;
    max[target] += 3 * Math.abs(weight);
  };

  const byId = new Map(ARCANA_QUESTIONS.map((q) => [q.id, q]));

  for (const answer of Object.values(answers)) {
    const q = byId.get(answer.questionId);
    if (!q) continue;

    if (q.type === 'likert' && answer.type === 'likert') {
      const v = LIKERT[answer.value];
      if (v === undefined) continue;
      q.targets.forEach((t, i) => add(t, v, weightForIndex(i)));
    } else if ((q.type === 'forcedChoice' || q.type === 'scenario') && (answer.type === 'forcedChoice' || answer.type === 'scenario')) {
      const opties = q.options;
      const afgewezen = opties.length - 1;
      if (afgewezen < 1) continue;
      // Gekozen optie +3; de afgewezen opties delen samen -3, zodat de vraag
      // in totaal nul uitdeelt ongeacht het aantal opties.
      const straf = -3 / afgewezen;
      opties.forEach((optie) => {
        const punten = optie.key === answer.optionKey ? 3 : straf;
        optie.targets.forEach((t, i) => add(t, punten, weightForIndex(i)));
      });
    } else if (q.type === 'ranking' && answer.type === 'ranking') {
      const n = answer.order.length;
      answer.order.forEach((key, positie) => {
        const item = q.items.find((i) => i.key === key);
        if (!item) return;
        // Lineair van +3 (eerste) naar -3 (laatste); bij n=1 wordt dat 0.
        const punten = n > 1 ? 3 - (6 * positie) / (n - 1) : 0;
        item.targets.forEach((t, i) => add(t, punten, weightForIndex(i)));
      });
    }
  }

  const uit = {} as Record<SubDimensionId, number>;
  for (const id of SUB_DIMENSION_IDS) {
    uit[id] = max[id] === 0 ? 50 : Math.round(Math.min(100, Math.max(0, 50 + (raw[id] / max[id]) * 50)));
  }
  return uit;
}

function statistiek(waarden: number[]) {
  const gesorteerd = [...waarden].sort((a, b) => a - b);
  const gem = waarden.reduce((a, b) => a + b, 0) / waarden.length;
  const sd = Math.sqrt(waarden.reduce((a, v) => a + (v - gem) ** 2, 0) / waarden.length);
  return {
    gemiddeld: +gem.toFixed(1),
    sd: +sd.toFixed(1),
    min: gesorteerd[0],
    max: gesorteerd[gesorteerd.length - 1],
    p10: gesorteerd[Math.floor(waarden.length * 0.1)],
    p90: gesorteerd[Math.floor(waarden.length * 0.9)],
    onder50: +((waarden.filter((v) => v < 50).length / waarden.length) * 100).toFixed(1),
    boven80: +((waarden.filter((v) => v > 80).length / waarden.length) * 100).toFixed(1),
  };
}

test('herijking: spreiding huidige versus voorgestelde schaal', async () => {
  const modi = ['random', 'balanced', 'highControl', 'highFreedom', 'highSensitivity', 'highRecognition'] as const;

  const huidigeAlle: number[] = [];
  const voorstelAlle: number[] = [];
  const huidigePerPersoon: number[][] = [];
  const voorstelPerPersoon: number[][] = [];

  // 180 gesimuleerde invullingen: 30 seeds over 6 invulprofielen.
  for (const modus of modi) {
    for (let seed = 1; seed <= 30; seed++) {
      const antwoorden = generateDummyAnswers(modus, seed);
      const huidig = calculateSubDimensions(antwoorden);
      const voorstel = scoreProposed(antwoorden);
      const h = SUB_DIMENSION_IDS.map((id) => huidig[id].score);
      const v = SUB_DIMENSION_IDS.map((id) => voorstel[id]);
      huidigeAlle.push(...h);
      voorstelAlle.push(...v);
      huidigePerPersoon.push(h);
      voorstelPerPersoon.push(v);
    }
  }

  // Hoeveel verschil zit er binnen één rapport tussen hoogste en laagste score?
  const spreidingBinnenRapport = (rapporten: number[][]) => {
    const spreidingen = rapporten.map((r) => Math.max(...r) - Math.min(...r));
    return +(spreidingen.reduce((a, b) => a + b, 0) / spreidingen.length).toFixed(1);
  };

  // Alleen de willekeurige invullingen: die horen rond 50 uit te komen.
  const wReeks = { huidig: [] as number[], voorstel: [] as number[] };
  for (let seed = 1; seed <= 30; seed++) {
    const a = generateDummyAnswers('random', seed);
    wReeks.huidig.push(...SUB_DIMENSION_IDS.map((id) => calculateSubDimensions(a)[id].score));
    const v = scoreProposed(a);
    wReeks.voorstel.push(...SUB_DIMENSION_IDS.map((id) => v[id]));
  }

  const rapport = {
    steekproef: `${modi.length} invulprofielen x 30 seeds = ${huidigePerPersoon.length} rapporten, ${huidigeAlle.length} scores`,
    ALLE_INVULLINGEN: {
      huidig: statistiek(huidigeAlle),
      voorstel: statistiek(voorstelAlle),
    },
    ALLEEN_WILLEKEURIG_INVULLEN: {
      toelichting: 'Willekeurig invullen hoort rond 50 uit te komen',
      huidig: statistiek(wReeks.huidig),
      voorstel: statistiek(wReeks.voorstel),
    },
    SPREIDING_BINNEN_EEN_RAPPORT: {
      toelichting: 'Verschil tussen hoogste en laagste score in hetzelfde rapport',
      huidig: spreidingBinnenRapport(huidigePerPersoon),
      voorstel: spreidingBinnenRapport(voorstelPerPersoon),
    },
  };

  const fs = await import('node:fs');
  fs.writeFileSync(
    'C:/Users/rleac/AppData/Local/Temp/claude/C--Users-rleac-Downloads-babyphoneonline-serverless/bb1d8e07-ef17-4510-a603-34bdff143156/scratchpad/recalibratie.json',
    JSON.stringify(rapport, null, 2),
  );
});


/** Archetypescores uit een set subdimensiescores, zelfde formules als de app. */
function archetypen(sub: Record<string, number>) {
  return ARCHETYPES.map((a) => {
    const inverted = new Set(ARCHETYPE_INVERTED_TARGETS[a.id] ?? []);
    const waarden = a.formula.map((f) => (inverted.has(f) ? 100 - sub[f] : sub[f]));
    return { id: a.id, score: Math.round(average(waarden)) };
  }).sort((x, y) => y.score - x.score);
}

test('herijking: hoe vaak liggen primair en secundair archetype op elkaar', async () => {
  const modi = ['random', 'balanced', 'highControl', 'highFreedom', 'highSensitivity', 'highRecognition'] as const;
  const tel = { huidig: { gelijk: 0, binnen3: 0, n: 0, gaps: [] as number[] }, voorstel: { gelijk: 0, binnen3: 0, n: 0, gaps: [] as number[] } };

  for (const modus of modi) {
    for (let seed = 1; seed <= 30; seed++) {
      const a = generateDummyAnswers(modus, seed);
      const hSub: Record<string, number> = {};
      const hs = calculateSubDimensions(a);
      SUB_DIMENSION_IDS.forEach((id) => (hSub[id] = hs[id].score));
      const vSub = scoreProposed(a) as unknown as Record<string, number>;

      for (const [naam, sub] of [['huidig', hSub], ['voorstel', vSub]] as const) {
        const r = archetypen(sub);
        const gap = r[0].score - r[1].score;
        const t = tel[naam];
        t.n++;
        t.gaps.push(gap);
        if (gap === 0) t.gelijk++;
        if (gap <= 3) t.binnen3++;
      }
    }
  }

  const vat = (t: typeof tel.huidig) => ({
    exactGelijkspel: t.gelijk + ' van ' + t.n + ' (' + Math.round((t.gelijk / t.n) * 100) + '%)',
    binnen3Punten: t.binnen3 + ' van ' + t.n + ' (' + Math.round((t.binnen3 / t.n) * 100) + '%)',
    gemiddeldVerschil: +(t.gaps.reduce((x, y) => x + y, 0) / t.gaps.length).toFixed(1),
  });

  const fs2 = await import('node:fs');
  fs2.writeFileSync(
    'C:/Users/rleac/AppData/Local/Temp/claude/C--Users-rleac-Downloads-babyphoneonline-serverless/bb1d8e07-ef17-4510-a603-34bdff143156/scratchpad/archetypen.json',
    JSON.stringify({ toelichting: 'Verschil tussen hoogste en op een na hoogste archetypescore', huidig: vat(tel.huidig), voorstel: vat(tel.voorstel) }, null, 2),
  );
});

/**
 * Het archetype-gelijkspel heeft een eigen oorzaak, los van de schaal: een
 * archetypescore is nu het gemiddelde van vier subdimensies. Wie op veel
 * eigenschappen hoog scoort, scoort daardoor op veel archetypen hoog — de
 * formules delen bovendien subdimensies met elkaar.
 *
 * Voorstel: meet niet het absolute niveau maar het reliëf. Trek het eigen
 * gemiddelde van de persoon eraf, zodat een archetype hoog scoort wanneer
 * díe eigenschappen er bij deze persoon uitspringen, niet wanneer alles hoog is.
 */
function archetypenRelief(sub: Record<string, number>) {
  const alle = SUB_DIMENSION_IDS.map((id) => sub[id]);
  const eigenGemiddelde = alle.reduce((a, b) => a + b, 0) / alle.length;
  return ARCHETYPES.map((a) => {
    const inverted = new Set(ARCHETYPE_INVERTED_TARGETS[a.id] ?? []);
    const waarden = a.formula.map((f) => (inverted.has(f) ? 100 - sub[f] : sub[f]));
    return { id: a.id, score: Math.round(average(waarden) - eigenGemiddelde) };
  }).sort((x, y) => y.score - x.score);
}

test('herijking: archetype-scheiding met reliëf in plaats van niveau', async () => {
  const modi = ['random', 'balanced', 'highControl', 'highFreedom', 'highSensitivity', 'highRecognition'] as const;
  const tel = {
    huidig: { binnen3: 0, n: 0, gaps: [] as number[] },
    alleenSchaal: { binnen3: 0, n: 0, gaps: [] as number[] },
    schaalPlusRelief: { binnen3: 0, n: 0, gaps: [] as number[] },
  };

  for (const modus of modi) {
    for (let seed = 1; seed <= 30; seed++) {
      const a = generateDummyAnswers(modus, seed);
      const hs = calculateSubDimensions(a);
      const hSub: Record<string, number> = {};
      SUB_DIMENSION_IDS.forEach((id) => (hSub[id] = hs[id].score));
      const vSub = scoreProposed(a) as unknown as Record<string, number>;

      const varianten = [
        ['huidig', archetypen(hSub)],
        ['alleenSchaal', archetypen(vSub)],
        ['schaalPlusRelief', archetypenRelief(vSub)],
      ] as const;

      for (const [naam, r] of varianten) {
        const gap = r[0].score - r[1].score;
        const t = tel[naam];
        t.n++;
        t.gaps.push(gap);
        if (gap <= 3) t.binnen3++;
      }
    }
  }

  const vat = (t: { binnen3: number; n: number; gaps: number[] }) => ({
    binnen3Punten: t.binnen3 + ' van ' + t.n + ' (' + Math.round((t.binnen3 / t.n) * 100) + '%)',
    gemiddeldVerschil: +(t.gaps.reduce((x, y) => x + y, 0) / t.gaps.length).toFixed(1),
  });

  const fs = await import('node:fs');
  fs.writeFileSync(
    'C:/Users/rleac/AppData/Local/Temp/claude/C--Users-rleac-Downloads-babyphoneonline-serverless/bb1d8e07-ef17-4510-a603-34bdff143156/scratchpad/archetypen2.json',
    JSON.stringify({
      toelichting: 'Verschil tussen hoogste en op een na hoogste archetype. Hoe groter, hoe duidelijker de uitslag.',
      huidig: vat(tel.huidig),
      alleen_schaal_herijkt: vat(tel.alleenSchaal),
      schaal_plus_relief: vat(tel.schaalPlusRelief),
    }, null, 2),
  );
});
