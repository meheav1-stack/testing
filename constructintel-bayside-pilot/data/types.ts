export interface Property {
  id: string;
  address: string;
  normalizedAddress: string;
  suburb: string;
  council: string;
  state: string;
  propertyType: string;
  coordinates?: { lat: number; lng: number };
  dataCoverageStatus: 'sample_only' | 'public_record_seeded' | 'live_verified';
  coverageNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlanningEvent {
  id: string;
  propertyId: string;
  eventDate: string;
  applicationNumber: string;
  applicationType: string;
  status: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  sourceAccessedAt: string;
  sourceClass: 'official_council' | 'state_register' | 'third_party_public' | 'manual_seed_demo';
  evidenceLevel: 'direct_property' | 'nearby_property' | 'area_level' | 'inferred';
  publishability: 'green' | 'amber' | 'red';
  rawPersonalDataRemoved: boolean;
}

export interface Signal {
  id: string;
  propertyId: string;
  linkedEventIds: string[];
  signalType: string;
  signalLabel: string;
  signalSummary: string;
  signalDirection: 'informational' | 'caution' | 'requires_follow_up';
  confidence: 'high' | 'medium' | 'low';
  confidenceReason: string;
  evidenceLevel: 'direct_property' | 'nearby_property' | 'area_level' | 'inferred';
  dueDiligenceQuestions: string[];
  prohibitedClaimsAvoided: string[];
  publishability: 'green' | 'amber' | 'red';
  operatorStatus: 'ready_to_publish' | 'needs_review' | 'suppressed' | 'coverage_gap';
  reviewReasons?: string[];
}

export interface Report {
  id: string;
  propertyId: string;
  generatedAt: string;
  reportType: 'pre_auction_brief';
  reportStatus: string;
  summary: string;
  keySignals: string[];
  followUpQuestions: string[];
  limitations: string[];
}

export interface SearchResult {
  property: Property;
  matchConfidence: 'exact' | 'strong' | 'partial' | 'no_match';
  matchDetails: string;
}

export type AttentionLevel = 'routine' | 'review_recommended' | 'priority_follow_up';
