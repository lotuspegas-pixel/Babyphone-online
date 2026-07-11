import type {
  ArcanaQuestion,
  ForcedChoiceQuestion,
  LikertQuestion,
  RankingQuestion,
  ScenarioQuestion,
  SubDimensionId,
} from '../types/arcana';

function likert(id: string, text: string, targets: SubDimensionId[]): LikertQuestion {
  return { id, type: 'likert', text, targets };
}

const LIKERT_QUESTIONS: LikertQuestion[] = [
  likert('L01', 'Ik merk vaak eerder dan anderen wanneer de sfeer in een ruimte verandert.', ['emotionalSensitivity', 'intuitiveThinking', 'connectionNeed']),
  likert('L02', 'Ik denk vaak al drie stappen vooruit voordat anderen doorhebben wat er speelt.', ['analyticalThinking', 'intuitiveThinking', 'controlNeed']),
  likert('L03', 'Als iets geen betekenis heeft, verlies ik snel energie.', ['meaningNeed', 'autonomyNeed', 'creativeThinking']),
  likert('L04', 'Een duidelijk plan geeft mij rust.', ['securityNeed', 'controlNeed', 'practicalThinking']),
  likert('L05', 'Ik voel weerstand wanneer iemand te veel bepaalt hoe ik iets moet doen.', ['autonomyNeed', 'independenceNeed', 'directness']),
  likert('L06', 'Kritiek blijft bij mij langer hangen dan ik aan anderen laat merken.', ['criticismSensitivity', 'selfDoubt', 'emotionalSensitivity']),
  likert('L07', 'Als niemand verantwoordelijkheid neemt, voel ik snel dat ik iets moet doen.', ['controlNeed', 'practicalThinking', 'selfConfidence']),
  likert('L08', 'Ik laat vaak minder zien van mijn stress dan ik werkelijk voel.', ['stressWithdrawal', 'emotionalSensitivity', 'shadowAvoidance']),
  likert('L09', 'Ik wil graag gewaardeerd worden, maar ik vraag daar niet makkelijk om.', ['recognitionNeed', 'selfDoubt', 'connectionNeed']),
  likert('L10', 'Na veel sociale prikkels heb ik tijd alleen nodig om mezelf terug te vinden.', ['solitudeNeed', 'emotionalSensitivity', 'stressWithdrawal']),
  likert('L11', 'Ik zie snel verbanden tussen dingen die anderen los van elkaar zien.', ['intuitiveThinking', 'creativeThinking', 'analyticalThinking']),
  likert('L12', 'Ik begin soms liever gewoon dan dat ik alles eerst volledig uitzoek.', ['creativeThinking', 'autonomyNeed', 'practicalThinking']),
  likert('L13', 'Ik voel me snel verantwoordelijk voor de emoties van anderen.', ['peoplePleasing', 'connectionNeed', 'emotionalSensitivity']),
  likert('L14', 'Spanning tussen mensen kan mij meer energie kosten dan ik wil toegeven.', ['conflictAvoidance', 'emotionalSensitivity', 'stressWithdrawal']),
  likert('L15', 'Ik kan direct zijn als ik vind dat iets eerlijk gezegd moet worden.', ['directness', 'selfConfidence', 'autonomyNeed']),
  likert('L16', 'Na een keuze blijf ik soms twijfelen of ik het juiste heb gedaan.', ['selfDoubt', 'controlNeed', 'criticismSensitivity']),
  likert('L17', 'Ik doe soms extra mijn best omdat ik hoop dat iemand het ziet.', ['recognitionNeed', 'perfectionism', 'peoplePleasing']),
  likert('L18', 'Ik vind het lastig om afhankelijk te zijn van anderen.', ['independenceNeed', 'trustNeed', 'controlNeed']),
  likert('L19', 'Ik wil graag weten waar ik aan toe ben voordat ik mij ergens aan verbind.', ['securityNeed', 'trustNeed', 'controlNeed']),
  likert('L20', 'Ik kan goed improviseren als de situatie daarom vraagt.', ['creativeThinking', 'selfConfidence', 'practicalThinking']),
  likert('L21', 'Ik analyseer soms gesprekken of berichten achteraf te lang.', ['analyticalThinking', 'criticismSensitivity', 'selfDoubt']),
  likert('L22', 'Mensen komen vaak bij mij terecht als ze iets willen delen.', ['connectionNeed', 'emotionalSensitivity', 'intimacyNeed']),
  likert('L23', 'Ik raak ongeduldig wanneer mensen traag of vaag blijven.', ['directness', 'practicalThinking', 'stressAcceleration']),
  likert('L24', 'Iemand teleurstellen voelt voor mij zwaarder dan ik zou willen.', ['peoplePleasing', 'criticismSensitivity', 'connectionNeed']),
  likert('L25', 'Ik vertrouw iets sneller als ik bewijs, structuur of logica zie.', ['analyticalThinking', 'controlNeed', 'securityNeed']),
  likert('L26', 'Mijn eerste gevoel over mensen of situaties blijkt vaak later te kloppen.', ['intuitiveThinking', 'emotionalSensitivity', 'trustNeed']),
  likert('L27', 'Als iets belangrijk voor mij is, kan ik zeer volhardend zijn.', ['selfConfidence', 'perfectionism', 'meaningNeed']),
  likert('L28', 'Ik vermijd soms vragen over wat ik echt voel.', ['shadowAvoidance', 'stressWithdrawal', 'trustNeed']),
  likert('L29', 'Ik test soms eerst of iemand veilig genoeg is voordat ik mij open.', ['trustNeed', 'intimacyNeed', 'conflictAvoidance']),
  likert('L30', 'Ik verlang naar gesprekken die verder gaan dan de oppervlakte.', ['meaningNeed', 'intimacyNeed', 'solitudeNeed']),
  likert('L31', 'Als het nodig is, kan ik zichtbaar en overtuigend aanwezig zijn.', ['socialEnergy', 'recognitionNeed', 'selfConfidence']),
  likert('L32', 'Onder druk word ik eerder stiller dan drukker.', ['stressWithdrawal', 'solitudeNeed', 'shadowAvoidance']),
  likert('L33', 'Onder druk probeer ik meer grip te krijgen op de situatie.', ['stressControl', 'controlNeed', 'analyticalThinking']),
  likert('L34', 'Onder druk ga ik soms versnellen en te veel tegelijk doen.', ['stressAcceleration', 'recognitionNeed', 'controlNeed']),
  likert('L35', 'Onder druk kan ik vastlopen terwijl mijn hoofd juist heel actief is.', ['stressFreeze', 'selfDoubt', 'emotionalSensitivity']),
  likert('L36', 'Ik help vaak al voordat iemand het expliciet vraagt.', ['peoplePleasing', 'connectionNeed', 'emotionalSensitivity']),
  likert('L37', 'Complimenten geloof ik niet altijd meteen.', ['selfDoubt', 'recognitionNeed', 'criticismSensitivity']),
  likert('L38', 'Ik verberg kwetsbaarheid soms achter humor, ratio of afstand.', ['shadowAvoidance', 'analyticalThinking', 'stressWithdrawal']),
  likert('L39', 'Ik heb weleens spijt dat ik niet eerder heb gezegd wat ik echt vond.', ['conflictAvoidance', 'selfDoubt', 'directness']),
  likert('L40', 'Ik wil iets bouwen of doen dat echt betekenis heeft.', ['meaningNeed', 'creativeThinking', 'autonomyNeed']),
  likert('L41', 'Ritme en routine helpen mij om rust te houden.', ['securityNeed', 'practicalThinking', 'controlNeed']),
  likert('L42', 'Te veel mogelijkheden tegelijk kunnen mij blokkeren.', ['stressFreeze', 'controlNeed', 'selfDoubt']),
  likert('L43', 'Ik krijg energie van nieuwe ideeën, beelden of mogelijkheden.', ['creativeThinking', 'intuitiveThinking', 'autonomyNeed']),
  likert('L44', "Ik merk snel wanneer iemands woorden en gedrag niet overeenkomen.", ['intuitiveThinking', 'emotionalSensitivity', 'analyticalThinking']),
  likert('L45', 'Ik werk vaak het beste wanneer ik ongestoord mijn eigen tempo kan volgen.', ['solitudeNeed', 'autonomyNeed', 'practicalThinking']),
  likert('L46', 'Ik krijg energie van mensen wanneer er enthousiasme of beweging ontstaat.', ['socialEnergy', 'recognitionNeed', 'creativeThinking']),
  likert('L47', 'Oppervlakkigheid put mij sneller uit dan drukte.', ['meaningNeed', 'intimacyNeed', 'solitudeNeed']),
  likert('L48', 'Deadlines helpen mij om ideeën af te maken.', ['practicalThinking', 'controlNeed', 'stressAcceleration']),
  likert('L49', 'Ik vind het lastig om iets half of slordig af te leveren.', ['perfectionism', 'criticismSensitivity', 'controlNeed']),
  likert('L50', 'Grenzen aangeven lukt mij meestal pas als iets echt te veel wordt.', ['peoplePleasing', 'conflictAvoidance', 'selfDoubt']),
  likert('L51', 'Mijn hoofd blijft vaak doorgaan, ook als mijn lichaam rust nodig heeft.', ['analyticalThinking', 'stressAcceleration', 'emotionalSensitivity']),
  likert('L52', 'Ik zie vaak hoe systemen, mensen of processen beter kunnen werken.', ['analyticalThinking', 'practicalThinking', 'creativeThinking']),
  likert('L53', 'De stemming van anderen kan mijn eigen stemming beïnvloeden.', ['emotionalSensitivity', 'connectionNeed', 'peoplePleasing']),
  likert('L54', 'Als ik loyaal ben aan iemand, geef ik niet snel op.', ['connectionNeed', 'trustNeed', 'peoplePleasing']),
  likert('L55', 'Wanneer ik mij aangevallen voel, neem ik eerst afstand.', ['stressWithdrawal', 'criticismSensitivity', 'trustNeed']),
  likert('L56', 'Als ik onzeker ben, ga ik vaak harder mijn best doen.', ['perfectionism', 'selfDoubt', 'recognitionNeed']),
  likert('L57', 'Ik kies soms voor harmonie terwijl ik eigenlijk iets anders wil.', ['conflictAvoidance', 'peoplePleasing', 'connectionNeed']),
  likert('L58', 'Ik vind het belangrijk dat mijn bijdrage impact heeft.', ['recognitionNeed', 'meaningNeed', 'selfConfidence']),
  likert('L59', 'Taken zonder duidelijk nut voelen zwaar voor mij.', ['meaningNeed', 'autonomyNeed', 'practicalThinking']),
  likert('L60', 'Ik stel moeilijke keuzes soms uit omdat ik eerst meer helderheid wil.', ['shadowAvoidance', 'controlNeed', 'selfDoubt']),
  likert('L61', 'Ik voel mij sterker wanneer iemand mij echt vertrouwt.', ['trustNeed', 'connectionNeed', 'selfConfidence']),
  likert('L62', 'Ik heb moeite met autoriteit wanneer die oneerlijk of onlogisch voelt.', ['autonomyNeed', 'directness', 'analyticalThinking']),
  likert('L63', 'Perfectionisme vertraagt mij soms meer dan ik wil.', ['perfectionism', 'selfDoubt', 'controlNeed']),
  likert('L64', 'Ik kan anderen enthousiast maken voor een idee.', ['socialEnergy', 'creativeThinking', 'recognitionNeed']),
  likert('L65', 'Ik observeer vaak eerst voordat ik mij volledig laat zien.', ['solitudeNeed', 'trustNeed', 'intuitiveThinking']),
  likert('L66', "Bij grote veranderingen wil ik eerst weten wat de risico's zijn.", ['securityNeed', 'controlNeed', 'analyticalThinking']),
  likert('L67', 'Ik kies soms voor de behoefte van de ander boven mijn eigen behoefte.', ['peoplePleasing', 'connectionNeed', 'conflictAvoidance']),
  likert('L68', 'Ik kan emotie tijdelijk parkeren als er een probleem opgelost moet worden.', ['analyticalThinking', 'practicalThinking', 'stressControl']),
  likert('L69', 'Ik vraag niet snel om hulp, ook als ik die eigenlijk nodig heb.', ['independenceNeed', 'selfDoubt', 'shadowAvoidance']),
  likert('L70', 'Ik wil begrepen worden zonder alles steeds te hoeven uitleggen.', ['intimacyNeed', 'criticismSensitivity', 'emotionalSensitivity']),
  likert('L71', 'Ik voel mij ongemakkelijk wanneer ik geen duidelijke rol heb.', ['securityNeed', 'recognitionNeed', 'controlNeed']),
  likert('L72', 'Ik ben bereid om naar mijn eigen patronen te kijken, ook als dat confronterend is.', ['growthReadiness', 'selfConfidence', 'meaningNeed']),
];

function fc(
  id: string,
  text: string,
  options: [string, string, SubDimensionId[]][],
): ForcedChoiceQuestion {
  return {
    id,
    type: 'forcedChoice',
    text,
    options: options.map(([key, optText, targets]) => ({ key, text: optText, targets })),
  };
}

const FORCED_CHOICE_QUESTIONS: ForcedChoiceQuestion[] = [
  fc('FC01', 'Wat past beter bij jou?', [
    ['A', 'Ik zeg liever duidelijk wat ik vind.', ['directness', 'selfConfidence']],
    ['B', 'Ik bewaak liever de sfeer.', ['conflictAvoidance', 'peoplePleasing']],
  ]),
  fc('FC02', 'Wat voelt natuurlijker?', [
    ['A', 'Eerst begrijpen wat logisch klopt.', ['analyticalThinking', 'controlNeed']],
    ['B', 'Eerst voelen wat innerlijk klopt.', ['intuitiveThinking', 'emotionalSensitivity']],
  ]),
  fc('FC03', 'Wat heb je sterker nodig?', [
    ['A', 'Vrijheid om je eigen richting te kiezen.', ['autonomyNeed', 'independenceNeed']],
    ['B', 'Zekerheid dat de basis klopt.', ['securityNeed', 'controlNeed']],
  ]),
  fc('FC04', 'Wat raakt jou dieper?', [
    ['A', 'Niet gezien worden.', ['recognitionNeed', 'criticismSensitivity']],
    ['B', 'Niet vrij gelaten worden.', ['autonomyNeed', 'independenceNeed']],
  ]),
  fc('FC05', 'Wat doe je sneller onder druk?', [
    ['A', 'Meer controleren.', ['stressControl', 'controlNeed']],
    ['B', 'Meer terugtrekken.', ['stressWithdrawal', 'solitudeNeed']],
    ['C', 'Meer versnellen.', ['stressAcceleration', 'perfectionism']],
    ['D', 'Vastlopen.', ['stressFreeze', 'selfDoubt']],
  ]),
  fc('FC06', 'Wat kost jou meer energie?', [
    ['A', 'Te veel mensen.', ['solitudeNeed', 'emotionalSensitivity']],
    ['B', 'Te weinig betekenis.', ['meaningNeed', 'autonomyNeed']],
    ['C', 'Te weinig structuur.', ['securityNeed', 'controlNeed']],
    ['D', 'Te veel conflict.', ['conflictAvoidance', 'peoplePleasing']],
  ]),
  fc('FC07', 'Wat wil je liever vermijden?', [
    ['A', 'Iemand teleurstellen.', ['peoplePleasing', 'connectionNeed']],
    ['B', 'Jezelf verliezen.', ['independenceNeed', 'autonomyNeed']],
    ['C', 'Falen.', ['perfectionism', 'selfDoubt']],
    ['D', 'Afgewezen worden.', ['criticismSensitivity', 'trustNeed']],
  ]),
  fc('FC08', 'Wanneer voel je je het meest krachtig?', [
    ['A', 'Als ik richting geef.', ['directness', 'selfConfidence']],
    ['B', 'Als ik iets dieps begrijp.', ['meaningNeed', 'analyticalThinking']],
    ['C', 'Als ik iemand echt help.', ['connectionNeed', 'peoplePleasing']],
    ['D', 'Als ik iets nieuws creëer.', ['creativeThinking', 'autonomyNeed']],
  ]),
  fc('FC09', 'Wat past het meest?', [
    ['A', 'Ik wil het eerst zeker weten.', ['controlNeed', 'securityNeed']],
    ['B', 'Ik wil het eerst proberen.', ['practicalThinking', 'creativeThinking']],
  ]),
  fc('FC10', 'Waar vertrouw je meer op?', [
    ['A', 'Bewijs en analyse.', ['analyticalThinking', 'controlNeed']],
    ['B', 'Gevoel en patroonherkenning.', ['intuitiveThinking', 'emotionalSensitivity']],
  ]),
  fc('FC11', 'Wat vind je lastiger?', [
    ['A', 'Om hulp vragen.', ['independenceNeed', 'shadowAvoidance']],
    ['B', 'Nee zeggen.', ['peoplePleasing', 'conflictAvoidance']],
  ]),
  fc('FC12', 'Wat gebeurt er sneller?', [
    ['A', 'Ik neem te veel verantwoordelijkheid.', ['controlNeed', 'peoplePleasing']],
    ['B', 'Ik neem te veel afstand.', ['stressWithdrawal', 'independenceNeed']],
  ]),
  fc('FC13', 'Wat motiveert jou meer?', [
    ['A', 'Iets betekenen.', ['meaningNeed', 'connectionNeed']],
    ['B', 'Iets bereiken.', ['recognitionNeed', 'selfConfidence']],
    ['C', 'Iets begrijpen.', ['analyticalThinking', 'intuitiveThinking']],
    ['D', 'Iets vrij kunnen doen.', ['autonomyNeed', 'independenceNeed']],
  ]),
  fc('FC14', 'Wat past beter?', [
    ['A', 'Ik werk graag diep en gefocust.', ['solitudeNeed', 'analyticalThinking']],
    ['B', 'Ik werk graag actief en in beweging.', ['socialEnergy', 'stressAcceleration']],
  ]),
  fc('FC15', 'Wat gebeurt er bij kritiek?', [
    ['A', 'Ik verdedig mij sneller dan ik wil.', ['shadowDefensiveness', 'criticismSensitivity']],
    ['B', 'Ik trek mij terug.', ['stressWithdrawal', 'selfDoubt']],
    ['C', 'Ik ga harder mijn best doen.', ['perfectionism', 'recognitionNeed']],
    ['D', 'Ik onderzoek of het klopt.', ['analyticalThinking', 'growthReadiness']],
  ]),
  fc('FC16', 'Welke zin past beter?', [
    ['A', 'Ik wil ruimte.', ['autonomyNeed', 'independenceNeed']],
    ['B', 'Ik wil rust.', ['securityNeed', 'solitudeNeed']],
    ['C', 'Ik wil erkenning.', ['recognitionNeed', 'selfConfidence']],
    ['D', 'Ik wil verbinding.', ['connectionNeed', 'intimacyNeed']],
  ]),
  fc('FC17', 'Wat is vaker jouw valkuil?', [
    ['A', 'Te veel nadenken.', ['analyticalThinking', 'controlNeed']],
    ['B', 'Te veel voelen.', ['emotionalSensitivity', 'criticismSensitivity']],
    ['C', 'Te veel doen.', ['stressAcceleration', 'perfectionism']],
    ['D', 'Te lang vermijden.', ['shadowAvoidance', 'conflictAvoidance']],
  ]),
  fc('FC18', 'Wat geeft jou vertrouwen?', [
    ['A', 'Duidelijke afspraken.', ['securityNeed', 'trustNeed']],
    ['B', 'Eerlijke emoties.', ['intimacyNeed', 'emotionalSensitivity']],
    ['C', 'Logische onderbouwing.', ['analyticalThinking', 'controlNeed']],
    ['D', 'Vrijheid om zelf te kiezen.', ['autonomyNeed', 'independenceNeed']],
  ]),
  fc('FC19', 'Wat doe je als iets niet klopt?', [
    ['A', 'Ik benoem het.', ['directness', 'selfConfidence']],
    ['B', 'Ik observeer langer.', ['intuitiveThinking', 'trustNeed']],
    ['C', 'Ik zoek bewijs.', ['analyticalThinking', 'controlNeed']],
    ['D', 'Ik probeer de sfeer goed te houden.', ['peoplePleasing', 'conflictAvoidance']],
  ]),
  fc('FC20', 'Wat herken je het meest?', [
    ['A', 'Ik wil minder twijfelen.', ['selfDoubt', 'controlNeed']],
    ['B', 'Ik wil beter grenzen stellen.', ['peoplePleasing', 'conflictAvoidance']],
    ['C', 'Ik wil meer durven kiezen.', ['autonomyNeed', 'growthReadiness']],
    ['D', 'Ik wil rustiger omgaan met druk.', ['stressControl', 'stressAcceleration']],
  ]),
  fc('FC21', 'Wat is jouw natuurlijke rol?', [
    ['A', 'De denker.', ['analyticalThinking', 'solitudeNeed']],
    ['B', 'De voeler.', ['emotionalSensitivity', 'connectionNeed']],
    ['C', 'De bouwer.', ['practicalThinking', 'controlNeed']],
    ['D', 'De vernieuwer.', ['creativeThinking', 'autonomyNeed']],
  ]),
  fc('FC22', 'Wat irriteert jou sneller?', [
    ['A', 'Onechtheid.', ['intuitiveThinking', 'intimacyNeed']],
    ['B', 'Chaos.', ['controlNeed', 'securityNeed']],
    ['C', 'Traagheid.', ['practicalThinking', 'stressAcceleration']],
    ['D', 'Onrecht.', ['directness', 'emotionalSensitivity']],
  ]),
  fc('FC23', 'Wat is moeilijker?', [
    ['A', 'Loslaten.', ['controlNeed', 'perfectionism']],
    ['B', 'Beginnen.', ['stressFreeze', 'selfDoubt']],
    ['C', 'Stoppen.', ['stressAcceleration', 'recognitionNeed']],
    ['D', 'Uiten wat ik voel.', ['stressWithdrawal', 'trustNeed']],
  ]),
  fc('FC24', 'Wat wil je dat mensen beter begrijpen?', [
    ['A', 'Dat ik meer voel dan ik laat zien.', ['emotionalSensitivity', 'stressWithdrawal']],
    ['B', 'Dat ik meer kan dan ik laat zien.', ['selfDoubt', 'recognitionNeed']],
    ['C', 'Dat ik meer vrijheid nodig heb.', ['autonomyNeed', 'independenceNeed']],
    ['D', 'Dat ik meer rust nodig heb.', ['solitudeNeed', 'securityNeed']],
  ]),
];

function scenario(
  id: string,
  text: string,
  options: [string, string, SubDimensionId[]][],
): ScenarioQuestion {
  return {
    id,
    type: 'scenario',
    text,
    options: options.map(([key, optText, targets]) => ({ key, text: optText, targets })),
  };
}

const SCENARIO_QUESTIONS: ScenarioQuestion[] = [
  scenario('S01', 'Je zit in een team waarin niemand verantwoordelijkheid neemt.', [
    ['A', 'Ik neem vanzelf de leiding.', ['controlNeed', 'selfConfidence', 'directness']],
    ['B', 'Ik probeer eerst te begrijpen waarom niemand beweegt.', ['analyticalThinking', 'intuitiveThinking']],
    ['C', 'Ik wacht af tot duidelijk is wat mijn rol is.', ['securityNeed', 'stressFreeze']],
    ['D', 'Ik probeer de groep op een rustige manier mee te krijgen.', ['connectionNeed', 'peoplePleasing']],
    ['E', 'Ik raak geïrriteerd en wil tempo maken.', ['stressAcceleration', 'practicalThinking']],
  ]),
  scenario('S02', 'Iemand geeft kritiek op iets waar jij hard aan hebt gewerkt.', [
    ['A', 'Ik verdedig mijn keuze.', ['shadowDefensiveness', 'criticismSensitivity']],
    ['B', 'Ik word stil en denk er later veel over na.', ['stressWithdrawal', 'selfDoubt']],
    ['C', 'Ik vraag door om te begrijpen wat beter kan.', ['growthReadiness', 'analyticalThinking']],
    ['D', 'Ik voel schaamte, ook als de kritiek klein is.', ['criticismSensitivity', 'emotionalSensitivity']],
    ['E', 'Ik ga meteen proberen het te verbeteren.', ['perfectionism', 'recognitionNeed']],
  ]),
  scenario('S03', 'Je krijgt een kans die spannend maar onzeker is.', [
    ['A', "Ik onderzoek risico's.", ['analyticalThinking', 'securityNeed']],
    ['B', 'Ik voel eerst of het klopt.', ['intuitiveThinking', 'autonomyNeed']],
    ['C', 'Ik overleg met iemand die ik vertrouw.', ['trustNeed', 'connectionNeed']],
    ['D', 'Ik spring erin als het betekenisvol voelt.', ['meaningNeed', 'creativeThinking']],
    ['E', 'Ik stel de keuze uit.', ['shadowAvoidance', 'selfDoubt']],
  ]),
  scenario('S04', 'Je partner, vriend of collega trekt zich terug.', [
    ['A', 'Ik vraag direct wat er is.', ['directness', 'connectionNeed']],
    ['B', 'Ik geef ruimte maar blijf het voelen.', ['emotionalSensitivity', 'trustNeed']],
    ['C', 'Ik denk dat ik iets verkeerd heb gedaan.', ['selfDoubt', 'criticismSensitivity']],
    ['D', 'Ik probeer de sfeer te herstellen.', ['peoplePleasing', 'conflictAvoidance']],
    ['E', 'Ik trek mezelf ook terug.', ['stressWithdrawal', 'intimacyNeed']],
  ]),
  scenario('S05', 'Je hebt te veel taken tegelijk.', [
    ['A', 'Ik maak een planning.', ['controlNeed', 'practicalThinking']],
    ['B', 'Ik begin met wat het meest urgent voelt.', ['stressAcceleration', 'practicalThinking']],
    ['C', 'Ik raak geblokkeerd.', ['stressFreeze', 'selfDoubt']],
    ['D', 'Ik zoek naar de diepere prioriteit.', ['meaningNeed', 'analyticalThinking']],
    ['E', 'Ik doe te veel zelf.', ['peoplePleasing', 'perfectionism']],
  ]),
  scenario('S06', 'Je merkt dat iemand onecht doet.', [
    ['A', 'Ik benoem het.', ['directness', 'selfConfidence']],
    ['B', 'Ik observeer en verzamel signalen.', ['intuitiveThinking', 'analyticalThinking']],
    ['C', 'Ik neem afstand.', ['trustNeed', 'stressWithdrawal']],
    ['D', 'Ik probeer de situatie luchtig te houden.', ['conflictAvoidance', 'peoplePleasing']],
    ['E', 'Ik voel spanning in mijn lichaam.', ['emotionalSensitivity', 'criticismSensitivity']],
  ]),
  scenario('S07', 'Je moet een belangrijk besluit nemen zonder volledige zekerheid.', [
    ['A', 'Ik verzamel meer informatie.', ['analyticalThinking', 'controlNeed']],
    ['B', 'Ik kies op basis van mijn gevoel.', ['intuitiveThinking', 'autonomyNeed']],
    ['C', 'Ik stel uit.', ['shadowAvoidance', 'stressFreeze']],
    ['D', 'Ik vraag bevestiging.', ['selfDoubt', 'connectionNeed']],
    ['E', 'Ik kies en accepteer dat het niet perfect is.', ['growthReadiness', 'selfConfidence']],
  ]),
  scenario('S08', 'Je wordt niet erkend voor iets wat je hebt gedaan.', [
    ['A', 'Ik doe alsof het me niets doet.', ['shadowAvoidance', 'recognitionNeed']],
    ['B', 'Ik voel teleurstelling.', ['recognitionNeed', 'emotionalSensitivity']],
    ['C', 'Ik werk nog harder.', ['perfectionism', 'selfDoubt']],
    ['D', 'Ik neem afstand.', ['stressWithdrawal', 'criticismSensitivity']],
    ['E', 'Ik benoem dat mijn bijdrage mist.', ['directness', 'selfConfidence']],
  ]),
  scenario('S09', 'Je bent in een drukke sociale situatie. Wanneer gaat het goed?', [
    ['A', 'Als de gesprekken echt zijn.', ['intimacyNeed', 'meaningNeed']],
    ['B', 'Als er energie en humor is.', ['socialEnergy', 'recognitionNeed']],
    ['C', 'Als ik zelf kan kiezen met wie ik praat.', ['autonomyNeed', 'solitudeNeed']],
    ['D', 'Als ik een duidelijke rol heb.', ['securityNeed', 'recognitionNeed']],
    ['E', 'Als ik mensen kan helpen verbinden.', ['connectionNeed', 'peoplePleasing']],
  ]),
  scenario('S10', 'Je maakt een fout.', [
    ['A', 'Ik analyseer hoe het kon gebeuren.', ['analyticalThinking', 'controlNeed']],
    ['B', 'Ik voel schaamte.', ['criticismSensitivity', 'selfDoubt']],
    ['C', 'Ik herstel het snel.', ['practicalThinking', 'perfectionism']],
    ['D', 'Ik praat het eerst goed.', ['shadowDefensiveness', 'selfConfidence']],
    ['E', 'Ik probeer ervan te leren.', ['growthReadiness', 'meaningNeed']],
  ]),
  scenario('S11', 'Iemand vraagt meer van je dan goed voor je is.', [
    ['A', 'Ik zeg ja en voel later spanning.', ['peoplePleasing', 'conflictAvoidance']],
    ['B', 'Ik zeg nee als mijn grens duidelijk is.', ['directness', 'selfConfidence']],
    ['C', 'Ik zoek een compromis.', ['connectionNeed', 'practicalThinking']],
    ['D', 'Ik trek mij terug.', ['stressWithdrawal', 'shadowAvoidance']],
    ['E', 'Ik word geïrriteerd omdat mijn grens niet gezien wordt.', ['criticismSensitivity', 'autonomyNeed']],
  ]),
  scenario('S12', 'Je start een nieuw project. Wat heb je nodig?', [
    ['A', 'Vrijheid en ruimte.', ['autonomyNeed', 'creativeThinking']],
    ['B', 'Structuur en planning.', ['controlNeed', 'practicalThinking']],
    ['C', 'Betekenis en richting.', ['meaningNeed', 'intuitiveThinking']],
    ['D', 'Mensen en energie.', ['socialEnergy', 'connectionNeed']],
    ['E', 'Zekerheid dat het haalbaar is.', ['securityNeed', 'analyticalThinking']],
  ]),
  scenario('S13', 'Je voelt dat iets in je leven niet klopt.', [
    ['A', 'Ik zoek patronen.', ['intuitiveThinking', 'analyticalThinking']],
    ['B', 'Ik negeer het tot het te duidelijk wordt.', ['shadowAvoidance', 'stressFreeze']],
    ['C', 'Ik praat erover met iemand die veilig voelt.', ['trustNeed', 'intimacyNeed']],
    ['D', 'Ik probeer controle terug te krijgen.', ['stressControl', 'controlNeed']],
    ['E', 'Ik verander iets radicaal.', ['autonomyNeed', 'creativeThinking']],
  ]),
  scenario('S14', 'Je krijgt onverwacht veel succes of aandacht.', [
    ['A', 'Ik geniet ervan.', ['recognitionNeed', 'selfConfidence']],
    ['B', 'Ik twijfel of ik het verdien.', ['selfDoubt', 'criticismSensitivity']],
    ['C', 'Ik voel druk om het vast te houden.', ['perfectionism', 'stressControl']],
    ['D', 'Ik wil meteen verder bouwen.', ['stressAcceleration', 'meaningNeed']],
    ['E', 'Ik trek mij wat terug.', ['solitudeNeed', 'stressWithdrawal']],
  ]),
  scenario('S15', 'Er ontstaat een conflict.', [
    ['A', 'Ik ga het gesprek aan.', ['directness', 'selfConfidence']],
    ['B', 'Ik probeer het zachter te maken.', ['conflictAvoidance', 'peoplePleasing']],
    ['C', 'Ik analyseer wie gelijk heeft.', ['analyticalThinking', 'controlNeed']],
    ['D', 'Ik voel eerst veel, maar zeg weinig.', ['emotionalSensitivity', 'stressWithdrawal']],
    ['E', 'Ik reageer fel als iets onrechtvaardig voelt.', ['directness', 'emotionalSensitivity']],
  ]),
  scenario('S16', 'Je voelt je vastgelopen.', [
    ['A', 'Rust en afstand.', ['solitudeNeed', 'stressWithdrawal']],
    ['B', 'Structuur en overzicht.', ['controlNeed', 'practicalThinking']],
    ['C', 'Een eerlijk gesprek.', ['intimacyNeed', 'connectionNeed']],
    ['D', 'Een nieuw perspectief.', ['creativeThinking', 'intuitiveThinking']],
    ['E', 'Een concrete eerste stap.', ['practicalThinking', 'growthReadiness']],
  ]),
];

function ranking(
  id: string,
  text: string,
  items: [string, string, SubDimensionId[]][],
): RankingQuestion {
  return {
    id,
    type: 'ranking',
    text,
    items: items.map(([key, itemText, targets]) => ({ key, text: itemText, targets })),
  };
}

const RANKING_QUESTIONS: RankingQuestion[] = [
  ranking('R01', 'Zet op volgorde wat jij het meest nodig hebt.', [
    ['vrijheid', 'Vrijheid', ['autonomyNeed']],
    ['rust', 'Rust', ['securityNeed', 'solitudeNeed']],
    ['erkenning', 'Erkenning', ['recognitionNeed']],
    ['verbinding', 'Verbinding', ['connectionNeed', 'intimacyNeed']],
    ['betekenis', 'Betekenis', ['meaningNeed']],
    ['grip', 'Grip', ['controlNeed']],
  ]),
  ranking('R02', 'Wat raakt jou het snelst?', [
    ['nietSerieus', 'Niet serieus genomen worden', ['recognitionNeed', 'criticismSensitivity']],
    ['controleVerlies', 'Controle verliezen', ['controlNeed', 'securityNeed']],
    ['afwijzing', 'Afwijzing', ['criticismSensitivity', 'trustNeed']],
    ['onechtheid', 'Onechtheid', ['intuitiveThinking', 'intimacyNeed']],
    ['chaos', 'Chaos', ['securityNeed', 'controlNeed']],
    ['teleurstellen', 'Iemand teleurstellen', ['peoplePleasing', 'connectionNeed']],
  ]),
  ranking('R03', 'Wat doe je onder druk?', [
    ['terugtrekken', 'Terugtrekken', ['stressWithdrawal']],
    ['controleren', 'Controleren', ['stressControl']],
    ['versnellen', 'Versnellen', ['stressAcceleration']],
    ['bevriezen', 'Bevriezen', ['stressFreeze']],
    ['pleasen', 'Pleasen', ['peoplePleasing']],
    ['verdedigen', 'Verdedigen', ['shadowDefensiveness']],
  ]),
  ranking('R04', 'In welke omgeving groei jij het meest?', [
    ['vrijeOmgeving', 'Vrije omgeving', ['autonomyNeed', 'creativeThinking']],
    ['rustigeOmgeving', 'Rustige omgeving', ['solitudeNeed', 'securityNeed']],
    ['ambitieuzeOmgeving', 'Ambitieuze omgeving', ['recognitionNeed', 'selfConfidence']],
    ['betekenisvolleOmgeving', 'Betekenisvolle omgeving', ['meaningNeed', 'connectionNeed']],
    ['gestructureerdeOmgeving', 'Gestructureerde omgeving', ['controlNeed', 'practicalThinking']],
    ['eerlijkeOmgeving', 'Eerlijke omgeving', ['trustNeed', 'intimacyNeed']],
  ]),
  ranking('R05', 'Wat is jouw sterkste kracht?', [
    ['patronenZien', 'Patronen zien', ['intuitiveThinking', 'analyticalThinking']],
    ['mensenAanvoelen', 'Mensen aanvoelen', ['emotionalSensitivity', 'connectionNeed']],
    ['dingenBouwen', 'Dingen bouwen', ['practicalThinking', 'controlNeed']],
    ['ideeenBedenken', 'Ideeën bedenken', ['creativeThinking', 'autonomyNeed']],
    ['doorzetten', 'Doorzetten', ['perfectionism', 'selfConfidence']],
    ['verbinden', 'Verbinden', ['connectionNeed', 'intimacyNeed']],
  ]),
  ranking('R06', 'Wat is jouw grootste valkuil?', [
    ['teVeelNadenken', 'Te veel nadenken', ['analyticalThinking', 'controlNeed']],
    ['teVeelVoelen', 'Te veel voelen', ['emotionalSensitivity', 'criticismSensitivity']],
    ['teVeelDoen', 'Te veel doen', ['stressAcceleration', 'perfectionism']],
    ['teVeelAanpassen', 'Te veel aanpassen', ['peoplePleasing', 'conflictAvoidance']],
    ['teVeelTerugtrekken', 'Te veel terugtrekken', ['stressWithdrawal', 'solitudeNeed']],
    ['teLangUitstellen', 'Te lang uitstellen', ['shadowAvoidance', 'stressFreeze']],
  ]),
  ranking('R07', 'Wat wil je meer leren?', [
    ['grenzenAangeven', 'Grenzen aangeven', ['growthReadiness', 'directness']],
    ['loslaten', 'Loslaten', ['growthReadiness', 'controlNeed']],
    ['vertrouwen', 'Vertrouwen', ['growthReadiness', 'trustNeed']],
    ['kiezen', 'Kiezen', ['growthReadiness', 'autonomyNeed']],
    ['rustNemen', 'Rust nemen', ['growthReadiness', 'solitudeNeed']],
    ['zichtbaarZijn', 'Zichtbaar zijn', ['growthReadiness', 'recognitionNeed']],
  ]),
  ranking('R08', 'Wat beschrijft jouw communicatiestijl het best?', [
    ['directEnHelder', 'Direct en helder', ['directness', 'selfConfidence']],
    ['voorzichtig', 'Voorzichtig en aftastend', ['trustNeed', 'conflictAvoidance']],
    ['warmEnVerbindend', 'Warm en verbindend', ['connectionNeed', 'peoplePleasing']],
    ['analytischEnPrecies', 'Analytisch en precies', ['analyticalThinking', 'controlNeed']],
    ['beeldend', 'Beeldend en associatief', ['creativeThinking', 'intuitiveThinking']],
    ['stilMaarOpmerkzaam', 'Stil maar opmerkzaam', ['solitudeNeed', 'emotionalSensitivity']],
  ]),
];

export const ARCANA_QUESTIONS: ArcanaQuestion[] = [
  ...LIKERT_QUESTIONS,
  ...FORCED_CHOICE_QUESTIONS,
  ...SCENARIO_QUESTIONS,
  ...RANKING_QUESTIONS,
];

export {
  LIKERT_QUESTIONS,
  FORCED_CHOICE_QUESTIONS,
  SCENARIO_QUESTIONS,
  RANKING_QUESTIONS,
};
