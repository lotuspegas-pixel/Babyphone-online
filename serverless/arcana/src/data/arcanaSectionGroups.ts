/**
 * Vaste indeling van de 32 rapportsecties (alle secties op de hero-banner na)
 * in 6 leesbare groepen, elk met een eigen <h2>-tussenkop. Puur structuur:
 * elke section-id komt in precies één groep voor, en de volgorde binnen een
 * groep volgt de volgorde waarin de secties al in `report.sections` staan
 * (deze lijst filtert alleen, ze herschikt niets).
 *
 * De hero-sectie (id "hero") staat hier bewust niet in: die wordt als
 * banner bovenaan het rapport getoond, niet als kaart in deze lijst.
 *
 * Gebruikt door zowel ArcanaReport (gegroepeerde sectielijst) als
 * ArcanaReportToc (geneste inhoudsopgave), zodat beide altijd exact dezelfde
 * indeling tonen.
 */
export interface ArcanaSectionGroup {
  /** Stabiele, URL/DOM-veilige sleutel voor React keys en anker-id's. */
  id: string;
  title: string;
  ids: string[];
}

export const SECTION_GROUPS: ArcanaSectionGroup[] = [
  {
    id: 'wie-je-bent',
    title: 'Wie je bent',
    ids: ['who-you-are', 'core-pattern', 'seen-by-others', 'hidden-inner-world', 'at-ease'],
  },
  {
    id: 'jij-en-anderen',
    title: 'Jij en anderen',
    ids: ['with-others', 'work-style', 'close-circle', 'relationship', 'communication', 'understood-by-others'],
  },
  {
    id: 'onder-druk-en-in-je-kracht',
    title: 'Onder druk en in je kracht',
    ids: ['alone', 'stress', 'strengths', 'shadow', 'jungian', 'tensions', 'blind-spots'],
  },
  {
    id: 'groeien',
    title: 'Groeien',
    ids: ['who-you-can-become', 'what-you-need', 'growth-path', 'understand-yourself'],
  },
  {
    id: 'acht-beschouwingen',
    title: 'Acht beschouwingen',
    ids: [
      'reflectie-liefde',
      'reflectie-haat',
      'reflectie-pijn',
      'reflectie-intuitie',
      'reflectie-verdriet',
      'reflectie-tegenslagen',
      'reflectie-geluk',
      'reflectie-blijdschap',
    ],
  },
  {
    id: 'je-actieplan',
    title: 'Je actieplan',
    ids: ['thirty-day-plan', 'final-sentence'],
  },
];
