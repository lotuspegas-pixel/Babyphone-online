import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import type { ArcanaQuestion, SubDimensionId } from '../types/arcana';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const VALID_TARGETS = new Set<SubDimensionId>(SUB_DIMENSION_IDS);

export function validateQuestionBank(questions: ArcanaQuestion[]): ValidationResult {
  const errors: string[] = [];

  if (questions.length !== 120) {
    errors.push(`Expected exactly 120 questions, found ${questions.length}`);
  }

  const counts = { likert: 0, forcedChoice: 0, scenario: 0, ranking: 0 };
  const seenIds = new Set<string>();

  for (const q of questions) {
    counts[q.type] += 1;

    if (seenIds.has(q.id)) {
      errors.push(`Duplicate question id: ${q.id}`);
    }
    seenIds.add(q.id);

    if (!q.text || q.text.trim().length === 0) {
      errors.push(`Question ${q.id} has empty text`);
    }

    if (q.type === 'likert') {
      if (q.targets.length === 0) errors.push(`Question ${q.id} has no targets`);
      for (const t of q.targets) {
        if (!VALID_TARGETS.has(t)) errors.push(`Question ${q.id} has invalid target ${t}`);
      }
    }

    if (q.type === 'forcedChoice' || q.type === 'scenario') {
      if (q.options.length === 0) errors.push(`Question ${q.id} has no options`);
      for (const opt of q.options) {
        if (!opt.text || opt.text.trim().length === 0) {
          errors.push(`Question ${q.id} option ${opt.key} has empty text`);
        }
        if (opt.targets.length === 0) errors.push(`Question ${q.id} option ${opt.key} has no targets`);
        for (const t of opt.targets) {
          if (!VALID_TARGETS.has(t)) errors.push(`Question ${q.id} option ${opt.key} has invalid target ${t}`);
        }
      }
    }

    if (q.type === 'ranking') {
      if (q.items.length === 0) errors.push(`Question ${q.id} has no items`);
      for (const item of q.items) {
        if (!item.text || item.text.trim().length === 0) {
          errors.push(`Question ${q.id} item ${item.key} has empty text`);
        }
        if (item.targets.length === 0) errors.push(`Question ${q.id} item ${item.key} has no targets`);
        for (const t of item.targets) {
          if (!VALID_TARGETS.has(t)) errors.push(`Question ${q.id} item ${item.key} has invalid target ${t}`);
        }
      }
    }
  }

  if (counts.likert !== 72) errors.push(`Expected 72 likert questions, found ${counts.likert}`);
  if (counts.forcedChoice !== 24) errors.push(`Expected 24 forced-choice questions, found ${counts.forcedChoice}`);
  if (counts.scenario !== 16) errors.push(`Expected 16 scenario questions, found ${counts.scenario}`);
  if (counts.ranking !== 8) errors.push(`Expected 8 ranking questions, found ${counts.ranking}`);

  return { valid: errors.length === 0, errors };
}
