#!/usr/bin/env node
/**
 * Arcana Mirror quick-check.
 * Zero heavy dependencies. Verifies project-control docs exist and,
 * where the relevant source files already exist, sanity-checks question
 * count and looks for obvious NaN/undefined-output patterns.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
let failures = 0;
let warnings = 0;

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
  failures += 1;
}

function warn(msg) {
  console.warn(`[WARN] ${msg}`);
  warnings += 1;
}

function ok(msg) {
  console.log(`[OK]   ${msg}`);
}

function requireFile(relPath) {
  const full = path.join(root, relPath);
  if (fs.existsSync(full)) {
    ok(`${relPath} exists`);
    return full;
  }
  fail(`${relPath} is missing`);
  return null;
}

requireFile('AGENTS.md');
requireFile('CLAUDE.md');
requireFile('docs/arcana/PROJECT_STATUS.md');
requireFile('docs/arcana/06-acceptatiecriteria.md');

const questionsFile = path.join(root, 'arcana/src/data/arcanaQuestions.ts');
if (fs.existsSync(questionsFile)) {
  const src = fs.readFileSync(questionsFile, 'utf8');
  const ids = src.match(/\b(?:likert|fc|scenario|ranking)\(\s*'([A-Z]{1,2}\d{2})'/g) || [];
  const count = ids.length;
  if (count === 120) {
    ok(`arcanaQuestions.ts contains exactly 120 questions`);
  } else {
    fail(`arcanaQuestions.ts contains ${count} questions, expected 120`);
  }
  const unique = new Set(ids);
  if (unique.size !== ids.length) {
    fail('arcanaQuestions.ts contains duplicate question ids');
  } else {
    ok('all question ids are unique');
  }
} else {
  warn('arcana/src/data/arcanaQuestions.ts not found yet (skipping question count check)');
}

const scoringFiles = [
  'arcana/src/lib/arcanaScoringEngine.ts',
  'arcana/src/lib/arcanaReportGenerator.ts',
];
for (const relPath of scoringFiles) {
  const full = path.join(root, relPath);
  if (!fs.existsSync(full)) {
    warn(`${relPath} not found yet (skipping pattern check)`);
    continue;
  }
  const src = fs.readFileSync(full, 'utf8');
  if (/:\s*NaN\b/.test(src) || /return\s+NaN\b/.test(src)) {
    fail(`${relPath} contains a literal NaN output`);
  } else {
    ok(`${relPath} has no literal NaN output`);
  }
  if (/\$\{undefined\}/.test(src)) {
    fail(`${relPath} interpolates undefined directly into a template string`);
  } else {
    ok(`${relPath} has no obvious undefined interpolation`);
  }
}

console.log('');
console.log(`Arcana quick-check finished: ${failures} failure(s), ${warnings} warning(s).`);
if (failures > 0) {
  process.exitCode = 1;
}
