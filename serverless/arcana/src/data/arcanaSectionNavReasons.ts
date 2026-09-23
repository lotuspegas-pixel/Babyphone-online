/**
 * Vaste tabel met een halve regel context per navigatierichting, onderaan elk
 * hoofdstuk (C §3.2, laag 3). Puur presentatie: geen scores, geen seed, geen
 * afhankelijkheid van het rapportobject — daarom telt dit niet mee in de
 * gouden master (de kaartnavigatie staat sowieso niet in de markdown-export).
 *
 * `forward` hoort bij de "volgende"-link vanuit déze sectie: waarom het
 * hoofdstuk erna de moeite waard is. `backward` hoort bij de "vorige"-link:
 * waar déze sectie op voortbouwt. Beide zijn optioneel — de eerste kaart
 * heeft geen `backward`, de laatste geen `forward`, en `ArcanaReportSection`
 * valt voor een ontbrekende reden terug op de kale titel (geen breuk in de
 * bestaande anker-/toetsenbordwerking).
 *
 * De volgorde volgt exact `SECTION_GROUPS` in arcanaSectionGroups.ts: die
 * twee bestanden horen bij elkaar, maar deze tabel importeert de andere niet
 * (voorkomt een cirkelvormige aanname over volgorde — de reden hoort bij het
 * hoofdstukpaar, niet bij een index).
 */
export interface ArcanaSectionNavReason {
  forward?: string;
  backward?: string;
}

export const SECTION_NAV_REASONS: Record<string, ArcanaSectionNavReason> = {
  'who-you-are': {
    forward: 'dezelfde kern, nu vanuit de twaalf hoofddimensies bekeken.',
  },
  'core-pattern': {
    backward: 'de drie eigenschappen waar deze twaalf dimensies op teruggaan.',
    forward: 'hoe deze kern van buitenaf zichtbaar is.',
  },
  'seen-by-others': {
    backward: 'het kernpatroon waar dit zichtbare gedrag uit voortkomt.',
    forward: 'wat er onder dat zichtbare gedrag verborgen blijft.',
  },
  'hidden-inner-world': {
    backward: 'wat anderen aan de buitenkant wél al zien.',
    forward: 'hoe dit innerlijke patroon eruitziet zodra de druk eraf is.',
  },
  'at-ease': {
    backward: 'wat er meestal verborgen blijft, ook als je ontspannen bent.',
    forward: 'hetzelfde patroon, nu in gezelschap in plaats van alleen.',
  },
  'with-others': {
    backward: 'hoe je bent wanneer er niemand hoeft te kijken.',
    forward: 'hoe dit patroon zich vertaalt naar de werkvloer.',
  },
  'work-style': {
    backward: 'hoe je in bredere sociale situaties overkomt.',
    forward: 'hetzelfde patroon bij de mensen die je het langst kennen.',
  },
  'close-circle': {
    backward: 'hoe je dit patroon meeneemt naar je werk.',
    forward: 'wat dit patroon doet zodra het om een relatie gaat.',
  },
  relationship: {
    backward: 'hoe je dit patroon toont bij familie en vrienden.',
    forward: 'hoe dit relatiepatroon doorwerkt in wat je wel en niet zegt.',
  },
  communication: {
    backward: 'het relatiepatroon dat deze manier van communiceren kleurt.',
    forward: 'een korte uitleg die je aan iemand anders kunt geven.',
  },
  'understood-by-others': {
    backward: 'de manier van communiceren die dit hoofdstuk toelicht.',
    forward: 'waar dit patroon vandaan komt: hoe je bent zonder gezelschap.',
  },
  alone: {
    backward: 'de korte uitleg die je hiervoor aan iemand anders zou kunnen geven.',
    forward: 'hoe ditzelfde patroon verandert zodra de druk toeneemt.',
  },
  stress: {
    backward: 'hoe je bent wanneer er geen druk op staat.',
    forward: 'wat er overblijft als de druk weer wegvalt: je sterke kant.',
  },
  strengths: {
    backward: 'hoe diezelfde eigenschappen zich gedragen onder druk.',
    forward: 'dezelfde eigenschappen, nu vanaf de kant waar ze tegen je gaan werken.',
  },
  shadow: {
    backward: 'de sterke kant van precies dezelfde eigenschappen.',
    forward: 'hoe deze valkuilen passen in een dieper patroon van persona en schaduw.',
  },
  jungian: {
    backward: 'de valkuilen die dit patroon in de praktijk laat zien.',
    forward: 'waar deze schaduwkant tegenover een andere behoefte komt te staan.',
  },
  tensions: {
    backward: 'de laag van persona en schaduw waar deze spanning uit voortkomt.',
    forward: 'wat je door deze spanning wellicht niet meer van jezelf ziet.',
  },
  'blind-spots': {
    backward: 'de spanningsvelden die deze blinde vlekken vaak veroorzaken.',
    forward: 'wat je met dit patroon kunt, nu je het scherper ziet.',
  },
  'who-you-can-become': {
    backward: 'de blinde vlekken die groei op dit vlak nu nog lastig maken.',
    forward: 'wat daarvoor concreet nodig is.',
  },
  'what-you-need': {
    backward: 'waar je naartoe kunt groeien als dit er eenmaal is.',
    forward: 'hoe je dat in stappen aanpakt.',
  },
  'growth-path': {
    backward: 'wat je onderweg nodig hebt om dit vol te houden.',
    forward: 'hoe je dit patroon bij jezelf blijft herkennen, ook zonder dit rapport.',
  },
  'understand-yourself': {
    backward: 'het groeipad waar deze zelfkennis het bruikbaarst is.',
    forward: 'acht kortere beschouwingen, losser verbonden aan je scores.',
  },
  'reflectie-liefde': {
    backward: 'hoe je deze zelfkennis breder kunt inzetten.',
    forward: 'een beschouwing over het gevoel dat er vaak tegenover lijkt te staan.',
  },
  'reflectie-haat': {
    backward: 'de beschouwing over liefde, met dezelfde opzet.',
    forward: 'waar dit gevoel vaak vandaan blijkt te komen.',
  },
  'reflectie-pijn': {
    backward: 'het gevoel dat hier vaak een reactie op is.',
    forward: 'een ander register: niet wat je voelt, maar wat je aanvoelt.',
  },
  'reflectie-intuitie': {
    backward: 'de beschouwing over wat er gebeurt als het wél pijn doet.',
    forward: 'weer een gevoel, ditmaal een dat zich moeilijker laat wegdrukken.',
  },
  'reflectie-verdriet': {
    backward: 'de beschouwing over wat je aanvoelt nog vóórdat je het voelt.',
    forward: 'wat er gebeurt als dit gevoel een aanleiding krijgt van buitenaf.',
  },
  'reflectie-tegenslagen': {
    backward: 'het gevoel dat na een tegenslag vaak overblijft.',
    forward: 'de andere kant: niet wat tegenzit, maar wat lukt.',
  },
  'reflectie-geluk': {
    backward: 'hoe je met tegenslag omgaat wanneer die je overkomt.',
    forward: 'een verwant gevoel, net iets korter en directer.',
  },
  'reflectie-blijdschap': {
    backward: 'de beschouwing over het bredere gevoel waar dit een moment van is.',
    forward: 'van beschouwen naar doen: één stap per week.',
  },
  'thirty-day-plan': {
    backward: 'acht beschouwingen die losser aan je scores hangen dan de rest van dit rapport.',
    forward: 'het hele rapport samengevat in één zin om te onthouden.',
  },
  'final-sentence': {
    backward: 'de vier weken waarin je dit patroon in de praktijk kunt oefenen.',
  },
};
