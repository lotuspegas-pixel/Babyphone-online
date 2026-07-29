import type { Phrasing } from '../lib/arcanaVariants';
import type { SubDimensionId } from '../types/arcana';

/**
 * De acht beschouwingen uit docs/arcana/resultaten.md, in verkorte vorm en
 * gekoppeld aan scores. Elke regel wordt alleen getoond wanneer de betrokken
 * subdimensies binnen de opgegeven grenzen vallen, zodat de tekst die iemand
 * leest herleidbaar is naar de eigen antwoorden en niet op iedereen past.
 */

export interface ReflectionCondition {
  id: SubDimensionId;
  /** Minimale score (inclusief). Standaard 0. */
  min?: number;
  /** Maximale score (inclusief). Standaard 100. */
  max?: number;
}

export interface ReflectionRule {
  /** Alle condities moeten gelden voordat deze duiding meetelt. */
  when: ReflectionCondition[];
  text: string;
}

export interface ReflectionTheme {
  id: string;
  title: string;
  /**
   * De kern van de beschouwing; geldt voor iedereen en claimt niets persoonlijks.
   * Eén element per alinea; elke alinea mag meerdere gelijkwaardige formuleringen
   * hebben waaruit deterministisch gekozen wordt.
   */
  essence: Phrasing[];
  /** Score-gebaseerde duidingen. Er worden er hoogstens drie getoond. */
  rules: ReflectionRule[];
  /** Wordt alleen gebruikt wanneer geen enkele regel matcht. */
  fallback: string;
  question: Phrasing;
}

export const REFLECTION_THEMES: ReflectionTheme[] = [
  {
    id: 'liefde',
    title: 'Over liefde',
    essence: [
      [
        'Verliefdheid begint bijna altijd als projectie: je legt op een ander een beeld dat je al lang met je meedraagt. Er komt een dag waarop dat beeld scheurt en de ander eronder tevoorschijn komt. De meeste mensen noemen dat het einde van de liefde. Het is het begin ervan.',
        'Wie verliefd wordt, is meestal aan het projecteren: er wordt een beeld op de ander gelegd dat allang klaarlag, lang voordat deze persoon bestond. Op een gegeven moment scheurt dat beeld en staat de werkelijke ander ineens bloot. De meesten schrikken daarvan en noemen het de liefde die stukloopt. Precies daar begint ze pas echt.',
        'In het begin van verliefdheid zie je zelden de ander — je ziet een projectie, een beeld dat je al meedroeg voordat je deze persoon kende. Er breekt onvermijdelijk een moment aan waarop dat beeld scheurt en degene die eronder zat zichtbaar wordt. Veel mensen ervaren dat scheuren als het uiteenvallen van de liefde. Het is eerder het moment waarop ze kan beginnen.',
      ],
      [
        'Wij houden van anderen op de manier waarop wij van onszelf houden. De grens van je liefde ligt precies waar de grens van je zelfkennis ligt — en dat is de reden dat elke relatie die vastloopt, met een zekere onbeschoftheid wijst naar de plek waar jouw werk ligt.',
        'De manier waarop je van jezelf houdt, is ook de manier waarop je van een ander kunt houden — niet meer en niet minder. Waar je zelfkennis ophoudt, houdt ook je liefde op, hoe onwelkom die grens ook is. Daarom wijst een relatie die vastloopt vaak recht en zonder omwegen naar het stuk werk dat nog op je ligt te wachten.',
        'Er zit een plafond aan hoeveel je van een ander kunt houden, en dat plafond wordt bepaald door hoe goed je jezelf kent — niet door hoeveel je van de ander houdt. Elke keer dat een relatie vastloopt op datzelfde punt, is dat geen toeval maar een botte vinger die wijst naar de plek waar je zelfkennis tekortschiet.',
      ],
    ],
    rules: [
      {
        when: [{ id: 'intimacyNeed', min: 65 }, { id: 'trustNeed', min: 65 }],
        text: 'Je verlangt naar diepte en je hebt tijd nodig voordat je die toelaat. Dat is geen tegenstrijdigheid maar een tempo. Het wordt pas een probleem wanneer je van een ander verwacht dat die het verschil aanvoelt zonder dat je het hebt uitgelegd.',
      },
      {
        when: [{ id: 'peoplePleasing', min: 65 }, { id: 'directness', max: 45 }],
        text: 'Bij jou verandert liefde makkelijk in dienstbaarheid. Je geeft, past aan en vult in — en op een dag weet de ander niet meer wat jij eigenlijk wilt, omdat je het zelf niet meer weet. Wie nooit iets vraagt, maakt de ander onbedoeld tot iemand die nooit iets geeft.',
      },
      {
        when: [{ id: 'independenceNeed', min: 65 }, { id: 'connectionNeed', min: 65 }],
        text: 'Je hebt nabijheid nodig en je raakt er benauwd van. Je hebt geen partner nodig die minder vraagt, maar een die het uithoudt wanneer je even weg bent — en je hebt jezelf nodig om te zeggen dat je terugkomt, in plaats van het te laten raden.',
      },
      {
        when: [{ id: 'criticismSensitivity', min: 70 }],
        text: 'Een terloopse opmerking van iemand die je liefhebt, kan bij jou een gebeurtenis worden die dagen nawerkt. De ander weet dat meestal niet. Dat is geen overgevoeligheid die je moet wegwerken; het is informatie die je mag delen.',
      },
      {
        when: [{ id: 'socialEnergy', min: 65 }, { id: 'intimacyNeed', max: 50 }],
        text: 'Je maakt makkelijk contact en veel mensen mogen je graag. De vraag die daaronder ligt is of iemand je ook werkelijk kent, of dat je vooral goed gezelschap bent. Breedte is geen vervanging voor diepte, hoe prettig ze ook is.',
      },
    ],
    fallback:
      'Jouw scores wijzen niet op één dominant patroon in de liefde. Dat betekent meestal dat de context bepaalt hoe je je hecht: bij de een geef je makkelijk, bij de ander houd je af. Let de komende maanden op wie welke versie van jou tevoorschijn haalt.',
    question: [
      'Wat vraag je van de mensen van wie je houdt, zonder het ooit hardop te hebben gevraagd?',
      'Welke vraag stel je impliciet aan wie je liefhebt, terwijl je hem nooit hardop hebt uitgesproken?',
      'Wat verwacht je stilzwijgend van de mensen die je liefhebt, zonder dat je het ooit met woorden hebt gevraagd?',
    ],
  },
  {
    id: 'haat',
    title: 'Over haat',
    essence: [
      [
        'Haat is geen tegenpool van liefde; onverschilligheid is dat. Haat is liefde die geen kant op kan, of erkenning die niet kwam, of een grens die zo vaak is overgestoken dat er alleen nog prikkeldraad ligt.',
        'Niet haat is de tegenpool van liefde, maar onverschilligheid — haat blijft juist verwant aan wat het bestrijdt. Vaak is het liefde die nergens heen kon, erkenning die uitbleef, of een grens die zo vaak werd overschreden dat er niets meer overbleef dan prikkeldraad.',
        'Mensen denken dat haat het omgekeerde van liefde is, maar dat is onverschilligheid. Haat draagt nog altijd de sporen van wat eraan voorafging: liefde die vastliep, erkenning die nooit kwam, of een grens die zo vaak werd geschonden dat alleen prikkeldraad overbleef.',
      ],
      [
        'Let op het verschil in temperatuur. Afkeer van iemand die kwaad doet is koel en helder. Haat is heet, komt terug, en wil dat de ander het weet. Die hitte komt zelden alleen van buiten: wat we in anderen het diepst verachten, draagt bijna altijd iets van onszelf.',
        'Het verschil zit in de temperatuur. Wie iemand afkeurt om wat die deed, voelt iets kils en helders; haat daarentegen is heet, blijft terugkomen en wil gezien worden door wie hij treft. Die hitte is zelden puur extern opgewekt — wat we bij anderen het felst verafschuwen, verraadt bijna altijd iets van onszelf.',
        'Er is een duidelijk temperatuurverschil tussen de twee. Afkeuring van iemand die iets fout doet, blijft koel en overzichtelijk. Haat brandt, laait steeds opnieuw op, en verlangt ernaar dat de ander het voelt. Die warmte komt zelden alleen van de ander vandaan: wat ons in iemand anders het diepst tegenstaat, draagt bijna altijd een spoor van onszelf.',
      ],
    ],
    rules: [
      {
        when: [{ id: 'conflictAvoidance', min: 65 }, { id: 'criticismSensitivity', min: 65 }],
        text: 'Bij jou blijft wrok het langst zitten, om een eenvoudige reden: je zegt het niet, dus het gaat niet weg. Wat je inslikt verdwijnt niet, het verhuist. Meestal naar een toon die je zelf niet herkent, maanden later, over iets kleins.',
      },
      {
        when: [{ id: 'shadowDefensiveness', min: 65 }],
        text: 'Bij een aanval wil jij eerst gelijk hebben en voel je pas veel later wat er werkelijk geraakt werd. Die volgorde kost je informatie. De vraag die de deur opent is niet "heb ik gelijk?" maar "waarom raakt dit mij zo hard?".',
      },
      {
        when: [{ id: 'directness', min: 70 }],
        text: 'Jij blust sneller dan de meeste mensen: je zegt het, het is eruit, en je ligt er niet wakker van. Wees je ervan bewust dat de ander soms wél wakker ligt — jouw opluchting is niet automatisch een gedeelde opluchting.',
      },
      {
        when: [{ id: 'growthReadiness', max: 45 }],
        text: 'De vraag "welk deel hiervan is van mij?" is op dit moment moeilijk voor je te verdragen. Dat is begrijpelijk en het is ook precies de deur. Je hoeft hem niet vandaag open te doen; het helpt al om te weten waar hij zit.',
      },
      {
        when: [{ id: 'peoplePleasing', min: 65 }, { id: 'selfDoubt', min: 60 }],
        text: 'Jij hoort waarschijnlijk bij de mensen die zeggen dat ze nooit haten. Kijk daar eens goed naar. Wie zichzelf niet toestaat boos te worden op wie hem beschadigde, wordt vaak boos op zichzelf omdat hij het liet gebeuren. Dat is geen mildheid, dat is haat die de verkeerde kant op wijst.',
      },
    ],
    fallback:
      'Je scores wijzen niet op een sterk patroon van vastzittende wrok. Dat is een rustiger uitgangspunt dan veel mensen hebben. Het blijft de moeite waard om af en toe te toetsen of je afkeer ergens koel is gebleven, of stiekem is gaan verhitten.',
    question: [
      'Aan wie denk je met een hitte die groter is dan wat die persoon nog met je te maken heeft?',
      'Bij wie voel je nog een hitte die niet meer in verhouding staat tot wat die persoon vandaag nog met je leven te maken heeft?',
      'Wie roept bij jou een woede op die groter is dan de rol die deze persoon nu nog in je leven speelt?',
    ],
  },
  {
    id: 'pijn',
    title: 'Over pijn',
    essence: [
      [
        'Pijn is niet hetzelfde als lijden. Pijn is wat er gebeurt; lijden is het verhaal dat je erbij vertelt. Dat is geen aansporing om je pijn weg te denken — sommige dingen doen gewoon pijn. Maar de tweede laag, het "dit had niet mogen gebeuren", is soms te herzien. De gebeurtenis niet.',
        'Pijn en lijden zijn niet hetzelfde. Pijn is de gebeurtenis zelf; lijden is het verhaal dat eromheen wordt gebouwd. Dat betekent niet dat je pijn moet wegredeneren — sommige dingen doen simpelweg pijn en dat blijft zo. Maar de tweede laag, de gedachte dat het niet had mogen gebeuren, is soms te herschrijven. De gebeurtenis zelf niet.',
        'Pijn en lijden lopen vaak door elkaar, maar zijn niet identiek. Pijn is wat je is overkomen; lijden is de laag verhaal die je eromheen bouwt. Dat is geen pleidooi om pijn te ontkennen — sommige dingen doen gewoon pijn en dat verandert niet. Alleen dat tweede verhaal, dat "dit had niet mogen gebeuren", laat zich soms bijstellen. De gebeurtenis zelf ligt vast.',
      ],
      [
        'Pijn die je niet voelt, verdwijnt niet. Hij verhuist: naar je lichaam, naar je kortere lontje, naar de manier waarop je reageert op iets wat er weinig mee te maken heeft. En er bestaat een tegenovergestelde valkuil: je pijn zo omarmen dat hij je identiteit wordt, want dan zou genezen betekenen dat je niet meer weet wie je bent.',
        'Wie zijn pijn niet voelt, is er niet vanaf — die pijn verplaatst zich. Naar het lichaam, naar een kortere lont, naar felle reacties op dingen die er nauwelijks iets mee te maken hebben. Aan de andere kant ligt een even riskante val: pijn zo stevig omarmen dat ze onderdeel wordt van wie je bent, waardoor genezen ineens zou aanvoelen als jezelf verliezen.',
        'Ongevoelde pijn gaat niet weg, ze verhuist alleen: naar spanning in het lijf, naar een korter lontje, naar uitbarstingen bij dingen die er weinig mee te maken hebben. Maar er is ook de omgekeerde valkuil, minstens zo hardnekkig: pijn zo dicht bij je identiteit laten komen dat herstel zou aanvoelen als jezelf kwijtraken.',
      ],
    ],
    rules: [
      {
        when: [{ id: 'shadowAvoidance', min: 65 }, { id: 'stressWithdrawal', min: 60 }],
        text: 'Jij gaat eromheen. Dat werkt kort en het wordt duurder: uitstel maakt van een gesprek een confrontatie en van een gevoel een gewoonte. Kies één klein, ongemakkelijk onderwerp en snijd het deze maand aan — niet het grootste, het kleinste.',
      },
      {
        when: [{ id: 'emotionalSensitivity', min: 65 }, { id: 'trustNeed', min: 65 }],
        text: 'Je voelt veel en je deelt weinig. Dat is de eenzaamste combinatie in dit hele model, en het is er een die van buiten nauwelijks te zien is. Eén mens die het mag weten, is genoeg om het verschil te maken.',
      },
      {
        when: [{ id: 'analyticalThinking', min: 70 }, { id: 'emotionalSensitivity', max: 50 }],
        text: 'Jij begrijpt je pijn vaak lang voordat je hem voelt. Dat begrip is echt en het is niet hetzelfde als verwerken. Let op het moment waarop je een verklaring geeft terwijl iemand naar een gevoel vroeg.',
      },
      {
        when: [{ id: 'growthReadiness', min: 70 }, { id: 'perfectionism', min: 65 }],
        text: 'Je bent bereid naar jezelf te kijken, en er zit een risico in dat het een prestatie wordt. Aan jezelf werken kan een manier worden om nooit ergens aan te komen. Soms is niet-werken aan jezelf het werk.',
      },
    ],
    fallback:
      'Je scores wijzen niet op een uitgesproken vermijdings- of vastklampatroon rond pijn. Dat is gunstig, maar het zegt niets over wat je hebt meegemaakt — alleen iets over hoe je er doorgaans mee omgaat.',
    question: [
      'Wat draag je al zo lang dat je vergeten bent dat het gewicht heeft?',
      'Wat sleep je al zo lang met je mee dat het gewicht ervan onzichtbaar is geworden?',
      'Welke last torst je al zo lang dat je niet meer merkt hoe zwaar hij is?',
    ],
  },
  {
    id: 'intuitie',
    title: 'Over intuïtie',
    essence: [
      [
        'Intuïtie is niet mysterieus, ze is alleen sneller dan je taal. Wat je aanvoelt is meestal waarneming die de bewuste route heeft overgeslagen: een gezicht dat niet meedeed met de woorden, een patroon dat je duizend keer eerder zag zonder het ooit op te schrijven. Je weet het echt; je weet alleen niet hoe.',
        'Intuïtie is niet zweverig, ze is vooral snel — sneller dan de taal die haar zou moeten uitleggen. Wat je aanvoelt, is meestal waarneming die de bewuste omweg heeft overgeslagen: een blik die niet paste bij de woorden, een patroon dat je al talloze keren zag zonder het ooit te benoemen. Je weet het echt wel; alleen het hoe blijft onduidelijk.',
        'Er zit weinig mysterie in intuïtie — ze is gewoon eerder dan je woorden. Wat je voelt aankomen, is vaak informatie die de omweg via het bewuste denken niet nodig had: een gezicht dat iets anders zei dan de mond, een patroon dat je al vaak zag maar nooit onder woorden bracht. Je weet het wel degelijk; je kunt alleen niet uitleggen hoe.',
      ],
      [
        'Maar intuïtie is geen orakel. Ze wordt vertroebeld door angst en door verlangen. Het verschil met projectie is te leren: intuïtie is kalm en specifiek, projectie is heet en algemeen. Intuïtie zegt dat er iets niet klopte aan wat hij net zei. Projectie zegt dat mensen zoals hij niet deugen.',
        'Toch is intuïtie geen orakel; angst en verlangen vertroebelen haar makkelijk. Het onderscheid met projectie valt te trainen: intuïtie voelt kalm en specifiek aan, projectie voelt heet en algemeen. Intuïtie zegt dat er iets niet klopte aan wat hij net zei. Projectie zegt dat mensen zoals hij niet deugen.',
        'Maar intuïtie voorspelt niets met zekerheid — angst en verlangen kunnen haar makkelijk vervuilen. Het verschil met projectie is aan te leren: intuïtie blijft kalm en concreet, projectie wordt heet en algemeen. Intuïtie merkt dat er iets schuurde in wat hij net zei. Projectie concludeert dat mensen zoals hij niet te vertrouwen zijn.',
      ],
    ],
    rules: [
      {
        when: [{ id: 'intuitiveThinking', min: 65 }, { id: 'analyticalThinking', min: 65 }],
        text: 'Je voelt het meteen en gelooft het pas als het klopt. Dat kost je tijd die je soms niet had. De werkbare volgorde is: laat je intuïtie de hypothese leveren en je verstand de toetsing doen — niet andersom, want dan komt de hypothese nooit.',
      },
      {
        when: [{ id: 'intuitiveThinking', min: 65 }, { id: 'selfDoubt', min: 65 }],
        text: 'Dit is de pijnlijkste variant: je wist het wel, maar je durfde het niet. Meestal is dat niet omdat je jezelf onbetrouwbaar vond, maar omdat iemand ooit vroeg hoe je het wist en "ik voel het" onvoldoende bleek. Houd een half jaar bij wat je aanvoelde en wat er daarna gebeurde. Dan heb je bewijs dat niemand je kan afpakken.',
      },
      {
        when: [{ id: 'emotionalSensitivity', min: 70 }],
        text: 'Je vangt meer op dan de meeste mensen — ook wat er niet is. Hoge gevoeligheid versterkt je signaal én je ruis. Toets daarom vaker dan je nodig acht: vraag na of klopte wat je opving.',
      },
      {
        when: [{ id: 'intuitiveThinking', max: 45 }, { id: 'practicalThinking', min: 60 }],
        text: 'Jij leest de wereld via wat er gebeurt in plaats van via wat er hangt. Dat is geen gemis maar een ander instrument, en het is in veel situaties het betrouwbaardere. Let alleen op momenten waarop mensen iets zeggen zonder het te zeggen.',
      },
    ],
    fallback:
      'Je scores wijzen op een gemengde verhouding tussen aanvoelen en beredeneren, waarbij de situatie bepaalt welke het wint. Dat is werkbaar. De valkuil is dat je achteraf niet meer weet op welke van de twee je je keuze baseerde.',
    question: [
      'Wanneer wist je het, en hoe lang heb je gedaan alsof je het niet wist?',
      'Op welk moment wist je het al, en hoe lang heb je jezelf wijsgemaakt van niet?',
      'Wanneer voelde je het al aankomen, en hoe lang heb je net gedaan of dat niet zo was?',
    ],
  },
  {
    id: 'verdriet',
    title: 'Over verdriet',
    essence: [
      [
        'Verdriet is de prijs van gehechtheid, en er is geen korting. Wat opvalt is hoe slecht wij het toestaan — bij onszelf en bij elkaar. Na twee maanden wordt er gekeken, na een half jaar hoor je dat je verder moet, alsof rouw een reis is met een aankomsttijd. Verdriet gaat niet weg; het wordt draagbaar, wat iets anders is en genoeg.',
        'Verdriet is de prijs die gehechtheid vraagt, en er wordt niet afgedongen. Opvallend is hoe weinig ruimte we ervoor maken, bij onszelf en bij anderen. Na een paar maanden komen de blikken, na een half jaar de opmerking dat het tijd wordt — alsof rouw een reis is met een vaste aankomsttijd. Verdriet verdwijnt niet; het wordt op den duur draagbaar, en dat is een ander soort einde, maar wel genoeg.',
        'Wie zich hecht, betaalt op een dag met verdriet — een vaste prijs zonder korting. Wat opvalt, is hoe onhandig we daarmee omgaan, bij onszelf net zo goed als bij een ander. Na enkele maanden volgen de vragende blikken, na een half jaar de suggestie dat het welletjes is, alsof rouw een schema volgt. Maar verdriet gaat niet over; het wordt hooguit te dragen, en dat moet volstaan.',
      ],
      [
        'Verdriet en somberheid zonder voorwerp zijn niet hetzelfde. Verdriet mist iets in het bijzonder en er zit beweging in: je huilt, je bent boos, je lacht onverwacht om een herinnering. Als alles vlak wordt en niets meer beweegt, is dat geen verdriet meer en is een gesprek met je huisarts op zijn plaats.',
        'Verdriet is niet hetzelfde als een somberheid die nergens meer over gaat. Verdriet heeft een duidelijk object en blijft in beweging: er wordt gehuild, er is woede, er klinkt onverwacht een lach bij een herinnering. Wordt alles vlak en stopt die beweging helemaal, dan gaat het niet meer om verdriet, en is een gesprek met je huisarts dan op zijn plaats.',
        'Er is een verschil tussen verdriet en een somberheid zonder duidelijk voorwerp. Verdriet gaat altijd ergens over en blijft bewegen — huilen, boosheid, een onverwachte lach bij een herinnering horen erbij. Als die beweging helemaal wegvalt en alles vlak wordt, is dat geen verdriet meer, en is het verstandig dat gesprek met je huisarts aan te gaan.',
      ],
    ],
    rules: [
      {
        when: [{ id: 'stressWithdrawal', min: 65 }],
        text: 'In verdriet verdwijn jij, precies wanneer je mensen het hardst nodig hebt. Dat is niet zwak en het is ook niet vrijblijvend. Spreek van tevoren met één iemand af dat die contact opneemt als jij stil wordt — dan hoef je op je slechtste dag niets te vragen.',
      },
      {
        when: [{ id: 'stressAcceleration', min: 65 }],
        text: 'Jij vlucht in beweging en werk, en je haalt maanden later in wat je oversloeg. Die rekening komt altijd. Plan bewust momenten waarop er niets te doen is, ook al is dat precies wat je op dat moment niet wilt.',
      },
      {
        when: [{ id: 'independenceNeed', min: 70 }],
        text: 'Je vraagt niet. Dat heeft je vaak goed gediend en het werkt in rouw tegen je, omdat mensen om je heen jouw zelfstandigheid lezen als "het gaat wel". Zij wachten op een signaal dat jij niet van plan bent te geven.',
      },
      {
        when: [{ id: 'peoplePleasing', min: 65 }],
        text: 'Jij draagt andermans verdriet terwijl je eigen verdriet in de wachtkamer zit. Op een begrafenis ben jij degene die koffie inschenkt. Dat is waardevol, en het is ook een manier om er niet aan toe te komen.',
      },
      {
        when: [{ id: 'emotionalSensitivity', min: 65 }, { id: 'intimacyNeed', min: 65 }],
        text: 'Je voelt het diep en je kunt het delen. Dat is, ondanks alles wat het je kost, een gelukkige combinatie in zware tijden: verdriet dat genoemd mag worden, hoeft zich niet te verstoppen.',
      },
    ],
    fallback:
      'Je scores wijzen niet op één dominante manier om met verlies om te gaan. Dat betekent vaak dat je in verschillende situaties verschillend rouwt — bij de ene dood ben je stil, bij de andere druk. Beide zijn van jou.',
    question: [
      'Wie mag jou zien huilen, en wanneer heb je dat voor het laatst toegestaan?',
      'Voor wie sta je toe dat je huilt, en wanneer is dat voor het laatst gebeurd?',
      'Bij wie mag je verdriet zichtbaar worden, en wanneer heb je dat voor het laatst laten gebeuren?',
    ],
  },
  {
    id: 'tegenslagen',
    title: 'Over tegenslagen',
    essence: [
      [
        'Er is een gedachte die veel schade aanricht en die bemoedigend klinkt: alles gebeurt met een reden. Dat is niet waar. Veel gebeurt zonder reden. Wie gelooft dat de wereld uitdeelt naar verdienste, komt op een dag in de positie dat hij zijn eigen ongeluk moet verklaren — en dan is er nog maar één verdachte over.',
        'Er bestaat een geruststellend klinkende gedachte die veel kwaad doet: alles gebeurt met een reden. Dat klopt niet. Heel veel gebeurt zonder enige reden. Wie ervan uitgaat dat het leven verdiensten beloont, komt vroeg of laat voor de opgave te staan zijn eigen ongeluk te moeten verklaren — en dan blijft er nog maar één schuldige over.',
        'Eén troostend bedoelde gedachte richt veel schade aan: dat alles met een reden gebeurt. Dat is onwaar. Het merendeel gebeurt zonder enige reden. Wie gelooft dat de wereld uitdeelt naar wat je verdient, staat op een dag voor de taak zijn eigen tegenslag te verklaren — en dan is er nog maar één overgebleven verdachte.',
      ],
      [
        'Wat wél waar is: gebeurtenissen hebben geen betekenis, maar mensen maken betekenis. Niet "dit moest zo zijn", maar "dit is wat ik hiermee ga doen". En tegenslag vormt je karakter zelden; ze onthult het. Onder druk verdwijnt je persona als eerste, want je hebt de energie niet meer om hem overeind te houden.',
        'Wat wel klopt: gebeurtenissen zijn op zichzelf betekenisloos, het is de mens die er betekenis aan geeft. Niet "dit was nodig", maar "dit is wat ik ermee ga doen". Tegenslag vormt zelden je karakter — ze legt het bloot. Onder druk verdwijnt de persona als eerste, omdat de energie ontbreekt om hem overeind te houden.',
        'Waar wel iets in zit: op zichzelf betekenen gebeurtenissen niets, mensen zijn degenen die er betekenis in leggen. Niet "dit moest gebeuren", maar "dit ga ik ermee doen". En tegenslag bouwt zelden karakter op — ze laat zien wat er al was. Onder druk valt de persona als eerste weg, simpelweg omdat er geen energie meer over is om hem in stand te houden.',
      ],
    ],
    rules: [
      {
        when: [{ id: 'selfDoubt', min: 65 }],
        text: 'Jij maakt van elke tegenslag een bewijsstuk tegen jezelf. Daar moet je actief tegen inleggen, want je doet het sneller dan je het merkt. Scheid het deel dat je overkwam van het deel waar je aan meewerkte, en geef de rest terug aan het toeval.',
      },
      {
        when: [{ id: 'controlNeed', min: 70 }],
        text: 'Voor jou is tegenslag dubbel zwaar: niet alleen het verlies, ook het besef dat je het niet in de hand had. Dat tweede is vaak het zwaarste, en het is het deel waar geen enkele hoeveelheid vooruitdenken tegen helpt.',
      },
      {
        when: [{ id: 'stressFreeze', min: 65 }],
        text: 'De eerste weken zullen traag zijn. Straf jezelf daar niet extra voor. Kies één kleine stap in plaats van de hele weg — niet omdat dat genoeg is, maar omdat dat het enige is wat op zo\'n moment werkt.',
      },
      {
        when: [{ id: 'growthReadiness', min: 65 }, { id: 'meaningNeed', min: 65 }],
        text: 'Jij bent iemand die van een slecht jaar iets kan maken. Dat is een echte kracht en er zit een addertje bij: de neiging om te snel naar de les te springen, voordat je het verlies hebt gevoeld. Betekenis geven werkt beter als het niet haastig gebeurt.',
      },
      {
        when: [{ id: 'shadowDefensiveness', min: 65 }, { id: 'growthReadiness', max: 50 }],
        text: 'Je eerste beweging na een klap is verklaren waarom het niet aan jou lag. Soms klopt dat volledig. Maar die reflex maakt het moeilijk om het deel te vinden dat wél van jou was — en dat deel is het enige dat je kunt meenemen.',
      },
    ],
    fallback:
      'Je scores wijzen niet op een uitgesproken patroon in hoe je met tegenslag omgaat. Dat maakt de vraag interessanter dan het antwoord: kijk terug op de laatste keer dat iets misging en let op wie je toen werd.',
    question: [
      'Welk deel van wat je overkwam was werkelijk van jou — en heb je de rest al teruggegeven aan het toeval?',
      'Welk deel van wat er gebeurde had werkelijk met jou te maken — en heb je de rest al aan het toeval overgelaten?',
      'Wat van wat je is overkomen was echt aan jou toe te schrijven, en heb je de rest al losgelaten als puur toeval?',
    ],
  },
  {
    id: 'geluk',
    title: 'Over geluk',
    essence: [
      [
        'Geluk is geen gevoel maar een verhouding. Wie mensen aan het eind van hun leven vraagt wanneer ze gelukkig waren, krijgt zelden pieken te horen. Ze noemen een keuken, een periode waarin het gewoon goed was en ze het niet doorhadden. Geluk is de achtergrond, niet de gebeurtenis.',
        'Geluk is minder een gevoel dan een verhouding. Vraag mensen aan het einde van hun leven wanneer ze gelukkig waren, en ze noemen zelden een hoogtepunt. Ze noemen een keuken, een periode waarin alles gewoon klopte zonder dat ze het in de gaten hadden. Geluk speelt zich af op de achtergrond, niet in het moment zelf.',
        'Geluk laat zich beter beschrijven als verhouding dan als gevoel. Wie oude mensen vraagt naar hun gelukkigste momenten, hoort zelden een piek terug. Ze beschrijven een keuken, een tijd waarin het simpelweg goed ging zonder dat het opviel. Geluk speelt zich af als achtergrond, niet als gebeurtenis.',
      ],
      [
        'De stilste vorm van ongelukkig zijn kent geen drama: een leven dat aan de buitenkant klopt en aan de binnenkant van iemand anders is. Het goede werk, de goede relatie, en een vermoeidheid waar geen slaap tegenop kan. Geluk vraagt vooral dat je niet in strijd leeft met wat je bent.',
        'De meest onopvallende vorm van ongeluk kent geen enkel drama: een leven dat er van buiten kloppend uitziet en vanbinnen van iemand anders lijkt te zijn. Het goede werk, de goede relatie, en een uitputting waar geen nacht slaap tegen opgewassen is. Geluk vraagt vooral dat je niet leeft in tegenspraak met wie je bent.',
        'Ongeluk in zijn stilste vorm heeft geen aanleiding nodig: een leven dat er aan de buitenkant helemaal goed uitziet, terwijl het vanbinnen als andermans leven aanvoelt. Het prima werk, de prima relatie, en een vermoeidheid waar geen enkele nacht slaap iets aan verandert. Geluk vergt vooral dat je niet blijft leven tegen jezelf in.',
      ],
    ],
    rules: [
      {
        when: [{ id: 'meaningNeed', min: 65 }],
        text: 'Comfort maakt jou niet gelukkig. Je hebt richting nodig, ook wanneer die richting lastig is — en een aangenaam leven zonder richting zal bij jou aanvoelen als iets wat je niet mag benoemen omdat het van buiten zo goed lijkt.',
      },
      {
        when: [{ id: 'recognitionNeed', min: 65 }, { id: 'selfDoubt', min: 65 }],
        text: 'Dit is de kwetsbaarste constructie in dit model: je geluk ligt grotendeels in andermans handen. Je hebt bevestiging nodig en je gelooft haar niet helemaal wanneer ze komt. De uitweg is niet minder erkenning willen, maar één bron opbouwen die niet van anderen afhangt.',
      },
      {
        when: [{ id: 'autonomyNeed', min: 70 }],
        text: 'Een gouden kooi blijft voor jou een kooi, hoe goud ook. Dat maakt je moeilijk tevreden te stellen met omstandigheden die anderen benijden, en het is geen ondankbaarheid — het is een correcte meting van wat jij nodig hebt.',
      },
      {
        when: [{ id: 'perfectionism', min: 70 }],
        text: 'Jij stelt geluk voortdurend uit tot na de volgende voltooiing, en er is altijd een volgende. Dat is geen karakterfout maar een rekenfout: de voorwaarde die je stelt, wordt per definitie nooit bereikt.',
      },
      {
        when: [{ id: 'securityNeed', min: 65 }, { id: 'autonomyNeed', min: 65 }],
        text: 'Jij hebt een vorm van leven nodig die stabiel is zonder vast te zitten. Die bestaat, maar je zult hem zelf moeten bouwen, want de kant-en-klare varianten kiezen altijd één van de twee.',
      },
    ],
    fallback:
      'Je scores wijzen niet op één sterke voorwaarde voor je geluk. Dat geeft ruimte en het maakt de vraag lastiger: als niets je duidelijk drijft, is het makkelijker om ergens in te blijven hangen dat net niet klopt.',
    question: [
      'Wanneer was je gelukkig zonder het te merken — en wat was er toen aanwezig dat er nu niet is?',
      'Wanneer voelde je je gelukkig zonder dat je het doorhad — en wat ontbreekt daar nu aan?',
      'Op welk moment was je gelukkig zonder het te beseffen, en wat was er toen wel dat nu weg is?',
    ],
  },
  {
    id: 'blijdschap',
    title: 'Over blijdschap',
    essence: [
      [
        'Geluk is een verhouding over jaren; blijdschap is een gebeurtenis van veertig seconden. Licht dat door een raam valt. Iemand die je naam zegt op de goede toon. Blijdschap heeft geen oorzaak nodig en houdt zich niet aan verdienste — ze overkomt de rouwende net zo goed als de gelukkige.',
        'Geluk speelt zich af over jaren; blijdschap duurt hooguit veertig seconden. Licht dat schuin door een raam valt. Iemand die je naam op precies de goede toon uitspreekt. Blijdschap vraagt geen aanleiding en houdt zich niet aan verdienste — ze bezoekt wie rouwt evengoed als wie gelukkig is.',
        'Waar geluk zich over jaren uitstrekt, duurt blijdschap een handvol seconden. Zonlicht dat door een raam valt. Iemand die je naam zegt op precies de juiste toon. Blijdschap heeft geen reden nodig en trekt zich niets aan van verdienste — ze vindt de rouwende net zo makkelijk als de gelukkige.',
      ],
      [
        'Wat blijdschap zo makkelijk mist, is niet het gebrek aan aanleiding maar aandacht. De momenten zijn er wel; wij zijn er niet. En dan het belangrijkste: je hoeft niet eerst genezen te zijn om blij te mogen zijn. De blijdschap ligt niet aan het eind van je groeipad. Ze ligt ernaast, de hele weg.',
        'Wat blijdschap vooral in de weg zit, is niet een gebrek aan aanleiding maar een gebrek aan aandacht. De momenten zijn er wél; wij missen ze alleen. En het belangrijkste: je hoeft niet eerst te zijn genezen om blij te mogen zijn. Blijdschap ligt niet aan het einde van je groeipad. Ze loopt de hele weg naast je mee.',
        'Het is niet zozeer een gebrek aan aanleiding dat blijdschap in de weg staat, als wel een gebrek aan aandacht. De momenten dienen zich wel degelijk aan; wij zijn er alleen niet bij. En vooral: genezing is geen voorwaarde om blij te mogen zijn. Blijdschap wacht niet aan het eind van je groeipad. Ze loopt er de hele weg naast.',
      ],
    ],
    rules: [
      {
        when: [{ id: 'perfectionism', min: 65 }, { id: 'controlNeed', min: 65 }],
        text: 'Bij jou is blijdschap iets geworden wat je verdienen moet: eerst af, dan pas genieten. Dat is precies het misverstand. Probeer het een keer om te draaien en kijk of het werk eronder lijdt. Dat doet het meestal niet.',
      },
      {
        when: [{ id: 'emotionalSensitivity', min: 65 }],
        text: 'Jij voelt de kleine dingen scherper dan de meeste mensen. Dat werkt beide kanten op, en het betekent dat de goede momenten bij jou ook echt harder aankomen. Dat is geen schrale troost; dat is de rekening die de andere kant opvalt.',
      },
      {
        when: [{ id: 'creativeThinking', min: 65 }],
        text: 'Jij hebt de makkelijkste toegang van allemaal: maak iets zonder doel en kijk wat er gebeurt. Niet om het af te maken, niet om het te laten zien. De blijdschap zit in het maken, niet in het resultaat — en dat vergeet je zodra er een deadline bij komt.',
      },
      {
        when: [{ id: 'solitudeNeed', min: 65 }],
        text: 'Jouw blijdschap zit vaker in afwezigheid van gezelschap dan erin. Dat is geen tekort aan gezelligheid. Wie zich uit plichtsbesef in drukte begeeft omdat het hoort, mist beide vormen tegelijk.',
      },
      {
        when: [{ id: 'socialEnergy', min: 65 }],
        text: 'Jouw blijdschap ontstaat het makkelijkst tussen mensen, in het moment waarop iets aanslaat en de energie omslaat. Zorg dat je zulke momenten niet alleen laat gebeuren wanneer het toevallig uitkomt.',
      },
    ],
    fallback:
      'Je scores wijzen niet op één plek waar blijdschap bij jou vandaan komt. Dat betekent dat je hem overal kunt tegenkomen, en dat het dus vooral een kwestie van aandacht is en niet van omstandigheden.',
    question: [
      'Wanneer heb je voor het laatst iets gedaan wat nergens goed voor was?',
      'Wat heb je voor het laatst gedaan zonder dat het ergens toe diende?',
      'Wanneer deed je voor het laatst iets dat nergens nuttig voor was?',
    ],
  },
];
