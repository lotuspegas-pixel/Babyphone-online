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
    'Dit is niet alles wat je bent, maar het is wel wat beklijft. Jung noemde dit de persona: de kant die je meeneemt de deur uit. Daar is niets mis mee — zonder persona kom je een werkdag niet door. Het wringt pas wanneer je hem \'s avonds niet meer afzet.',
    'Wat hier staat is de buitenlaag, niet de kern. Jung sprak van de persona, het masker dat je voor de wereld draagt. Iedereen heeft er een nodig. De vraag is alleen of jij hem nog kunt uitzetten wanneer er niemand meer kijkt.',
  ],
  'hidden-inner-world.intro': [
    'Onder de zichtbare laag zit een deel van je patroon dat je minder snel laat zien, ook aan mensen die dichtbij staan.',
    'Hieronder ligt het deel dat je zelden hardop maakt, zelfs niet tegen wie je vertrouwt.',
    'Dit speelt onder de oppervlakte — herkenbaar voor jou, meestal onzichtbaar voor de rest.',
  ],
  'hidden-inner-world.note': [
    'Dit is niet iets wat je verbergt om te misleiden — het is vaak zo vertrouwd geworden dat je het zelf nauwelijks meer opmerkt.',
    'Je houdt dit niet bewust achter. Het is zo eigen geworden dat het je zelf niet meer opvalt.',
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
};
