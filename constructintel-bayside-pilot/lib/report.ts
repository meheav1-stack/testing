import { Property, Signal, PlanningEvent, Report, AttentionLevel } from '@/data/types';
import { getAttentionLevelLabel } from './classify';

export function generateReport(
  property: Property,
  publishableSignals: Signal[],
  publishableEvents: PlanningEvent[],
  attentionLevel: AttentionLevel
): Report {
  const directSignals = publishableSignals.filter(s => s.evidenceLevel === 'direct_property');
  const nearbySignals = publishableSignals.filter(s => s.evidenceLevel === 'nearby_property');
  const followUpSignals = publishableSignals.filter(s => s.signalDirection === 'requires_follow_up');
  const cautionSignals = publishableSignals.filter(s => s.signalDirection === 'caution');

  let summary = `This pilot brief identified ${publishableSignals.length} signal${publishableSignals.length !== 1 ? 's' : ''} in the current Bayside sample dataset for ${property.address}. `;

  if (directSignals.length > 0) {
    summary += `${directSignals.length} ${directSignals.length === 1 ? 'is a' : 'are'} direct property record${directSignals.length !== 1 ? 's' : ''}. `;
  }
  if (nearbySignals.length > 0) {
    summary += `${nearbySignals.length} ${nearbySignals.length === 1 ? 'is a' : 'are'} nearby or area-context signal${nearbySignals.length !== 1 ? 's' : ''}. `;
  }
  if (followUpSignals.length > 0) {
    summary += `${followUpSignals.length} ${followUpSignals.length === 1 ? 'requires' : 'require'} priority follow-up. `;
  }

  summary += 'No building defect finding is made. ';

  if (attentionLevel === 'routine') {
    summary += 'No elevated due-diligence signals were identified in the current pilot dataset.';
  } else {
    summary += 'The appropriate next step is to verify source documents and instruct the building inspector to consider the flagged areas.';
  }

  const allQuestions = publishableSignals.flatMap(s => s.dueDiligenceQuestions);
  const uniqueQuestions = [...new Set(allQuestions)];

  return {
    id: `report-${property.id}`,
    propertyId: property.id,
    generatedAt: new Date().toISOString(),
    reportType: 'pre_auction_brief',
    reportStatus: 'generated',
    summary,
    keySignals: publishableSignals.map(s => s.id),
    followUpQuestions: uniqueQuestions,
    limitations: [
      'This brief uses a pilot demonstration dataset only. It does not represent complete council records.',
      'Absence of a signal does not mean absence of risk.',
      'This is not a building inspection, pest inspection, engineering assessment, or legal advice.',
      'Source records should be independently verified.',
      'Personal and private information has been excluded.',
      `Due-diligence attention level: ${getAttentionLevelLabel(attentionLevel)}.`,
    ],
  };
}

export const DISCLAIMER = `This pilot brief is a decision-support tool only. It summarises selected planning, permit, development and related public-record signals available in the current pilot dataset. It is not a building inspection, pest inspection, engineering assessment, planning certificate, legal advice, valuation, insurance assessment, or guarantee of property condition. Absence of a signal does not mean absence of risk. Users should verify source records and obtain professional advice before making transaction decisions.`;

export const PILOT_NOTICE = `Pilot coverage is incomplete. This MVP is limited to a small Bayside City Council demonstration dataset using seeded sample data.`;
