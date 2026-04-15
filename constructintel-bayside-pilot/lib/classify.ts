import { events } from '@/data/events';
import { signals } from '@/data/signals';
import { PlanningEvent, Signal, AttentionLevel } from '@/data/types';

export function getEventsForProperty(propertyId: string): PlanningEvent[] {
  return events
    .filter(e => e.propertyId === propertyId)
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
}

export function getPublishableEventsForProperty(propertyId: string): PlanningEvent[] {
  return getEventsForProperty(propertyId).filter(e => e.publishability !== 'red');
}

export function getSignalsForProperty(propertyId: string): Signal[] {
  return signals.filter(s => s.propertyId === propertyId);
}

export function getPublishableSignalsForProperty(propertyId: string): Signal[] {
  return getSignalsForProperty(propertyId).filter(
    s => s.publishability !== 'red' && s.operatorStatus !== 'suppressed'
  );
}

export function getAttentionLevel(propertySignals: Signal[]): AttentionLevel {
  const publishable = propertySignals.filter(
    s => s.publishability !== 'red' && s.operatorStatus !== 'suppressed'
  );

  if (publishable.some(s => s.signalDirection === 'requires_follow_up')) {
    return 'priority_follow_up';
  }
  if (publishable.some(s => s.signalDirection === 'caution')) {
    return 'review_recommended';
  }
  return 'routine';
}

export function getAttentionLevelLabel(level: AttentionLevel): string {
  switch (level) {
    case 'priority_follow_up': return 'Priority Follow-Up';
    case 'review_recommended': return 'Review Recommended';
    case 'routine': return 'Routine';
  }
}

export function getAttentionLevelColor(level: AttentionLevel): string {
  switch (level) {
    case 'priority_follow_up': return 'text-amber-700 bg-amber-50 border-amber-200';
    case 'review_recommended': return 'text-amber-600 bg-amber-50/50 border-amber-100';
    case 'routine': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  }
}

export function getAllSignals(): Signal[] {
  return signals;
}

export function getAllEvents(): PlanningEvent[] {
  return events;
}
