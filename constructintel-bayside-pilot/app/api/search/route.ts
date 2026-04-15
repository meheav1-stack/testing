import { NextRequest, NextResponse } from 'next/server';
import { searchProperties } from '@/lib/search';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [], query: q, error: 'Query too short' });
  }

  const results = searchProperties(q);
  return NextResponse.json({ results, query: q });
}
