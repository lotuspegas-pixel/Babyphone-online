import { useState } from 'react';
import { PRIVACY_TEXT } from '../data/arcanaReportBlocks';
import type { AddressForm, ArcanaProfile, LifePhase } from '../types/arcana';

interface Props {
  initialProfile: ArcanaProfile;
  onConfirm: (profile: ArcanaProfile) => void;
  onBack: () => void;
}

const LIFE_PHASES: { value: LifePhase; label: string }[] = [
  { value: 'onbekend', label: 'Zeg ik liever niet' },
  { value: 'tot25', label: 'Tot 25 jaar' },
  { value: 'van25tot40', label: '25 tot 40 jaar' },
  { value: 'van40tot55', label: '40 tot 55 jaar' },
  { value: 'vanaf55', label: '55 jaar of ouder' },
];

export function ArcanaIntake({ initialProfile, onConfirm, onBack }: Props) {
  const [name, setName] = useState(initialProfile.name);
  const [addressForm, setAddressForm] = useState<AddressForm>(initialProfile.addressForm);
  const [lifePhase, setLifePhase] = useState<LifePhase>(initialProfile.lifePhase);

  const trimmedName = name.trim();
  const canContinue = trimmedName.length > 0;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canContinue) return;
    onConfirm({ name: trimmedName, addressForm, lifePhase });
  }

  return (
    <div className="arcana-screen arcana-intake">
      <form className="arcana-card arcana-intake__card" onSubmit={handleSubmit}>
        <p className="arcana-eyebrow">Voordat we beginnen</p>
        <h1 className="arcana-title">Hoe mogen we je aanspreken?</h1>
        <p className="arcana-body">
          Je rapport wordt op jouw naam geschreven. Deze gegevens blijven, net als je antwoorden,
          alleen in deze browser en worden nergens naartoe gestuurd.
        </p>

        <label className="arcana-field">
          <span className="arcana-field__label">Je naam of roepnaam</span>
          <input
            className="arcana-field__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bijvoorbeeld: Sam"
            maxLength={40}
            autoComplete="given-name"
            autoFocus
            required
          />
          <span className="arcana-field__hint">
            Een voornaam of bijnaam is genoeg. Verzin gerust iets als je liever anoniem blijft.
          </span>
        </label>

        <fieldset className="arcana-field arcana-field--group">
          <legend className="arcana-field__label">Hoe spreken we je aan?</legend>
          <div className="arcana-segmented">
            {(['je', 'u'] as AddressForm[]).map((form) => (
              <button
                key={form}
                type="button"
                className={`arcana-segmented__option${addressForm === form ? ' is-selected' : ''}`}
                onClick={() => setAddressForm(form)}
                aria-pressed={addressForm === form}
              >
                {form === 'je' ? 'Jij / je' : 'U'}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="arcana-field">
          <span className="arcana-field__label">Levensfase (optioneel)</span>
          <select
            className="arcana-field__input"
            value={lifePhase}
            onChange={(e) => setLifePhase(e.target.value as LifePhase)}
          >
            {LIFE_PHASES.map((phase) => (
              <option key={phase.value} value={phase.value}>
                {phase.label}
              </option>
            ))}
          </select>
          <span className="arcana-field__hint">
            Dit verandert je scores niet. Het kleurt alleen hoe je groeipad wordt geformuleerd.
          </span>
        </label>

        <div className="arcana-intake__actions">
          <button type="button" className="arcana-button arcana-button--ghost" onClick={onBack}>
            Terug
          </button>
          <button type="submit" className="arcana-button arcana-button--primary" disabled={!canContinue}>
            Begin met de 120 vragen
          </button>
        </div>

        <p className="arcana-fineprint">{PRIVACY_TEXT}</p>
      </form>
    </div>
  );
}
