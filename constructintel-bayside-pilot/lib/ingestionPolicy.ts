/**
 * INGESTION POLICY — ConstructIntel Bayside Pilot
 *
 * This MVP uses seeded/demo data only.
 *
 * Future live ingestion must adhere to the following rules:
 *
 * 1. Use official/public endpoints where access is explicitly permitted.
 * 2. Do not bypass authentication, CAPTCHA, robots.txt, paywalls, or rate limits.
 * 3. Applicant/owner personal data must be stripped before storage.
 * 4. Raw PDFs and documents are not republished to end users.
 * 5. Derived signals must retain provenance (source name, URL, access date, class).
 * 6. Ambiguous records must be routed to operator review before publication.
 * 7. Records classified as "red" publishability are suppressed from customer-facing views.
 * 8. Address matching must use verified identity resolution (G-NAF + cadastre in production).
 * 9. No defamatory, speculative, or unsupported claims may be derived from raw records.
 * 10. All published signals must include confidence level and evidence basis.
 *
 * Full production identity resolution would use G-NAF + cadastre matching;
 * this MVP uses bounded sample matching for pilot demonstration.
 */

export const INGESTION_POLICY = {
  currentMode: 'demo_seed_only' as const,
  liveIngestionEnabled: false,
  complianceRules: [
    'No bypassing authentication, CAPTCHA, robots.txt, paywalls, or rate limits',
    'Strip applicant/owner personal data',
    'Do not republish raw PDFs or documents',
    'Retain provenance on all derived signals',
    'Route ambiguous records to operator review',
    'Suppress red-publishability records',
    'Use verified identity resolution in production',
    'No defamatory or unsupported claims',
  ],
};
