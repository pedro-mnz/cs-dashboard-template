# 🎨 Creative Shop Dashboard — Setup Recipe

**Build your own live Meta CS dashboard in under 30 minutes.**

> Last updated: March 11, 2026 — All Meta-internal data (Calendar, Workplace Digest, AI Usage, CRM/CI, RS Pipeline) is refreshed via **Manus-assisted workflow**: Manus reads the live sources directly using its authenticated browser session and writes verified data to the source files. A daily 7 AM BRT scheduled task runs automatically. **No data is hardcoded. No Puppeteer/browser automation is used server-side** — all scraping is done by Manus directly.

This guide walks you through forking Pedro's dashboard and making it yours. The dashboard automatically pulls your calendar, AI usage, CI count, and Workplace digest — filtered to your name — every morning at 7 AM BRT via Manus-assisted refresh. The refresh buttons in the UI show the last updated date and guide you to ask Manus when a manual refresh is needed.

---

## What You Get

| Section | Data Source | Auto-Refresh |
|---|---|---|
| **Overview** | Your profile + KPI summary (dashboardData.ts) | Manual config |
| **Next Meetings** | `internalfb.com/calendar` + Outlook cross-check → `weeklyMeetingsData.ts` | **Manus-assisted** daily 7 AM |
| **Client Content** | Your client portfolio (dashboardData.ts) | Manual config |
| **Recommended Solutions** | Meta CRM Pipeline Management → `rsPipelineData.ts` | **Manus-assisted** daily 7 AM + "Refresh RS" button |
| **CI Dashboard** | Unidash DCMP CI Insights → `crmInteractionsData.ts` | **Manus-assisted** daily 7 AM + button |
| **My AI Usage** | Unidash My AI Usage → `aiUsageData.ts` | **Manus-assisted** daily 7 AM + button |
| **Workplace Digest** | Workplace groups + notifications → `workplaceDigestData.ts` | **Manus-assisted** daily 7 AM |
| **Key Dates** | Manual config (dashboardData.ts) | Manual config |

---

## ⚡ Fast-Pace Setup (Recommended)

Instead of editing the config file manually, use the **Setup Wizard** at `/setup`. It walks you through 5 steps and generates a ready-to-paste `dashboard.config.ts` in under 5 minutes.

The key that unlocks the fastest setup is your **Internal FBID** — the number at the end of your profile URL:

```
https://www.internalfb.com/profile/view/1084877300
                                        ↑
                                   Your FBID
```

When you paste this URL into the Setup Wizard (Step 1 — Your Identity), it automatically extracts your FBID and pre-builds your **personal CRM CI filter URL** — no manual filter setup required. The generated config will include a fully parameterized URL that shows only your qualified CIs for the current quarter, filtered to you as a participant.

| What the FBID unlocks | How |
|---|---|
| **CRM CI filter URL** | Auto-generated with your FBID in the `fbid_set_contains_any_of` filter |
| **First CI data refresh** | Manus navigates directly to your filtered CI list and scrapes it immediately |
| **Future refreshes** | Manus reuses the same URL — no re-filtering needed |

You still need to provide:
- Your **Unidash Sales Rep name** (exact spelling with accents, from the Unidash dropdown)
- Your **Workplace group URLs** (from `fb.workplace.com/groups/[ID]`)
- Your **client portfolio** (BoB composition varies per IC)

Everything else is auto-generated or shared across all ICs.

### 🤖 Manus-Assisted Profile Setup (Fastest Option)

Instead of filling in the Setup Wizard manually, you can share your profile URL with Manus in chat and ask it to pre-fill everything for you:

1. Open a Manus chat and say: **"Set up my CS dashboard. My profile is https://www.internalfb.com/profile/view/[YOUR_FBID]"**
2. Manus navigates to your profile page and reads your **name, job title, team, manager, and location** directly from the source of truth
3. Manus cross-checks your name against Unidash to confirm the exact spelling used in the Sales Rep filter
4. Manus generates your complete `dashboard.config.ts` with all personal URLs pre-built
5. You only need to confirm your Workplace group URLs and client portfolio

**What Manus reads from your profile:**

| Field | Where on profile | Used for |
|---|---|---|
| **Full Name** | Headline name on profile card | Unidash Sales Rep filter, dashboard header |
| **Job Title** | Below name (e.g. "Creative Strategist") | Dashboard identity card |
| **Team** | "Workday team" field | Dashboard identity card |
| **Manager** | "Reports to" field | Dashboard identity card |
| **FBID** | Number at end of profile URL | CRM CI filter URL auto-generation |

> This approach eliminates typos and ensures your name matches Unidash filters exactly — especially important for names with accents or special characters.

---

## Prerequisites

Before you start, you need:

1. **A Manus account** — sign up at [manus.im](https://manus.im) if you don't have one yet.
2. **Access to Meta internal tools** — you'll need to be logged in to `internalfb.com` and `fb.workplace.com` in the Manus browser during setup.
3. **Your Internal FBID** — the number at the end of `https://www.internalfb.com/profile/view/[YOUR_FBID]`. This is used to auto-generate your personal CRM CI filter URL.
4. **Your Unidash Sales Rep name** — this is the exact string that appears in the Unidash "Sales Rep" filter dropdown. It is usually your full name as it appears in Workday (e.g., "Ana Lima", "Carlos Souza").

---

## Step 1 — Fork the Dashboard

1. Open Pedro's dashboard project in Manus.
2. In the Management UI (right panel), go to **Settings → GitHub**.
3. Click **"Export to GitHub"** to create your own copy of the repository.
4. Alternatively, ask Pedro to share the project directly via Manus — he can duplicate it to your account.

> **Note:** If you receive the project as a Manus share, it will already have the full-stack backend, database, and scheduler pre-configured. You only need to edit one file (Step 2).

---

## Step 2 — Edit Your Config File (The Only File You Need to Touch)

Open `client/src/lib/dashboard.config.ts`. This is the **single source of truth** for your identity and data sources. Everything else in the dashboard reads from this file automatically.

Fill in each section:

### Your Identity

```ts
profile: {
  name: "Ana Lima",               // Your full name
  firstName: "Ana",               // Used in the greeting ("Good morning, Ana 👋")
  role: "Creative Strategist",    // Your job title
  team: "Creative Shop LATAM",    // Your team
  territory: "Brazil (GBG-LATAM)",
  manager: "Your Manager Name",
  level: "IC4",                   // IC3, IC4, IC5, IC6, M1, M2...
  initials: "AL",                 // 2-letter initials for the avatar
  avatarColor: "#0064E0",         // Any hex color you like
},
```

### Unidash Filters

```ts
unidash: {
  salesRepName: "Ana Lima",  // ← CRITICAL: must match the Unidash dropdown EXACTLY
  quarter: "Q1 2026",
  ciMinTarget: 3,            // Your quarterly CI minimum
},
```

> **How to find your exact Unidash name:** Go to [Unidash CI Dashboard](https://www.internalfb.com/unidash/dashboard/engagement_management_process_dashboard/dcmp_client_interaction_insights/), click the "Sales Rep" filter, and search for yourself. Copy the name exactly as it appears in the dropdown — including accents and spacing.

### Workplace Groups

```ts
workplace: {
  groups: [
    {
      name: "CS LATAM",
      url: "https://fb.workplace.com/groups/YOUR_GROUP_ID",
      description: "Your team group",
    },
    // Add more groups as needed
  ],
  scrapeFeed: true,
},
```

> **How to find your group URL:** Open the group in Workplace, copy the URL from the address bar. It will look like `https://fb.workplace.com/groups/123456789`.

### Your Client Portfolio

Replace the `clients` array with your own clients. Each client needs:

```ts
{
  id: "client-slug",           // Unique short ID (no spaces)
  name: "Full Client Name",
  shortName: "Short Name",
  tier: "A+",                  // A+, A, B, C
  color: "#HEX",               // Brand color for the client card
  lightColor: "#HEX",          // Light tint for backgrounds
  logo: "🏢",                  // Emoji or leave as is
  summary: "One-line summary of the client and your focus areas.",
},
```

---

## Step 3 — Update Your Client Data

After setting up the config, update the detailed client data in `client/src/lib/dashboardData.ts`:

- **`clients` array** — add AR headroom, CS service level, active projects, and contacts for each client.
- **`recommendedSolutions` array** — updated via **Manus-assisted workflow**. Tell Manus: *"refresh my RS pipeline"* and Manus will navigate to Meta CRM Pipeline Management, read your live pipeline, and write the data to `rsPipelineData.ts`. To configure your personal CRM filter URL, paste it into `dashboard.config.ts` under `crm.rsPipelineUrl`. To get your URL: go to [Meta CRM Pipeline Management](https://www.internalfb.com/crm/pipeline_management), set **Contributors → Contains any of → [Your Name]**, set **Commission Split Role = CREATIVE_STRATEGIST**, **Period = CURRENT_QUARTER**, **Tab = YOUR_SOLUTIONS**, then copy the full URL from your browser address bar.

- **`crmRecordsData.ts` (CI records)** — updated via **Manus-assisted workflow**. Tell Manus: *"refresh my CRM data"* and Manus will navigate to [Meta CRM Client Interactions](https://www.internalfb.com/crm/client_interactions), apply the correct filters, and write verified CI records to `crmRecordsData.ts`. To configure your personal CI filter URL, apply these filters in the CRM UI and copy the resulting URL:

  | Filter | Value |
  |---|---|
  | **Participant** | Participant is in my book of business |
  | **Interaction time** | This quarter |
  | **Is qualified** | true |
  | **Participant contains any of** | [Your full name as it appears in CRM] |
  | **Sort** | Interaction time descending |

  The base URL is always `https://www.internalfb.com/crm/client_interactions`. The filters are encoded in the `filters=` query parameter. Each IC's URL will differ only in the `fbid_list` value inside the `fbid_set_contains_any_of` filter — which is your personal Meta FBID. To find your FBID: go to your own CRM profile page, or ask a peer who has already set up their dashboard to share the filter pattern. Paste the resulting URL into `dashboard.config.ts` under `crm.ciUrl`.
- **Calendar data** — refreshed via **Manus-assisted workflow** (Option A). Manus reads `internalfb.com/calendar` as the primary source, cross-checks it against Outlook, and writes the verified payload to `client/src/lib/weeklyMeetingsData.ts` — the **single source of truth** for both the Overview weekly grid and the Next Meetings section. To refresh, simply tell Manus: *"refresh my calendar"* and Manus will update the data immediately. This approach was chosen because Meta's enterprise Microsoft tenant does not allow third-party app registrations (blocking Microsoft Graph API), and the Manus sandbox browser session does not persist Meta SSO cookies reliably enough for fully automated scraping. The `updateCalendarData` tRPC procedure in `server/scraperRouter.ts` accepts the verified payload and handles the file write.

For the initial data population, the easiest approach is to share your screen with Pedro or another CS peer who has already set up their dashboard — they can help you run the first scrape and verify the data looks correct.

---

## Step 4 — Set Your Refresh Schedule

The daily refresh is handled by a **Manus scheduled task** (not the in-app scheduler). When you fork this dashboard, ask Manus to set up a daily 7 AM refresh task for your timezone. Manus will:

1. Read your Workplace groups and write `workplaceDigestData.ts` with real posts from the past 48 hours.
2. Read `internalfb.com/calendar`, cross-check against Outlook, and write `weeklyMeetingsData.ts`.
3. Read Unidash AI Usage and write `aiUsageData.ts`.
4. Confirm TypeScript compiles with 0 errors.
5. Send you a morning summary of what was updated and any action items.

Common timezone values for the scheduled task:

| Location | Timezone |
|---|---|
| Brazil (BRT) | `America/Sao_Paulo` (UTC-3) |
| Mexico City | `America/Mexico_City` (UTC-6) |
| Buenos Aires | `America/Argentina/Buenos_Aires` (UTC-3) |
| Bogotá | `America/Bogota` (UTC-5) |
| New York | `America/New_York` (UTC-5/4) |

> **Important:** The Manus scheduled task requires an active Manus session. If you close the Manus tab, the task will still run — Manus operates server-side. However, the Meta browser sessions (for `internalfb.com` and Outlook) must be active in the Manus sandbox browser. Sessions typically last 7–30 days depending on Meta's SSO policy. If a session expires, Manus will note it in the morning report and you can re-login via the Manus browser tools.

---

## Step 5 — Publish Your Dashboard

1. In the Manus Management UI, click the **Publish** button (top-right of the right panel).
2. Your dashboard will be live at `yourname.manus.space` (or a custom domain you configure in Settings → Domains).
3. Once published, the server runs 24/7 and the 7 AM auto-refresh fires every day — no session needs to be active.

> **All Meta-internal data** (Calendar, Workplace, AI Usage, CRM/CI, RS Pipeline) is updated via Manus-assisted workflow. Manus reads each source directly using its authenticated browser session and writes verified data to the corresponding source files. No data is ever fabricated or hardcoded — if a source is unavailable, Manus skips it and notes it in the report.

---

## How the Manus-Assisted Refresh Works

All data refresh is handled by Manus directly — **there is no Puppeteer or server-side browser automation**. The server does not launch any browser. Instead:

1. **Manus navigates** to each data source URL using its own authenticated browser session (which has your Meta SSO active).
2. **Manus reads** the page content and extracts the relevant data.
3. **Manus writes** the verified data to the corresponding TypeScript data files in `client/src/lib/`.
4. **The dashboard hot-reloads** to reflect the new data.

This approach was chosen because:
- The deployed server environment does not have Chromium installed
- Meta's enterprise SSO does not allow third-party API access (no Microsoft Graph API, no Workplace API)
- Manus's browser session is more reliable and persistent than a server-side headless browser

Manus does **not** store your credentials — it uses the browser session that is already authenticated in the Manus sandbox.

---

## Refresh Button Reference

| Button | Location | What it does |
|---|---|---|
| **Updated [date]** | Top bar | Shows last refresh date. Click to see a reminder to ask Manus for a refresh. |
| **Refresh CI** | CI Dashboard header | Shows last refresh date. All CI data is Manus-assisted. |
| **Refresh AI** | My AI Usage header | Shows last refresh date. All AI Usage data is Manus-assisted. |
| **Refresh Digest** | Workplace Digest header | Shows last refresh date. All Workplace data is Manus-assisted. |
| **Refresh RS** | Rec. Solutions header | Shows last refresh date. All RS Pipeline data is Manus-assisted. |

> **To refresh any section:** Tell Manus in chat — e.g., *"refresh my calendar"*, *"refresh my AI usage"*, *"refresh my Workplace digest"*, *"refresh my CRM data"*, or *"refresh my dashboard"* (all at once). Manus will read the live sources and update the data files immediately.

---

## Customization Tips

**Changing the color scheme:** Edit `client/src/index.css` — the CSS variables at the top control all colors. The sidebar accent color is also in `dashboard.config.ts` under `appearance.sidebarAccentColor`.

**Adding a new section:** Each section is a self-contained component in `client/src/components/sections/`. Copy an existing one as a starting point and register it in `client/src/pages/Home.tsx` and `client/src/components/Sidebar.tsx`.

**Adding a new data source:** For Meta-internal sources (behind SSO), use the Manus-assisted pattern: Manus navigates to the page, reads the data, and writes it to a TypeScript data file in `client/src/lib/`. For public sources (no SSO), you can add a fetch-based function in `server/scraperRouter.ts` — but **do not use Puppeteer** as it is not available in the deployed environment.

**Changing the greeting language:** Update `appearance.greeting` in `dashboard.config.ts` — e.g., `"Bom dia"` for Portuguese or `"Buenos días"` for Spanish.

---

## Troubleshooting

**"Browser was not found" or scraping errors**
This should no longer occur — all Puppeteer code has been removed. If you see this error, it means an old version of the code is running. Ask Manus to check the server logs and restart the dev server.

**"Updated [date]" shows yesterday's date**
The scheduled task ran but the data files haven't been updated yet. Tell Manus: *"refresh my dashboard"* and Manus will update all data sources immediately.

**CI count shows 0 or wrong number**
The Unidash CI filter may not have matched your name. Check that `unidash.salesRepName` in `dashboard.config.ts` matches your name exactly as it appears in the Unidash "Sales Rep" dropdown (including accents).

**Calendar shows wrong meetings**
All calendar data flows through a single file: `client/src/lib/weeklyMeetingsData.ts`. Calendar is updated via **Manus-assisted refresh** — tell Manus: *"refresh my calendar"* and Manus will read `internalfb.com/calendar`, cross-check against Outlook, and write the corrected data. Both the Overview weekly grid and the Next Meetings section read from this same file, so they are always in sync after a Manus refresh.

**Workplace Digest shows stale or wrong posts**
Tell Manus: *"refresh my Workplace digest"* and Manus will navigate to each of your configured Workplace groups, read the latest posts, and rewrite `workplaceDigestData.ts` with verified data. No fabrication — only posts that Manus actually reads from the live groups are included.

**AI Usage shows "Awaiting Data"**
This means the Unidash session has expired or the scheduled task hasn't run yet today. Tell Manus: *"refresh my AI usage"* and Manus will navigate to Unidash and update `aiUsageData.ts` with your current week data.

---

## Questions?

Reach out to Pedro Menezes on Workplace — he built the original and is happy to help you get set up.
