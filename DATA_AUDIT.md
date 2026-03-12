# Pedro Dashboard — Static Data Audit
**Date:** March 10, 2026  
**Purpose:** Map every data file, its current state (static vs dynamic), and the correct live source.

---

## Summary Table

| File | Section | Current State | Live Source | Refresh Method |
|------|---------|--------------|-------------|----------------|
| `weeklyMeetingsData.ts` | Next Meetings, Overview grid | ✅ Manus-assisted (last refreshed Mar 10) | `internalfb.com/calendar` (primary) + Outlook (cross-check) | Ask Manus to refresh |
| `workplaceDigestData.ts` | Workplace Digest | ❌ STATIC — last scraped Mar 6, contains fabricated entries | `fb.workplace.com` groups | Manus-assisted daily |
| `aiUsageData.ts` | My AI Usage | ❌ STATIC — last scraped Mar 6, week 10 data incomplete | `internalfb.com/unidash/dashboard/ai_usage_at_meta/goal/` | Manus-assisted daily |
| `crmInteractionsData.ts` | CI Dashboard | ❌ STATIC — last scraped Mar 6, only 3 weeks of data | `internalfb.com/unidash/...dcmp_client_interaction_insights/` | Manus-assisted weekly |
| `crmRecordsData.ts` | CI Dashboard, Client Content | ❌ STATIC — last scraped Mar 6 | `internalfb.com/crm/client_interactions` | Manus-assisted weekly |
| `rsPipelineData.ts` | Rec. Solutions | ❌ STATIC — last scraped Mar 6 (scraper exists but writes to this file) | `internalfb.com/crm/pipeline_management` | Live scraper (port 9222) + Manus fallback |
| `workplaceData.ts` | Client Content | ❌ STATIC — last scraped Mar 6 | `fb.workplace.com` client groups | Manus-assisted daily |
| `dashboardData.ts` | Overview, Key Dates | ⚠️ MIXED — client data static, key dates manually maintained | Client data: CRM; Key dates: manual | Manual (key dates don't change often) |

---

## Priority Fix Order

1. **workplaceDigestData.ts** — Contains fabricated entry (Renata/CS: The Work). Fix today.
2. **aiUsageData.ts** — Week 10 data is incomplete (only Mon shown). Fix today.
3. **workplaceData.ts** — Client Workplace posts are stale. Fix today.
4. **crmRecordsData.ts** — CRM records are from Mar 6. Fix this week.
5. **crmInteractionsData.ts** — CI metrics are from Mar 6. Fix this week.
6. **rsPipelineData.ts** — Scraper exists but session-dependent. Fix when session available.

---

## Refresh Architecture

### Manus-Assisted (requires Manus session)
- Calendar: `internalfb.com/calendar` → `weeklyMeetingsData.ts`
- Workplace Digest: `fb.workplace.com` groups → `workplaceDigestData.ts`
- AI Usage: Unidash AI Usage → `aiUsageData.ts`
- Client Workplace posts: `fb.workplace.com` client groups → `workplaceData.ts`

### Scheduled (port 9222 browser, requires active session)
- RS Pipeline: `internalfb.com/crm/pipeline_management` → `rsPipelineData.ts`
- AI Usage (backup): Unidash → `aiUsageData.ts`

### Manual (no automation needed)
- Key Dates in `dashboardData.ts` — updated when events are scheduled
- CRM Records — updated weekly via Manus when Pedro has new CIs

---

## Rule Going Forward
**Every data update must also update:**
1. The `dataAsOf` / `lastUpdated` / `digestDate` field in the data file
2. `CS_DASHBOARD_RECIPE.md`
3. The `/setup` page in the dashboard UI
