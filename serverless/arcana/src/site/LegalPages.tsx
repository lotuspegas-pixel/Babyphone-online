import { SITE_NAME } from './siteContent';

interface Props {
  onBack: () => void;
}

function Wrapper({ titel, onBack, children }: { titel: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div className="legal">
      <button type="button" className="arcana-button arcana-button--text legal__terug" onClick={onBack}>
        ← Terug naar de website
      </button>
      <h1>{titel}</h1>
      {children}
    </div>
  );
}

export function PrivacyPage({ onBack }: Props) {
  return (
    <Wrapper titel="Privacy" onBack={onBack}>
      <p className="legal__lead">
        Kort samengevat: {SITE_NAME} heeft geen server en geen account. Je antwoorden en je rapport worden
        opgeslagen in je eigen browser en gaan nergens heen.
      </p>

      <h2>Wat er wordt opgeslagen, en waar</h2>
      <p>
        Alles wat je invult — je naam, je aanspreekvorm, je levensfase, je 120 antwoorden en het gegenereerde
        rapport — wordt weggeschreven naar de <strong>localStorage</strong> van de browser waarin je de test
        maakt. Dat is opslag op je eigen apparaat. Er wordt niets naar een server gestuurd, want die is er
        niet: de hele test en de hele rapportberekening draaien in je browser.
      </p>
      <p>
        Dat betekent ook dat wij je rapport niet kunnen inzien, niet kunnen herstellen en niet kunnen
        terugsturen. Wis je je browsergegevens, gebruik je een andere browser of een ander apparaat, of klik je
        in het rapport op "Antwoorden wissen", dan is het definitief weg. Wil je het bewaren, sla het dan op
        als PDF of als tekstbestand.
      </p>

      <h2>Geen cookies, geen trackers, geen analytics</h2>
      <p>
        Er staan geen tracking-cookies op deze site, er is geen advertentienetwerk, en er draait geen
        analytics-script dat je gedrag meet. Er is daarom ook geen cookiebanner nodig: de localStorage die we
        gebruiken is strikt noodzakelijk om de test te laten werken en wordt niet gedeeld.
      </p>

      <h2>Geen externe diensten in de pagina</h2>
      <p>
        De lettertypen worden vanaf deze site zelf geladen, niet vanaf een lettertypedienst van derden. Er
        worden geen afbeeldingen, scripts of stijlbestanden van externe partijen opgehaald. Bij het openen van
        deze pagina maakt je browser dus geen verbinding met andere bedrijven.
      </p>

      <h2>Wat de hostingpartij wel ziet</h2>
      <p>
        Deze website staat op een gewone webhosting. Zoals bij vrijwel elke website houdt die server
        standaard logbestanden bij van opgevraagde pagina's, met daarin onder meer je IP-adres, het tijdstip
        en je browsertype. Dat zijn technische logs van de hostingpartij, geen inhoud van je test — je
        antwoorden zitten daar niet in, want die verlaten je apparaat niet.
      </p>

      <h2>Je rechten</h2>
      <p>
        Omdat wij geen persoonsgegevens van je ontvangen of bewaren, is er bij ons niets om in te zien, te
        corrigeren of te laten verwijderen. Je hebt de volledige controle: het wissen gebeurt in je eigen
        browser, via de knop "Antwoorden wissen" of via je browserinstellingen.
      </p>

      <h2>Kinderen</h2>
      <p>
        Deze test is geschreven voor volwassenen. Ben je jonger dan 16, doe hem dan alleen in overleg met een
        ouder of verzorger.
      </p>

      <h2>Vragen</h2>
      <p>
        Heb je een vraag over privacy, dan kun je contact opnemen via het e-mailadres dat op de site vermeld
        staat. Omdat we geen gegevens van je hebben, kunnen we inhoudelijke vragen over jóuw rapport niet
        beantwoorden — dat staat alleen bij jou.
      </p>
    </Wrapper>
  );
}

export function TermsPage({ onBack }: Props) {
  return (
    <Wrapper titel="Voorwaarden" onBack={onBack}>
      <p className="legal__lead">
        {SITE_NAME} is een instrument voor zelfreflectie. Lees deze voorwaarden als de afspraak waaronder je
        het gebruikt.
      </p>

      <h2>Wat dit wel is</h2>
      <p>
        Een reflectie-instrument. Je beantwoordt 120 vragen, daar worden scores uit berekend, en op basis van
        die scores wordt een rapport samengesteld. Elke uitspraak in dat rapport is terug te voeren op een
        gemeten score. Het doel is dat je jezelf beter leert begrijpen.
      </p>

      <h2>Wat dit niet is</h2>
      <ul>
        <li>
          <strong>Geen medische of psychologische diagnose.</strong> Het stelt geen aandoening vast en
          vervangt geen huisarts, psycholoog of therapeut. Herken je klachten die zwaarder wegen dan
          reflectie, zoek dan professionele hulp.
        </li>
        <li>
          <strong>Geen selectie- of beoordelingsinstrument.</strong> Het is niet ontworpen, getoetst of
          geschikt om anderen mee te beoordelen, aan te nemen, te ontslaan of in te delen. Gebruik het niet
          in sollicitatie- of beoordelingsprocedures.
        </li>
        <li>
          <strong>Geen wetenschappelijk gevalideerde test.</strong> De vragen en berekeningen zijn zorgvuldig
          opgebouwd en volledig herleidbaar, maar er is geen normgroep, geen betrouwbaarheidsonderzoek en
          geen validatiestudie. Behandel de uitkomst als een gespreksstuk, niet als bewijs.
        </li>
        <li>
          <strong>Geen voorspelling.</strong> Het beschrijft patronen die volgen uit jouw antwoorden op dit
          moment, geen vaststaand karakter en geen toekomst.
        </li>
      </ul>

      <h2>Je eigen oordeel gaat voor</h2>
      <p>
        Waar het rapport en je eigen ervaring elkaar tegenspreken, is je eigen ervaring leidend. Het rapport
        zegt dat op meerdere plekken ook zelf. Beslissingen die je naar aanleiding van je rapport neemt, neem
        je op eigen verantwoordelijkheid.
      </p>

      <h2>Beschikbaarheid</h2>
      <p>
        De test wordt aangeboden zoals hij is, zonder garantie op ononderbroken beschikbaarheid. Omdat je
        gegevens alleen in je eigen browser staan, kan een storing of wijziging aan de site ertoe leiden dat
        eerder opgeslagen antwoorden niet meer bruikbaar zijn. Bewaar een rapport dat je wilt houden daarom
        als PDF of tekstbestand.
      </p>

      <h2>Intellectueel eigendom</h2>
      <p>
        De vragenlijst, de scoreberekening, de rapportteksten en de vormgeving zijn eigendom van {SITE_NAME}.
        Je rapport is van jou: je mag het bewaren, printen en delen met wie je wilt. Het overnemen van de
        vragenlijst of de rapportteksten voor een eigen product is niet toegestaan.
      </p>

      <h2>Wijzigingen</h2>
      <p>
        De test en deze voorwaarden kunnen worden aangepast. Wijzigingen aan de berekening kunnen betekenen
        dat een nieuw rapport afwijkt van een ouder rapport met dezelfde antwoorden.
      </p>
    </Wrapper>
  );
}
