import type { Phrasing } from '../lib/arcanaVariants';
import type { SubDimensionId } from '../types/arcana';

/**
 * De vijf velden hieronder die als `Phrasing` getypeerd zijn, mogen meerdere
 * onderling uitwisselbare formuleringen bevatten. Ze worden het vaakst getoond
 * en zijn daarmee de grootste bron van overlap tussen twee rapporten. De
 * rapportgenerator kiest er deterministisch één op basis van de antwoorden.
 *
 * Varianten moeten hetzelfde beweren: alleen de formulering verschilt.
 */
export interface TraitContent {
  label: string;
  /** Zichtbaar gedrag wanneer deze subdimensie hoog scoort. */
  behavior: Phrasing;
  /** Verborgen behoefte die dit gedrag aandrijft. */
  hiddenNeed: Phrasing;
  /** Effect op anderen. */
  effect: Phrasing;
  /** Valkuil wanneer dit patroon te sterk wordt. */
  pitfall: Phrasing;
  /** Hoe deze eigenschap zich toont wanneer iemand alleen is. */
  alone: string;
  /** Hoe deze eigenschap zich toont in gezelschap en nieuw contact. */
  withOthers: string;
  /** Concreet werkgedrag. */
  atWork: string;
  /** In langdurige, vertrouwde relaties (familie en vrienden). */
  closeCircle: string;
  /** Wanneer iemand zich veilig voelt en niets hoeft te bewijzen. */
  atEase: string;
  /** Jungiaanse duiding: persona, schaduw, projectie, compensatie of individuatie. */
  jungian: string;
  /** Groeisleutel. */
  growthKey: Phrasing;
}

export const TRAIT_CONTENT: Record<SubDimensionId, TraitContent> = {
  autonomyNeed: {
    label: 'Autonomie',
    behavior: [
      'je kiest liever je eigen route dan een voorgeschreven pad te volgen',
      'je gaat liever je eigen weg dan een pad te volgen dat al voor je is uitgestippeld',
      'je bepaalt het liefst zelf de koers in plaats van een vastgelegd pad te volgen',
    ],
    hiddenNeed: [
      'de behoefte om jezelf te blijven, ook onder druk van buitenaf',
      'de behoefte om wie je bent te behouden, ook onder druk van buitenaf',
      'de behoefte om trouw te blijven aan wie je bent, zelfs onder druk van buitenaf',
    ],
    effect: [
      'mensen ervaren jou als onafhankelijk, maar soms ook als moeilijk te sturen',
      'mensen zien je als onafhankelijk, maar soms ook als moeilijk te sturen',
      'mensen vinden je zelfstandig, maar ervaren je soms ook als lastig te sturen',
    ],
    pitfall: [
      'je verzet je soms tegen hulp of structuur die je juist zou helpen',
      'je zet je soms af tegen hulp of structuur die je eigenlijk vooruit zou helpen',
      'je wijst soms steun of structuur af die je juist verder zou brengen',
    ],
    alone: 'je stelt je eigen tempo en volgorde vast, zonder rekening te houden met wat anderen zouden verwachten',
    withOthers: 'je geeft in gesprekken snel je eigen kijk, ook als daar niet naar gevraagd is',
    atWork: 'je herschikt taken of aanpak naar je eigen logica, ook als er al een vaste procedure ligt',
    closeCircle: 'je verzet je tegen bemoeienis van familie of vrienden, zelfs als die goedbedoeld is',
    atEase: 'je werkt soepel samen zolang je het gevoel hebt dat je vrijwillig meedoet',
    jungian: 'Een sterk verzet tegen sturing van buitenaf kan een compensatie zijn voor een innerlijk gevoel van te weinig eigen regie op een ander vlak.',
    growthKey: [
      'onderscheid tussen sturing die je vrijheid beperkt en sturing die je versterkt',
      'leer het verschil zien tussen sturing die je inperkt en sturing die je juist sterker maakt',
      'maak onderscheid tussen aansturing die je beperkt en aansturing die je juist ondersteunt',
    ],
  },
  securityNeed: {
    label: 'Zekerheid',
    behavior: [
      'je zoekt duidelijkheid en een voorspelbare basis voordat je in beweging komt',
      'je wilt eerst helderheid en een stabiele basis voordat je iets in gang zet',
      'je zoekt eerst overzicht en een voorspelbaar kader voordat je stappen zet',
    ],
    hiddenNeed: [
      'de behoefte om niet overvallen te worden door onverwachte veranderingen',
      'de behoefte om niet verrast te worden door plotselinge veranderingen',
      'de behoefte aan bescherming tegen onverwachte wendingen die alles overhoop halen',
    ],
    effect: [
      'mensen voelen zich bij jou op hun gemak, maar ervaren je soms als afwachtend',
      'mensen voelen zich in je nabijheid op hun gemak, maar merken soms dat je afwacht',
      'mensen voelen zich rustig in je buurt, maar zien je soms als terughoudend',
    ],
    pitfall: [
      'je stelt beslissingen uit tot alles zeker voelt, en dat moment komt nooit helemaal',
      'je schuift keuzes voor je uit tot alle onzekerheid weg is, en dat moment blijft uit',
      'je wacht met beslissen tot je overal zeker van bent, een punt dat nooit echt komt',
    ],
    alone: 'je bouwt vaste routines en gewoontes op die jou een gevoel van houvast geven',
    withOthers: 'je vraagt door naar wat er precies gaat gebeuren voordat je instemt met een plan',
    atWork: 'je wilt een duidelijk stappenplan voordat je aan een taak begint',
    closeCircle: 'je voelt je op je gemak bij vaste patronen en terugkerende afspraken met familie en vrienden',
    atEase: 'je durft binnen een vertrouwd kader best kleine risico\'s te nemen',
    jungian: 'De behoefte aan voorspelbaarheid kan een persona zijn die naar buiten stabiliteit toont, terwijl van binnen de twijfel groter is dan getoond wordt.',
    growthKey: [
      'oefen met kleine stappen zetten voordat alle onzekerheid weg is',
      'leer kleine stappen zetten terwijl er nog onzekerheid is',
      'oefen met beginnen voordat elk risico is uitgesloten',
    ],
  },
  recognitionNeed: {
    label: 'Erkenning',
    behavior: [
      'je zet je in op een manier die gezien mag worden',
      'je levert inzet op een manier die opvalt en gezien wordt',
      'je zorgt dat je inspanning zichtbaar is voor anderen',
    ],
    hiddenNeed: [
      'de behoefte om te weten dat je bijdrage ertoe doet',
      'de behoefte aan bevestiging dat wat je doet ertoe doet',
      'de behoefte om te merken dat je inzet gewaardeerd wordt',
    ],
    effect: [
      'mensen voelen je inzet, maar merken soms ook dat je op een reactie wacht',
      'mensen merken je inzet, maar zien soms ook dat je uitkijkt naar een reactie',
      'mensen ervaren je betrokkenheid, maar merken soms dat je wacht op een compliment',
    ],
    pitfall: [
      'je laat je stemming afhangen van of iemand het opmerkt',
      'je stemming hangt af van of iemand je inzet wel of niet opmerkt',
      'je bui verandert al naar gelang iemand het al dan niet opmerkt',
    ],
    alone: 'je herbekijkt in gedachten hoe iets is ontvangen, ook zonder dat iemand er iets over heeft gezegd',
    withOthers: 'je vertelt eerder over wat je hebt bereikt en wacht af hoe erop gereageerd wordt',
    atWork: 'je levert zichtbaar werk af en merkt het snel als een bijdrage ongenoemd blijft in een overleg',
    closeCircle: 'je deelt successen ook met familie en vrienden die al lang weten wat je waard bent',
    atEase: 'je kunt oprecht blij zijn voor anderen zonder jaloers te worden op hun aandacht',
    jungian: 'Een sterke behoefte aan erkenning kan wijzen op een schaduw waarin je eigen waarde nog onvoldoende erkend wordt door jezelf.',
    growthKey: [
      'leer je eigen waardering te bevestigen voordat een ander dat doet',
      'oefen met je eigen prestaties waarderen voordat een ander dat doet',
      'leer eerst zelf waardering te geven aan wat je bereikt, voordat een ander het doet',
    ],
  },
  meaningNeed: {
    label: 'Betekenis',
    behavior: [
      'je zoekt naar de diepere reden achter wat je doet',
      'je gaat op zoek naar het diepere waarom achter je acties',
      'je wilt begrijpen wat de onderliggende reden is van wat je onderneemt',
    ],
    hiddenNeed: [
      'de behoefte dat je tijd en energie ergens toe leiden',
      'de behoefte om te weten dat je inzet uiteindelijk iets oplevert',
      'de behoefte dat je tijd en aandacht bijdragen aan iets waardevols',
    ],
    effect: [
      'mensen worden meegetrokken door je richting, maar raken soms de aansluiting kwijt bij je tempo',
      'mensen laten zich meevoeren door je koers, maar verliezen soms de aansluiting bij je tempo',
      'mensen raken geïnspireerd door je richting, maar kunnen je tempo soms niet bijhouden',
    ],
    pitfall: [
      'oppervlakkige taken voelen zo zwaar dat je ze blijft uitstellen',
      'taken zonder diepere reden voelen zo zwaar dat je ze steeds voor je uit schuift',
      'oppervlakkige klussen voelen zo loodzwaar dat uitstel de norm wordt',
    ],
    alone: 'je denkt na over waarom je iets doet voordat je er echt in opgaat',
    withOthers: 'je stelt vragen over het doel van een project voordat je je volledig inzet',
    atWork: 'administratieve of repetitieve taken schuif je eerder voor je uit dan taken met een duidelijk resultaat',
    closeCircle: 'je zoekt naar diepgang in gesprekken met vrienden en familie en haakt af bij puur oppervlakkig contact',
    atEase: 'je vindt betekenis ook in kleine dingen, zonder dat alles groots hoeft te zijn',
    jungian: 'De zoektocht naar betekenis is een uiting van individuatie, het proces waarin je jezelf en je richting steeds verder wilt doorgronden.',
    growthKey: [
      'koppel kleine, betekenisloze taken bewust aan het grotere doel erachter',
      'verbind kleine, ogenschijnlijk zinloze taken bewust met het grotere doel',
      'leg zelf een verbinding tussen kleine taken en het grotere doel dat erachter zit',
    ],
  },
  connectionNeed: {
    label: 'Verbinding',
    behavior: [
      'je zoekt actief nabijheid en echt contact met mensen om je heen',
      'je zoekt actief nabijheid en oprecht contact met de mensen om je heen',
      'je gaat gericht op zoek naar nabijheid en echt contact met anderen',
    ],
    hiddenNeed: [
      'de behoefte om niet alleen te staan',
      'de behoefte om er niet alleen voor te staan',
      'de behoefte om iemand aan je zijde te hebben',
    ],
    effect: [
      'mensen voelen zich welkom bij jou, maar leunen daardoor soms zwaar op je',
      'mensen voelen zich welkom in je nabijheid, maar leunen daardoor soms zwaar op je',
      'mensen voelen zich bij je op hun gemak, maar gaan daardoor soms te veel op je steunen',
    ],
    pitfall: [
      'je geeft zoveel ruimte aan de ander dat je eigen behoefte ondersneeuwt',
      'je geeft de ander zoveel ruimte dat je eigen behoefte naar de achtergrond verdwijnt',
      'je stelt de ander zo centraal dat je eigen behoefte onopgemerkt blijft',
    ],
    alone: 'je merkt relatief snel dat je iemand mist om mee te delen wat er speelt',
    withOthers: 'je zoekt oogcontact en persoonlijke gesprekken, ook in korte ontmoetingen met vreemden',
    atWork: 'je bouwt actief een band op met collega\'s, los van de inhoud van het werk zelf',
    closeCircle: 'je onderhoudt contact met vrienden en familie ook als de ander weinig initiatief toont',
    atEase: 'je geeft evenveel als je ontvangt in een relatie, zonder jezelf weg te cijferen',
    jungian: 'Een sterke drang naar verbinding kan compenseren voor een innerlijke leegte die je liever buiten jezelf laat opvullen dan zelf onder ogen ziet.',
    growthKey: [
      'oefen met verbinding zoeken zonder jezelf daarbij weg te cijferen',
      'oefen met verbinding zoeken zonder je eigen behoefte daarbij weg te cijferen',
      'leer verbinding aangaan zonder je eigen wensen op te offeren',
    ],
  },
  socialEnergy: {
    label: 'Sociale energie',
    behavior: [
      'je komt tot leven zodra er beweging en interactie ontstaat',
      'je veert op zodra er beweging en interactie op gang komt',
      'je krijgt energie zodra er actie en contact ontstaat om je heen',
    ],
    hiddenNeed: [
      'de behoefte aan levendigheid en gedeelde energie',
      'de behoefte aan dynamiek en energie die je met anderen deelt',
      'de behoefte aan levendigheid en energie die je samen met anderen opbouwt',
    ],
    effect: [
      'mensen worden aangestoken door je enthousiasme',
      'mensen raken aangestoken door je enthousiasme',
      'mensen laten zich meeslepen door je energie',
    ],
    pitfall: [
      'in te stille of te trage omgevingen verlies je snel je scherpte',
      'in een te stille of te trage omgeving ben je je scherpte snel kwijt',
      'bij te weinig prikkels of tempo verlies je vlot je focus',
    ],
    alone: 'je merkt na verloop van tijd dat je behoefte aan gezelschap groter wordt dan de rust die je nu hebt',
    withOthers: 'je neemt vaak het voortouw in gesprekken en zorgt voor levendigheid in de groep',
    atWork: 'je zoekt overleg en samenwerking op, ook bij taken die prima alleen te doen zijn',
    closeCircle: 'je stelt aan vrienden en familie voor om iets te ondernemen in plaats van rustig thuis te blijven',
    atEase: 'je kunt ook even stil zijn zonder dat het meteen als saai voelt',
    jungian: 'Een sterke gerichtheid naar buiten kan een compensatie zijn voor een minder ontwikkeld contact met je eigen innerlijke stilte.',
    growthKey: [
      'leer bewust rustmomenten in te bouwen voordat je energie omslaat in onrust',
      'bouw bewust rustmomenten in voordat je energie in onrust omslaat',
      'plan zelf pauzes in voordat je energie overgaat in onrust',
    ],
  },
  solitudeNeed: {
    label: 'Behoefte aan stilte',
    behavior: [
      'je trekt je terug om tot jezelf te komen zodra het te druk wordt',
      'je trekt je terug om tot rust te komen zodra het te druk wordt',
      'je zondert je af om innerlijk weer tot rust te komen zodra de drukte toeneemt',
    ],
    hiddenNeed: [
      'de behoefte aan innerlijke ruimte om prikkels te verwerken',
      'de behoefte aan innerlijke ruimte om indrukken te kunnen verwerken',
      'de behoefte aan stilte van binnen om prikkels te kunnen verwerken',
    ],
    effect: [
      'mensen ervaren jou als kalm, maar soms ook als moeilijk te bereiken',
      'mensen zien je als kalm, maar soms ook als moeilijk te bereiken',
      'mensen vinden je rustig, maar ervaren je soms ook als afstandelijk',
    ],
    pitfall: [
      'je trekt je soms terug net op het moment dat verbinding juist nodig is',
      'je trekt je terug precies op het moment dat contact eigenlijk nodig is',
      'je zondert je af op momenten waarop verbinding juist wenselijk zou zijn',
    ],
    alone: 'je merkt een duidelijk verschil in helderheid voor en na een moment van stilte',
    withOthers: 'je geeft soms non-verbale signalen dat je behoefte hebt aan minder prikkels, zonder dat hardop te zeggen',
    atWork: 'je zoekt een rustige plek op om geconcentreerd te kunnen werken',
    closeCircle: 'je verdwijnt soms even zonder uitleg bij familie of vrienden, wat als afstandelijk gelezen kan worden',
    atEase: 'je kunt je behoefte aan ruimte rustig aangeven en er samen een moment voor inplannen',
    jungian: 'De behoefte aan teruggetrokkenheid hangt samen met individuatie: de innerlijke dialoog die alleen in stilte goed gevoerd kan worden.',
    growthKey: [
      'benoem je behoefte aan ruimte hardop in plaats van stilzwijgend te verdwijnen',
      'spreek je behoefte aan ruimte hardop uit in plaats van stilletjes te verdwijnen',
      'geef aan dat je ruimte nodig hebt, in plaats van zonder woorden te verdwijnen',
    ],
  },
  analyticalThinking: {
    label: 'Analytisch denken',
    behavior: [
      'je ontleedt situaties tot jij de logica en de risico\'s helder hebt',
      'je pluist situaties uit tot de logica en de risico\'s duidelijk zijn',
      'je analyseert situaties tot jij grip hebt op logica en risico\'s',
    ],
    hiddenNeed: [
      'de behoefte om grip te hebben via begrip',
      'de behoefte om via begrip controle te krijgen op een situatie',
      'de behoefte om vat te krijgen op iets door het eerst te doorgronden',
    ],
    effect: [
      'mensen vertrouwen jouw oordeel, maar ervaren je soms als afstandelijk',
      'mensen vertrouwen je oordeel, maar ervaren je soms als afstandelijk',
      'mensen leunen op je inschatting, maar vinden je soms wat op afstand',
    ],
    pitfall: [
      'je blijft analyseren terwijl actie al nodig was',
      'je blijft doorredeneren terwijl er allang actie nodig was',
      'je blijft afwegen op een moment dat handelen al nodig was',
    ],
    alone: 'je denkt een beslissing stap voor stap door voordat je hem neemt',
    withOthers: 'je onderbouwt je standpunt met argumenten in plaats van met een gevoel',
    atWork: 'je vraagt om data of onderbouwing voordat je akkoord gaat met een voorstel',
    closeCircle: 'je benadert ook persoonlijke keuzes van familie en vrienden graag met een nuchtere blik',
    atEase: 'je combineert je analyse moeiteloos met de mening van anderen zonder star te worden',
    jungian: 'Een sterk analytische persona naar buiten kan een minder ontwikkeld contact met de eigen intuïtieve laag verhullen.',
    growthKey: [
      'stel jezelf een deadline voor denken, en handel daarna ook als het niet perfect voelt',
      'stel een deadline voor het nadenken, en handel daarna ook als het niet perfect voelt',
      'geef het denken een duidelijke tijdslimiet en ga daarna over tot actie, ook zonder volledige zekerheid',
    ],
  },
  intuitiveThinking: {
    label: 'Intuïtief denken',
    behavior: [
      'je voelt patronen aan voordat je ze kunt onderbouwen',
      'je herkent patronen nog voordat je ze kunt verklaren',
      'je pikt patronen op voordat er een onderbouwing voor is',
    ],
    hiddenNeed: [
      'de behoefte om te vertrouwen op wat je aanvoelt, ook zonder bewijs',
      'de behoefte om af te gaan op je gevoel, ook zonder bewijs',
      'de behoefte om je aanvoelen te vertrouwen, ook als bewijs ontbreekt',
    ],
    effect: [
      'mensen zijn onder de indruk van je scherpte, maar volgen je redenering niet altijd',
      'mensen raken onder de indruk van je scherpte, maar kunnen je redenering niet altijd volgen',
      'mensen bewonderen je inzicht, maar kunnen de weg ernaartoe niet altijd volgen',
    ],
    pitfall: [
      'je twijfelt aan je eigen intuïtie zodra iemand om bewijs vraagt',
      'je gaat twijfelen aan je eigen aanvoelen zodra iemand bewijs eist',
      'je laat je intuïtie los zodra iemand erom vraagt het te onderbouwen',
    ],
    alone: 'je krijgt een ingeving over een situatie zonder dat je meteen kunt zeggen waarom',
    withOthers: 'je voelt spanning of onderliggende bedoelingen aan die niet hardop worden uitgesproken',
    atWork: 'je maakt een inschatting die later blijkt te kloppen, zonder dat je hem vooraf goed kon onderbouwen',
    closeCircle: 'je merkt aan kleine signalen bij familie of vrienden dat er iets speelt, nog voordat iemand het benoemt',
    atEase: 'je deelt je aanvoelen rustig, ook zonder het volledig te kunnen onderbouwen',
    jungian: 'Intuïtie functioneert bij jou als een innerlijke stem die compenseert voor wat de rationele blik nog niet heeft opgemerkt.',
    growthKey: [
      'oefen met je intuïtie hardop delen, ook voordat je het volledig kunt onderbouwen',
      'deel je aanvoelen hardop, ook voordat je het helemaal kunt verklaren',
      'spreek je intuïtie uit, ook al kun je hem nog niet volledig onderbouwen',
    ],
  },
  creativeThinking: {
    label: 'Creatief denken',
    behavior: [
      'je ziet moeiteloos nieuwe combinaties en mogelijkheden',
      'je ontdekt moeiteloos nieuwe combinaties en mogelijkheden',
      'je herkent zonder moeite onverwachte combinaties en nieuwe mogelijkheden',
    ],
    hiddenNeed: [
      'de behoefte aan ruimte om te spelen met ideeën',
      'de behoefte aan vrijheid om met ideeën te spelen',
      'de behoefte aan speelruimte voor nieuwe ideeën',
    ],
    effect: [
      'mensen raken geïnspireerd door je perspectief',
      'mensen laten zich inspireren door je kijk op dingen',
      'mensen worden aangestoken door je manier van denken',
    ],
    pitfall: [
      'je begint aan veel meer dan je afmaakt',
      'je start veel meer dan je uiteindelijk afrondt',
      'je zet meer in gang dan je ooit voltooit',
    ],
    alone: 'je bedenkt spontaan alternatieve manieren om iets aan te pakken, ook zonder dat het nodig is',
    withOthers: 'je gooit ideeën de groep in voordat ze helemaal zijn uitgedacht',
    atWork: 'je stelt een andere aanpak voor terwijl het project al in een vaste vorm zat',
    closeCircle: 'je verrast familie en vrienden met onverwachte plannen of invalshoeken in alledaagse gesprekken',
    atEase: 'je combineert je ideeën met discipline om ze ook echt af te maken',
    jungian: 'Een overvloed aan ideeën kan een compensatie zijn voor een minder goed ontwikkelde kant die zich richt op afmaken en volhouden.',
    growthKey: [
      'koppel elk nieuw idee aan één concrete volgende stap',
      'verbind elk nieuw idee met één concrete actiestap',
      'geef elk idee direct een concrete eerste stap mee',
    ],
  },
  practicalThinking: {
    label: 'Praktisch denken',
    behavior: [
      'je vertaalt ideeën snel naar concrete, uitvoerbare stappen',
      'je zet een idee vlot om in een concrete, werkbare stap',
      'je maakt van een plan snel iets tastbaars om mee aan de slag te gaan',
    ],
    hiddenNeed: [
      'de behoefte om zichtbaar vooruitgang te boeken',
      'de behoefte aan tastbare vooruitgang die je kunt zien',
      'de behoefte om te merken dat er echt iets vordert',
    ],
    effect: [
      'mensen kunnen op je bouwvermogen rekenen',
      'mensen weten dat je iets ook echt van de grond krijgt',
      'mensen vertrouwen erop dat plannen bij je in goede handen zijn',
    ],
    pitfall: [
      'je springt soms te snel naar actie voordat de richting duidelijk is',
      'je begint soms al te bouwen terwijl het doel nog niet scherp staat',
      'je grijpt te snel naar de uitvoering voordat de koers vaststaat',
    ],
    alone: 'je begint liever met doen dan met eindeloos plannen',
    withOthers: 'je stelt concrete vervolgstappen voor zodra een gesprek dreigt te blijven hangen in ideeën',
    atWork: 'je levert tastbaar resultaat, ook onder tijdsdruk',
    closeCircle: 'je pakt praktische zaken voor familie en vrienden snel op, ook als het niet aan jou gevraagd is',
    atEase: 'je neemt bewust een moment om het waarom te checken voordat je met het hoe begint',
    jungian: 'De drang om te bouwen en te doen kan een persona zijn die weinig ruimte laat aan een meer beschouwende, innerlijke kant.',
    growthKey: [
      'neem bewust een moment om het waarom te checken voordat je begint met het hoe',
      'check eerst bewust het waarom voordat je met het hoe aan de slag gaat',
      'pauzeer even bij de bedoeling voordat je aan de uitvoering begint',
    ],
  },
  emotionalSensitivity: {
    label: 'Emotionele gevoeligheid',
    behavior: [
      'je merkt sfeer, spanning en emoties eerder op dan de meeste mensen',
      'je pikt sfeer en onderhuidse spanning eerder op dan de meeste anderen',
      'je voelt emoties in een ruimte al aan voordat iemand iets zegt',
    ],
    hiddenNeed: [
      'de behoefte aan een omgeving die emotioneel eerlijk is',
      'de behoefte aan oprechtheid over wat er emotioneel speelt',
      'de behoefte om in een omgeving te zijn waar gevoelens niet verstopt worden',
    ],
    effect: [
      'mensen voelen zich begrepen door je, maar je neemt onbewust ook hun lading over',
      'mensen voelen zich gezien bij je, terwijl je ongemerkt hun spanning met je meedraagt',
      'mensen voelen zich begrepen, maar je neemt hun emotionele lading vaak onbewust over',
    ],
    pitfall: [
      'je raakt uitgeput door emoties die niet eens van jou zijn',
      'je put jezelf uit aan gevoelens die eigenlijk niet van jou zijn',
      'je raakt leeg door lading op te vangen die niet bij jou hoort',
    ],
    alone: 'je herkent na een sociale situatie dat je nog steeds de spanning van die situatie met je meedraagt',
    withOthers: 'je voelt onuitgesproken ongemak aan, ook wanneer iedereen doet alsof er niets aan de hand is',
    atWork: 'je merkt spanningen in een team op nog voordat ze hardop besproken worden',
    closeCircle: 'je voelt aan wanneer een vriend of familielid iets dwarszit, ook zonder dat diegene iets zegt',
    atEase: 'je gebruikt je gevoeligheid om gericht steun te bieden zonder zelf overspoeld te raken',
    jungian: 'Een sterk ontwikkelde gevoeligheid voor de emoties van anderen kan een schaduwzijde hebben in een minder scherp contact met je eigen, onafhankelijke emotie.',
    growthKey: [
      'oefen met onderscheiden wat van jou is en wat je alleen maar aanvoelt bij een ander',
      'leer scheiden wat jouw gevoel is en wat je enkel opvangt van een ander',
      'oefen met het uit elkaar houden van eigen emotie en overgenomen emotie',
    ],
  },
  criticismSensitivity: {
    label: 'Kritiekgevoeligheid',
    behavior: [
      'kritiek blijft lang nazinderen, ook als je het niet laat merken',
      'een kritische opmerking blijft lang doorwerken, ook als je dat niet toont',
      'kritiek blijft je nog lang bezighouden, zelfs als je het niet laat blijken',
    ],
    hiddenNeed: [
      'de behoefte om als goed genoeg gezien te worden',
      'de behoefte om erkend te worden als voldoende goed',
      'de behoefte aan het gevoel dat je goed genoeg bent zoals je bent',
    ],
    effect: [
      'mensen zien vaak niet hoeveel impact hun woorden op je hebben',
      'mensen beseffen vaak niet hoe zwaar hun woorden bij je aankomen',
      'mensen merken zelden hoeveel effect hun opmerking op je heeft',
    ],
    pitfall: [
      'je onthoudt kritiek langer en zwaarder dan compliment',
      'je onthoudt een afkeurende opmerking langer dan een compliment',
      'kritiek blijft zwaarder en langer hangen dan een compliment',
    ],
    alone: 'je speelt een kritische opmerking in gedachten steeds opnieuw af',
    withOthers: 'je let scherp op hoe iets gezegd wordt, meer dan op wat er precies gezegd wordt',
    atWork: 'je onthoudt negatieve feedback uit een functioneringsgesprek langer dan de positieve punten',
    closeCircle: 'een terloopse opmerking van een dierbare weegt bij jou zwaarder dan bedoeld was',
    atEase: 'je kunt kritiek wegen op feiten en het sneller relativeren',
    jungian: 'Langdurig nazinderende kritiek kan wijzen op een schaduw waarin een oud gevoel van tekortschieten wordt geraakt door een actuele, kleine opmerking.',
    growthKey: [
      'leer kritiek te wegen op feiten in plaats van op het gevoel dat het achterlaat',
      'weeg kritiek op basis van feiten in plaats van op het nagevoel',
      'leer opmerkingen te beoordelen op inhoud, niet op het gevoel erna',
    ],
  },
  controlNeed: {
    label: 'Controlebehoefte',
    behavior: [
      'je pakt grip en overzicht zodra iets richtingloos aanvoelt',
      'je grijpt naar overzicht zodra een situatie richting mist',
      'je zoekt houvast en structuur zodra iets rommelig aanvoelt',
    ],
    hiddenNeed: [
      'de behoefte om niet overvallen te worden door chaos',
      'de behoefte om chaos nooit onverwacht op je af te laten komen',
      'de behoefte aan bescherming tegen plotselinge wanorde',
    ],
    effect: [
      'mensen ervaren rust door je overzicht, maar soms ook weinig ruimte voor eigen inbreng',
      'mensen voelen rust dankzij je overzicht, maar missen soms eigen inbreng',
      'mensen vinden houvast bij je structuur, al voelen ze soms weinig ruimte om zelf mee te sturen',
    ],
    pitfall: [
      'je houdt vast aan grip op momenten waarop loslaten juist nodig is',
      'je blijft vasthouden aan sturing net op momenten dat loslaten beter zou zijn',
      'je klemt je aan controle vast terwijl de situatie juist om loslaten vraagt',
    ],
    alone: 'je organiseert je omgeving en planning tot in detail, ook als dat niet strikt nodig is',
    withOthers: 'je neemt vanzelf de regie in een groep, ook zonder dat je erom gevraagd wordt',
    atWork: 'je wilt betrokken zijn bij elke stap van een project in plaats van een deel volledig los te laten',
    closeCircle: 'je neemt de leiding bij het plannen van gezamenlijke dingen met familie en vrienden',
    atEase: 'je laat bewust ruimte aan anderen, ook als je het zelf anders zou aanpakken',
    jungian: 'Een sterke controlebehoefte kan compenseren voor een dieper gevoeld onvermogen om chaos of onzekerheid te verdragen.',
    growthKey: [
      'oefen bewust met kleine dingen loslaten die je niet écht hoeft te controleren',
      'laat bewust kleine zaken los waar controle eigenlijk niet nodig is',
      'geef bewust stukjes overzicht uit handen die je niet écht hoeft te bewaken',
    ],
  },
  perfectionism: {
    label: 'Perfectionisme',
    behavior: [
      'je stelt hoge eisen aan jezelf en aan wat je aflevert',
      'je legt de lat hoog voor jezelf en voor wat je oplevert',
      'je verwacht veel van jezelf en van het resultaat dat je aflevert',
    ],
    hiddenNeed: [
      'de behoefte om fouten en de gevolgen daarvan te voorkomen',
      'de behoefte om vergissingen en de gevolgen ervan te vermijden',
      'de behoefte aan zekerheid dat er niets misgaat',
    ],
    effect: [
      'mensen waarderen je kwaliteit, maar wachten soms lang op het resultaat',
      'mensen zien je hoge kwaliteit, maar moeten soms lang op het resultaat wachten',
      'mensen waarderen wat je aflevert, al duurt het soms langer dan gehoopt',
    ],
    pitfall: [
      'je vertraagt jezelf door net dat laatste beetje af te willen maken',
      'je houdt jezelf op door net dat laatste stukje nog te willen afronden',
      'je remt jezelf af door net dat extra detail nog te willen bijschaven',
    ],
    alone: 'je herwerkt iets meerdere keren, ook als niemand het verschil zou merken',
    withOthers: 'je vraagt kritisch door op details die anderen al hadden geaccepteerd',
    atWork: 'je levert later op dan gepland omdat je nog een verbetering wilde doorvoeren',
    closeCircle: 'je stelt ook aan zelfgemaakte, informele dingen voor familie en vrienden hoge eisen',
    atEase: 'je bepaalt vooraf een duidelijk punt waarop iets af is en houdt je daaraan',
    jungian: 'Een sterk perfectionistische persona kan een schaduw verhullen waarin fouten maken gelijkstaat aan persoonlijk falen.',
    growthKey: [
      'bepaal vooraf wanneer "goed genoeg" ook echt genoeg is',
      'spreek vooraf af wanneer "goed genoeg" ook daadwerkelijk voldoende is',
      'leg vooraf vast wanneer iets af mag zijn, ook zonder dat laatste beetje',
    ],
  },
  directness: {
    label: 'Directheid',
    behavior: [
      'je zegt wat je vindt zonder het lang in te pakken',
      'je uit je mening zonder er lang omheen te draaien',
      'je zegt wat je denkt, zonder het in omhaal te verpakken',
    ],
    hiddenNeed: [
      'de behoefte aan eerlijkheid boven schone schijn',
      'de behoefte aan oprechtheid boven een mooi gepolijst verhaal',
      'de behoefte om eerlijk te zijn in plaats van diplomatiek te verbloemen',
    ],
    effect: [
      'mensen weten precies waar ze aan toe zijn bij jou',
      'mensen weten bij jou meteen waar ze staan',
      'mensen hoeven bij jou nooit te gissen naar wat je bedoelt',
    ],
    pitfall: [
      'je landing kan harder aankomen dan je bedoeling was',
      'je woorden komen soms harder binnen dan je bedoeld had',
      'je boodschap landt soms scherper dan de bedoeling erachter',
    ],
    alone: 'je formuleert je mening scherp, ook al is er niemand om het tegen te zeggen',
    withOthers: 'je benoemt ongemakkelijke waarheden waar anderen omheen draaien',
    atWork: 'je geeft feedback zonder omwegen, ook als de sfeer al gespannen is',
    closeCircle: 'je zegt ook tegen familie en vrienden precies wat je van hun keuzes vindt',
    atEase: 'je combineert je eerlijkheid met aandacht voor hoe het bij de ander landt',
    jungian: 'Onvervalste directheid kan een persona zijn die weinig ruimte laat voor de zachtere, meer aftastende kant van jezelf.',
    growthKey: [
      'oefen met dezelfde eerlijkheid, maar met meer ruimte voor de ontvanger',
      'blijf even eerlijk, maar geef de ontvanger meer ruimte om het te ontvangen',
      'houd dezelfde openheid vast, met meer oog voor hoe het bij de ander landt',
    ],
  },
  conflictAvoidance: {
    label: 'Conflictvermijding',
    behavior: [
      'je kiest liever voor rust dan voor een confrontatie',
      'je geeft de voorkeur aan rust boven een confrontatie',
      'je vermijdt liever een botsing en kiest voor kalmte',
    ],
    hiddenNeed: [
      'de behoefte om de relatie of sfeer niet te beschadigen',
      'de behoefte om de band of de sfeer niet aan te tasten',
      'de behoefte aan het behoud van een goede sfeer en relatie',
    ],
    effect: [
      'mensen ervaren je als prettig, maar missen soms je echte standpunt',
      'mensen vinden je prettig in de omgang, maar merken je echte mening soms niet',
      'mensen ervaren je als aangenaam, terwijl je werkelijke standpunt vaak onduidelijk blijft',
    ],
    pitfall: [
      'onuitgesproken irritatie stapelt zich op tot het ineens toch naar buiten komt',
      'opgekropte irritatie hoopt zich op tot het er plots toch uitkomt',
      'ingehouden ergernis stapelt zich op totdat het onverwacht naar buiten barst',
    ],
    alone: 'je formuleert in gedachten wat je zou willen zeggen, zonder het hardop te doen',
    withOthers: 'je stemt in met een plan waar je het eigenlijk niet mee eens bent',
    atWork: 'je laat een onterechte opmerking van een collega voorbijgaan om de sfeer niet te verstoren',
    closeCircle: 'je zwijgt tegen familie of vrienden over iets dat je dwarszit tot het je oprecht begint op te breken',
    atEase: 'je durft een klein meningsverschil rustig te benoemen zonder dat het escaleert',
    jungian: 'Langdurige conflictvermijding kan de schaduwkant voeden waarin onderdrukte irritatie zich ophoopt tot ze zich ongecontroleerd een weg naar buiten baant.',
    growthKey: [
      'oefen met kleine, tijdige eerlijkheid in plaats van grote, late uitbarstingen',
      'kies vaker voor kleine, op tijd geuite eerlijkheid in plaats van late uitbarstingen',
      'oefen met vroeg iets kleins zeggen in plaats van later groot uit te barsten',
    ],
  },
  peoplePleasing: {
    label: 'Pleasen',
    behavior: [
      'je stemt je gedrag af op wat de ander nodig lijkt te hebben',
      'je past je gedrag aan op wat de ander lijkt te verlangen',
      'je richt je gedrag naar wat de ander nodig lijkt te hebben',
    ],
    hiddenNeed: [
      'de behoefte om geliefd en geaccepteerd te blijven',
      'de behoefte aan blijvende genegenheid en acceptatie',
      'de behoefte om graag gezien en geaccepteerd te worden',
    ],
    effect: [
      'mensen vinden je prettig in de omgang, maar weten niet altijd wat jij eigenlijk wilt',
      'mensen ervaren je als aangenaam, maar weten vaak niet wat jij echt zou willen',
      'mensen vinden de omgang met je fijn, terwijl je eigen wens onduidelijk blijft',
    ],
    pitfall: [
      'je grens verschuift net zo lang tot je jezelf bent kwijtgeraakt',
      'je grens schuift steeds verder op totdat je jezelf uit het oog verliest',
      'je grens verplaatst zich net zo lang tot je eigen behoefte verdwijnt',
    ],
    alone: 'je twijfelt achteraf of je wel duidelijk genoeg bent geweest over wat jij wilde',
    withOthers: 'je past je mening of voorkeur stilzwijgend aan die van de groep aan',
    atWork: 'je neemt extra taken op je om een collega of leidinggevende tevreden te houden',
    closeCircle: 'je zegt tegen familie en vrienden ja tegen verzoeken waar je eigenlijk geen ruimte voor hebt',
    atEase: 'je kunt een verzoek afwijzen zonder je schuldig te voelen',
    jungian: 'Een sterk ontwikkelde pleasende persona verhult vaak een schaduw waarin eigen wensen als minder belangrijk worden ervaren.',
    growthKey: [
      'oefen met een kleine, ongemakkelijke "nee" op een moment dat er weinig op het spel staat',
      'spreek een kleine, ongemakkelijke "nee" uit op een moment met weinig risico',
      'oefen met weigeren bij iets kleins, op een moment dat er weinig van afhangt',
    ],
  },
  trustNeed: {
    label: 'Vertrouwensbehoefte',
    behavior: [
      'je opent je pas nadat je hebt gevoeld dat het veilig is',
      'je laat pas iets van jezelf zien nadat je veiligheid hebt gevoeld',
      'je stelt je pas open zodra je zeker weet dat het veilig aanvoelt',
    ],
    hiddenNeed: [
      'de behoefte aan bewijs dat iemand betrouwbaar is voordat je je kwetsbaar opstelt',
      'de behoefte aan zekerheid over iemands betrouwbaarheid voordat je kwetsbaar wordt',
      'de behoefte om eerst bewijs van betrouwbaarheid te zien voordat je opent',
    ],
    effect: [
      'mensen die je vertrouwen wint, krijgen een loyale kant van je te zien',
      'mensen die eenmaal je vertrouwen hebben, ervaren een trouwe kant van je',
      'mensen die je vertrouwen winnen, zien een loyale kant van je terug',
    ],
    pitfall: [
      'je test mensen zo lang dat verbinding niet de kans krijgt om te groeien',
      'je blijft mensen zo lang testen dat verbinding geen kans krijgt om te ontstaan',
      'je toetst mensen zo langdurig dat een band nauwelijks de ruimte krijgt om te groeien',
    ],
    alone: 'je overdenkt of iemand het verdient om dichterbij gelaten te worden',
    withOthers: 'je houdt in een eerste ontmoeting bewust een deel van jezelf verborgen',
    atWork: 'je deelt pas na verloop van tijd een kritische mening met een nieuwe collega',
    closeCircle: 'zelfs bij langdurige vriendschappen of familiebanden bewaar je soms nog een laatste laag voor jezelf',
    atEase: 'je deelt kwetsbaarheid geleidelijk en op je eigen tempo, zonder jezelf te forceren',
    jungian: 'Langdurig wantrouwen kan een schaduw herbergen van eerdere teleurstelling die nog niet volledig verwerkt is.',
    growthKey: [
      'deel bewust een klein stukje kwetsbaarheid vóórdat je volledige zekerheid voelt',
      'deel bewust iets kleins en kwetsbaars voordat je volledige zekerheid hebt',
      'geef bewust al een klein stukje van jezelf prijs voordat alle twijfel weg is',
    ],
  },
  intimacyNeed: {
    label: 'Intimiteitsbehoefte',
    behavior: [
      'je verlangt naar gesprekken en contact die verder gaan dan de oppervlakte',
      'je verlangt naar contact en gesprekken die dieper gaan dan de oppervlakte',
      'je zoekt naar gesprekken die voorbij het oppervlakkige gaan',
    ],
    hiddenNeed: [
      'de behoefte om echt gekend te worden',
      'de behoefte om werkelijk gezien en gekend te worden',
      'de behoefte aan een gevoel van echt gekend zijn',
    ],
    effect: [
      'mensen die dicht bij je komen, ervaren een diepe verbinding',
      'mensen die dichtbij komen, voelen een diepe verbinding met je',
      'mensen die dicht bij je toelaten, ervaren een sterke band',
    ],
    pitfall: [
      'oppervlakkig contact voelt zo leeg dat je het snel vermijdt of afhaakt',
      'oppervlakkig contact voelt zo leeg dat je het snel ontwijkt of afhaakt',
      'luchtig contact voelt zo weinig voldoening dat je het snel vermijdt',
    ],
    alone: 'je mist het gevoel van echt gekend worden als je daar lang zonder zit',
    withOthers: 'je stuurt gesprekken al snel richting persoonlijke, betekenisvolle onderwerpen',
    atWork: 'je zoekt naar een oprechte klik met collega\'s, voorbij de functionele samenwerking',
    closeCircle: 'je verlangt naar gesprekken met familie en vrienden die verder gaan dan het laatste nieuws',
    atEase: 'je kunt ook genieten van luchtig contact zonder dat het meteen diepgang moet hebben',
    jungian: 'Het verlangen naar diepe verbinding hangt samen met individuatie: het zoeken naar heelheid via het echt gekend worden door een ander.',
    growthKey: [
      'leer ook iets te halen uit lichter contact, zonder dat het meteen diepgang moet hebben',
      'leer ook waarde te vinden in luchtig contact, zonder meteen diepgang te eisen',
      'oefen met genieten van licht contact, ook zonder dat het meteen diep hoeft te zijn',
    ],
  },
  independenceNeed: {
    label: 'Onafhankelijkheid',
    behavior: [
      'je regelt liever zelf je zaken dan op een ander te leunen',
      'je pakt kwesties het liefst zelfstandig aan in plaats van te steunen op iemand anders',
      'je houdt de regie liever in eigen hand dan dat je op hulp van anderen vertrouwt',
    ],
    hiddenNeed: [
      'de behoefte om niet kwetsbaar te hoeven zijn door afhankelijkheid',
      'de behoefte om geen kwetsbaarheid te tonen die met afhankelijkheid gepaard gaat',
      'de behoefte om niet weerloos te voelen door op een ander te moeten leunen',
    ],
    effect: [
      'mensen zien je als zelfstandig en betrouwbaar, maar weten niet altijd wanneer je hulp nodig hebt',
      'mensen ervaren je als capabel en solide, maar merken niet altijd wanneer steun welkom zou zijn',
      'mensen vertrouwen op je zelfstandigheid, maar zien lang niet altijd wanneer jij zelf hulp kunt gebruiken',
    ],
    pitfall: [
      'je vraagt te laat om hulp, ook als de last al te zwaar is geworden',
      'je wacht te lang met hulp vragen, zelfs wanneer de last allang zwaar weegt',
      'je schuift het vragen om steun voor je uit, terwijl de druk intussen oploopt',
    ],
    alone: 'je lost problemen op zonder er anderen bij te betrekken, ook als dat meer tijd kost',
    withOthers: 'je stelt jezelf beschikbaar om te helpen, maar vraagt zelf zelden om hetzelfde terug',
    atWork: 'je neemt een grote last op je in plaats van taken te verdelen',
    closeCircle: 'je verzwijgt tegenover familie en vrienden dat iets zwaar is, ook als zij graag zouden willen helpen',
    atEase: 'je kunt hulp accepteren zonder het als een teken van zwakte te ervaren',
    jungian: 'Een sterke onafhankelijkheid kan een persona zijn die een onderliggende behoefte aan steun verhult.',
    growthKey: [
      'oefen met bewust hulp vragen voordat het echt nodig is',
      'leer al om hulp te vragen ruim voordat het strikt noodzakelijk is',
      'kies er bewust voor eerder steun te vragen, nog voor de nood echt hoog is',
    ],
  },
  selfDoubt: {
    label: 'Zelftwijfel',
    behavior: [
      'je heroverweegt keuzes ook nadat je ze al hebt gemaakt',
      'je blijft een besluit opnieuw doordenken, ook nadat het al genomen is',
      'je keert in gedachten terug naar keuzes die eigenlijk al gemaakt zijn',
    ],
    hiddenNeed: [
      'de behoefte aan zekerheid dat je het juiste doet',
      'de behoefte aan bevestiging dat de gekozen weg de juiste is',
      'de behoefte om zeker te weten dat een keuze klopt',
    ],
    effect: [
      'mensen merken vaak niets van je twijfel, omdat je hem grotendeels naar binnen houdt',
      'mensen krijgen weinig mee van de twijfel, doordat die meestal naar binnen blijft',
      'mensen zien zelden hoeveel twijfel er speelt, omdat die vooral inwendig blijft',
    ],
    pitfall: [
      'je blijft malen over besluiten die allang genomen zijn',
      'je blijft piekeren over keuzes die eigenlijk al lang achter je liggen',
      'je laat oude beslissingen nog rondmalen, terwijl ze allang afgerond zijn',
    ],
    alone: 'je herbekijkt in gedachten of een gemaakte keuze wel de juiste was',
    withOthers: 'je stelt je besluit niet openlijk ter discussie, ook al twijfel je er inwendig aan',
    atWork: 'je vraagt jezelf achteraf af of een aanpak wel de beste was, ook als het resultaat prima was',
    closeCircle: 'je laat aan familie en vrienden zelden merken hoeveel twijfel er achter een rustige beslissing zat',
    atEase: 'je kunt een besluit nemen en het daarna ook echt laten rusten',
    jungian: 'Aanhoudende zelftwijfel kan wijzen op een schaduw waarin het eigen oordeel nog niet volledig als betrouwbaar wordt ervaren.',
    growthKey: [
      'leg een besluit na het nemen ervan bewust naast je neer, ook als de twijfel blijft fluisteren',
      'laat een genomen besluit bewust rusten, zelfs als er nog een stemmetje twijfel blijft',
      'sluit een keuze na het nemen ervan bewust af, ook al fluistert de twijfel nog door',
    ],
  },
  selfConfidence: {
    label: 'Zelfvertrouwen',
    behavior: [
      'je vertrouwt op je eigen oordeel, ook als het spannend is',
      'je gaat af op je eigen inschatting, ook wanneer dat spanning met zich meebrengt',
      'je durft op je eigen mening te bouwen, zelfs als de situatie onzeker aanvoelt',
    ],
    hiddenNeed: [
      'de behoefte om op jezelf te kunnen bouwen',
      'de behoefte om te kunnen steunen op je eigen kracht',
      'de behoefte aan het gevoel dat je op jezelf kunt rekenen',
    ],
    effect: [
      'mensen voelen zich gesteund door je zekerheid',
      'mensen putten steun uit de zekerheid die je uitstraalt',
      'mensen leunen graag op de zekerheid die van je uitgaat',
    ],
    pitfall: [
      'je zelfvertrouwen kan overkomen als ontoegankelijk voor twijfel van anderen',
      'je zekerheid kan overkomen alsof er geen ruimte is voor de twijfel van een ander',
      'je stelligheid kan bij anderen de indruk wekken dat hun twijfel er niet toe doet',
    ],
    alone: 'je twijfelt zelden aan een keuze die je in je eentje hebt gemaakt',
    withOthers: 'je verdedigt je standpunt ook wanneer de meerderheid er anders over denkt',
    atWork: 'je neemt beslissingen zonder eerst uitgebreid bevestiging te zoeken bij anderen',
    closeCircle: 'je geeft ongevraagd advies aan familie en vrienden vanuit je eigen overtuiging',
    atEase: 'je gebruikt je zelfvertrouwen om ook onzekerheid van anderen ruimte te geven',
    jungian: 'Onwrikbaar zelfvertrouwen kan een persona zijn die een onderliggende, minder erkende twijfel naar de schaduw verdringt.',
    growthKey: [
      'gebruik je zelfvertrouwen ook om onzekerheid van anderen ruimte te geven',
      'zet je zekerheid ook in om ruimte te maken voor de twijfel van een ander',
      'benut je zelfvertrouwen om de onzekerheid van anderen serieus te nemen',
    ],
  },
  stressWithdrawal: {
    label: 'Terugtrekken onder druk',
    behavior: [
      'je wordt onder druk stiller en trekt je terug in plaats van te delen',
      'je valt onder druk stil en zoekt afstand in plaats van erover te praten',
      'je trekt je onder spanning terug en wordt zwijgzamer in plaats van open te delen',
    ],
    hiddenNeed: [
      'de behoefte aan ruimte om zelf orde te scheppen in wat er speelt',
      'de behoefte aan ruimte om in je eentje overzicht te krijgen op wat speelt',
      'de behoefte aan tijd en rust om zelf helderheid te vinden',
    ],
    effect: [
      'mensen merken je afstand, maar niet altijd waarom die er is',
      'mensen voelen de afstand aan, zonder altijd te snappen waar die vandaan komt',
      'mensen merken dat er afstand ontstaat, maar de reden ervan blijft vaak onduidelijk',
    ],
    pitfall: [
      'je isoleert jezelf net op het moment dat steun je het meest zou helpen',
      'je zondert je juist af op het moment dat steun het hardst nodig is',
      'je sluit je af precies wanneer hulp van anderen het meeste zou schelen',
    ],
    alone: 'je verwerkt spanning liever in je eentje dan dat je erover praat',
    withOthers: 'je wordt merkbaar stiller in gesprekken zodra de druk toeneemt',
    atWork: 'je trekt je terug van overleg op de momenten dat een deadline juist nadert',
    closeCircle: 'je trekt je terug van familie en vrienden precies wanneer zij zich zorgen om je beginnen te maken',
    atEase: 'je zoekt vanzelf weer aansluiting zodra de druk wat zakt',
    jungian: 'Terugtrekken onder druk kan een compensatie zijn voor het gevoel dat delen van je last als een last voor anderen zou voelen.',
    growthKey: [
      'benoem kort dat je ruimte nodig hebt, in plaats van stilzwijgend te verdwijnen',
      'zeg kort dat er ruimte nodig is, in plaats van zonder uitleg te verdwijnen',
      'geef even aan dat er even afstand nodig is, in plaats van geruisloos weg te trekken',
    ],
  },
  stressControl: {
    label: 'Grip zoeken onder druk',
    behavior: [
      'je grijpt onder druk naar overzicht en regie',
      'je zoekt onder druk houvast door overzicht en regie naar je toe te trekken',
      'je neemt onder spanning het overzicht en de sturing in eigen hand',
    ],
    hiddenNeed: [
      'de behoefte om niet overvallen te worden door de situatie',
      'de behoefte om niet verrast te worden door hoe de situatie loopt',
      'de behoefte aan houvast zodat de situatie je niet kan overrompelen',
    ],
    effect: [
      'mensen rondom je voelen soms minder eigen ruimte',
      'mensen om je heen ervaren soms minder eigen speelruimte',
      'mensen in je omgeving voelen zich soms wat ingeperkt in hun eigen aandeel',
    ],
    pitfall: [
      'je grip verhardt zich net wanneer flexibiliteit nodig is',
      'je vasthoudendheid neemt toe precies op het moment dat soepelheid nodig is',
      'je houvast wordt star juist op het moment dat er ruimte voor aanpassing nodig is',
    ],
    alone: 'je maakt onder druk gedetailleerde lijstjes en planningen om houvast te krijgen',
    withOthers: 'je neemt de leiding over, ook in situaties waar dat niet aan jou is',
    atWork: 'je bemoeit je onder deadline-druk met taken die je normaal aan een ander zou overlaten',
    closeCircle: 'je begint te sturen op details van een gezamenlijke gebeurtenis met familie of vrienden zodra de spanning oploopt',
    atEase: 'je deelt de regie moeiteloos met anderen zonder je zorgen te maken',
    jungian: 'Grip zoeken onder druk kan een compensatie zijn voor een dieper gevoeld gebrek aan vertrouwen dat het ook zonder jouw sturing goed komt.',
    growthKey: [
      'oefen met bewust een deel van de controle aan een ander overlaten',
      'leer bewust een stuk van de regie uit handen te geven aan een ander',
      'geef bewust een deel van de sturing uit handen, ook al voelt dat ongemakkelijk',
    ],
  },
  stressAcceleration: {
    label: 'Versnellen onder druk',
    behavior: [
      'je gaat onder druk sneller en doet meer tegelijk',
      'je versnelt onder spanning en pakt meerdere dingen tegelijk op',
      'je verhoogt onder druk je tempo en neemt meer taken tegelijk op je',
    ],
    hiddenNeed: [
      'de behoefte om het gevoel van machteloosheid weg te werken met actie',
      'de behoefte om een gevoel van machteloosheid te overstemmen met actie',
      'de behoefte om via actie het gevoel geen grip te hebben te verdrijven',
    ],
    effect: [
      'mensen om je heen raken soms vermoeid van je tempo',
      'mensen in je omgeving raken soms uitgeput van het tempo dat je aanhoudt',
      'mensen om je heen kunnen je tempo lastig bijbenen en raken er moe van',
    ],
    pitfall: [
      'je kwaliteit en je rust lijden onder het tempo dat je jezelf oplegt',
      'je nauwkeurigheid en je rust komen in de knel door het tempo dat je jezelf oplegt',
      'je zorgvuldigheid en je herstel lijden onder het hoge tempo dat je jezelf oplegt',
    ],
    alone: 'je begint aan meerdere taken tegelijk zodra je merkt dat de druk toeneemt',
    withOthers: 'je jaagt het tempo van een gesprek of vergadering op wanneer jij zelf onder druk staat',
    atWork: 'je neemt extra taken op je in plaats van te vertragen wanneer een deadline dreigt',
    closeCircle: 'je stelt jezelf en familie of vrienden onder tijdsdruk bij het organiseren van dingen die eigenlijk rustig konden',
    atEase: 'je kunt bewust vertragen zonder het gevoel te hebben dat je iets laat liggen',
    jungian: 'Versnellen onder druk kan een compensatie zijn voor een gevoel van machteloosheid dat je liever met actie overstemt dan onder ogen ziet.',
    growthKey: [
      'bouw bewust een korte pauze in vóórdat je aan de volgende taak begint',
      'las bewust een korte adempauze in voordat de volgende taak begint',
      'plan bewust een kort rustmoment in voor je aan iets nieuws begint',
    ],
  },
  stressFreeze: {
    label: 'Vastlopen onder druk',
    behavior: [
      'je loopt vast, ook al blijft je hoofd actief malen',
      'je komt tot stilstand, terwijl je gedachten intussen druk blijven doorwerken',
      'je raakt vastgelopen, ook al blijft er vanbinnen van alles doorspelen',
    ],
    hiddenNeed: [
      'de behoefte aan een uitweg die zeker voelt voordat je beweegt',
      'de behoefte aan een oplossing die zeker aanvoelt voordat er beweging komt',
      'de behoefte om pas in beweging te komen als de weg voldoende zeker voelt',
    ],
    effect: [
      'mensen zien je stilvallen, zonder te weten hoeveel er vanbinnen gebeurt',
      'mensen merken de stilstand op, zonder te weten hoeveel er intussen vanbinnen omgaat',
      'mensen zien alleen de stilstand, terwijl er vanbinnen juist veel gebeurt',
    ],
    pitfall: [
      'je blijft vastzitten in overdenken terwijl één kleine stap al beweging zou geven',
      'je blijft hangen in overdenken, terwijl al één kleine stap voor beweging zou zorgen',
      'je blijft steken in gepieker, terwijl een klein eerste stapje al verandering zou brengen',
    ],
    alone: 'je blijft malen over een probleem zonder dat er een concrete stap uit voortkomt',
    withOthers: 'je valt stil in een gesprek zodra het onderwerp te veel spanning oproept',
    atWork: 'je stelt een lastige taak uit doordat je niet weet waar te beginnen, terwijl het hoofd blijft doorwerken',
    closeCircle: 'je reageert vertraagd op een moeilijk gesprek met familie of vrienden, ook als je er wel iets over wilt zeggen',
    atEase: 'je kunt een klein, overzichtelijk eerste stapje zetten zonder het hele probleem te hoeven overzien',
    jungian: 'Bevriezen onder druk kan wijzen op een schaduw waarin de angst om de verkeerde stap te zetten groter is dan de wens om vooruit te komen.',
    growthKey: [
      'kies bewust de kleinst mogelijke eerste stap in plaats van het hele probleem in één keer op te lossen',
      'zet bewust de kleinste haalbare stap, in plaats van het hele probleem ineens te willen oplossen',
      'kies een piepklein eerste stapje, in plaats van meteen naar een totaaloplossing te zoeken',
    ],
  },
  shadowDefensiveness: {
    label: 'Jezelf verdedigen bij kritiek',
    behavior: [
      'je verdedigt jezelf sneller dan je zou willen wanneer er kritiek komt',
      'je schiet bij kritiek sneller in de verdediging dan je eigenlijk zou willen',
      'je gaat bij kritiek automatisch in de tegenaanval, sneller dan jij zelf zou wensen',
    ],
    hiddenNeed: [
      'de behoefte om niet als incompetent of verkeerd gezien te worden',
      'de behoefte om niet gezien te worden als onbekwaam of ontoereikend',
      'de behoefte om niet het gevoel te krijgen tekort te schieten in de ogen van een ander',
    ],
    effect: [
      'mensen ervaren je soms als gesloten voor feedback',
      'mensen krijgen soms het gevoel dat feedback bij je moeilijk binnenkomt',
      'mensen merken soms dat opmerkingen bij je weinig ruimte krijgen',
    ],
    pitfall: [
      'je mist waardevolle feedback omdat je eerste reactie verdediging is',
      'je laat bruikbare feedback liggen doordat je eerste reflex verdediging is',
      'je loopt nuttige feedback mis, doordat verdediging telkens je eerste reactie is',
    ],
    alone: 'je herhaalt in gedachten waarom een kritische opmerking eigenlijk niet klopte',
    withOthers: 'je reageert op feedback met een uitleg of tegenargument voordat je die opmerking echt hebt overwogen',
    atWork: 'je wijst kritiek op je werk snel af als oneerlijk of ongenuanceerd',
    closeCircle: 'je voelt je aangevallen bij goedbedoelde opmerkingen van familie of vrienden',
    atEase: 'je kunt een adempauze nemen tussen het horen van kritiek en je reactie erop',
    jungian: 'Snelle verdediging beschermt vaak een schaduw waarin het idee van incompetentie of afwijzing verborgen ligt.',
    growthKey: [
      'oefen met een adempauze tussen kritiek horen en erop reageren',
      'bouw bewust een pauze in tussen het horen van kritiek en je reactie erop',
      'wacht bewust even voordat je op kritiek reageert',
    ],
  },
  shadowAvoidance: {
    label: 'Uitstellen wat ongemakkelijk is',
    behavior: [
      'je stelt lastige gevoelens, keuzes of gesprekken uit',
      'je schuift moeilijke gevoelens, beslissingen of gesprekken voor je uit',
      'je vermijdt het aangaan van zware gevoelens, keuzes of gesprekken zolang het kan',
    ],
    hiddenNeed: [
      'de behoefte om nog niet geconfronteerd te worden met iets ongemakkelijks',
      'de behoefte om niet meteen te hoeven staan tegenover iets ongemakkelijks',
      'de behoefte om iets ongemakkelijks nog even op afstand te houden',
    ],
    effect: [
      'mensen merken dat bepaalde onderwerpen bij jou blijven liggen',
      'mensen merken op dat sommige onderwerpen bij jou lang blijven liggen',
      'mensen zien dat bepaalde kwesties bij jou onaangeroerd blijven',
    ],
    pitfall: [
      'uitstel maakt het probleem uiteindelijk groter dan wanneer je het eerder had aangepakt',
      'door uitstel groeit het probleem uiteindelijk groter dan wanneer het eerder was aangepakt',
      'hoe langer het wordt uitgesteld, hoe groter het probleem uiteindelijk wordt',
    ],
    alone: 'je vermijdt bewust om over een bepaald onderwerp na te denken',
    withOthers: 'je verandert van onderwerp zodra een gesprek richting iets ongemakkelijks beweegt',
    atWork: 'je stelt een lastig gesprek met een collega of leidinggevende telkens uit',
    closeCircle: 'je laat een onuitgesproken kwestie met familie of vrienden jarenlang liggen',
    atEase: 'je durft een klein, ongemakkelijk onderwerp aan te snijden zonder het uit te stellen',
    jungian: 'Structureel vermijden voedt de schaduw: wat niet onder ogen wordt gezien, verdwijnt niet, maar blijft ongezien meespelen in gedrag.',
    growthKey: [
      'kies één klein, ongemakkelijk onderwerp om deze week wél aan te snijden',
      'kies deze week bewust één klein ongemakkelijk onderwerp om juist wel te bespreken',
      'spreek deze week bewust één klein, ongemakkelijk punt uit in plaats van het te laten liggen',
    ],
  },
  growthReadiness: {
    label: 'Groeibereidheid',
    behavior: [
      'je bent bereid om naar je eigen patronen te kijken, ook als dat confronterend is',
      'je durft je eigen patronen onder ogen te zien, ook wanneer dat confronterend is',
      'je staat open om naar je eigen gedrag te kijken, zelfs als dat ongemakkelijk voelt',
    ],
    hiddenNeed: [
      'de behoefte om jezelf steeds beter te leren kennen',
      'de behoefte om steeds meer inzicht te krijgen in jezelf',
      'de behoefte om jezelf gaandeweg beter te begrijpen',
    ],
    effect: [
      'mensen ervaren je als iemand die open staat voor eigen ontwikkeling',
      'mensen zien je als iemand die openstaat voor persoonlijke groei',
      'mensen merken dat je oprecht openstaat voor je eigen ontwikkeling',
    ],
    pitfall: [
      'je kunt zo gericht zijn op groeien dat je vergeet ook gewoon te zijn wie je al bent',
      'je kunt zo gefocust raken op ontwikkeling dat je vergeet er ook gewoon al te mogen zijn',
      'je richt je soms zo op groeien dat er weinig ruimte overblijft om te zijn wie je al bent',
    ],
    alone: 'je denkt regelmatig na over wat je van een ervaring kunt leren',
    withOthers: 'je vraagt actief om feedback over je eigen gedrag',
    atWork: 'je zoekt naar manieren om je aanpak te verbeteren, ook als die al goed genoeg werkt',
    closeCircle: 'je bespreekt open met familie en vrienden welk patroon je bij jezelf herkent',
    atEase: 'je kunt tevreden zijn met wie je al bent, naast de wens om verder te groeien',
    jungian: 'Groeibereidheid is de motor van individuatie: de bereidheid om schaduw, persona en compensatie onder ogen te zien en tot een meer heel zelfbeeld te komen.',
    growthKey: [
      'vier bewust wat er al klopt, naast wat er nog mag groeien',
      'sta bewust stil bij wat er al goed gaat, naast wat er nog mag groeien',
      'waardeer bewust wat er al goed is, naast de ruimte die er nog is om te groeien',
    ],
  },
};
