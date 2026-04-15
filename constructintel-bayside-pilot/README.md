# ConstructIntel — Bayside Pilot MVP

Pre-auction construction and planning intelligence for Bayside City Council properties.

> **⚠️ PILOT DEMONSTRATION** — All data is seeded sample data, not sourced from live council systems.

## What This Is

A decision-support intelligence tool for buyer's agents doing pre-auction due diligence on residential properties in the Bayside City Council area, Victoria, Australia.

**This is NOT:** a building inspection, pest inspection, legal advice, valuation, engineering assessment, planning certificate, or guarantee of property condition.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Path | Purpose |
|------|---------|
| `/` | Landing page with search |
| `/search?q=...` | Search results |
| `/property/[id]` | Property intelligence page |
| `/property/[id]/brief` | Printable pre-auction brief |
| `/operator` | Internal operator review page |

## Demo Properties

The app includes 10 seeded Bayside-area properties with realistic (but fictional) planning events and derived signals. Search examples:

- `Brighton` — shows multiple Brighton properties
- `12 Example Street` — exact match demo
- `Hampton` — shows Hampton/Hampton East properties
- `Beaumaris` — heritage overlay demo
- `Black Rock` — pool/drainage demo

## Demo Data Flagging

All demo/seed data is prominently flagged with:
- Amber dashed-border `DEMO DATA` badges (with flask icon) on every record
- Persistent top-of-page banner across all pages
- `sample_only` coverage status on all properties
- Explicit "seeded demonstration data" notices on briefs

## Architecture

- **Next.js 14** App Router
- **TypeScript** throughout
- **Tailwind CSS** for styling
- **Lucide React** icons
- **Seeded data** in `/data/*.ts` — no database required
- **API routes** at `/api/search` and `/api/property/[id]`

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Key Design Decisions

1. **Confidence-first**: Every signal shows confidence level, evidence basis, and publishability
2. **Suppression by default**: Red/suppressed records never appear in customer-facing views
3. **Cautious language**: "Follow-up required" not "danger"; "compliance-related event" not "defective"
4. **Demo data visibility**: All sample data is clearly flagged — no ambiguity about data provenance
5. **Operator controls**: Internal review page shows the full editorial workflow

## What Is Intentionally Not Included

- Live council system integration (demo data only)
- User authentication / accounts
- Database (Supabase or otherwise)
- AI/LLM-powered analysis
- Map integration
- PDF export (browser print is supported)
- G-NAF / cadastre identity resolution
- National coverage
- Consumer-facing features
- Scraping capabilities

## License

Proprietary — demonstration purposes only.
