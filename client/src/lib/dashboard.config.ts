// ============================================================
// 🎨 Creative Shop Dashboard — Personal Configuration
// ============================================================
// This is the ONLY file you need to edit to make this dashboard yours.
// Fill in your details below, then the dashboard will automatically:
//   • Filter Unidash (CI + AI Usage) to your name
//   • Show your Meta calendar meetings
//   • Pull your Workplace Digest from your groups
//   • Display your client portfolio and RS pipeline
//
// After editing, click "Updated [date]" to trigger a full refresh.
// ============================================================

export const dashboardConfig = {
  // ── Your Identity ──────────────────────────────────────────
  profile: {
    name: "Your Name",               // Your full name (must match Unidash Sales Rep filter exactly)
    firstName: "YourFirstName",      // Used in the greeting ("Good morning, YourFirstName 👋")
    role: "Your Role",               // Your job title
    team: "Your Team",               // Your team name
    company: "Meta",
    territory: "Your Territory",     // Your territory label shown in the header
    manager: "Your Manager",         // Your manager's name
    level: "IC5",                    // Your level (IC3, IC4, IC5, IC6, M1, M2...)
    initials: "YN",                  // 2-letter initials for the avatar
    avatarColor: "#7C3AED",          // Avatar background color (hex)
    isInOffice: true,                // Set to false if you are a remote employee (hides In-Person Time widget)
  },

  // ── Unidash Filters ────────────────────────────────────────
  // These are used by the scraper to filter Unidash dashboards to YOUR data.
  unidash: {
    salesRepName: "Your Name",       // Exact name as it appears in the Unidash "Sales Rep" filter dropdown
    quarter: "Q1 2026",              // Current quarter for CI tracking (e.g. "Q1 2026", "Q2 2026")
    ciMinTarget: 3,                  // Minimum validated CIs required per quarter
    ciUrl: "https://www.internalfb.com/unidash/dashboard/engagement_management_process_dashboard/dcmp_client_interaction_insights/",
    aiUsageUrl: "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage",
  },

  // ── Workplace Groups to Monitor ────────────────────────────
  // The scraper will visit these Workplace URLs and pull the latest posts.
  workplace: {
    // Primary group shown as a quick-link button in the dashboard header.
    // Set this to your most important Workplace group.
    primaryGroup: {
      name: "CS: The Work",
      url: "https://fb.workplace.com/groups/365231093525512",
    },
    groups: [
      {
        name: "CS LATAM",
        url: "https://fb.workplace.com/groups/creativeshopbr",
        description: "Creative Shop Brazil/LATAM team group",
      },
      {
        name: "GBG Brazil",
        url: "https://fb.workplace.com/groups/gbgbrazil",
        description: "GBG Brazil announcements and updates",
      },
      // Add more groups as needed:
      // { name: "My Group", url: "https://fb.workplace.com/groups/GROUPID", description: "..." },
    ],
    // Also scrape your personal Workplace feed for @mentions and Thanks Bot
    scrapeFeed: true,
    feedUrl: "https://fb.workplace.com",
  },

  // ── Calendar ───────────────────────────────────────────────
  calendarUrl: "https://www.internalfb.com/calendar",

  // ── Dashboard Appearance ───────────────────────────────────
  appearance: {
    sidebarAccentColor: "#1a1f36",   // Sidebar background color
    primaryColor: "#7C3AED",         // CS Purple — used for highlights and badges
    secondaryColor: "#0064E0",       // Meta Blue — used for links and KPI cards
    greeting: "Good morning",        // Greeting text (can be localized: "Bom dia", "Buenos días")
  },

  // ── Auto-Refresh Schedule ──────────────────────────────────
  schedule: {
    dailyRefreshTime: "07:00",       // Time for daily auto-refresh (24h format, BRT/local time)
    timezone: "America/Sao_Paulo",   // Your timezone
  },

  // ── Client Portfolio ───────────────────────────────────────
  // List your dedicated clients here. These populate the Client Content
  // and Recommended Solutions sections. You can add/remove clients freely.
  // Each client needs: id, name, shortName, tier, color, and a brief summary.
  clients: [
    // ── YOUR CLIENTS WILL BE ADDED HERE BY THE SETUP WIZARD ──
    // Each client entry follows this shape:
    // {
    //   id: "client-id",          // lowercase, no spaces
    //   name: "Full Client Name",
    //   shortName: "Short",
    //   tier: "A+" | "A" | "B",
    //   color: "#HEX",            // primary brand color
    //   lightColor: "#HEX",       // light tint for backgrounds
    //   logo: "emoji",            // optional emoji icon
    //   summary: "One-line description of your relationship and focus areas.",
    // },
    // To add a client manually, copy the block above and fill in your values.
  ],
};

// ── Type export (do not edit) ──────────────────────────────────
export type DashboardConfig = typeof dashboardConfig;
