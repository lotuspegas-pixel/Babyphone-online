import type { Phrasing } from '../lib/arcanaVariants';

/**
 * De vaste kaderteksten van het rapport: sectie-inleidingen en overgangsalinea's
 * die niet uit een score volgen. Zonder varianten zijn deze regels voor iedere
 * deelnemer letterlijk gelijk, en vormen ze de grootste bron van overlap tussen
 * twee rapporten.
 *
 * Net als bij de trait-teksten geldt: varianten zeggen hetzelfde, alleen anders.
 * Dit zijn volledige zinnen — met hoofdletter en eindpunt.
 */
export const SECTION_PHRASINGS: Record<string, Phrasing> = {
  'seen-by-others.intro': [
    'Dit is de kant van je persoonlijkheid die het snelst zichtbaar wordt in gedrag, ook voor mensen die je nog niet goed kennen.',
    'Dit merken anderen het eerst aan je — ook wie je pas een uur kent.',
    'Dit is wat er van je overkomt voordat iemand de moeite heeft genomen je te leren kennen.',
  ],
  'seen-by-others.persona': [
    'Deze eigenschappen zijn niet je hele verhaal, maar wel het deel dat als eerste indruk blijft hangen. In Jungs taal is dit je persona: het gezicht dat je meeneemt naar buiten. Een persona is niet oneerlijk — je hebt er een nodig. Hij wordt pas een probleem wanneer je hem thuis niet meer af krijgt.',
    'Dit is niet alles wat je bent, maar het is wel wat beklijft. Jung noemde dit de persona: de kant die je meeneemt de deur uit. Daar is niets mis mee — zonder persona kom jij een werkdag niet door. Het wringt pas wanneer je hem \'s avonds niet meer afzet.',
    'Wat hier staat is de buitenlaag, niet de kern. Jung sprak van de persona, het masker dat je voor de wereld draagt. Iedereen heeft er een nodig. De vraag is alleen of jij hem nog kunt uitzetten wanneer er niemand meer kijkt.',
  ],
  'hidden-inner-world.intro': [
    'Onder de zichtbare laag zit een deel van je patroon dat je minder snel laat zien, ook aan mensen die dichtbij staan.',
    'Hieronder ligt het deel dat je zelden hardop maakt, zelfs niet tegen wie je vertrouwt.',
    'Dit speelt onder de oppervlakte — herkenbaar voor jou, meestal onzichtbaar voor de rest.',
  ],
  'hidden-inner-world.note': [
    'Dit is niet iets wat je verbergt om te misleiden — het is vaak zo vertrouwd geworden dat je het zelf nauwelijks meer opmerkt.',
    'Je houdt dit niet bewust achter. Het is zo eigen geworden dat het jou zelf niet meer opvalt.',
    'Er zit geen opzet achter. Wat je lang genoeg met je meedraagt, wordt op een dag onzichtbaar — ook voor jezelf.',
  ],
  'alone.intro': [
    'Wie je bent zonder publiek is vaak eerlijker dan wie je bent in gezelschap, en het is de versie waar je het minst over praat.',
    'Zonder toeschouwers valt de bijstelling weg. Dit is de versie van jou waar je zelden iets over zegt.',
    'Alleen zijn haalt een eerlijker versie van je naar boven dan gezelschap doet — en juist die versie blijft meestal onbesproken.',
  ],
  'with-others.note': [
    'Let bij het lezen hiervan op het verschil tussen bekende en onbekende gezelschappen. De meeste mensen zijn in een vertrouwde groep een ander mens dan onder vreemden, en het is de moeite waard om te weten welke van de twee jij als "jezelf" beschouwt.',
    'Weeg dit af tegen het gezelschap. Bij vertrouwde mensen ben je vrijwel zeker iemand anders dan tussen vreemden — en het is veelzeggend welke van die twee jij je eigen versie noemt.',
    'Lees dit met de vraag erbij: geldt dit overal, of alleen waar je je veilig voelt? Bijna iedereen heeft twee registers. De interessante vraag is welk register jij als het echte beschouwt.',
  ],
  'close-circle.intro': [
    'In langdurige banden gedraagt bijna iedereen zich anders dan op werk of onder vreemden. Oude rollen liggen daar het dichtst aan de oppervlakte.',
    'Bij mensen die je lang kent, val je makkelijker terug in oude rollen dan waar dan ook.',
    'Vertrouwde kring is de plek waar het oudste gedrag het snelst terugkomt — vaak sneller dan je zou willen.',
  ],
  'at-ease.note': [
    'Als je jezelf hier niet in herkent, is dat op zichzelf informatie. Het kan betekenen dat je zelden lang genoeg veilig bent geweest om deze versie van jezelf te leren kennen — en dat is geen tekortkoming, maar wel iets om serieus te nemen.',
    'Herken je dit niet, dan zegt dat ook iets. Misschien is er te weinig rust geweest om deze kant van je te leren kennen. Dat is geen gebrek, maar het is het opmerken waard.',
    'Voelt dit vreemd, blijf daar dan even bij stilstaan. Wie zelden lang genoeg op zijn gemak is, leert deze versie van zichzelf nooit goed kennen — en dat is iets om serieus te nemen, geen tekortkoming.',
  ],
  'strengths.note': [
    'Let op: een sterke eigenschap is niet hetzelfde als een deugd. Dit zijn de eigenschappen die je het makkelijkst inzet, ook op momenten waarop een andere aanpak beter was geweest.',
    'Sterk betekent hier niet goed. Dit is wat je het snelst inzet — ook wanneer iets anders verstandiger was geweest.',
    'Deze eigenschappen zijn je meest bereikbare gereedschap, niet je beste. Je grijpt ernaar, ook op momenten dat een ander stuk gereedschap had gepast.',
  ],
  'shadow.intro': [
    'Elke kracht heeft een keerzijde. Dit zijn de patronen die, als ze te sterk worden, tegen je gaan werken in plaats van voor je.',
    'Wat je goed kunt, kun je ook te veel doen. Dit zijn de plekken waar dat gebeurt.',
    'Doorgeslagen kracht wordt last. Dit zijn de patronen waar dat kantelpunt bij jou het dichtstbij ligt.',
  ],
  'shadow.disclaimer': [
    'Dit is geen diagnose en geen tekortkoming — het zijn de plekken waar bewustwording het meeste oplevert.',
    'Er wordt hier niets over je vastgesteld. Dit zijn simpelweg de plekken waar opletten het meeste verschil maakt.',
    'Lees dit niet als een oordeel. Het is een kaart van waar aandacht het hardst aankomt.',
  ],
  'tensions.intro': [
    'Spanningsvelden ontstaan wanneer twee echte behoeften in jou tegelijk sterk zijn, zonder dat de één de ander opheft.',
    'Een spanningsveld is twee dingen tegelijk willen, waarbij allebei echt van jou zijn.',
    'Hier trekken twee behoeften tegelijk aan je. Geen van beide is de verkeerde — dat is precies wat het lastig maakt.',
  ],
  'tensions.note': [
    'Dit zijn geen tegenstrijdigheden die opgelost moeten worden — het zijn polen die om beurten om aandacht vragen, afhankelijk van de situatie.',
    'Deze paren hoeven niet opgelost te worden. Ze vragen om beurten aandacht, afhankelijk van waar je staat.',
    'Er valt hier niets recht te trekken. Beide kanten komen langs, en welke voorgaat hangt van het moment af.',
  ],
  'blind-spots.intro': [
    'Blinde vlekken zijn de patronen die net onder de radar blijven — niet groot genoeg om als schaduwkant op te vallen, maar wel invloedrijk.',
    'Dit zijn de patronen die net te klein zijn om op te vallen en net groot genoeg om mee te wegen.',
    'Deze vallen buiten je schaduwkant, maar niet buiten je gedrag. Ze werken door zonder dat je ze opmerkt.',
  ],
  'blind-spots.note': [
    'Een blinde vlek herken je zelden aan het patroon zelf, maar aan de reacties die het oproept. Als meerdere mensen je onafhankelijk van elkaar hetzelfde hebben teruggegeven, is de kans groot dat het hier staat.',
    'Je merkt een blinde vlek meestal niet aan jezelf, maar aan hoe anderen reageren. Kreeg je van verschillende mensen dezelfde opmerking, kijk dan hier.',
    'Blinde vlekken zie je zelden rechtstreeks. Wat wel opvalt is dat mensen die elkaar niet kennen je hetzelfde teruggeven — dat is het signaal.',
  ],
  'growth-path.note': [
    'Groei betekent hier niet dat een patroon verdwijnt, maar dat je sneller herkent wanneer het aan het stuur zit — en dan bewust kunt kiezen of je dat wilt.',
    'Het doel is niet dat het patroon weggaat. Het doel is dat je eerder doorhebt wanneer het je stuurt, zodat kiezen weer mogelijk wordt.',
    'Groei is hier geen verandering van karakter, maar snelheid van herkennen. Wie op tijd ziet wat er gebeurt, heeft weer een keuze.',
  ],
  'what-you-need.note': [
    'Kies er één. Wie aan alles tegelijk begint, verandert doorgaans niets — en bij jouw profiel is dat een reëel risico.',
    'Pak er één uit. Alles tegelijk aanpakken loopt bijna altijd op niets uit.',
    'Eén is genoeg. Wie de hele lijst tegelijk oppakt, komt zelden verder dan de eerste week.',
  ],
  'understood-by-others.note': [
    'Belangrijk: dit is geen vrijbrief. "Zo ben ik nu eenmaal" is het einde van een gesprek, niet het begin. Gebruik dit om jezelf uit te leggen, niet om jezelf te verdedigen.',
    'Let op wat je hiermee doet. "Zo zit ik nu eenmaal in elkaar" sluit een gesprek af in plaats van het te openen. Dit is bedoeld om iets uit te leggen, niet om iets af te dekken.',
    'Dit is geen excuusbriefje. Het moment waarop je dit gebruikt om een gesprek te beëindigen, werkt het tegen je.',
  ],
  'understand-yourself.intro': [
    'Zelfkennis komt zelden uit nadenken. Ze komt uit terugkijken op wat je deed toen je niet nadacht.',
    'Je leert jezelf niet kennen door erover na te denken, maar door terug te kijken op wat je deed zonder na te denken.',
    'De bruikbaarste informatie over jezelf zit niet in je overwegingen, maar in wat je deed voordat je ging overwegen.',
  ],
  'thirty-day.intro': [
    'Vier weken, elk met een concrete stap, gebaseerd op jouw sterkste schaduwpatroon en spanningsveld.',
    'Vier weken, vier stappen — afgeleid uit het patroon dat bij jou het zwaarst weegt.',
    'Een maand, opgedeeld in vier hanteerbare stukken rond je sterkste patroon.',
  ],
  'thirty-day.note': [
    'Dit plan is bewust klein. Niet omdat je niet meer aankunt, maar omdat verandering die je op je slechtste dag niet volhoudt, geen verandering is.',
    'Klein is hier opzet. Wat je op een slechte dag laat vallen, was nooit een gewoonte.',
    'De stappen zijn expres bescheiden. Alles wat alleen lukt op een goede dag, houdt geen maand stand.',
  ],
  'at-ease.bridge': [
    'Dezelfde drie scores als bij wie je bent — {labels} — hier gelezen op een moment zonder druk.',
    'Het zijn dezelfde cijfers als bij wie je bent — {labels} — alleen laten ze zich hier van een ontspannen kant zien.',
    'Dezelfde kern, met dezelfde cijfers — {labels} — nu gezien op een moment waarop niets van je gevraagd wordt.',
    'De drie scores waar je rapport op rust — {labels} — komen hier terug, ditmaal ontspannen.',
    'Nog een keer dezelfde drie cijfers — {labels} — maar dan op een moment zonder druk.',
  ],
  'who-you-can-become.growth-bridge': [
    'Hoeveel ruimte je jezelf daarvoor geeft, bepaalt vooral het tempo, niet de bestemming — daarover meer bij je groeipad.',
    'Het tempo waarin dat gebeurt, hangt af van hoeveel ruimte je jezelf toestaat; de bestemming staat al vast. Je groeipad gaat daar dieper op in.',
    'Vooral de snelheid van dit proces hangt af van hoeveel ruimte je jezelf gunt, niet het eindpunt zelf — daar lees je meer over bij je groeipad.',
    'Dat proces gaat niet over harder werken maar over ruimte maken: hoeveel je jezelf toestaat, bepaalt de snelheid. Waar dit precies naartoe leidt, lees je bij je groeipad.',
    'Niet het einddoel staat hier ter discussie, maar het tempo ernaartoe — en dat tempo hangt vooral af van de ruimte die je jezelf gunt. Je groeipad gaat daar verder op in.',
  ],
  'relationship.conflict-bridge-high': [
    'Conflictvermijding speelt hier een grote rol: je bewaart liever de sfeer dan dat jij spanning aangaat, wat op korte termijn rust geeft maar op lange termijn onuitgesproken irritatie kan laten opstapelen. Hoe dat doorwerkt in wat je wel en niet hardop zegt, lees je bij je communicatiestijl.',
    'Hier speelt conflictvermijding een grote rol: liever bewaar jij de sfeer dan dat jij spanning opzoekt, wat kortstondig rust geeft maar op termijn onuitgesproken irritatie kan laten opstapelen. Je communicatiestijl gaat verder in op wat dat met je gesprekken doet.',
    'Conflictvermijding weegt hier zwaar: je kiest eerder voor rust dan voor confrontatie, wat op het moment zelf prettig voelt maar op termijn onuitgesproken irritatie kan laten opstapelen. Daarover meer bij je communicatiestijl.',
    'Conflictvermijding drukt hier stevig door: liever houd jij de lieve vrede dan dat jij een aanvaring aangaat, wat meteen opluchting geeft maar op termijn onuitgesproken irritatie kan laten opstapelen. Je communicatiestijl laat zien wat dat met je woorden doet.',
    'Er zit hier veel conflictvermijding in: je kiest doorgaans voor kalmte boven een botsing, wat op het moment zelf goed voelt maar op termijn onuitgesproken irritatie kan laten opstapelen. Meer daarover bij je communicatiestijl.',
  ],
  'relationship.conflict-bridge-low': [
    'Conflictvermijding speelt hier nauwelijks een rol: je bent relatief bereid om spanning direct aan te gaan, wat helpt om irritatie niet te laten opstapelen. Ook dat komt terug bij je communicatiestijl.',
    'Van conflictvermijding is hier weinig te merken: spanning ga je vrij gemakkelijk direct aan, waardoor irritatie minder kans krijgt zich op te stapelen. Je communicatiestijl bouwt hierop voort.',
    'Conflictvermijding weegt hier licht: je schuwt een confrontatie niet snel, wat voorkomt dat irritatie zich ophoopt. Hoe dat precies klinkt, lees je bij je communicatiestijl.',
    'Conflictvermijding is hier niet je grootste opgave: een aanvaring ga je vlot aan, waardoor irritatie zelden de kans krijgt zich op te stapelen. Je communicatiestijl licht dat verder toe.',
    'Hier houdt conflictvermijding je weinig tegen: je durft een botsing rechtstreeks aan te gaan, waardoor irritatie minder kans krijgt zich op te stapelen. Hoe dat uitpakt in gesprekken, lees je bij je communicatiestijl.',
  ],
  'stress.already-named': [
    'Hetzelfde cijfer staat bij wie je bent; hier zie je wat het doet zodra het spannend wordt.',
    'Dezelfde score als bij wie je bent — daar als kern, hier als reflex onder druk.',
    'Dit is dezelfde score als bij wie je bent. Wat verandert is waar hij op uitkomt zodra de druk oploopt.',
    'Bij wie je bent stond dit cijfer als drijfveer; onder druk wordt het een automatisme.',
    'Het cijfer is hetzelfde als bij wie je bent; alleen kijk je er hier naar op het moment dat het knelt.',
  ],
  'who-you-are.vooruit': [
    'Wat deze drie doen zodra er druk op komt, lees je bij hoe je bent onder druk; waar ze doorslaan, bij je valkuilen.',
    'Hoe dit uitpakt onder spanning, staat bij hoe je bent onder druk. Waar het te ver doorschiet, staat bij je valkuilen.',
    'Dezelfde drie scores komen terug bij je sterke punten en bij je valkuilen — daar telkens van een andere kant.',
    'Bij hoe je bent onder druk zie je dezelfde eigenschappen in een ander licht; bij je valkuilen waar ze tegen je gaan werken.',
    'Waar dit toe leidt als het te ver doorslaat, staat bij je valkuilen. Wat er onder spanning van overblijft, bij hoe je bent onder druk.',
  ],
  'strengths.vooruit': [
    'Waar deze vijf toe leiden als ze te ver doorslaan, staat bij je valkuilen — met hetzelfde cijfer erbij.',
    'Dezelfde eigenschappen komen terug bij je valkuilen, daar van de kant waar ze tegen je werken.',
    'Bij je valkuilen zie jij een deel van deze vijf opnieuw, met hetzelfde cijfer, maar dan waar het schuurt.',
    'Wat hier kracht heet, kan bij je valkuilen dezelfde naam en hetzelfde cijfer dragen — daar lees jij de keerzijde.',
    'Hoe dit uitpakt als het doorschiet, staat bij je valkuilen.',
  ],
  'shadow.neem-die-ene': [
    'Wat je hiermee kunt: één van deze vijf herken je waarschijnlijk meteen, en de andere vier niet. Neem die ene. De rest kan wachten, of kan niet kloppen — dat mag ook.',
    'Wat je hiermee kunt: waarschijnlijk springt er één van deze vijf meteen uit en zeggen de andere vier je weinig. Die ene is genoeg. De rest mag wachten, of hoeft misschien niet eens te kloppen.',
    'Wat je hiermee kunt: meestal is er één van deze vijf die je direct herkent. Begin daar; de rest mag wachten — of blijkt bij nader inzien niet van toepassing, en ook dat mag.',
  ],
  /**
   * Afsluiters per hoofdstuktype (C §3.3). Vorm: één regel proza die met een
   * label begint ("Wat je hiermee kunt:", "Waar dit vandaan komt:", …), naar
   * het patroon dat "understood-by-others.origin" al gebruikt — geen aparte
   * kopvelden nodig, dus de bestaande outro-weergave (plat <p>) volstaat en
   * er komt geen letterlijke "**" op het scherm.
   */
  'closer.insight': [
    'Wat je hiermee kunt: dit hoofdstuk rust op {labelA} ({scoreA}) en {labelB} ({scoreB}). Leg het naast één concrete situatie van de afgelopen maand — klopte het daar, of was het daar juist de uitzondering? Beide antwoorden zijn bruikbaar, want de uitzondering vertelt je waar de grens van dit patroon ligt.',
    'Wat je hiermee kunt: dit hoofdstuk steunt op {labelA} ({scoreA}) en {labelB} ({scoreB}). Zet het naast één concrete situatie van de afgelopen maand — klopte het toen, of was dat juist de uitzondering? Allebei is bruikbaar, want de uitzondering laat zien waar dit patroon ophoudt.',
    'Wat je hiermee kunt: dit hoofdstuk komt uit {labelA} ({scoreA}) en {labelB} ({scoreB}). Toets het aan één concrete situatie van de afgelopen maand — klopte het, of was dat de uitzondering? Beide antwoorden helpen, want de uitzondering laat de grens van dit patroon zien.',
  ],
  'closer.insight-about-others': [
    'Wat je hiermee kunt: dit gaat over wat anderen van je merken. Dat is het enige stuk van je rapport dat je kunt controleren zonder te gissen — vraag het aan iemand die je goed kent, en vraag door tot het ongemakkelijk wordt.',
    'Wat je hiermee kunt: dit hoofdstuk gaat over wat er bij anderen van je binnenkomt. Het is het enige deel dat je zonder gissen kunt narekenen — vraag het na bij iemand die je goed kent, en blijf doorvragen tot het ongemakkelijk wordt.',
    'Wat je hiermee kunt: hier gaat het om wat anderen aan je zien. Controleren hoeft geen gissen te zijn — vraag het aan iemand die je goed kent, en vraag door tot het schuurt.',
  ],
  /** Voor de vier zware hoofdstukken naast "Je valkuilen" zelf (stress, jungian, tensions, blind-spots): dezelfde geruststelling, zonder een aantal te noemen dat daar niet klopt. */
  'closer.shadow-note': [
    'Wat je hiermee kunt: niet alles hierboven raakt je even hard. Neem wat wél klopt en laat de rest liggen — dat mag ook. Een lage score betekent niet dat een patroon er niet is, en een hoge score niet dat je het elke dag hebt: dit zijn de plekken waar het bij jou het snelst kan doorslaan, niet de plekken waar je faalt.',
    'Wat je hiermee kunt: niet elk punt hierboven zal je evenveel zeggen. Neem wat herkenbaar is en laat de rest rusten — dat mag ook. Een lage score wil niet zeggen dat iets ontbreekt, en een hoge score niet dat het dagelijks speelt: dit zijn de plekken waar jouw patroon het snelst doorslaat, niet de plekken waar je faalt.',
    'Wat je hiermee kunt: hierboven staat niet alles even zwaar. Neem wat je raakt en laat de rest liggen — dat mag ook. Een lage score wil niet zeggen dat iets afwezig is, en een hoge score niet dat het speelt op elk moment: dit zijn de plekken waar jouw patroon het snelst doorslaat, niet de plekken waar je faalt.',
  ],
  'closer.growth': [
    'Wat je hiermee kunt: van de {n} punten hierboven is er waarschijnlijk één die vandaag al kan. Zoek die. De rest is voor later of voor nooit — dit is een lijst met mogelijkheden, geen lijst met verplichtingen.',
    'Wat je hiermee kunt: van de {n} punten hierboven kan er vandaag al minstens één. Zoek die op. De rest mag wachten tot later, of voorgoed blijven liggen — dit is een lijst met mogelijkheden, geen lijst met verplichtingen.',
    'Wat je hiermee kunt: er is van de {n} punten hierboven vermoedelijk één die nu al lukt. Zoek die eruit. De rest mag rusten tot later, of voorgoed — dit is een lijst met mogelijkheden, geen lijst met verplichtingen.',
  ],
  'closer.growth-no-bullets': [
    'Wat je hiermee kunt: dit hoofdstuk beschrijft een richting, geen checklist. Vandaag al haalbaar is meestal maar één ding — de rest is voor later of voor nooit.',
  ],
  'closer.reflection': [
    'Waar dit vandaan komt: de inleiding van deze beschouwing is algemeen — ze staat in elk rapport. {stukjeAantal} daarna {isZijn} gekozen op jouw scores: {label1} ({score1}) en {label2} ({score2}). De vraag onderaan is van jou.',
    'Waar dit vandaan komt: het begin van deze beschouwing staat in elk rapport, ongeacht de scores. {stukjeAantal} daarna {isZijn} wel op jou toegesneden: {label1} ({score1}) en {label2} ({score2}). De vraag onderaan is van jou.',
    'Waar dit vandaan komt: de opening van deze beschouwing is voor iedereen gelijk. {stukjeAantal} daarna {isZijn} niet — die komen uit jouw scores: {label1} ({score1}) en {label2} ({score2}). De vraag onderaan is van jou.',
  ],
  'closer.reflection-fallback':
    'Waar dit vandaan komt: op dit thema wijzen je scores niet naar één duidelijk patroon. Deze beschouwing is daarom algemener dan de andere hoofdstukken in je rapport. Dat is geen tekort aan informatie — het betekent dat de context bij jou meer bepaalt dan je aanleg.',
};
