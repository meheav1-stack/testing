import { Shield, AlertTriangle, Eye, MapPin, Layers, Info, CheckCircle } from 'lucide-react';

type Confidence = 'high' | 'medium' | 'low';
type EvidenceLevel = 'direct_property' | 'nearby_property' | 'area_level' | 'inferred';
type Publishability = 'green' | 'amber' | 'red';
type SignalDirection = 'informational' | 'caution' | 'requires_follow_up';

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const styles: Record<Confidence, string> = {
    high: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    low: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  const icons: Record<Confidence, React.ReactNode> = {
    high: <CheckCircle className="w-3 h-3" />,
    medium: <AlertTriangle className="w-3 h-3" />,
    low: <Info className="w-3 h-3" />,
  };
  const labels: Record<Confidence, string> = {
    high: 'High Confidence',
    medium: 'Medium Confidence',
    low: 'Low Confidence',
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded border ${styles[confidence]}`}>
      {icons[confidence]}
      {labels[confidence]}
    </span>
  );
}

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const styles: Record<EvidenceLevel, string> = {
    direct_property: 'bg-navy-50 text-navy-700 border-navy-200',
    nearby_property: 'bg-violet-50 text-violet-700 border-violet-200',
    area_level: 'bg-slate-50 text-slate-600 border-slate-200',
    inferred: 'bg-gray-50 text-gray-500 border-gray-200',
  };
  const icons: Record<EvidenceLevel, React.ReactNode> = {
    direct_property: <MapPin className="w-3 h-3" />,
    nearby_property: <Layers className="w-3 h-3" />,
    area_level: <Eye className="w-3 h-3" />,
    inferred: <Info className="w-3 h-3" />,
  };
  const labels: Record<EvidenceLevel, string> = {
    direct_property: 'Direct Property Record',
    nearby_property: 'Nearby Signal',
    area_level: 'Area-Level Context',
    inferred: 'Inferred',
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded border ${styles[level]}`}>
      {icons[level]}
      {labels[level]}
    </span>
  );
}

export function PublishabilityBadge({ status }: { status: Publishability }) {
  const styles: Record<Publishability, string> = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };
  const labels: Record<Publishability, string> = {
    green: 'Publishable',
    amber: 'Caution — Review',
    red: 'Suppressed',
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded border ${styles[status]}`}>
      <Shield className="w-3 h-3" />
      {labels[status]}
    </span>
  );
}

export function DirectionBadge({ direction }: { direction: SignalDirection }) {
  const styles: Record<SignalDirection, string> = {
    informational: 'bg-blue-50 text-blue-700 border-blue-200',
    caution: 'bg-amber-50 text-amber-700 border-amber-200',
    requires_follow_up: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  const labels: Record<SignalDirection, string> = {
    informational: 'Informational',
    caution: 'Review Recommended',
    requires_follow_up: 'Follow-Up Required',
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded border ${styles[direction]}`}>
      {labels[direction]}
    </span>
  );
}

export function MatchConfidenceBadge({ confidence }: { confidence: 'exact' | 'strong' | 'partial' | 'no_match' }) {
  const styles: Record<string, string> = {
    exact: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    strong: 'bg-blue-50 text-blue-700 border-blue-200',
    partial: 'bg-amber-50 text-amber-700 border-amber-200',
    no_match: 'bg-red-50 text-red-600 border-red-200',
  };
  const labels: Record<string, string> = {
    exact: 'Exact Match',
    strong: 'Strong Match',
    partial: 'Partial Match — Verify',
    no_match: 'No Match',
  };

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded border ${styles[confidence]}`}>
      {labels[confidence]}
    </span>
  );
}
