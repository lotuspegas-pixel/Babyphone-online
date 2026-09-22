import { useEffect, useState } from 'react';

import { readTheme, saveTheme, subscribeTheme, type ArcanaTheme } from '../lib/arcanaTheme';

const OPTIONS: { value: ArcanaTheme; label: string; title: string }[] = [
  { value: 'light', label: 'Licht', title: 'Lichte weergave' },
  { value: 'system', label: 'Auto', title: 'Volg de instelling van je apparaat' },
  { value: 'dark', label: 'Donker', title: 'Donkere weergave' },
];

interface Props {
  /** Compacte variant voor de koptekst; de gewone staat in het rapport. */
  compact?: boolean;
}

/**
 * Drie standen naast elkaar, met aria-pressed per knop. Geen icoontjes: de
 * woorden zijn korter dan een uitleg van een icoontje, en ze zijn in de
 * u-vorm en op een schermlezer meteen duidelijk.
 */
export function ArcanaThemeToggle({ compact = false }: Props) {
  const [theme, setTheme] = useState<ArcanaTheme>(() => readTheme());

  useEffect(() => subscribeTheme(() => setTheme(readTheme())), []);

  return (
    <div
      className={`arcana-theme-toggle${compact ? ' arcana-theme-toggle--compact' : ''}`}
      role="group"
      aria-label="Weergave"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className="arcana-theme-toggle__option"
          aria-pressed={theme === option.value}
          title={option.title}
          onClick={() => {
            saveTheme(option.value);
            setTheme(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
