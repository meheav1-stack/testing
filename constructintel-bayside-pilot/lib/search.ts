import { properties } from '@/data/properties';
import { Property, SearchResult } from '@/data/types';

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(str: string): string[] {
  return normalize(str).split(' ').filter(Boolean);
}

export function searchProperties(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const normalizedQuery = normalize(query);
  const queryTokens = tokenize(query);

  const results: SearchResult[] = [];

  for (const property of properties) {
    const normalizedAddr = property.normalizedAddress;
    const addrTokens = tokenize(property.address);

    // Exact match
    if (normalizedAddr === normalizedQuery || normalizedAddr.includes(normalizedQuery)) {
      results.push({
        property,
        matchConfidence: 'exact',
        matchDetails: 'Address matches search query exactly.',
      });
      continue;
    }

    // Token-based matching
    const matchedTokens = queryTokens.filter(qt =>
      addrTokens.some(at => at.includes(qt) || qt.includes(at))
    );
    const matchRatio = matchedTokens.length / queryTokens.length;

    if (matchRatio >= 0.8) {
      results.push({
        property,
        matchConfidence: 'strong',
        matchDetails: `Strong match — ${matchedTokens.length} of ${queryTokens.length} search terms matched.`,
      });
    } else if (matchRatio >= 0.4) {
      results.push({
        property,
        matchConfidence: 'partial',
        matchDetails: `Partial match — ${matchedTokens.length} of ${queryTokens.length} search terms matched. Verify this is the correct property.`,
      });
    }
  }

  // Sort: exact > strong > partial
  const order = { exact: 0, strong: 1, partial: 2, no_match: 3 };
  results.sort((a, b) => order[a.matchConfidence] - order[b.matchConfidence]);

  return results;
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}
