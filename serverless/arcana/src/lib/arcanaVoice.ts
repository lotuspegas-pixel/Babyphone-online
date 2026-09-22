import type { AddressForm, ArcanaProfile } from '../types/arcana';

/**
 * Alle bronteksten in dit project zijn geschreven in de je-vorm. Wie liever met "u"
 * wordt aangesproken, krijgt dezelfde teksten via een grammaticale omzetting.
 *
 * Het lastige geval is "je": dat is zowel onderwerp ("je voelt" -> "u voelt") als
 * bezittelijk ("je grens" -> "uw grens"). We beslissen op basis van het woord erna:
 * staat daar een vervoegd werkwoord of een bijwoord dat typisch tussen onderwerp en
 * werkwoord valt, dan is het een onderwerp; anders behandelen we het als bezittelijk.
 */

/**
 * De beslisregel, na een telling over alle bronteksten.
 *
 * In het Nederlands is een woord dat direct op "je" volgt en op -t, -te of -de
 * eindigt vrijwel altijd een vervoegd werkwoord ("je voelt", "je wegduwt",
 * "je durfde"). Van de 273 zulke woorden in deze teksten zijn er ruim 200
 * werkwoord. Daarom is dat de standaard, en houden we de uitzonderingen bij —
 * dat is een korte, stabiele lijst in plaats van een werkwoordenlijst die bij
 * elke nieuwe zin incompleet raakt.
 *
 * Eerder stond die regel andersom. Gevolg: "Hoe je bent wanneer je alleen bent"
 * werd "Hoe u bent wanneer uw alleen bent", en dat stond live.
 */

/** Zelfstandige naamwoorden, bijvoeglijke naamwoorden en bijwoorden op -t/-te/-de. */
const NON_VERB_T_WORDS = new Set([
  // zelfstandige naamwoorden
  'rapport', 'behoefte', 'kracht', 'inzet', 'overzicht', 'ruimte', 'scherpte',
  'portret', 'stabiliteit', 'houvast', 'liefde', 'identiteit', 'schaduwkant',
  'kwaliteit', 'standpunt', 'test', 'zoektocht', 'gemakzucht', 'aandacht',
  'impulsiviteit', 'onrust', 'moeite', 'diepte', 'verdriet', 'buurt', 'zijde',
  'inzicht', 'last', 'vertrouwensbehoefte', 'apparaat', 'contact', 'rust',
  'kant', 'punt', 'hart', 'gezicht', 'gevecht', 'licht', 'zicht', 'gebrek',
  'conflict', 'effect', 'moment', 'talent', 'geduld', 'gedrag',
  // Verbogen bijvoeglijke naamwoorden: die staan vóór een zelfstandig
  // naamwoord, dus "je <bijv.nw> <znw>" is bezit ("je oude patroon").
  'oude', 'vertrouwde', 'echte', 'afgeweerde', 'zoekende', 'volgende',
  'blinde', 'hetzelfde', 'eerste', 'beste', 'sterkste', 'grootste',
  'slechtste', 'meest', 'sterkst', 'volledige', 'hele', 'enige', 'huidige',
  'natuurlijke', 'emotionele', 'innerlijke', 'sociale', 'scherpe', 'kortere',
  'specifieke', 'automatische', 'nieuwe', 'rijke', 'hoge', 'werkelijke',
]);

/**
 * Onvervoegde en onregelmatige werkwoordsvormen die niet op -t eindigen en
 * dus niet door de hoofdregel gevangen worden.
 */
const IRREGULAR_VERBS = new Set([
  'is', 'ben', 'was', 'zijn', 'heb', 'had', 'kan', 'kon', 'wil', 'mag', 'mocht',
  'zal', 'zou', 'ga', 'ging', 'werd', 'bleef', 'kreeg', 'gaf', 'nam', 'zag',
  'wilde', 'moest', 'deed', 'zei', 'vroeg', 'hield', 'liet', 'trok', 'droeg',
  'hoorde', 'dacht', 'vond', 'zocht', 'koos', 'maakte', 'werkte', 'stond',
  'zat', 'lag', 'liep', 'kwam', 'keek', 'miste', 'raakte', 'voelde', 'merkte',
  'begon', 'stopte', 'wachtte', 'leerde', 'verloor', 'won', 'probeerde',
  'durfde', 'paste', 'zweeg', 'stelde', 'bouwde', 'las', 'schreef',
  'aanvoelde', 'antwoordde', 'beantwoordde', 'trokken', 'opving', 'oversloeg',
]);

/**
 * Bijwoorden en partikels die tussen onderwerp en werkwoord kunnen staan
 * ("je niet meer weet", "je vaak merkt").
 */
const ADVERBS_AFTER_SUBJECT = new Set([
  'niet', 'nooit', 'altijd', 'vaak', 'soms', 'zelden', 'meestal', 'steeds',
  'al', 'nog', 'weer', 'toch', 'ook', 'zelfs', 'liever', 'graag', 'daarna',
  'later', 'eerder', 'sneller', 'langer', 'harder', 'beter', 'minder', 'meer',
  'te', 'zo', 'er', 'hem', 'haar', 'ze', 'iets', 'niets', 'iemand', 'niemand',
  'nodig', 'nu', 'eigenlijk', 'vanbinnen', 'hierboven', 'snel', 'zeker',
  'momenteel', 'pas', 'even', 'weinig', 'daar', 'hier', 'die', 'deze', 'wel',
  'dus', 'misschien', 'waarschijnlijk', 'vaker', 'opnieuw', 'straks', 'meteen',
  'direct', 'vooral', 'alleen', 'samen', 'ergens', 'overal', 'nauwelijks',
  'amper', 'inmiddels', 'ondertussen', 'voortdurend', 'moeiteloos',
  'stilzwijgend', 'dagelijks', 'bovenmatig', 'vrijwel', 'vrijwillig',
  'onafhankelijk', 'makkelijker', 'hiermee', 'ervoor', 'ervan', 'erom',
  'erover', 'erbij', 'erop', 'eromheen', 'daardoor', 'daaraan', 'achteraf',
  'halverwege', 'uiteindelijk', 'vanzelf', 'toen', 'verder', 'lang', 'allebei',
  'goed', 'hard', 'diep', 'hoog', 'laag', 'vroeg', 'duidelijk', 'rustig',
  'stil', 'open', 'lastig', 'zwaar', 'vol', 'half', 'bijna', 'haast',
  'ongeveer', 'redelijk', 'behoorlijk', 'nogal', 'erg', 'heel', 'veel',
  'genoeg', 'voldoende', 'precies', 'warm', 'zwak', 'sterker', 'trager',
  'lastiger', 'gevoelig', 'kwetsbaar', 'schuldig', 'fijn', 'prettig',
  'normaal', 'speels', 'grappig', 'aardig', 'bezig', 'waard', 'enkel',
  'nieuwsgierig', 'ongeduldig', 'toegankelijk', 'onbereikbaar', 'actief',
  'zelfstandig', 'vrij', 'bovengemiddeld', 'overmatig', 'droogkomisch',
  // Voornaamwoorden, voegwoorden en bijwoorden die tussen onderwerp en
  // werkwoord kunnen staan: "denk je dat het klopt", "wil je eerst gelijk".
  'het', 'dat', 'dit', 'wat', 'omdat', 'juist', 'eerst', 'best', 'echt',
  'net', 'ooit', 'ongemerkt', 'impliciet', 'oprecht', 'vlot', 'bewust',
  'alert', 'uitgeput', 'verstrikt', 'gevraagd', 'gedaan', 'geworden',
  'gebleven', 'vergeten', 'bedoeld', 'vastgesteld', 'vastgelopen',
  'aangevallen', 'overladen', 'uitgeput',
]);

/**
 * Voorzetsels en scheidbare partikels. Deze kunnen nooit het bezit inleiden dat
 * een bezittelijk "je" zou aankondigen: in "een eerlijker versie van je naar
 * boven" is "je" het voorwerp van "van", niet de bezitter van "naar".
 */
const PARTICLES_AFTER_OBJECT = new Set([
  'naar', 'toe', 'heen', 'vandaan', 'af', 'aan', 'uit', 'op', 'in', 'om',
  'door', 'over', 'langs', 'tegen', 'weg', 'terug', 'mee', 'bij', 'voorbij',
  'binnen', 'buiten', 'omhoog', 'omlaag', 'vooruit', 'achteruit',
  'van', 'met', 'voor', 'onder', 'als', 'tot', 'na', 'zonder', 'tussen',
  'achter', 'naast', 'terwijl', 'zodra', 'wanneer', 'hoewel', 'dan', 'neer',
]);

/** True wanneer "je" hier onderwerp of voorwerp is, en dus "u" wordt. */
export function jeIsSubjectOrObject(next: string): boolean {
  // "op basis van je 120 antwoorden" — een telwoord kondigt bezit aan.
  if (/^\d/.test(next.trim())) return false;
  const w = next.toLowerCase().replace(/[^a-zà-ÿ']/g, '');
  if (!w) return true;
  if (NON_VERB_T_WORDS.has(w)) return false;
  if (ADVERBS_AFTER_SUBJECT.has(w) || PARTICLES_AFTER_OBJECT.has(w)) return true;
  if (IRREGULAR_VERBS.has(w)) return true;
  // Alleen -t. Vormen op -te en -de zijn óf verleden tijd — die staan hierboven
  // met name genoemd — óf een verbogen bijvoeglijk naamwoord ("je goede
  // oordeel"), en dan zou deze regel juist de fout maken die we net opruimden.
  return /t$/.test(w);
}

function replaceJe(next: string): string {
  return jeIsSubjectOrObject(next) ? 'u' : 'uw';
}

/** Onregelmatige inversievormen: "kun je" → "kunt u". */
const INVERSION_IRREGULAR: Record<string, string> = {
  kun: 'kunt', zul: 'zult', wil: 'wilt', ben: 'bent', heb: 'hebt',
  ga: 'gaat', sta: 'staat', doe: 'doet', zie: 'ziet', weet: 'weet',
  moet: 'moet', mag: 'mag', laat: 'laat', is: 'is',
};

/**
 * Werkwoordsstammen die in deze teksten vóór "je" staan. Geteld over alle
 * bronteksten; een stam die hier ontbreekt levert "voel u" in plaats van
 * "voelt u" op, en de test in arcanaVoice.test.ts bewaakt dat.
 */
const INVERSION_STEMS = new Set([
  'voel', 'geef', 'neem', 'lees', 'herken', 'hoef', 'trek', 'leef', 'kom',
  'twijfel', 'verlies', 'klik', 'wis', 'deel', 'raak', 'breng', 'versnel',
  'inspireer', 'vertrouw', 'word', 'zoek', 'lijk', 'reageer', 'stem', 'houd',
  'merk', 'bewaar', 'spreek', 'gebruik', 'krijg', 'noem', 'verwerk',
  'motiveer', 'draai', 'speel', 'blijf', 'broed', 'grijp', 'zeg', 'vermijd',
  'val', 'leer', 'schuif', 'benoem', 'bekijk', 'benut', 'steun', 'draag',
  'sleep', 'torst', 'hoor', 'vind', 'vraag', 'stel', 'denk', 'veroordeel',
  'put', 'zet', 'werk', 'land', 'pas', 'open', 'verwijder', 'download',
]);

/**
 * Geeft de u-vorm van een werkwoord dat in inversie vóór "je" stond, of null
 * wanneer dit woord geen werkwoord is.
 */
function conjugateForInversion(word: string): string | null {
  if (word in INVERSION_IRREGULAR) return INVERSION_IRREGULAR[word];
  if (INVERSION_STEMS.has(word)) return word + 't';
  return null;
}

function preserveCase(source: string, replacement: string): string {
  if (source[0] === source[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

/** Zet een tekst in de je-vorm om naar de u-vorm. */
export function toFormal(text: string): string {
  let result = text;

  // Samengestelde vormen eerst, zodat losse vervangingen ze niet stukmaken.
  result = result.replace(/\bjezelf\b/gi, (m) => preserveCase(m, 'uzelf'));
  result = result.replace(/\bjouw\b/gi, (m) => preserveCase(m, 'uw'));
  result = result.replace(/\bjou\b/gi, (m) => preserveCase(m, 'u'));
  result = result.replace(/\bjij\b/gi, (m) => preserveCase(m, 'u'));

  // "je" met een volgend woord: onderwerp of bezittelijk.
  result = result.replace(/\b(je)\b(\s+)([\wÀ-ÿ'-]+)/gi, (_full, je: string, space: string, next: string) => {
    const replacement = preserveCase(je, replaceJe(next));
    return `${replacement}${space}${next}`;
  });

  // "je" aan het eind van een zin of voor leesteken: behandel als onderwerp.
  result = result.replace(/\bje\b/gi, (m) => preserveCase(m, 'u'));

  // Inversie: in het Nederlands verliest de tweede persoon enkelvoud zijn -t
  // wanneer het onderwerp achter het werkwoord staat ("jij voelt" → "voel je").
  // In de u-vorm bestaat die regel niet, dus de -t moet terug: "voel je" wordt
  // "voelt u", niet "voel u". Dit gebeurt pas nadat hierboven is vastgesteld
  // dat "je" hier het onderwerp was — bij bezit ("lees je rapport" → "lees uw
  // rapport") blijft de gebiedende wijs staan, en dat is juist.
  result = result.replace(/\b([a-zà-ÿ]+)(\s+)(u)\b/gi, (full, verb: string, space: string, u: string) => {
    const conjugated = conjugateForInversion(verb.toLowerCase());
    if (!conjugated) return full;
    return `${preserveCase(verb, conjugated)}${space}${u}`;
  });

  // Hoofdletters herstellen na een zinseinde. Niet aan het begin van de string:
  // veel bronteksten zijn zinsdelen die bewust met een kleine letter beginnen.
  result = result.replace(/([.!?]\s+)(u|uw)\b/g, (_m, prefix: string, word: string) => {
    return `${prefix}${word[0].toUpperCase()}${word.slice(1)}`;
  });

  return result;
}

/** Past de gekozen aanspreekvorm toe op een tekst. */
export function applyVoice(text: string, addressForm: AddressForm): string {
  return addressForm === 'u' ? toFormal(text) : text;
}

/** Het juiste bezittelijk voornaamwoord voor deze aanspreekvorm ("je" of "uw"). */
export function possessive(addressForm: AddressForm): string {
  return addressForm === 'u' ? 'uw' : 'je';
}

/** Het juiste persoonlijk voornaamwoord als onderwerp ("je" of "u"). */
export function subject(addressForm: AddressForm): string {
  return addressForm === 'u' ? 'u' : 'je';
}

/** Nadrukkelijke onderwerpsvorm ("jij" of "u"). */
export function emphaticSubject(addressForm: AddressForm): string {
  return addressForm === 'u' ? 'u' : 'jij';
}

/** Wederkerend voornaamwoord ("jezelf" of "uzelf"). */
export function reflexive(addressForm: AddressForm): string {
  return addressForm === 'u' ? 'uzelf' : 'jezelf';
}

/** Een veilige weergavenaam: leeg profiel valt terug op een neutrale aanhef. */
export function displayName(profile: ArcanaProfile): string {
  const trimmed = profile.name.trim();
  return trimmed.length > 0 ? trimmed : '';
}

/**
 * Bouwt een aanhef. Met naam: "Sam,". Zonder naam: lege string, zodat
 * aanroepende code de zin zonder aanhef kan opbouwen.
 */
export function salutation(profile: ArcanaProfile): string {
  const name = displayName(profile);
  return name.length > 0 ? name : '';
}
