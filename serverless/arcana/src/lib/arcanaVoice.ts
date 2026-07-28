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

/** Vervoegde werkwoorden die in deze teksten direct achter "je" kunnen staan. */
const VERBS_AFTER_SUBJECT = new Set([
  'ben', 'bent', 'was', 'wordt', 'werd', 'blijft', 'bleef',
  'hebt', 'heb', 'had', 'krijgt', 'kreeg', 'geeft', 'gaf',
  'kunt', 'kan', 'kon', 'wilt', 'wil', 'wilde', 'moet', 'moest',
  'mag', 'mocht', 'zult', 'zal', 'zou', 'gaat', 'ging', 'doet', 'deed',
  'zegt', 'zei', 'vraagt', 'vroeg', 'antwoordt', 'praat', 'spreekt', 'benoemt',
  'voelt', 'voelde', 'merkt', 'merkte', 'ziet', 'zag', 'hoort', 'hoorde',
  'denkt', 'dacht', 'weet', 'wist', 'begrijpt', 'snapt', 'herkent', 'ontdekt',
  'vindt', 'vond', 'zoekt', 'zocht', 'kiest', 'koos', 'beslist', 'besluit',
  'maakt', 'maakte', 'bouwt', 'schrijft', 'leest', 'werkt', 'werkte',
  'neemt', 'nam', 'pakt', 'grijpt', 'houdt', 'hield', 'laat', 'liet',
  'trekt', 'trok', 'duwt', 'draagt', 'droeg', 'legt', 'zet', 'stelt', 'stelde',
  'begint', 'begon', 'stopt', 'eindigt', 'wacht', 'wachtte', 'blijkt',
  'raakt', 'raakte', 'reageert', 'reageerde', 'handelt', 'beweegt',
  'verdedigt', 'vermijdt', 'ontwijkt', 'negeert', 'uitstelt', 'twijfelt',
  'helpt', 'hielp', 'zorgt', 'zorgde', 'geniet', 'lacht', 'huilt',
  'leert', 'leerde', 'groeit', 'verandert', 'ontwikkelt', 'oefent',
  'verliest', 'verloor', 'wint', 'won', 'faalt', 'slaagt', 'lukt',
  'probeert', 'probeerde', 'durft', 'dorst', 'waagt', 'riskeert',
  'past', 'paste', 'schikt', 'buigt', 'zwijgt', 'zweeg', 'luistert',
  'analyseert', 'observeert', 'plant', 'organiseert', 'regelt', 'controleert',
  'presteert', 'levert', 'verwacht', 'hoopt', 'verlangt', 'mist', 'miste',
  'vertrouwt', 'wantrouwt', 'twijfelde', 'aarzelt', 'kijkt', 'keek',
  'staat', 'stond', 'zit', 'zat', 'ligt', 'lag', 'loopt', 'liep',
  'komt', 'kwam', 'gaat', 'vertrekt', 'blijft', 'keert', 'stapt',
  'herstelt', 'ademt', 'rust', 'slaapt', 'droomt', 'denkt',
]);

/**
 * Bijwoorden en partikels die tussen onderwerp en werkwoord kunnen staan
 * ("je niet meer weet", "je vaak merkt").
 */
const ADVERBS_AFTER_SUBJECT = new Set([
  'niet', 'nooit', 'altijd', 'vaak', 'soms', 'zelden', 'meestal', 'steeds',
  'al', 'nog', 'ooit', 'weer', 'toch', 'juist', 'ook', 'zelfs', 'echt',
  'liever', 'graag', 'eerst', 'daarna', 'later', 'eerder', 'sneller',
  'langer', 'harder', 'beter', 'minder', 'meer', 'te', 'zo', 'er', 'hem',
  'haar', 'ze', 'het', 'dat', 'dit', 'iets', 'niets', 'iemand', 'niemand',
]);

function replaceJe(next: string): string {
  const lowered = next.toLowerCase();
  const isSubject = VERBS_AFTER_SUBJECT.has(lowered) || ADVERBS_AFTER_SUBJECT.has(lowered);
  return isSubject ? 'u' : 'uw';
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
