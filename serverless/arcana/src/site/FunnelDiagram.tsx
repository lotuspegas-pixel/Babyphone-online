import { SITE_STATS } from './siteContent';

const NODES = [
  { getal: String(SITE_STATS.vragen), label: 'antwoorden', toelichting: 'in vier vraagsoorten' },
  { getal: String(SITE_STATS.subdimensies), label: 'eigenschappen', toelichting: 'elk met een eigen gewicht' },
  { getal: String(SITE_STATS.hoofddimensies), label: 'hoofddimensies', toelichting: 'de grote lijnen' },
  { getal: '1', label: 'patroon', toelichting: 'jouw archetype en rapport' },
];

/**
 * Visuele trechter 120 → 30 → 12 → 1: drie versmallende tredes die in elkaar
 * overlopen, uitlopend in een druppel. De vorm zelf is aria-hidden — hij is
 * decoratief — maar draagt dezelfde informatie als de legenda ernaast, die
 * als gewone tekst in de DOM staat. Zo blijft de kern (120 wordt uiteindelijk
 * 1 patroon) ook zonder het beeld leesbaar.
 */
export function FunnelDiagram() {
  return (
    <div className="funnel">
      <div className="funnel__shape" aria-hidden="true">
        <span className="funnel__band funnel__band--1">
          <span className="funnel__band-getal">{NODES[0].getal}</span>
        </span>
        <span className="funnel__band funnel__band--2">
          <span className="funnel__band-getal">{NODES[1].getal}</span>
        </span>
        <span className="funnel__band funnel__band--3">
          <span className="funnel__band-getal">{NODES[2].getal}</span>
        </span>
        <span className="funnel__stem" />
        <span className="funnel__drop">{NODES[3].getal}</span>
      </div>

      <ol className="funnel__legend">
        {NODES.map((node, i) => (
          <li key={node.label} className="funnel__legend-item">
            <span className={`funnel__legend-mark funnel__legend-mark--${i + 1}`} aria-hidden="true" />
            <span className="funnel__legend-getal">{node.getal}</span>
            <span className="funnel__legend-tekst">
              <strong>{node.label}</strong> — {node.toelichting}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
