import type { Phrasing } from "../lib/arcanaVariants";
import type { ArchetypeId, StressArchetypeId } from "../types/arcana";

export interface ArchetypeContent {
  /** Hoe dit patroon zich toont wanneer iemand alleen is. Volledige zinnen. */
  alone: string;
  /** Hoe dit patroon zich toont in gezelschap en nieuw contact. */
  withOthers: string;
  /** Werkgedrag: waar je excelleert, wat je uitput, welke omgeving je nodig hebt. */
  atWork: string;
  /** Langdurige, vertrouwde banden: familie en vrienden. */
  closeCircle: string;
  /** Onder druk: zichtbaar gedrag en wat anderen niet zien. */
  underPressure: string;
  /** Op je gemak: wie je bent als je niets hoeft te bewijzen. */
  atEase: string;
  /** Jungiaanse schaduwduiding: wat dit type niet over zichzelf wil weten, en wat het projecteert. */
  shadow: string;
  /** De rijpe, geïndividueerde versie van dit patroon. */
  whoYouCanBecome: string;
  /** 4 concrete voorwaarden of oefeningen. Zinsdelen of korte zinnen. */
  whatYouNeed: string[];
  /** 3 punten, geschreven alsof je ze aan een partner of collega geeft. */
  howOthersShouldUnderstand: string[];
  /** 3 reflectievragen of observatieopdrachten voor jezelf. */
  howToUnderstandYourself: string[];
  /** Wanneer dit hoog scoort maar iemand zich er niet in herkent. */
  ifItDoesNotFit: string;
}

export const ARCHETYPE_CONTENT: Record<ArchetypeId, ArchetypeContent> = {
  theSeeker: {
    alone: "In stilte ga je vanzelf filosoferen, ook al noem je het zelf niet zo. Je herleest een gesprek, zoekt het patroon achter een gebeurtenis en vraagt je af wat iets eigenlijk betekent. Dat is herstellend zolang het je iets oplevert, zoals een inzicht of een richting. Duurt het te lang zonder dat er iets uitkomt, dan verandert diezelfde reflectie in malen en voel je je losser van je leven staan.",
    withOthers: "Je maakt makkelijk contact met mensen die ook iets zoeken, en je verveelt je snel in gesprekken die alleen over de agenda van de dag gaan. Je geeft mensen het gevoel gezien te worden in wat hen werkelijk bezighoudt, omdat je daar zelf ook naar op zoek bent. Wat je nodig hebt, is een gesprekspartner die meegaat in een vraag zonder meteen een antwoord te eisen.",
    atWork: "Je bloeit op in werk waarin jij autonomie hebt en waarin je kunt bijdragen aan iets dat verder gaat dan de taak zelf. Puur uitvoerend, herhalend werk zonder zichtbaar doel trekt je energie leeg, ook als het goed betaalt. Als leidinggevende geef jij mensen ruimte en een reden waarom; jij plaatst als collega soms ineens een project in een groter perspectief, tot frustratie van wie gewoon de deadline wil halen.",
    closeCircle: "Bij mensen die je al lang kent, laat je makkelijker zien dat je nog zoekende bent, ook als dat betekent dat je van koers verandert nadat iedereen dacht dat de zaak beklonken was. Loyaliteit betekent voor jou vooral dat je elkaar recht doet in wie je werkelijk bent, niet dat je vasthoudt aan afspraken die niet meer kloppen. Dat schuurt bij mensen die stabiliteit belangrijker vinden dan waarachtigheid.",
    underPressure: "Zichtbaar ga je twijfelen aan de gekozen richting, uitstellen, of ineens een heel ander pad overwegen net als de deadline nadert. Van binnen speelt de angst dat je weer voor de verkeerde weg hebt gekozen, en dat gevoel is groter dan de praktische druk zelf.",
    atEase: "Als je niets hoeft te bewijzen, ben je nieuwsgierig zonder haast, deel je ideeën vrijuit en kun je genieten van een gesprek dat nergens toe hoeft te leiden. Je hebt dan geen antwoord nodig, alleen een goede vraag.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je zoektocht soms een manier is om verplichtingen te ontlopen, want zolang je nog op reis bent, hoef je nergens definitief voor te kiezen. Bij anderen veroordeel je gemakzucht en het klakkeloos volgen van een vaste weg, terwijl dat oordeel eigenlijk je eigen angst is om ooit vast te zitten. De eigenschap die je wegduwt om je zoekende persona overeind te houden, is simpele, ongeïnspireerde volharding: gewoon doorgaan met iets, ook als het geen nieuw inzicht meer oplevert.",
    whoYouCanBecome: "De rijpe versie van jou blijft zoeken, maar durft tussentijds te kiezen zonder dat als verraad aan de zoektocht te ervaren. Je leert dat betekenis niet alleen voorafgaat aan een keuze, maar ook kan ontstaan door een keuze vol te houden.",
    whatYouNeed: [
      "Een manier om vooruitgang te meten die ook volgehouden richting telt, niet alleen nieuw inzicht.",
      "Mensen om je heen die je bevragen als je van koers verandert, zonder dat te veroordelen.",
      "Oefening in kleine, tijdelijke keuzes maken zonder de illusie van definitiefheid.",
      "Ruimte om te merken dat stilstand soms ook informatie is, en niet alleen een probleem.",
    ],
    howOthersShouldUnderstand: [
      "Als ik van koers verander, ben ik niet onbetrouwbaar, ik ben eerlijk over wat ik nu zie.",
      "Ik heb geen kant-en-klaar antwoord van jou nodig, alleen iemand die met mij meedenkt.",
      "Concrete afspraken helpen mij, maar leg ze niet op als een deur die voorgoed dichtgaat.",
    ],
    howToUnderstandYourself: [
      "Welke keuze stel ik nu uit, en wat zou het kosten als ik hem toch maakte?",
      "Zoek ik nu echt naar betekenis, of vermijd ik iets waarvoor ik verantwoordelijk zou worden gehouden?",
      "Wanneer voelde vooruitgang goed, zelfs zonder nieuw inzicht?",
    ],
    ifItDoesNotFit: "Misschien leef je nu in een fase waarin praktische zekerheid voorrang heeft gekregen, en is de zoektocht naar binnen verplaatst in plaats van verdwenen. Het kan ook zijn dat je je vragen hebt leren onderdrukken omdat ze in je omgeving niet welkom waren, waardoor dit patroon aanwezig is maar nog niet toegestaan.",
  },
  theArchitect: {
    alone: "In je eentje ben jij bezig met ordenen: een lijst maken, een systeem verbeteren, iets uitzoeken tot je het helemaal begrijpt. Dat werkt herstellend zolang het jou een gevoel van grip geeft. Duurt het te lang, dan verwordt ordenen tot controlebehoefte over dingen die niet beheersbaar zijn, en dat vreet energie in plaats van dat het rust geeft.",
    withOthers: "Je komt over als degelijk en beheerst, iemand bij wie weinig verrassingen zijn. Je geeft duidelijkheid en houdt je aan wat is afgesproken. Wat je nodig hebt, is dat anderen dat serieus nemen in plaats van het als stijfheid weg te zetten.",
    atWork: "Je excelleert in het bouwen van systemen die ook morgen nog overeind staan, zoals processen, kaders en doordachte planningen. Werk waarin voortdurend geïmproviseerd moet worden zonder enig kader put je uit. Als leidinggevende geef je duidelijkheid en voorspelbaarheid; als collega wil je eerst weten hoe iets georganiseerd wordt voor je meedoet, wat door snellere types soms als vertragend wordt ervaren.",
    closeCircle: "Bij je naasten ben je degene die er praktisch is als het erop aankomt, door te regelen, op te lossen en te zorgen dat het geregeld is. Loyaliteit betekent voor jou dat je er bent als het nodig is, ook als dat betekent dat je je eigen agenda opzij zet. Het schuurt wanneer een naaste vooral emotionele aanwezigheid vraagt en jij reageert met een oplossing.",
    underPressure: "Zichtbaar ga je nog meer plannen, checklists maken en herhalen wat er al is afgesproken, soms tot vervelens toe voor anderen. Van binnen voelt het alsof de bodem onder je wegzakt als iets niet volgens plan verloopt, een gevoel van controleverlies dat groter is dan het praktische probleem rechtvaardigt.",
    atEase: "Zonder druk ben je iemand met droge humor, die best kan improviseren zolang de grote lijnen kloppen, en die oprecht plezier heeft in een goed werkend systeem, ook als niemand het ziet.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je behoefte aan controle vaak ontspringt aan angst, niet aan overzicht, en dat toegeven de degelijke buitenkant zou aantasten die je zo zorgvuldig hebt opgebouwd. Bij anderen veroordeel je slordigheid en impulsiviteit, terwijl je eigenlijk jaloers bent op het gemak waarmee zij loslaten wat jij vastklemt. De eigenschap die je wegduwt, is speelse onzekerheid: niet weten en dat toch oké laten zijn, zonder meteen een plan te maken om het op te lossen.",
    whoYouCanBecome: "De rijpe versie van jou bouwt nog steeds structuur, maar herkent het verschil tussen een systeem dat dient en een systeem dat beheerst. Je leert vertrouwen dat dingen ook goed kunnen gaan zonder dat jij ze volledig hebt voorzien.",
    whatYouNeed: [
      "Bewust oefenen met kleine situaties zonder vooraf een plan te maken.",
      "Mensen die je durven confronteren als structuur een excuus wordt om gevoel te vermijden.",
      "Herkennen wanneer controlebehoefte over jezelf gaat, niet over de situatie.",
      "Ruimte om fouten te maken zonder die meteen te herstellen tot een nieuw systeem.",
    ],
    howOthersShouldUnderstand: [
      "Mijn behoefte aan een plan is geen wantrouwen in jou, maar een manier om mezelf gerust te stellen.",
      "Als ik star reageer op verandering, heb ik meestal tijd nodig, geen tegenspraak.",
      "Een oplossing aandragen is mijn manier van zorgen, niet bedoeld om je gevoel te negeren.",
    ],
    howToUnderstandYourself: [
      "Welk plan maak ik nu vooral om mezelf gerust te stellen, niet omdat de situatie het vraagt?",
      "Wanneer voelde ik me de laatste tijd het meest ontregeld, en wat was er werkelijk aan de hand?",
      "Kan ik één ding deze week bewust ongepland laten?",
    ],
    ifItDoesNotFit: "Mogelijk leef je in een omgeving waar structuur bieden niet gewaardeerd of zelfs onmogelijk is, waardoor dit patroon zich niet kan tonen. Het kan ook zijn dat je die behoefte aan grip vroeger hebt afgeleerd omdat vasthouden aan controle destijds averechts werkte, waardoor je haar nu niet meer als van jou herkent.",
  },
  theMirror: {
    alone: "In stilte verwerk je wat je die dag hebt opgepikt, zoals gesprekken, blikken en sferen die je hebt aangevoeld. Dat is nodig om weer bij jezelf te komen. Duurt die verwerking te lang of blijft ze onbewust, dan raak je overladen met gevoelens waarvan je niet meer weet of ze van jou zijn of van een ander.",
    withOthers: "Bij een eerste ontmoeting voelen mensen zich vaak sneller op hun gemak bij jou dan bij wie dan ook, zonder precies te kunnen zeggen waarom. Je geeft aandacht die voelt als gezien worden. Wat je nodig hebt, is iemand die af en toe vraagt hoe het echt met jou is, in plaats van ervan uit te gaan dat jij altijd wel voelt hoe het zit.",
    atWork: "Je bent sterk in werk waarin de onderstroom telt, zoals bemiddelen, begeleiden en aanvoelen wat een team nodig heeft voordat het een probleem wordt. Werk dat afstandelijkheid en harde cijfers vereist zonder ruimte voor nuance, put je uit. Als leidinggevende voel je snel spanning in je team aan; als collega neem je soms ongevraagd emotionele lasten van anderen over die niet van jou zijn.",
    closeCircle: "Bij vertrouwde mensen ben je degene bij wie het achterste van je tong komt, omdat je het gevoel geeft dat niets te veel is. Loyaliteit betekent voor jou dat je er blijft, ook als het zwaar wordt. Het schuurt wanneer een naaste je gevoeligheid gebruikt om steeds bij jou te verhalen zonder ooit iets terug te vragen.",
    underPressure: "Zichtbaar trek je je iets terug, wordt je stiller, of ga je juist overmatig zorgen voor de stemming van anderen. Van binnen speelt vaak een overweldiging: te veel signalen tegelijk, zonder dat je meer kunt onderscheiden wat van wie is.",
    atEase: "Ontspannen ben je speels en warm, met een scherp gevoel voor humor dat inspeelt op wat er ongezegd tussen mensen hangt. Je hoeft dan niemand te redden, je kunt gewoon aanwezig zijn.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je scherpe aanvoelen soms een manier is om je eigen gevoelens niet onder ogen te hoeven zien, want het is makkelijker om te voelen wat een ander voelt dan om bij jezelf te blijven. Bij anderen veroordeel je emotionele afstandelijkheid of ongevoeligheid, terwijl je diep vanbinnen jaloers bent op het vermogen om je niet zo veel aan te trekken. De eigenschap die je wegduwt, is grens stellen zonder schuldgevoel: ruw genoeg zijn om nee te zeggen zonder het meteen te verzachten.",
    whoYouCanBecome: "De rijpe versie van jou blijft aanvoelen, maar leert onderscheid maken tussen wat van jou is en wat van een ander. Je gevoeligheid wordt dan een instrument dat je bewust inzet, in plaats van een golf die je meesleurt.",
    whatYouNeed: [
      "Een vast moment per dag om te checken wiens gevoel dit eigenlijk is.",
      "Oefening in korte, directe grenzen zonder uitgebreide verontschuldiging.",
      "Mensen om je heen die vragen naar jouw binnenwereld, niet alleen naar hun eigen verhaal.",
      "Herstelruimte die niets met andermans emoties te maken heeft.",
    ],
    howOthersShouldUnderstand: [
      "Als ik stil word, heb ik waarschijnlijk te veel opgepikt en heb ik ruimte nodig, geen probing.",
      "Ik voel spanning vaak eerder dan jij hem benoemt, neem dat serieus in plaats van het weg te wuiven.",
      "Vraag af en toe expliciet hoe het met mij is, want ik vraag het jou vanzelf.",
    ],
    howToUnderstandYourself: [
      "Is dit gevoel dat ik nu heb echt van mij, of heb ik het net opgepikt van iemand anders?",
      "Waar in mijn week heb ik mijn grens niet gesteld uit angst iemand te kwetsen?",
      "Wanneer voelde ik me voor het laatst volledig mezelf, zonder rekening te houden met een ander?",
    ],
    ifItDoesNotFit: "Het kan zijn dat je in een omgeving leeft waar gevoeligheid als zwakte wordt gezien, waardoor je haar bij jezelf hebt afgesloten of gebagatelliseerd. Ook is het mogelijk dat je deze gevoeligheid pas herkent als je terugkijkt op een gesprek, en niet op het moment zelf, waardoor het patroon minder aanwezig lijkt dan het is.",
  },
  theFlame: {
    alone: "Stilte went minder makkelijk bij jou dan bij de meesten, en je zoekt vanzelf iets op om aan te bewegen, zoals muziek, een berichtje of een plan voor morgen. Dat is prima zolang het je oplaadt. Duurt de afzondering te lang zonder contact of resultaat, dan begint het te knagen: het gevoel dat je wegkwijnt zonder podium.",
    withOthers: "Je maakt een sterke eerste indruk: warm, direct, aanwezig. Je geeft energie en durf aan een groep. Wat je nodig hebt, is dat mensen ook oprecht geïnteresseerd zijn in jou als je even niet aan staat, en niet alleen wanneer je die kamer vult.",
    atWork: "Je excelleert in werk met zichtbaarheid, zoals presenteren, overtuigen en een team meenemen in een nieuw plan. Werk dat vooral bestaat uit stil, onzichtbaar, herhalend administratief werk zonder erkenning put je snel leeg. Als leidinggevende motiveer je door voorbeeldgedrag en directheid; als collega kun je ongeduldig worden met mensen die langer nadenken dan jij nodig hebt.",
    closeCircle: "Bij vertrouwde mensen breng je leven in huis, met spontane uitjes, felle discussies en warmte die hardop is. Loyaliteit betekent voor jou dat je vecht voor mensen, letterlijk zichtbaar, in het openbaar als het moet. Het schuurt wanneer een naaste rust en bescheidenheid nodig heeft en jij, zonder het te willen, de aandacht toch weer naar jezelf trekt.",
    underPressure: "Zichtbaar versnel je, met meer praten, meer beslissen, sneller reageren, soms harder dan bedoeld. Van binnen speelt de angst dat je aan relevantie verliest als je nu niet handelt, want stilstaan voelt als onzichtbaar worden.",
    atEase: "Ontspannen ben je grappig, scherp en genereus met complimenten aan anderen. Je hebt dan niets te bewijzen en geniet er juist van als iemand anders schittert.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je zichtbaarheid soms een dekmantel is voor de angst om onbelangrijk te zijn, want als niemand kijkt, twijfel je aan je eigen waarde. Bij anderen veroordeel je bescheidenheid als passiviteit of gebrek aan lef, terwijl je eigenlijk verlangt naar het gemak waarmee zij zonder applaus verder kunnen. De eigenschap die je wegduwt, is stille bescheidenheid: iets goed doen zonder dat iemand het opmerkt, en daar toch voldaan mee zijn.",
    whoYouCanBecome: "De rijpe versie van jou blijft zichtbaar en gedreven, maar heeft erkenning niet meer nodig als bevestiging van eigenwaarde. Je leert dat je invloed ook standhoudt in de stilte, zonder dat iemand ernaar kijkt.",
    whatYouNeed: [
      "Bewust tijd doorbrengen in situaties zonder publiek en toch voldoening zoeken.",
      "Feedback vragen over de impact van je directheid, niet alleen over de inhoud.",
      "Oefenen met luisteren zonder meteen te reageren of te sturen.",
      "Mensen om je heen die je aanspreken als je aandacht opeist die niet nodig was.",
    ],
    howOthersShouldUnderstand: [
      "Mijn directheid is geen aanval, het is hoe ik snel duidelijkheid creëer.",
      "Als ik stiller word, is er waarschijnlijk iets serieus mis, want stilte kost mij moeite.",
      "Ik heb erkenning nodig, maar leer me erop wijzen als ik er te veel om vraag.",
    ],
    howToUnderstandYourself: [
      "Zocht ik nu naar aandacht omdat de situatie erom vroeg, of omdat ik het zelf nodig had?",
      "Wanneer heb ik voor het laatst iets goed gedaan zonder dat iemand het zag, en hoe voelde dat?",
      "Wat gebeurt er in mij als ik een gesprek niet domineer?",
    ],
    ifItDoesNotFit: "Mogelijk is jouw omgeving zo terughoudend dat zichtbaarheid daar niet beloond of zelfs afgestraft wordt, waardoor je dit deel van jezelf hebt ingehouden. Het kan ook zijn dat je die drang naar erkenning als ongepast bent gaan zien en haar daardoor niet meer als van jou herkent, terwijl ze onder de oppervlakte nog volop aanwezig is.",
  },
  theGuardian: {
    alone: "In stilte kom je vaak pas tot rust als je zeker weet dat iedereen om je heen oké is, anders blijft een deel van je alert. Dat waakzame is nodig geweest, maar als het nooit stopt, ontneemt het jezelf de rust die je juist zo hard aan anderen geeft.",
    withOthers: "Mensen voelen zich bij jou snel veilig, want je straalt uit dat je er voor hen bent. Je geeft aandacht, geheugen voor details en praktische zorg. Wat je nodig hebt, is dat iemand ook naar jou vraagt zonder dat je daar zelf om moet vragen.",
    atWork: "Je bent sterk in rollen waarin mensen en zorgvuldigheid centraal staan, zoals begeleiden, ondersteunen en de lijm zijn tussen collega's. Werk waarin je voortdurend grenzen moet stellen of mensen moet teleurstellen, kost je bovengemiddeld veel energie. Als leidinggevende ben je toegankelijk en loyaal; als collega neem je soms te veel taken van anderen over uit angst iemand te belasten.",
    closeCircle: "Bij je naasten ben jij de vaste factor, degene die belt, die onthoudt, die er is bij ziekte of verdriet. Loyaliteit betekent voor jou blijven, ook als het zwaar is geworden. Het schuurt wanneer een naaste misbruik maakt van jouw beschikbaarheid en jij het toch te lang laat gebeuren.",
    underPressure: "Zichtbaar ga je nog harder zorgen, met meer regelen, meer aanwezig zijn, minder nee zeggen. Van binnen speelt de angst dat als jij nu loslaat, iets of iemand instort, een verantwoordelijkheid die zwaarder voelt dan wat redelijk van je gevraagd kan worden.",
    atEase: "Ontspannen ben je grappig en warm, met een neiging tot verwennen, niet uit plicht maar puur omdat het je plezier geeft. Je kunt dan ook zelf ontvangen, zonder er meteen iets voor terug te willen doen.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je zorgen soms een manier is om zelf niet aangesproken te hoeven worden op je eigen behoeftes, want zolang jij voor een ander zorgt, hoeft niemand jou te bevragen. Bij anderen veroordeel je egoïsme en gebrek aan zorgzaamheid, terwijl je vanbinnen verlangt naar het gemak waarmee zij hun eigen belang vooropstellen. De eigenschap die je wegduwt, is onbeschaamd eigenbelang nastreven zonder dat meteen te compenseren met zorg voor een ander.",
    whoYouCanBecome: "De rijpe versie van jou blijft zorgzaam, maar zorgt vanuit keuze, niet vanuit verplichting. Je leert dat een grens stellen geen verraad is aan wie je bent, maar juist een voorwaarde om vol te houden wie je wilt zijn.",
    whatYouNeed: [
      "Oefening in nee zeggen zonder uitgebreide reden of verontschuldiging.",
      "Bewust vragen om hulp voordat je uitgeput bent, niet erna.",
      "Mensen om je heen die je erop wijzen wanneer je weer te veel op je neemt.",
      "Momenten waarin je zorgt voor jezelf zonder dat als egoïstisch te labelen.",
    ],
    howOthersShouldUnderstand: [
      "Als ik ja zeg terwijl ik het niet meen, is dat niet omdat ik het wil, maar omdat nee zeggen mij moeite kost.",
      "Ik heb behoefte aan iemand die ook naar mij omkijkt, zonder dat ik erom vraag.",
      "Mijn zorg voor jou is oprecht, maar het betekent niet dat ik nooit iets nodig heb.",
    ],
    howToUnderstandYourself: [
      "Waar in mijn week heb ik ja gezegd terwijl ik eigenlijk nee bedoelde?",
      "Wiens probleem draag ik nu dat eigenlijk niet van mij is?",
      "Wanneer voelde ik me voor het laatst verzorgd, in plaats van de verzorger?",
    ],
    ifItDoesNotFit: "Mogelijk heb je in het verleden geleerd dat zorgen voor anderen de enige manier was om waardering te krijgen, waardoor het patroon zich automatisch en onbewust uit en je het niet als een bewuste eigenschap herkent. Het kan ook zijn dat je momenteel in een fase zit waarin je juist voor jezelf zorgt, waardoor dit patroon tijdelijk minder zichtbaar is dan het onder de oppervlakte is.",
  },
  theAlchemist: {
    alone: "In stilte draai je gebeurtenissen om en om, op zoek naar de laag eronder: wat zegt dit over mij, over de situatie, over wat er nog kan groeien. Dat is herstellend als het tot een inzicht leidt. Duurt het te lang zonder landing, dan raak je verstrikt in je eigen complexiteit en verlies je het simpele plezier van gewoon aanwezig zijn.",
    withOthers: "Je trekt mensen aan die middenin een verandering zitten en op zoek zijn naar iemand die dat begrijpt zonder te oordelen. Je geeft perspectief waar anderen alleen chaos zien. Wat je nodig hebt, is iemand die je af en toe terugbrengt naar het simpele, concrete moment.",
    atWork: "Je bent sterk in werk waarin transformatie centraal staat, zoals het begeleiden van veranderingen, herstructureren en creatieve oplossingen bedenken voor vastgelopen situaties. Routinewerk zonder enige ontwikkeling voelt voor jou als stilstand die je uitput. Als leidinggevende breng jij nieuwe perspectieven in vastgelopen teams; als collega kun jij een project onnodig ingewikkeld maken door overal een diepere laag in te willen zien.",
    closeCircle: "Bij vertrouwde mensen ben je degene die een crisis kan omzetten in een gesprek dat verbindt in plaats van breekt. Loyaliteit betekent voor jou meegroeien met iemand door zijn moeilijke periodes heen. Het schuurt wanneer een naaste gewoon troost wil, en jij in plaats daarvan duiding aanbiedt.",
    underPressure: "Zichtbaar ga je analyseren en herkaderen, op zoek naar de les in de situatie, soms voordat er ruimte is geweest voor het gewone verdriet erover. Van binnen speelt de angst dat als je niet snel betekenis vindt, de chaos je zal overspoelen zonder houvast.",
    atEase: "Ontspannen ben je speels met ideeën, gefascineerd door verbanden die niemand anders ziet, en oprecht genietend van een goed gesprek over iets dat nog niet af is.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je fascinatie voor transformatie soms een manier is om nooit klaar te hoeven zijn, want zolang er nog iets te transformeren valt, hoef je niet te landen in een vaste, misschien saaie werkelijkheid. Bij anderen veroordeel je oppervlakkigheid en het snel klaar zijn met iets, terwijl je vanbinnen verlangt naar hun vermogen om iets simpelweg af te sluiten. De eigenschap die je wegduwt, is tevredenheid met het gewone: iets accepteren zoals het is, zonder er meteen een diepere betekenis in te zoeken.",
    whoYouCanBecome: "De rijpe versie van jou blijft transformatie zien, maar leert ook wanneer iets al goed genoeg is zoals het is. Je diepgang wordt dan een gave in plaats van een vlucht voor eenvoud.",
    whatYouNeed: [
      "Oefening in dingen afsluiten zonder er nog een extra laag betekenis aan toe te voegen.",
      "Bewust kiezen voor eenvoudige oplossingen als die er zijn, ook als ze minder interessant zijn.",
      "Mensen om je heen die je vragen of iets klaar is, of dat je nog naar iets zoekt.",
      "Momenten van gewoon aanwezig zijn, zonder analyse.",
    ],
    howOthersShouldUnderstand: [
      "Als ik duiding geef terwijl jij troost zoekt, zeg dat gerust, ik schakel dan liever om.",
      "Ik heb tijd nodig om chaos te verwerken tot inzicht, maar dat betekent niet dat ik vastzit.",
      "Mijn behoefte aan verandering kan voor jou vermoeiend zijn, vraag me af en toe naar rust, niet naar het volgende idee.",
    ],
    howToUnderstandYourself: [
      "Zoek ik nu naar een diepere laag omdat die er is, of omdat ik niet klaar wil zijn?",
      "Wat zou er gebeuren als ik deze situatie gewoon liet zoals hij is?",
      "Wanneer voelde afronden voor het laatst als winst in plaats van verlies?",
    ],
    ifItDoesNotFit: "Het kan zijn dat je momenteel in een stabiele periode zit waarin er weinig te transformeren valt, waardoor dit patroon sluimert. Het is ook mogelijk dat je in je omgeving hebt geleerd dat altijd maar willen veranderen als onrustig werd gezien, waardoor je deze kant van jezelf hebt gedempt.",
  },
  theStrategist: {
    alone: "In stilte speel je scenario's door: wat als dit gebeurt, wat als dat misgaat, welke route is dan het beste. Dat geeft je rust zolang het tot een besluit leidt. Blijft het eindeloos doordraaien zonder besluit, dan wordt dat plannen zelf een vorm van vermijding van het moment waarop je gewoon moet handelen.",
    withOthers: "Mensen zoeken je op als ze een complexe keuze moeten maken, want je brengt overzicht waar zij verdwaald zijn. Je geeft duidelijkheid en een weg vooruit. Wat je nodig hebt, is iemand die soms ook zonder plan met je meegaat, zodat je merkt dat niet alles voorbereid hoeft te zijn.",
    atWork: "Je excelleert in werk waarin vooruitdenken telt, zoals risicoanalyse, langetermijnplanning en complexe besluitvorming. Werk dat puur reactief en ad hoc is, zonder ruimte voor voorbereiding, put je uit. Als leidinggevende geef je richting op basis van doordachte scenario's; als collega kun je door je alternatieven soms besluitvaardigheid van een team vertragen.",
    closeCircle: "Bij je naasten ben je degene die praktisch meedenkt over grote beslissingen, zoals een verhuizing, een carrièreswitch of een moeilijke keuze. Loyaliteit betekent voor jou dat je meedenkt over wat het beste is op lange termijn, ook als dat een ongemakkelijke waarheid is. Het schuurt wanneer een naaste vooral emotionele steun zoekt en jij met een strategie komt.",
    underPressure: "Zichtbaar ga je nog meer analyseren en meer opties overwegen, soms tot verlammens toe. Van binnen speelt de angst een verkeerde beslissing te nemen die achteraf onnodig blijkt, een angst voor een suboptimale keuze die zwaarder weegt dan de tijdsdruk zelf.",
    atEase: "Ontspannen kun je best speels zijn met ideeën, mits er geen echte inzet aan vastzit. Je geniet dan van een goed doordacht spel, een strategisch gesprek, zonder dat er iets op het spel staat.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je eindeloze scenario's soms een vlucht zijn voor het onbehagen van een besluit nemen zonder garantie, want plannen voelt veiliger dan verantwoordelijkheid dragen voor een uitkomst die je niet volledig controleert. Bij anderen veroordeel je impulsiviteit en gebrek aan voorbereiding, terwijl je vanbinnen verlangt naar hun vrijheid om gewoon te springen. De eigenschap die je wegduwt, is onvoorbereid vertrouwen: iets doen zonder eerst alle uitkomsten te kennen, en toch geloven dat het goed komt.",
    whoYouCanBecome: "De rijpe versie van jou blijft vooruitdenken, maar durft ook te handelen zonder dat elk scenario is doorgerekend. Je overzicht wordt dan een hulpmiddel in plaats van een voorwaarde om te mogen bewegen.",
    whatYouNeed: [
      "Oefening in besluiten nemen met een vaste tijdslimiet, ook als niet alles is doordacht.",
      "Bewust kiezen voor een activiteit zonder enige voorbereiding.",
      "Mensen om je heen die je erop wijzen wanneer analyse een vorm van uitstel wordt.",
      "Herkennen wanneer voorbereiding echt nodig is en wanneer het vooral rust geeft aan jezelf.",
    ],
    howOthersShouldUnderstand: [
      "Als ik met een strategie kom terwijl jij troost zoekt, zeg het gerust, ik schakel dan liever om.",
      "Mijn aarzeling bij een besluit gaat zelden over twijfel aan jou, maar over het wegen van te veel opties.",
      "Vraag me af en toe om zonder plan mee te doen, dat helpt me meer dan je denkt.",
    ],
    howToUnderstandYourself: [
      "Welk besluit stel ik nu uit omdat ik nog een scenario mis, en wat zou er gebeuren als ik toch koos?",
      "Wanneer voelde een onvoorbereide keuze voor het laatst goed?",
      "Plan ik dit nu omdat het nodig is, of omdat het onzekerheid voor mij dragelijker maakt?",
    ],
    ifItDoesNotFit: "Mogelijk werk of leef je in een omgeving waarin voortdurend snel gehandeld moet worden zonder ruimte voor je natuurlijke voorbereidingsdrang, waardoor dit patroon onderdrukt raakt. Het kan ook zijn dat je jouw scherpe blik als vanzelfsprekend bent gaan zien en er daarom niet meer als een kenmerkende eigenschap naar kijkt.",
  },
  theWoundedHealer: {
    alone: "In stilte kom je vaak uit bij herinneringen aan momenten waarop jij zelf gekwetst bent geweest, alsof je die opnieuw doorleeft om er iets van te leren. Dat kan helend zijn als het tot inzicht en zelfacceptatie leidt. Blijft het bij herkauwen zonder verwerking, dan versterkt het juist het gevoel dat je pijn je enige waardevolle bezit is.",
    withOthers: "Mensen die het moeilijk hebben, vinden je snel, want je straalt uit dat je hun soort pijn begrijpt zonder oordeel. Je geeft erkenning die zeldzaam voelt. Wat je nodig hebt, is iemand die jouw pijn evenveel ruimte geeft als jij aan die van een ander geeft.",
    atWork: "Je bent sterk in werk waarin herkenning en menselijk contact centraal staan, zoals begeleiden, ondersteunen en luisteren naar wat niet in het functioneringsgesprek past. Werk dat volledig onpersoonlijk en resultaatgericht is zonder enige menselijke laag, voelt voor jou leeg. Als leidinggevende zie je het onzichtbare leed van je team; als collega neem je soms de rol van vertrouwenspersoon op je, ook als dat niet bij je functie hoort en jou uitput.",
    closeCircle: "Bij je naasten ben je degene bij wie oude pijn eindelijk gehoord wordt. Loyaliteit betekent voor jou dat je iemand door zijn donkerste periode heen begeleidt. Het schuurt wanneer een naaste jouw luisterend oor als vanzelfsprekend gaat beschouwen, zonder ooit te vragen hoe het met jou zit.",
    underPressure: "Zichtbaar trek je je terug of ga je overmatig zorgen voor de emoties van anderen om je eigen spanning niet te hoeven voelen. Van binnen speelt vaak een oude angst voor afwijzing die door de huidige situatie wordt aangewakkerd, veel groter dan wat er feitelijk op het spel staat.",
    atEase: "Ontspannen ben je warm en licht, met een verrassend gevoel voor humor over je eigen kwetsbaarheden. Je kunt dan ontvangen in plaats van alleen geven, en voelt je daar minder ongemakkelijk bij dan jij zelf verwacht.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je behoefte om anderen te helen soms een manier is om je eigen wond niet direct te hoeven aanraken, want zolang je bezig bent met het herstel van een ander, hoef je niet bij je eigen pijn stil te staan. Bij anderen veroordeel je mensen die hun problemen op je afschuiven zonder zelf iets te doen, terwijl je vanbinnen precies datzelfde patroon bij jezelf hebt, alleen dan andersom. De eigenschap die je wegduwt, is onbeschaamd zelf om hulp vragen, zonder dat eerst te verdienen door voor een ander gezorgd te hebben.",
    whoYouCanBecome: "De rijpe versie van jou blijft anderen helpen, maar niet meer als omweg om je eigen pijn te vermijden. Je leert je eigen wond net zo serieus te nemen als die van de mensen die je helpt.",
    whatYouNeed: [
      "Een eigen vorm van verwerking die niet via het helpen van een ander loopt.",
      "Oefening in zelf om hulp vragen zonder dat eerst te rechtvaardigen.",
      "Mensen om je heen die vragen naar jouw pijn, niet alleen naar jouw advies.",
      "Herkennen wanneer kritiek klein is en wanneer je oude pijn erop reageert alsof die groot is.",
    ],
    howOthersShouldUnderstand: [
      "Als ik me terugtrek na kritiek, is dat vaak een oudere pijn die meespeelt, niet alleen het moment zelf.",
      "Ik geef makkelijk troost, maar heb zelf ook iemand nodig die naar mij vraagt.",
      "Mijn neiging om te helpen is soms ook een manier om mezelf niet te hoeven voelen, vraag me daar gerust naar.",
    ],
    howToUnderstandYourself: [
      "Help ik nu omdat het nodig is, of om mijn eigen pijn niet te voelen?",
      "Welke kritiek raakte mij deze week harder dan de situatie rechtvaardigde, en waarom?",
      "Wanneer heb ik voor het laatst zelf om hulp gevraagd, zonder eerst iets terug te doen?",
    ],
    ifItDoesNotFit: "Het kan zijn dat je je eigen pijn zo goed hebt leren verbergen, ook voor jezelf, dat je dit patroon niet herkent totdat je het bij een ander tegenkomt. Het is ook mogelijk dat je momenteel weinig ruimte hebt om voor anderen te zorgen, waardoor het patroon rust maar niet verdwenen is.",
  },
  theVisionary: {
    alone: "In stilte dwaalt je hoofd vanzelf naar mogelijkheden: wat als dit anders was, wat zou er kunnen ontstaan. Dat is verrukkelijk en energiegevend zolang het idee ergens landt. Blijft het bij eindeloos fantaseren zonder ooit iets te concretiseren, dan voel je je uiteindelijk los van je eigen leven staan, wat frustratie geeft in plaats van inspiratie.",
    withOthers: "Mensen worden aangestoken door je ideeën en de energie waarmee je ze deelt. Je geeft perspectief en hoop op iets nieuws. Wat je nodig hebt, is iemand die je helpt een idee te laten landen zonder het meteen dood te slaan met praktische bezwaren.",
    atWork: "Je excelleert in de beginfase van een project: bedenken, herontwerpen, een compleet nieuw perspectief inbrengen. Langdurig, gedetailleerd uitvoeringswerk zonder ruimte voor nieuwe ideeën put je uit. Als leidinggevende inspireer je met een groter verhaal; als collega kun je collega's frustreren doordat je van plan verandert net als zij aan de uitvoering beginnen.",
    closeCircle: "Bij je naasten ben je degene die nieuwe mogelijkheden ziet in situaties die muurvast lijken te zitten, zoals een andere baan, een andere relatie of een andere manier van leven. Loyaliteit betekent voor jou dat je gelooft in wat iemand zou kunnen worden. Het schuurt wanneer een naaste juist bevestiging van het bestaande zoekt, en jij ongevraagd met alternatieven komt.",
    underPressure: "Zichtbaar ga je nog meer ideeën genereren, van plan wisselen, of juist afhaken van iets dat te concreet en beperkend aanvoelt. Van binnen speelt de angst dat je vastloopt in iets dat niet meer bij je past, want verstikking is voor jou een grotere angst dan mislukking.",
    atEase: "Ontspannen ben je speels, associatief, vol verhalen en verbanden die niemand anders had gelegd. Je hebt dan niets te bewijzen en geniet gewoon van het spelen met ideeën.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je voorkeur voor nieuwe mogelijkheden soms een vlucht is voor de teleurstelling van een idee daadwerkelijk uitgevoerd te zien, met alle onvolkomenheden die dat met zich meebrengt, want zolang iets nog een idee is, kan het niet mislukken. Bij anderen veroordeel je bekrompenheid en vasthouden aan het bestaande, terwijl je vanbinnen verlangt naar de rust die zij vinden in iets simpelweg af te maken. De eigenschap die je wegduwt, is geduldige afwerking: iets saai en gedetailleerd afmaken, ook nadat de opwinding eraf is.",
    whoYouCanBecome: "De rijpe versie van jou blijft mogelijkheden zien, maar leert er ook één te kiezen en die door de saaie fase heen te dragen. Je verbeelding wordt dan een kracht die ook werkelijkheid wordt, niet alleen een vlucht ervoor.",
    whatYouNeed: [
      "Een vaste afspraak met jezelf om één idee helemaal af te maken voor je aan het volgende begint.",
      "Mensen om je heen die de uitvoering waarderen, zodat je die niet als saai gaat zien.",
      "Oefening in het verdragen van de fase waarin een idee nog onaf en onvolmaakt is.",
      "Herkennen wanneer je van plan wisselt uit inspiratie en wanneer uit ongemak met afronding.",
    ],
    howOthersShouldUnderstand: [
      "Mijn enthousiasme voor een nieuw idee betekent niet dat het oude waardeloos was.",
      "Ik heb hulp nodig bij de uitvoering, niet omdat ik niet kan, maar omdat mijn aandacht van nature vooruit wil.",
      "Als ik iets weer verander, vraag me eerst waarom, voor je het als onbetrouwbaar bestempelt.",
    ],
    howToUnderstandYourself: [
      "Welk project van mij is bijna af, en wat houdt me tegen het laatste stuk te doen?",
      "Verander ik dit plan omdat het beter is, of omdat de uitvoering ongemakkelijk wordt?",
      "Wanneer voelde afmaken voor het laatst als een overwinning?",
    ],
    ifItDoesNotFit: "Mogelijk zit je in een fase van je leven waarin je vooral uitvoerend werk doet, waardoor deze kant van je weinig ruimte krijgt om zich te tonen. Het kan ook zijn dat je hebt geleerd je ideeën voor jezelf te houden omdat ze eerder als onrealistisch werden afgedaan, waardoor je ze nu minder snel herkent als een kernkwaliteit.",
  },
  theAnchor: {
    alone: "In stilte doe je vaak iets praktisch en herhalend, zoals iets onderhouden, opruimen of een vaste routine volgen. Dat geeft je rust. Duurt dat te lang zonder enige nieuwe input, dan verstart die rust tot een gewoonte die je eigenlijk niet meer dient, maar die je toch aanhoudt omdat verandering ongemakkelijker voelt dan stilstand.",
    withOthers: "Mensen voelen zich veilig bij je omdat je voorspelbaar en betrouwbaar bent. Je geeft rust simpelweg door aanwezig te zijn. Wat je nodig hebt, is iemand die je af en toe een duwtje geeft richting verandering, zonder dat als bedreiging van je stabiliteit te bedoelen.",
    atWork: "Je excelleert in werk waarin continuïteit en betrouwbaarheid tellen, zoals het draaiende houden van iets, crisismanagement en de rustpunt zijn in een team onder druk. Werk dat voortdurend en zonder pauze verandert van richting put je uit. Als leidinggevende geef je rust en houvast; als collega kun je vernieuwing vertragen omdat je liever vasthoudt aan wat al werkt.",
    closeCircle: "Bij je naasten ben jij de stabiele factor waar iedereen op terugvalt in crisistijd. Loyaliteit betekent voor jou trouw blijven, ook als een relatie eigenlijk aan verandering toe is. Het schuurt wanneer een naaste juist beweging en vernieuwing nodig heeft, en jij die traagheid als bescherming bedoelt maar als rem wordt ervaren.",
    underPressure: "Zichtbaar blijf je opvallend kalm en functioneel, misschien wel de kalmste in de ruimte. Van binnen kan er meer spelen dan je laat zien, want je verbergt onrust achter een onverstoorbaar gezicht, en juist omdat niemand het ziet, blijft die spanning langer onopgemerkt bij jezelf hangen.",
    atEase: "Ontspannen ben je droogkomisch en gezellig, met plezier in kleine rituelen en herhaling, een vaste plek en een vast moment die voor jou geen sleur zijn maar comfort.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je onverstoorbaarheid soms een pantser is tegen een angst voor verandering die je liever niet toegeeft, want zolang alles hetzelfde blijft, hoef je niet te voelen hoe kwetsbaar je eigenlijk bent voor het onbekende. Bij anderen veroordeel je onrust en besluiteloosheid, terwijl je vanbinnen jaloers bent op het gemak waarmee zij iets nieuws durven beginnen. De eigenschap die je wegduwt, is speelse onvoorspelbaarheid: iets doen zonder dat het al bewezen veilig is.",
    whoYouCanBecome: "De rijpe versie van jou blijft stabiel, maar durft verandering te initiëren voordat de nood daartoe dwingt. Je betrouwbaarheid wordt dan een bewuste keuze in plaats van een vast te houden gewoonte.",
    whatYouNeed: [
      "Oefening in kleine, vrijwillige veranderingen zonder dat er een crisis aan voorafgaat.",
      "Mensen om je heen die je uitnodigen tot verandering zonder je stabiliteit te bekritiseren.",
      "Ruimte om je eigen onrust te tonen, ook als niemand erom vraagt.",
      "Herkennen wanneer vasthouden aan het bekende comfort geeft, en wanneer het je juist tegenhoudt.",
    ],
    howOthersShouldUnderstand: [
      "Mijn rust onder druk betekent niet dat ik niets voel, vraag er gerust naar.",
      "Als ik traag reageer op verandering, heb ik tijd nodig, geen druk.",
      "Ik toon mijn onrust zelden vanzelf, als je merkt dat er iets is, vraag er dan naar.",
    ],
    howToUnderstandYourself: [
      "Welke verandering stel ik nu uit tot het niet anders meer kan?",
      "Wat voel ik werkelijk achter mijn kalmte, dat ik nu niet laat zien?",
      "Wanneer heb ik voor het laatst uit vrije wil iets veranderd, zonder dat het moest?",
    ],
    ifItDoesNotFit: "Het kan zijn dat je momenteel in een periode zit met veel onrust om je heen waardoor je eigen stabiliteit onder druk staat en je jezelf niet als de rustige herkent. Het kan ook zijn dat je die rol lang hebt vervuld voor anderen en daardoor bent vergeten dat het een kernpatroon van jou is, en niet slechts een taak die je op je hebt genomen.",
  },
  thePerformer: {
    alone: "In stilte broed je vaak op je volgende manier om iets uit te drukken, zoals een idee voor een verhaal, een plan of een manier om iets over te brengen. Dat is energiegevend zolang het gevoed wordt door je eigen creatieve drang. Duurt afzondering te lang zonder enig vooruitzicht op gezien worden, dan slaat die energie om in onrust en het gevoel dat je wegkwijnt zonder podium.",
    withOthers: "Je maakt een sterke, kleurrijke indruk en mensen onthouden je. Je geeft levendigheid en durf aan een gesprek of groep. Wat je nodig hebt, is oprechte interesse in wie je bent als je even niet presteert, niet alleen bewondering voor wat je laat zien.",
    atWork: "Je excelleert in werk waarin expressie en impact tellen, zoals presenteren, creëren en iets neerzetten dat wordt opgemerkt. Werk dat volledig onzichtbaar en anoniem is, zonder enige erkenning, put je uit, ook als het inhoudelijk de moeite waard is. Als leidinggevende inspireer je door voorbeeld en aanwezigheid; als collega kun je moeite hebben om op de achtergrond te blijven wanneer iemand anders het podium krijgt.",
    closeCircle: "Bij je naasten ben je degene die het leven kleur geeft, met verhalen, humor en een uitbundige manier van vieren. Loyaliteit betekent voor jou dat je opkomt voor mensen, zichtbaar en luid als het moet. Het schuurt wanneer een naaste behoefte heeft aan bescheiden, stille aandacht, en jij onbedoeld de aandacht naar jezelf trekt.",
    underPressure: "Zichtbaar ga je harder je best doen om gezien of gewaardeerd te worden, soms met meer bravoure dan de situatie vraagt. Van binnen speelt de angst dat je zonder erkenning betekenisloos wordt, een angst die groter is dan de feitelijke situatie rechtvaardigt.",
    atEase: "Ontspannen ben je grappig, gul met complimenten aan anderen, en kun je genieten van een moment zonder dat het gezien hoeft te worden. Je hebt dan niets te bewijzen, alleen plezier te maken.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je behoefte aan erkenning soms een manier is om een diepere onzekerheid over je eigen waarde te overstemmen, want zonder publiek twijfel je aan of je wel genoeg bent. Bij anderen veroordeel je aandachttrekkerij of ijdelheid, terwijl je vanbinnen precies dezelfde behoefte hebt, alleen minder openlijk. De eigenschap die je wegduwt, is onopgemerkte tevredenheid: iets goeds doen en er zelf, in stilte, voldaan mee zijn.",
    whoYouCanBecome: "De rijpe versie van jou blijft zich uitdrukken, maar heeft applaus niet meer nodig om te weten dat het waardevol was. Je expressie wordt dan een gift aan anderen, niet langer een verzoek om bevestiging.",
    whatYouNeed: [
      "Bewust iets goeds doen zonder het aan iemand te vertellen.",
      "Feedback vragen over de impact van je gedrag op anderen, niet alleen over de indruk die je maakte.",
      "Oefening in aanwezig zijn zonder op de voorgrond te treden.",
      "Mensen om je heen die je waarderen om wie je bent, niet om wat je laat zien.",
    ],
    howOthersShouldUnderstand: [
      "Mijn behoefte aan erkenning is oprecht, negeer die niet, maar help me er niet volledig van afhankelijk te worden.",
      "Als een prestatie van mij niet de reactie kreeg die ik hoopte, ben ik kwetsbaarder dan ik laat zien.",
      "Ik geef veel energie, maar heb ook iemand nodig die naar mij vraagt als het podium er even niet is.",
    ],
    howToUnderstandYourself: [
      "Deed ik dit voor mezelf, of voor de reactie die het zou opleveren?",
      "Wanneer voelde ik me voor het laatst voldaan zonder dat iemand het zag?",
      "Wat gebeurt er in mij als een prestatie onopgemerkt blijft?",
    ],
    ifItDoesNotFit: "Mogelijk leef je in een omgeving waar zichtbaarheid als opschepperig wordt gezien, waardoor je deze kant hebt ingeperkt. Het kan ook zijn dat je expressie op een andere, minder herkenbare manier uit, bijvoorbeeld schrijven in plaats van spreken, waardoor je het patroon zelf niet meteen als podiumbehoefte herkent.",
  },
  theHermit: {
    alone: "In stilte kom je pas echt tot jezelf, want gedachten krijgen ruimte, gevoelens krijgen richting, en je voelt je meer op je gemak dan in gezelschap. Dat is herstellend en noodzakelijk. Duurt de afzondering te lang zonder enig contact, dan slaat het om in vervreemding: je raakt zo gewend aan je eigen wereld dat de buitenwereld vreemd en vermoeiend begint te voelen.",
    withOthers: "Je maakt geen luide eerste indruk, maar wie moeite doet, ontdekt een ongewoon diepe gesprekspartner. Je geeft aandacht die weloverwogen is, niet gehaast. Wat je nodig hebt, is iemand die zich niet afgewezen voelt door je behoefte aan ruimte, en die begrijpt dat afstand bij jou geen afwijzing is.",
    atWork: "Je excelleert in werk waarin zelfstandig, diepgaand denken gevraagd wordt, zoals onderzoek, schrijven of vakmanschap dat concentratie vereist. Werk vol constante sociale interactie en open kantoortuinen zonder enige rustplek zuigt je energie leeg. Als leidinggevende geef jij mensen ruimte en vertrouw je op hun zelfstandigheid; als collega kun jij overkomen als afstandelijk, terwijl jij gewoon aan het verwerken bent.",
    closeCircle: "Bij mensen die je al lang kent, open je je meer dan bij wie dan ook, al blijft dat proces traag. Loyaliteit betekent voor jou aanwezig zijn wanneer het echt nodig is, zonder dat continu contact daarvoor vereist is. Het schuurt wanneer een naaste frequent contact als bewijs van liefde ziet, en jouw stilte als afstandelijkheid interpreteert.",
    underPressure: "Zichtbaar trek je je terug, word je onbereikbaar of stil, precies op het moment dat anderen misschien juist behoefte hebben aan jouw aanwezigheid. Van binnen ben je hard aan het verwerken, vaak grondiger dan iemand die hardop reageert, waardoor het rustig lijkt terwijl er van alles gebeurt.",
    atEase: "Ontspannen ben je verrassend droog geestig en observerend scherp, met een diepgang in gesprek die pas naar boven komt als je je veilig voelt. Je geniet dan zowel van eigen gezelschap als, met mate, van goed gezelschap.",
    shadow: "Wat je niet over jezelf wilt weten, is dat je voorkeur voor afzondering soms ook een manier is om het risico van afgewezen worden te vermijden, want als je je nooit volledig laat zien, kan niemand je echt afwijzen. Bij anderen veroordeel je aanhankelijkheid of behoeftigheid, terwijl je vanbinnen soms verlangt naar het gemak waarmee zij zich laten kennen zonder er lang over na te denken. De eigenschap die je wegduwt, is spontane, onbeschermde nabijheid: jezelf laten zien voordat je zeker weet dat het veilig is.",
    whoYouCanBecome: "De rijpe versie van jou blijft je rijke binnenwereld koesteren, maar leert vaker de brug te slaan naar buiten voordat afstand een gewoonte wordt. Je diepte wordt dan iets dat je deelt uit vrije keuze, niet alleen iets dat je beschermt.",
    whatYouNeed: [
      "Een vaste, kleine gewoonte om iets van je binnenwereld te delen, ook als het ongemakkelijk voelt.",
      "Mensen om je heen die je ruimte respecteren zonder die te verwarren met afwijzing.",
      "Oefening in contact zoeken vóórdat je het nodig hebt, niet pas als het knelt.",
      "Herkennen wanneer afzondering herstel is en wanneer het vermijding van nabijheid is geworden.",
    ],
    howOthersShouldUnderstand: [
      "Mijn stilte is zelden een teken dat er iets mis is met jou, geef me ruimte, en ik kom vanzelf terug.",
      "Ik deel niet snel, maar wat ik deel is doordacht, neem het serieus als het eindelijk komt.",
      "Vraag me af en toe expliciet naar contact, want ik zoek het zelf niet snel op.",
    ],
    howToUnderstandYourself: [
      "Trek ik me nu terug om te herstellen, of om een moeilijk gesprek te vermijden?",
      "Wanneer heb ik voor het laatst iets van mezelf gedeeld voordat het me gevraagd werd?",
      "Wat zou er gebeuren als ik nu contact zocht, in plaats van te wachten tot iemand anders het doet?",
    ],
    ifItDoesNotFit: "Het kan zijn dat je momenteel in een sociaal veeleisende levensfase zit die je natuurlijke behoefte aan afzondering overstemt, waardoor je die niet direct herkent. Het is ook mogelijk dat je hebt geleerd je behoefte aan stilte te verbergen omdat die in je omgeving als onvriendelijk werd opgevat, waardoor je haar nu zelf minder goed herkent als een kernbehoefte.",
  },
};

export interface StressArchetypeContent {
  /**
   * Zichtbaar gedrag en de innerlijke drijfveer van dít stress-archetype
   * (niet van het primaire archetype). Volledige zin(nen).
   */
  underPressure: Phrasing;
}

/**
 * Beschrijft het zichtbare gedrag onder druk per gemeten stress-archetype
 * (result.stressArchetype), losstaand van het primaire archetype. Dit
 * voorkomt dat de sectie "Hoe je bent onder druk" het gedrag van het ene
 * archetype aankondigt en dan het gedrag van een ander archetype beschrijft.
 */
export const STRESS_ARCHETYPE_CONTENT: Record<StressArchetypeId, StressArchetypeContent> = {
  theController: {
    underPressure: [
      "Zichtbaar grijp je naar lijstjes, planningen en duidelijke afspraken, en je bemoeit je sneller dan anders met taken die niet van jou zijn. Van binnen speelt de angst dat de situatie je overvalt als je nu niet zelf de regie pakt, een angst die groter is dan wat er praktisch op het spel staat.",
      "Zichtbaar zoek je houvast in overzicht, regels en een strak schema, en neem je sneller taken van anderen over. Van binnen speelt de angst overvallen te worden door hoe de situatie loopt, een angst die zwaarder weegt dan het praktische probleem zelf.",
    ],
  },
  theVanisher: {
    underPressure: [
      "Zichtbaar word je stiller, trek je je terug uit gesprekken en zoek je afstand in plaats van erover te praten. Van binnen speelt de behoefte om in je eentje eerst overzicht te krijgen, voordat je iets met een ander kunt delen.",
      "Zichtbaar trek je je terug en wordt het stiller om je heen, precies op momenten dat anderen misschien juist iets van je zouden willen horen. Van binnen ben je aan het verwerken in je eigen tempo, en dat gaat aan de oppervlakte onopgemerkt door.",
    ],
  },
  theSprinter: {
    underPressure: [
      "Zichtbaar versnel je: meer praten, meer beslissen, sneller reageren, soms harder dan bedoeld. Van binnen speelt de angst dat stilstaan nu als achterblijven voelt, een angst die groter is dan de praktische druk zelf.",
      "Zichtbaar ga je meer tegelijk doen en neem je sneller besluiten dan je normaal zou nemen. Van binnen speelt de angst dat je iets misloopt als je nu niet in beweging blijft.",
    ],
  },
  theFrozenOne: {
    underPressure: [
      "Zichtbaar lijk je stil te vallen of vast te lopen, terwijl je hoofd vanbinnen juist druk doorwerkt zonder dat dit naar buiten komt. Van binnen speelt de angst om de verkeerde stap te zetten, waardoor geen enkele stap nog veilig voelt.",
      "Zichtbaar reageer je trager of lijk je even vast te zitten, ook al blijft er vanbinnen van alles bewegen. Van binnen speelt de angst een misstap te zetten die je liever helemaal vermijdt door voorlopig niets te doen.",
    ],
  },
  thePleaser: {
    underPressure: [
      "Zichtbaar stem je je sneller af op wat de ander lijkt te willen en zeg je minder snel tegen, ook als jouw eigen ruimte daaronder lijdt. Van binnen speelt de angst dat spanning tussen jou en een ander erger wordt als je nu niet meebeweegt.",
      "Zichtbaar pas je je sneller aan de wensen van een ander aan en vermijd je liever een aanvaring. Van binnen speelt de angst dat een aanvaring de relatie schaadt, zwaarder dan wat er feitelijk op het spel staat.",
    ],
  },
  theDefender: {
    underPressure: [
      "Zichtbaar reageer je sneller met een tegenargument of uitleg zodra er kritiek komt, nog voordat je die opmerking echt hebt overwogen. Van binnen speelt de angst dat kritiek betekent dat je tekortschiet, een angst die groter is dan de opmerking zelf rechtvaardigt.",
      "Zichtbaar schiet je sneller in de verdediging bij kritiek, met een tegenargument dat al klaarstaat voordat de opmerking is uitgesproken. Van binnen speelt de angst als onbekwaam gezien te worden, zwaarder dan wat de kritiek feitelijk beweert.",
    ],
  },
};
