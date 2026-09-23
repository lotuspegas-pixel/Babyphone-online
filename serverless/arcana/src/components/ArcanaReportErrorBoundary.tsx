import { Component } from 'react';
import type { ReactNode } from 'react';

import { ArcanaReportIncompatible } from './ArcanaReportIncompatible';
import type { ArcanaReport } from '../types/arcana';

interface Props {
  report: ArcanaReport;
  onRestart: () => void;
  children: ReactNode;
}

interface State {
  crashed: boolean;
}

/**
 * Vangt renderfouten in de rapportweergave op, zodat een `arcana_result` met
 * een structuur die deze build niet (meer) kent nooit een leeg of kapot
 * scherm geeft — de laatste regel verdediging naast de expliciete
 * versiecheck in `arcanaReportCompat.ts` (die de meeste gevallen al vooraf
 * afvangt). Een class component: React-foutgrenzen bestaan alleen als
 * class, er is geen hook-equivalent.
 */
export class ArcanaReportErrorBoundary extends Component<Props, State> {
  state: State = { crashed: false };

  static getDerivedStateFromError(): State {
    return { crashed: true };
  }

  componentDidCatch(error: unknown) {
    // Alleen lokaal in de console — geen telemetrie, dit product verstuurt niets.
    console.error('Het rapport kon niet getekend worden:', error);
  }

  render() {
    if (this.state.crashed) {
      return <ArcanaReportIncompatible report={this.props.report} onRestart={this.props.onRestart} />;
    }
    return this.props.children;
  }
}
