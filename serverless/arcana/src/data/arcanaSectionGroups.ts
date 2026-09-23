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
  /**
   * Eén zin die zegt waarom dit deel hier staat en wat het toevoegt aan het
   * vorige — de goedkoopste rode draad die er is (C §3.2, laag 1). Vaste
   * tekst zonder scores, dus presentatie en geen rapportinhoud.
   */
  lead: string;
  ids: string[];
}

export const SECTION_GROUPS: ArcanaSectionGroup[] = [
  {
    id: 'wie-je-bent',
    title: 'Wie je bent',
    lead: 'Vijf hoofdstukken over het patroon zelf: wat er het vaakst terugkwam in je antwoorden, wat daarvan zichtbaar is, en wat eronder ligt. Alles wat daarna komt bouwt hierop voort.',
    ids: ['who-you-are', 'core-pattern', 'seen-by-others', 'hidden-inner-world', 'at-ease'],
  },
  {
    id: 'jij-en-anderen',
    title: 'Jij en anderen',
    lead: 'Hetzelfde patroon, nu in gezelschap. Dezelfde scores als in deel 1, maar gelezen op wat ze met anderen doen — op werk, in vertrouwde kring, in een relatie.',
    ids: ['with-others', 'work-style', 'close-circle', 'relationship', 'communication', 'understood-by-others'],
  },
  {
    id: 'onder-druk-en-in-je-kracht',
    title: 'Onder druk en in je kracht',
    lead: 'Waar het patroon doorslaat. Dit zijn de zwaarste hoofdstukken van je rapport. Ze zijn geschreven om te lezen, niet om aan te komen — en als er iets niet klopt, weegt jouw ervaring zwaarder dan het cijfer.',
    ids: ['alone', 'stress', 'strengths', 'shadow', 'jungian', 'tensions', 'blind-spots'],
  },
  {
    id: 'groeien',
    title: 'Groeien',
    lead: 'Niet iemand anders worden, maar hetzelfde patroon met minder dwang. Wat je in deel 3 las als valkuil, staat hier als aanknopingspunt.',
    ids: ['who-you-can-become', 'what-you-need', 'growth-path', 'understand-yourself'],
  },
  {
    id: 'acht-beschouwingen',
    title: 'Acht beschouwingen',
    lead: 'Acht korte essays over liefde, haat, pijn, intuïtie, verdriet, tegenslag, geluk en blijdschap. Anders dan de rest van dit rapport: de openingen zijn algemeen, alleen de middenstukken zijn op jouw scores gekozen. Dat staat er per stuk bij.',
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
    lead: 'Vier weken, één stap per week, afgeleid uit het patroon dat bij jou het zwaarst weegt. En één zin om te onthouden.',
    ids: ['thirty-day-plan', 'final-sentence'],
  },
];
