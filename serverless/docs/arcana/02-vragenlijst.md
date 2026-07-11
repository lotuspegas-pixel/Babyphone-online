# Arcana Mirror — Vragenlijst

Exact 120 vragen: 72 Likert, 24 forced-choice, 16 scenario, 8 ranking.

De canonieke, machine-leesbare bron is [`arcana/src/data/arcanaQuestions.ts`](../../arcana/src/data/arcanaQuestions.ts). Dit document is de menselijk leesbare spiegel daarvan — bij afwijking is de TypeScript-data leidend.

## Likert-schaal

1 = helemaal niet herkenbaar
2 = nauwelijks herkenbaar
3 = een beetje herkenbaar
4 = neutraal / soms
5 = behoorlijk herkenbaar
6 = sterk herkenbaar
7 = volledig herkenbaar

## Likert (L01–L72)

Formaat: `id | tekst | targets`

L01 | Ik merk vaak eerder dan anderen wanneer de sfeer in een ruimte verandert. | emotionalSensitivity,intuitiveThinking,connectionNeed
L02 | Ik denk vaak al drie stappen vooruit voordat anderen doorhebben wat er speelt. | analyticalThinking,intuitiveThinking,controlNeed
L03 | Als iets geen betekenis heeft, verlies ik snel energie. | meaningNeed,autonomyNeed,creativeThinking
L04 | Een duidelijk plan geeft mij rust. | securityNeed,controlNeed,practicalThinking
L05 | Ik voel weerstand wanneer iemand te veel bepaalt hoe ik iets moet doen. | autonomyNeed,independenceNeed,directness
L06 | Kritiek blijft bij mij langer hangen dan ik aan anderen laat merken. | criticismSensitivity,selfDoubt,emotionalSensitivity
L07 | Als niemand verantwoordelijkheid neemt, voel ik snel dat ik iets moet doen. | controlNeed,practicalThinking,selfConfidence
L08 | Ik laat vaak minder zien van mijn stress dan ik werkelijk voel. | stressWithdrawal,emotionalSensitivity,shadowAvoidance
L09 | Ik wil graag gewaardeerd worden, maar ik vraag daar niet makkelijk om. | recognitionNeed,selfDoubt,connectionNeed
L10 | Na veel sociale prikkels heb ik tijd alleen nodig om mezelf terug te vinden. | solitudeNeed,emotionalSensitivity,stressWithdrawal
L11 | Ik zie snel verbanden tussen dingen die anderen los van elkaar zien. | intuitiveThinking,creativeThinking,analyticalThinking
L12 | Ik begin soms liever gewoon dan dat ik alles eerst volledig uitzoek. | creativeThinking,autonomyNeed,practicalThinking
L13 | Ik voel me snel verantwoordelijk voor de emoties van anderen. | peoplePleasing,connectionNeed,emotionalSensitivity
L14 | Spanning tussen mensen kan mij meer energie kosten dan ik wil toegeven. | conflictAvoidance,emotionalSensitivity,stressWithdrawal
L15 | Ik kan direct zijn als ik vind dat iets eerlijk gezegd moet worden. | directness,selfConfidence,autonomyNeed
L16 | Na een keuze blijf ik soms twijfelen of ik het juiste heb gedaan. | selfDoubt,controlNeed,criticismSensitivity
L17 | Ik doe soms extra mijn best omdat ik hoop dat iemand het ziet. | recognitionNeed,perfectionism,peoplePleasing
L18 | Ik vind het lastig om afhankelijk te zijn van anderen. | independenceNeed,trustNeed,controlNeed
L19 | Ik wil graag weten waar ik aan toe ben voordat ik mij ergens aan verbind. | securityNeed,trustNeed,controlNeed
L20 | Ik kan goed improviseren als de situatie daarom vraagt. | creativeThinking,selfConfidence,practicalThinking
L21 | Ik analyseer soms gesprekken of berichten achteraf te lang. | analyticalThinking,criticismSensitivity,selfDoubt
L22 | Mensen komen vaak bij mij terecht als ze iets willen delen. | connectionNeed,emotionalSensitivity,intimacyNeed
L23 | Ik raak ongeduldig wanneer mensen traag of vaag blijven. | directness,practicalThinking,stressAcceleration
L24 | Iemand teleurstellen voelt voor mij zwaarder dan ik zou willen. | peoplePleasing,criticismSensitivity,connectionNeed
L25 | Ik vertrouw iets sneller als ik bewijs, structuur of logica zie. | analyticalThinking,controlNeed,securityNeed
L26 | Mijn eerste gevoel over mensen of situaties blijkt vaak later te kloppen. | intuitiveThinking,emotionalSensitivity,trustNeed
L27 | Als iets belangrijk voor mij is, kan ik zeer volhardend zijn. | selfConfidence,perfectionism,meaningNeed
L28 | Ik vermijd soms vragen over wat ik echt voel. | shadowAvoidance,stressWithdrawal,trustNeed
L29 | Ik test soms eerst of iemand veilig genoeg is voordat ik mij open. | trustNeed,intimacyNeed,conflictAvoidance
L30 | Ik verlang naar gesprekken die verder gaan dan de oppervlakte. | meaningNeed,intimacyNeed,solitudeNeed
L31 | Als het nodig is, kan ik zichtbaar en overtuigend aanwezig zijn. | socialEnergy,recognitionNeed,selfConfidence
L32 | Onder druk word ik eerder stiller dan drukker. | stressWithdrawal,solitudeNeed,shadowAvoidance
L33 | Onder druk probeer ik meer grip te krijgen op de situatie. | stressControl,controlNeed,analyticalThinking
L34 | Onder druk ga ik soms versnellen en te veel tegelijk doen. | stressAcceleration,recognitionNeed,controlNeed
L35 | Onder druk kan ik vastlopen terwijl mijn hoofd juist heel actief is. | stressFreeze,selfDoubt,emotionalSensitivity
L36 | Ik help vaak al voordat iemand het expliciet vraagt. | peoplePleasing,connectionNeed,emotionalSensitivity
L37 | Complimenten geloof ik niet altijd meteen. | selfDoubt,recognitionNeed,criticismSensitivity
L38 | Ik verberg kwetsbaarheid soms achter humor, ratio of afstand. | shadowAvoidance,analyticalThinking,stressWithdrawal
L39 | Ik heb weleens spijt dat ik niet eerder heb gezegd wat ik echt vond. | conflictAvoidance,selfDoubt,directness
L40 | Ik wil iets bouwen of doen dat echt betekenis heeft. | meaningNeed,creativeThinking,autonomyNeed
L41 | Ritme en routine helpen mij om rust te houden. | securityNeed,practicalThinking,controlNeed
L42 | Te veel mogelijkheden tegelijk kunnen mij blokkeren. | stressFreeze,controlNeed,selfDoubt
L43 | Ik krijg energie van nieuwe ideeën, beelden of mogelijkheden. | creativeThinking,intuitiveThinking,autonomyNeed
L44 | Ik merk snel wanneer iemands woorden en gedrag niet overeenkomen. | intuitiveThinking,emotionalSensitivity,analyticalThinking
L45 | Ik werk vaak het beste wanneer ik ongestoord mijn eigen tempo kan volgen. | solitudeNeed,autonomyNeed,practicalThinking
L46 | Ik krijg energie van mensen wanneer er enthousiasme of beweging ontstaat. | socialEnergy,recognitionNeed,creativeThinking
L47 | Oppervlakkigheid put mij sneller uit dan drukte. | meaningNeed,intimacyNeed,solitudeNeed
L48 | Deadlines helpen mij om ideeën af te maken. | practicalThinking,controlNeed,stressAcceleration
L49 | Ik vind het lastig om iets half of slordig af te leveren. | perfectionism,criticismSensitivity,controlNeed
L50 | Grenzen aangeven lukt mij meestal pas als iets echt te veel wordt. | peoplePleasing,conflictAvoidance,selfDoubt
L51 | Mijn hoofd blijft vaak doorgaan, ook als mijn lichaam rust nodig heeft. | analyticalThinking,stressAcceleration,emotionalSensitivity
L52 | Ik zie vaak hoe systemen, mensen of processen beter kunnen werken. | analyticalThinking,practicalThinking,creativeThinking
L53 | De stemming van anderen kan mijn eigen stemming beïnvloeden. | emotionalSensitivity,connectionNeed,peoplePleasing
L54 | Als ik loyaal ben aan iemand, geef ik niet snel op. | connectionNeed,trustNeed,peoplePleasing
L55 | Wanneer ik mij aangevallen voel, neem ik eerst afstand. | stressWithdrawal,criticismSensitivity,trustNeed
L56 | Als ik onzeker ben, ga ik vaak harder mijn best doen. | perfectionism,selfDoubt,recognitionNeed
L57 | Ik kies soms voor harmonie terwijl ik eigenlijk iets anders wil. | conflictAvoidance,peoplePleasing,connectionNeed
L58 | Ik vind het belangrijk dat mijn bijdrage impact heeft. | recognitionNeed,meaningNeed,selfConfidence
L59 | Taken zonder duidelijk nut voelen zwaar voor mij. | meaningNeed,autonomyNeed,practicalThinking
L60 | Ik stel moeilijke keuzes soms uit omdat ik eerst meer helderheid wil. | shadowAvoidance,controlNeed,selfDoubt
L61 | Ik voel mij sterker wanneer iemand mij echt vertrouwt. | trustNeed,connectionNeed,selfConfidence
L62 | Ik heb moeite met autoriteit wanneer die oneerlijk of onlogisch voelt. | autonomyNeed,directness,analyticalThinking
L63 | Perfectionisme vertraagt mij soms meer dan ik wil. | perfectionism,selfDoubt,controlNeed
L64 | Ik kan anderen enthousiast maken voor een idee. | socialEnergy,creativeThinking,recognitionNeed
L65 | Ik observeer vaak eerst voordat ik mij volledig laat zien. | solitudeNeed,trustNeed,intuitiveThinking
L66 | Bij grote veranderingen wil ik eerst weten wat de risico's zijn. | securityNeed,controlNeed,analyticalThinking
L67 | Ik kies soms voor de behoefte van de ander boven mijn eigen behoefte. | peoplePleasing,connectionNeed,conflictAvoidance
L68 | Ik kan emotie tijdelijk parkeren als er een probleem opgelost moet worden. | analyticalThinking,practicalThinking,stressControl
L69 | Ik vraag niet snel om hulp, ook als ik die eigenlijk nodig heb. | independenceNeed,selfDoubt,shadowAvoidance
L70 | Ik wil begrepen worden zonder alles steeds te hoeven uitleggen. | intimacyNeed,criticismSensitivity,emotionalSensitivity
L71 | Ik voel mij ongemakkelijk wanneer ik geen duidelijke rol heb. | securityNeed,recognitionNeed,controlNeed
L72 | Ik ben bereid om naar mijn eigen patronen te kijken, ook als dat confronterend is. | growthReadiness,selfConfidence,meaningNeed

## Forced choice (FC01–FC24)

Formaat: `id | vraag | opties (letter: tekst -> targets)`

FC01 | Wat past beter bij jou? | A: Ik zeg liever duidelijk wat ik vind. -> directness,selfConfidence | B: Ik bewaak liever de sfeer. -> conflictAvoidance,peoplePleasing
FC02 | Wat voelt natuurlijker? | A: Eerst begrijpen wat logisch klopt. -> analyticalThinking,controlNeed | B: Eerst voelen wat innerlijk klopt. -> intuitiveThinking,emotionalSensitivity
FC03 | Wat heb je sterker nodig? | A: Vrijheid om je eigen richting te kiezen. -> autonomyNeed,independenceNeed | B: Zekerheid dat de basis klopt. -> securityNeed,controlNeed
FC04 | Wat raakt jou dieper? | A: Niet gezien worden. -> recognitionNeed,criticismSensitivity | B: Niet vrij gelaten worden. -> autonomyNeed,independenceNeed
FC05 | Wat doe je sneller onder druk? | A: Meer controleren. -> stressControl,controlNeed | B: Meer terugtrekken. -> stressWithdrawal,solitudeNeed | C: Meer versnellen. -> stressAcceleration,perfectionism | D: Vastlopen. -> stressFreeze,selfDoubt
FC06 | Wat kost jou meer energie? | A: Te veel mensen. -> solitudeNeed,emotionalSensitivity | B: Te weinig betekenis. -> meaningNeed,autonomyNeed | C: Te weinig structuur. -> securityNeed,controlNeed | D: Te veel conflict. -> conflictAvoidance,peoplePleasing
FC07 | Wat wil je liever vermijden? | A: Iemand teleurstellen. -> peoplePleasing,connectionNeed | B: Jezelf verliezen. -> independenceNeed,autonomyNeed | C: Falen. -> perfectionism,selfDoubt | D: Afgewezen worden. -> criticismSensitivity,trustNeed
FC08 | Wanneer voel je je het meest krachtig? | A: Als ik richting geef. -> directness,selfConfidence | B: Als ik iets dieps begrijp. -> meaningNeed,analyticalThinking | C: Als ik iemand echt help. -> connectionNeed,peoplePleasing | D: Als ik iets nieuws creëer. -> creativeThinking,autonomyNeed
FC09 | Wat past het meest? | A: Ik wil het eerst zeker weten. -> controlNeed,securityNeed | B: Ik wil het eerst proberen. -> practicalThinking,creativeThinking
FC10 | Waar vertrouw je meer op? | A: Bewijs en analyse. -> analyticalThinking,controlNeed | B: Gevoel en patroonherkenning. -> intuitiveThinking,emotionalSensitivity
FC11 | Wat vind je lastiger? | A: Om hulp vragen. -> independenceNeed,shadowAvoidance | B: Nee zeggen. -> peoplePleasing,conflictAvoidance
FC12 | Wat gebeurt er sneller? | A: Ik neem te veel verantwoordelijkheid. -> controlNeed,peoplePleasing | B: Ik neem te veel afstand. -> stressWithdrawal,independenceNeed
FC13 | Wat motiveert jou meer? | A: Iets betekenen. -> meaningNeed,connectionNeed | B: Iets bereiken. -> recognitionNeed,selfConfidence | C: Iets begrijpen. -> analyticalThinking,intuitiveThinking | D: Iets vrij kunnen doen. -> autonomyNeed,independenceNeed
FC14 | Wat past beter? | A: Ik werk graag diep en gefocust. -> solitudeNeed,analyticalThinking | B: Ik werk graag actief en in beweging. -> socialEnergy,stressAcceleration
FC15 | Wat gebeurt er bij kritiek? | A: Ik verdedig mij sneller dan ik wil. -> shadowDefensiveness,criticismSensitivity | B: Ik trek mij terug. -> stressWithdrawal,selfDoubt | C: Ik ga harder mijn best doen. -> perfectionism,recognitionNeed | D: Ik onderzoek of het klopt. -> analyticalThinking,growthReadiness
FC16 | Welke zin past beter? | A: Ik wil ruimte. -> autonomyNeed,independenceNeed | B: Ik wil rust. -> securityNeed,solitudeNeed | C: Ik wil erkenning. -> recognitionNeed,selfConfidence | D: Ik wil verbinding. -> connectionNeed,intimacyNeed
FC17 | Wat is vaker jouw valkuil? | A: Te veel nadenken. -> analyticalThinking,controlNeed | B: Te veel voelen. -> emotionalSensitivity,criticismSensitivity | C: Te veel doen. -> stressAcceleration,perfectionism | D: Te lang vermijden. -> shadowAvoidance,conflictAvoidance
FC18 | Wat geeft jou vertrouwen? | A: Duidelijke afspraken. -> securityNeed,trustNeed | B: Eerlijke emoties. -> intimacyNeed,emotionalSensitivity | C: Logische onderbouwing. -> analyticalThinking,controlNeed | D: Vrijheid om zelf te kiezen. -> autonomyNeed,independenceNeed
FC19 | Wat doe je als iets niet klopt? | A: Ik benoem het. -> directness,selfConfidence | B: Ik observeer langer. -> intuitiveThinking,trustNeed | C: Ik zoek bewijs. -> analyticalThinking,controlNeed | D: Ik probeer de sfeer goed te houden. -> peoplePleasing,conflictAvoidance
FC20 | Wat herken je het meest? | A: Ik wil minder twijfelen. -> selfDoubt,controlNeed | B: Ik wil beter grenzen stellen. -> peoplePleasing,conflictAvoidance | C: Ik wil meer durven kiezen. -> autonomyNeed,growthReadiness | D: Ik wil rustiger omgaan met druk. -> stressControl,stressAcceleration
FC21 | Wat is jouw natuurlijke rol? | A: De denker. -> analyticalThinking,solitudeNeed | B: De voeler. -> emotionalSensitivity,connectionNeed | C: De bouwer. -> practicalThinking,controlNeed | D: De vernieuwer. -> creativeThinking,autonomyNeed
FC22 | Wat irriteert jou sneller? | A: Onechtheid. -> intuitiveThinking,intimacyNeed | B: Chaos. -> controlNeed,securityNeed | C: Traagheid. -> practicalThinking,stressAcceleration | D: Onrecht. -> directness,emotionalSensitivity
FC23 | Wat is moeilijker? | A: Loslaten. -> controlNeed,perfectionism | B: Beginnen. -> stressFreeze,selfDoubt | C: Stoppen. -> stressAcceleration,recognitionNeed | D: Uiten wat ik voel. -> stressWithdrawal,trustNeed
FC24 | Wat wil je dat mensen beter begrijpen? | A: Dat ik meer voel dan ik laat zien. -> emotionalSensitivity,stressWithdrawal | B: Dat ik meer kan dan ik laat zien. -> selfDoubt,recognitionNeed | C: Dat ik meer vrijheid nodig heb. -> autonomyNeed,independenceNeed | D: Dat ik meer rust nodig heb. -> solitudeNeed,securityNeed

## Scenario (S01–S16)

S01 | Je zit in een team waarin niemand verantwoordelijkheid neemt. | A: Ik neem vanzelf de leiding. -> controlNeed,selfConfidence,directness | B: Ik probeer eerst te begrijpen waarom niemand beweegt. -> analyticalThinking,intuitiveThinking | C: Ik wacht af tot duidelijk is wat mijn rol is. -> securityNeed,stressFreeze | D: Ik probeer de groep op een rustige manier mee te krijgen. -> connectionNeed,peoplePleasing | E: Ik raak geïrriteerd en wil tempo maken. -> stressAcceleration,practicalThinking
S02 | Iemand geeft kritiek op iets waar jij hard aan hebt gewerkt. | A: Ik verdedig mijn keuze. -> shadowDefensiveness,criticismSensitivity | B: Ik word stil en denk er later veel over na. -> stressWithdrawal,selfDoubt | C: Ik vraag door om te begrijpen wat beter kan. -> growthReadiness,analyticalThinking | D: Ik voel schaamte, ook als de kritiek klein is. -> criticismSensitivity,emotionalSensitivity | E: Ik ga meteen proberen het te verbeteren. -> perfectionism,recognitionNeed
S03 | Je krijgt een kans die spannend maar onzeker is. | A: Ik onderzoek risico's. -> analyticalThinking,securityNeed | B: Ik voel eerst of het klopt. -> intuitiveThinking,autonomyNeed | C: Ik overleg met iemand die ik vertrouw. -> trustNeed,connectionNeed | D: Ik spring erin als het betekenisvol voelt. -> meaningNeed,creativeThinking | E: Ik stel de keuze uit. -> shadowAvoidance,selfDoubt
S04 | Je partner, vriend of collega trekt zich terug. | A: Ik vraag direct wat er is. -> directness,connectionNeed | B: Ik geef ruimte maar blijf het voelen. -> emotionalSensitivity,trustNeed | C: Ik denk dat ik iets verkeerd heb gedaan. -> selfDoubt,criticismSensitivity | D: Ik probeer de sfeer te herstellen. -> peoplePleasing,conflictAvoidance | E: Ik trek mezelf ook terug. -> stressWithdrawal,intimacyNeed
S05 | Je hebt te veel taken tegelijk. | A: Ik maak een planning. -> controlNeed,practicalThinking | B: Ik begin met wat het meest urgent voelt. -> stressAcceleration,practicalThinking | C: Ik raak geblokkeerd. -> stressFreeze,selfDoubt | D: Ik zoek naar de diepere prioriteit. -> meaningNeed,analyticalThinking | E: Ik doe te veel zelf. -> peoplePleasing,perfectionism
S06 | Je merkt dat iemand onecht doet. | A: Ik benoem het. -> directness,selfConfidence | B: Ik observeer en verzamel signalen. -> intuitiveThinking,analyticalThinking | C: Ik neem afstand. -> trustNeed,stressWithdrawal | D: Ik probeer de situatie luchtig te houden. -> conflictAvoidance,peoplePleasing | E: Ik voel spanning in mijn lichaam. -> emotionalSensitivity,criticismSensitivity
S07 | Je moet een belangrijk besluit nemen zonder volledige zekerheid. | A: Ik verzamel meer informatie. -> analyticalThinking,controlNeed | B: Ik kies op basis van mijn gevoel. -> intuitiveThinking,autonomyNeed | C: Ik stel uit. -> shadowAvoidance,stressFreeze | D: Ik vraag bevestiging. -> selfDoubt,connectionNeed | E: Ik kies en accepteer dat het niet perfect is. -> growthReadiness,selfConfidence
S08 | Je wordt niet erkend voor iets wat je hebt gedaan. | A: Ik doe alsof het me niets doet. -> shadowAvoidance,recognitionNeed | B: Ik voel teleurstelling. -> recognitionNeed,emotionalSensitivity | C: Ik werk nog harder. -> perfectionism,selfDoubt | D: Ik neem afstand. -> stressWithdrawal,criticismSensitivity | E: Ik benoem dat mijn bijdrage mist. -> directness,selfConfidence
S09 | Je bent in een drukke sociale situatie. Wanneer gaat het goed? | A: Als de gesprekken echt zijn. -> intimacyNeed,meaningNeed | B: Als er energie en humor is. -> socialEnergy,recognitionNeed | C: Als ik zelf kan kiezen met wie ik praat. -> autonomyNeed,solitudeNeed | D: Als ik een duidelijke rol heb. -> securityNeed,recognitionNeed | E: Als ik mensen kan helpen verbinden. -> connectionNeed,peoplePleasing
S10 | Je maakt een fout. | A: Ik analyseer hoe het kon gebeuren. -> analyticalThinking,controlNeed | B: Ik voel schaamte. -> criticismSensitivity,selfDoubt | C: Ik herstel het snel. -> practicalThinking,perfectionism | D: Ik praat het eerst goed. -> shadowDefensiveness,selfConfidence | E: Ik probeer ervan te leren. -> growthReadiness,meaningNeed
S11 | Iemand vraagt meer van je dan goed voor je is. | A: Ik zeg ja en voel later spanning. -> peoplePleasing,conflictAvoidance | B: Ik zeg nee als mijn grens duidelijk is. -> directness,selfConfidence | C: Ik zoek een compromis. -> connectionNeed,practicalThinking | D: Ik trek mij terug. -> stressWithdrawal,shadowAvoidance | E: Ik word geïrriteerd omdat mijn grens niet gezien wordt. -> criticismSensitivity,autonomyNeed
S12 | Je start een nieuw project. Wat heb je nodig? | A: Vrijheid en ruimte. -> autonomyNeed,creativeThinking | B: Structuur en planning. -> controlNeed,practicalThinking | C: Betekenis en richting. -> meaningNeed,intuitiveThinking | D: Mensen en energie. -> socialEnergy,connectionNeed | E: Zekerheid dat het haalbaar is. -> securityNeed,analyticalThinking
S13 | Je voelt dat iets in je leven niet klopt. | A: Ik zoek patronen. -> intuitiveThinking,analyticalThinking | B: Ik negeer het tot het te duidelijk wordt. -> shadowAvoidance,stressFreeze | C: Ik praat erover met iemand die veilig voelt. -> trustNeed,intimacyNeed | D: Ik probeer controle terug te krijgen. -> stressControl,controlNeed | E: Ik verander iets radicaal. -> autonomyNeed,creativeThinking
S14 | Je krijgt onverwacht veel succes of aandacht. | A: Ik geniet ervan. -> recognitionNeed,selfConfidence | B: Ik twijfel of ik het verdien. -> selfDoubt,criticismSensitivity | C: Ik voel druk om het vast te houden. -> perfectionism,stressControl | D: Ik wil meteen verder bouwen. -> stressAcceleration,meaningNeed | E: Ik trek mij wat terug. -> solitudeNeed,stressWithdrawal
S15 | Er ontstaat een conflict. | A: Ik ga het gesprek aan. -> directness,selfConfidence | B: Ik probeer het zachter te maken. -> conflictAvoidance,peoplePleasing | C: Ik analyseer wie gelijk heeft. -> analyticalThinking,controlNeed | D: Ik voel eerst veel, maar zeg weinig. -> emotionalSensitivity,stressWithdrawal | E: Ik reageer fel als iets onrechtvaardig voelt. -> directness,emotionalSensitivity
S16 | Je voelt je vastgelopen. | A: Rust en afstand. -> solitudeNeed,stressWithdrawal | B: Structuur en overzicht. -> controlNeed,practicalThinking | C: Een eerlijk gesprek. -> intimacyNeed,connectionNeed | D: Een nieuw perspectief. -> creativeThinking,intuitiveThinking | E: Een concrete eerste stap. -> practicalThinking,growthReadiness

## Ranking (R01–R08)

R01 | Zet op volgorde wat jij het meest nodig hebt. | Vrijheid -> autonomyNeed | Rust -> securityNeed,solitudeNeed | Erkenning -> recognitionNeed | Verbinding -> connectionNeed,intimacyNeed | Betekenis -> meaningNeed | Grip -> controlNeed
R02 | Wat raakt jou het snelst? | Niet serieus genomen worden -> recognitionNeed,criticismSensitivity | Controle verliezen -> controlNeed,securityNeed | Afwijzing -> criticismSensitivity,trustNeed | Onechtheid -> intuitiveThinking,intimacyNeed | Chaos -> securityNeed,controlNeed | Iemand teleurstellen -> peoplePleasing,connectionNeed
R03 | Wat doe je onder druk? | Terugtrekken -> stressWithdrawal | Controleren -> stressControl | Versnellen -> stressAcceleration | Bevriezen -> stressFreeze | Pleasen -> peoplePleasing | Verdedigen -> shadowDefensiveness
R04 | In welke omgeving groei jij het meest? | Vrije omgeving -> autonomyNeed,creativeThinking | Rustige omgeving -> solitudeNeed,securityNeed | Ambitieuze omgeving -> recognitionNeed,selfConfidence | Betekenisvolle omgeving -> meaningNeed,connectionNeed | Gestructureerde omgeving -> controlNeed,practicalThinking | Eerlijke omgeving -> trustNeed,intimacyNeed
R05 | Wat is jouw sterkste kracht? | Patronen zien -> intuitiveThinking,analyticalThinking | Mensen aanvoelen -> emotionalSensitivity,connectionNeed | Dingen bouwen -> practicalThinking,controlNeed | Ideeën bedenken -> creativeThinking,autonomyNeed | Doorzetten -> perfectionism,selfConfidence | Verbinden -> connectionNeed,intimacyNeed
R06 | Wat is jouw grootste valkuil? | Te veel nadenken -> analyticalThinking,controlNeed | Te veel voelen -> emotionalSensitivity,criticismSensitivity | Te veel doen -> stressAcceleration,perfectionism | Te veel aanpassen -> peoplePleasing,conflictAvoidance | Te veel terugtrekken -> stressWithdrawal,solitudeNeed | Te lang uitstellen -> shadowAvoidance,stressFreeze
R07 | Wat wil je meer leren? | Grenzen aangeven -> growthReadiness,directness | Loslaten -> growthReadiness,controlNeed | Vertrouwen -> growthReadiness,trustNeed | Kiezen -> growthReadiness,autonomyNeed | Rust nemen -> growthReadiness,solitudeNeed | Zichtbaar zijn -> growthReadiness,recognitionNeed
R08 | Wat beschrijft jouw communicatiestijl het best? | Direct en helder -> directness,selfConfidence | Voorzichtig en aftastend -> trustNeed,conflictAvoidance | Warm en verbindend -> connectionNeed,peoplePleasing | Analytisch en precies -> analyticalThinking,controlNeed | Beeldend en associatief -> creativeThinking,intuitiveThinking | Stil maar opmerkzaam -> solitudeNeed,emotionalSensitivity
