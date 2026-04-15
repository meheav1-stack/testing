import { NextRequest, NextResponse } from 'next/server';
import { getPropertyById } from '@/lib/search';
import { getPublishableEventsForProperty, getPublishableSignalsForProperty, getSignalsForProperty, getAttentionLevel } from '@/lib/classify';
import { generateReport } from '@/lib/report';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const property = getPropertyById(params.id);

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  const publishableEvents = getPublishableEventsForProperty(params.id);
  const publishableSignals = getPublishableSignalsForProperty(params.id);
  const allSignals = getSignalsForProperty(params.id);
  const attentionLevel = getAttentionLevel(allSignals);
  const report = generateReport(property, publishableSignals, publishableEvents, attentionLevel);

  return NextResponse.json({
    property,
    events: publishableEvents,
    signals: publishableSignals,
    attentionLevel,
    report,
  });
}
