import { CONFIDENCE_TEXT, DISCLAIMER_TEXT } from '../data/arcanaReportBlocks';
import type { ResponseQuality } from '../types/arcana';

interface Props {
  quality: ResponseQuality;
  /** Aantal vragen in de test; staat in de keten en in de betrouwbaarheidsregel. */
  questionCount: number;
}

/**
 * "Hoe dit gemeten is" — de verantwoording onder de kern.
 *
 * Bestond nog niet: het rapport toonde scores zonder ooit uit te leggen wat de
 * schaal betekent, hoe een cijfer tot stand komt of wat het rapport níet is.
 * Alles hier komt uit bestaande data (de keten van de scoring-engine en de
 * response-quality-analyse) of uit de vaste disclaimer; er wordt niets beweerd
 * wat niet uit de meting volgt.
 */
export function ArcanaMethod({ quality, questionCount }: Props) {
  const beantwoord = Math.round(quality.completionRate * questionCount);
  const twijfel = questionCount - beantwoord;

  return (
    <>
      <span className="arcana-card-mark arcana-card-mark--stamp" aria-hidden="true" />
      <h3>Hoe dit gemeten is</h3>
      <p className="arcana-core__lead">
        Kort, zodat je weet waar het portret vandaan komt — en waar het ophoudt.
      </p>

      <div className="arcana-method">
        <section className="arcana-method__block">
          <h4>De keten</h4>
          <p className="arcana-method__chain">
            <span>{questionCount} vragen</span>
            <span aria-hidden="true">→</span>
            <span>30 subthema&rsquo;s</span>
            <span aria-hidden="true">→</span>
            <span>12 dimensies</span>
            <span aria-hidden="true">→</span>
            <span>1 profiel</span>
          </p>
          <p>
            Elke lijn in het portret komt uit die keten. Er zit geen toeval in: dezelfde antwoorden geven altijd
            exact hetzelfde rapport, tot op het cijfer.
          </p>
        </section>

        <section className="arcana-method__block">
          <h4>Wat de schaal betekent</h4>
          <p>
            Alle cijfers lopen van 0 tot 100, met <strong>50 als midden</strong>. Een score zegt hoe sterk iets bij
            jou meespeelt vergeleken met het midden van de schaal — niet hoe goed je het doet.
          </p>
          <p>
            <strong>Hoog is dus niet beter dan laag.</strong> Een lage score op conflict aangaan betekent niet dat je
            zwak bent; hij betekent dat je rust boven confrontatie kiest. Dat heeft voordelen en kosten, en het
            rapport benoemt allebei.
          </p>
        </section>

        <section className="arcana-method__block">
          <h4>Hoe stevig staat dit</h4>
          <p>
            Je beantwoordde {beantwoord} van de {questionCount} vragen
            {twijfel > 0 ? `; ${twijfel} bleven open` : ''}. {CONFIDENCE_TEXT[quality.confidenceLevel]}
          </p>
          {quality.notes.length > 0 && (
            <ul className="arcana-method__notes">
              {quality.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="arcana-method__block">
          <h4>Wat dit niet is</h4>
          <p>{DISCLAIMER_TEXT}</p>
          <ul className="arcana-method__notes">
            <li>Geen diagnose en geen medische uitspraak.</li>
            <li>Geen voorspelling van wat je gaat doen.</li>
            <li>Geen oordeel over of je ergens geschikt voor bent.</li>
            <li>Een momentopname van hoe je nu antwoordt, geen vaststaand type.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
