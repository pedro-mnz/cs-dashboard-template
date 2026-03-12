# Pedro Menezes Dashboard — Daily 7 AM BRT Refresh Playbook

## Overview
This playbook is executed every weekday at 7:00 AM Brazil time (BRT = UTC-3).
It scrapes all 6 Meta data sources and updates the corresponding TypeScript data files in the dashboard.

---

## Data Sources & Update Targets

### 1. My AI Usage (Unidash)
- **URL:** https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/goal/?dimensional_context_1258193556074088=%7B%22macros%22%3A[]%2C%22limit%22%3A5%7D
- **Target file:** `client/src/lib/aiUsageData.ts`
- **What to extract:** Current week number, days used per day (Mon–Fri), goal (4 days/week), weeks over/under goal, active tools (Metamate, Llmvm, etc.), 13-week history table
- **Key fields:** `currentWeek`, `currentWeekDays`, `goalDays`, `weeksOverGoal`, `weeksUnderGoal`, `weeklyHistory[]`, `toolsUsed[]`

### 2. CI Dashboard (DCMP Unidash)
- **URL:** https://www.internalfb.com/unidash/dashboard/engagement_management_process_dashboard/dcmp_client_interaction_insights/?dimensional_context_1174094300424212=%7B%22macros%22%3A[]%2C%22operators%22%3A[]%2C%22movingAggregation%22%3A%22DEFAULT%22%2C%22granularity%22%3A%22DEFAULT%22%2C%22limit%22%3A5%7D&events=%7B%223407945929495889%22%3A%7B%22select_quarter_id%22%3A%7B%22data%22%3A%222026-01-01%22%2C%22publisher_id%22%3A%223407945929495889%22%7D%7D%2C%227653429751355503%22%3A%7B%22select_manager_name%22%3A%7B%22data%22%3A%22203181%22%2C%22publisher_id%22%3A%227653429751355503%22%7D%7D%2C%22820563726286699%22%3A%7B%22select_sales_employee_id%22%3A%7B%22data%22%3A%22498186%22%2C%22publisher_id%22%3A%22820563726286699%22%7D%7D%7D
- **Target file:** `client/src/lib/crmInteractionsData.ts`
- **What to extract:** Live CIs QTD count, outreach coverage %, clients with 1+ CI, avg live hours, weekly breakdown by topic (share of live hours), coverage deep dive table per client, in-person meetings %
- **Key fields:** `liveCIsQTD`, `outreachCoverage`, `clientsWithCI`, `avgLiveHours`, `weeklyTopics[]`, `coverageTable[]`, `inPersonPct`

### 3. CRM Client Interactions (Individual Records)
- **URL:** https://www.internalfb.com/crm/client_interactions?filters=[%7B%22field%22%3A%22participant%22%2C%22operator%22%3A%22fbid_set_participant_in_book_of_business%22%2C%22value%22%3A%7B%22type%22%3A%22empty%22%7D%7D%2C%7B%22field%22%3A%22participant%22%2C%22operator%22%3A%22fbid_set_contains_any%22%2C%22value%22%3A%7B%22type%22%3A%22entity_list%22%2C%22value%22%3A[%7B%22fbid%22%3A%221084877300%22%2C%22label%22%3A%22Pedro%20Menezes%22%7D]%7D%7D%2C%7B%22field%22%3A%22interaction_time%22%2C%22operator%22%3A%22timestamp_in_range_within_this_quarter%22%2C%22value%22%3A%7B%22type%22%3A%22empty%22%7D%7D%2C%7B%22field%22%3A%22is_qualified%22%2C%22operator%22%3A%22bool_is_true%22%2C%22value%22%3A%7B%22type%22%3A%22empty%22%7D%7D]&direction=&relativeDateRange=&showCount=false&sortKey=
- **Target file:** `client/src/lib/crmRecordsData.ts`
- **What to extract:** All validated CI records this quarter — for each: client name, date, type (virtual/in-person), duration (hours), topics, participants, qualified status
- **Key fields:** `records[]` with `{ client, date, type, hours, topics[], participants[], qualified }`
- **Business logic:** Map to BoB clients (Magalu, Amazon, Samsung = goal tracking) vs ABI (CS Global POC, no KPI)

### 4. RS Pipeline (CRM Pipeline Management)
- **URL:** https://www.internalfb.com/crm/pipeline_management?use_as=1084877300&initiatives_filters_view_as=ADS_SALES&initiatives_filter_query=%7B%22key%22%3A%22META_CRM_INITIATIVES_ROOT%22%2C%22children%22%3A[%7B%22key%22%3A%22META_CRM_INITIATIVES_CONTRIBUTORS_CONTAINS_ANY_OF%22%2C%22field%22%3A%22META_CRM_INITIATIVES_CONTRIBUTORS%22%2C%22value%22%3A[%7B%22title%22%3A%22Pedro%20Menezes%22%2C%22fbid%22%3A%221084877300%22%7D]%7D]%7D&initiatives_table_count=100&initiatives_table_page=0&initiatives_commission_split_role_name=CREATIVE_STRATEGIST&pipeline_management_tab=YOUR_SOLUTIONS&traverse_from=BOOK_OF_BUSINESS&solution_table_status_tab=ACTIVE&metacrm_tool=pipeline_management&period=CURRENT_QUARTER&commission_split_role_name=CREATIVE_STRATEGIST&view_as_type=ADS_SALES
- **Target file:** `client/src/lib/rsPipelineData.ts`
- **What to extract:** All active RS initiatives — for each: client, solution name, stage (Scoped/Pitching/Adopted/etc.), opportunity size ($), eligible AR, attributed AR, at-risk flag, overdue flag, owner
- **Key fields:** `solutions[]` with `{ client, name, stage, opportunitySize, eligibleAR, attributedAR, atRisk, overdue, owner }`

### 5. Weekly Calendar (Meta Internal Calendar)
- **URL:** https://www.internalfb.com/calendar
- **Target file:** `client/src/lib/weeklyMeetingsData.ts`
- **What to extract:** All meetings for the current week (Mon–Fri) — for each: title, date, time, duration, type (client/internal/focus), attendees, video link
- **Key fields:** `currentWeek`, `meetings[]` with `{ title, date, dayOfWeek, startTime, endTime, type, attendees[], isClientMeeting, clientName }`
- **Classification logic:** Tag as "client" if title/attendees mention ABI, Magalu, Magazine Luiza, Amazon, Samsung; otherwise "internal"

### 6. Workplace Daily Digest
- **URL:** https://fb.workplace.com/
- **Target file:** `client/src/lib/workplaceDigestData.ts`
- **Prompt to follow:**

  **1. POSTS WHERE I WAS TAGGED/MENTIONED**
  Search for Workplace posts and comments from the last 24 hours where Pedro Menezes (ID: 100079485511668, username: pedromenezes) was mentioned or tagged. For each: post link, who mentioned me, context/summary, whether it requires action or a response.

  **2. CREATIVE SHOP — Team Updates**
  Fetch the most recent posts (last 24h) from:
  - Creative Shop FYI (ID: 400827236632564): https://fb.workplace.com/groups/400827236632564
  - CS: The Work (ID: 365231093525512): https://fb.workplace.com/groups/365231093525512
  - Creative Shop Supply Hub (ID: 911376516957318): https://fb.workplace.com/groups/911376516957318
  - Creative Shop MPA Creative Solutions (ID: 1168085517955096): https://fb.workplace.com/groups/1168085517955096
  - Creative Shop for Scaled (ID: 1627547464129372): https://fb.workplace.com/groups/1627547464129372
  For each post: summary, author, link, why it matters.

  **3. META & GBG — Strategic Updates**
  Fetch the most relevant posts (last 24h) from:
  - Employee FYI (ID: 221503021668016): https://fb.workplace.com/groups/221503021668016
  - Global Business Group FYI (ID: 1897663863683333): https://fb.workplace.com/groups/1897663863683333
  - Global Sales FYI (ID: 103693176391123): https://fb.workplace.com/groups/103693176391123
  - People FYI (ID: 137103853516660): https://fb.workplace.com/groups/137103853516660
  Focus on: leadership announcements, strategic shifts, product launches, new policies.

  **4. CLIENT NEWS**
  Search Workplace for posts mentioning: ABI, Anheuser-Busch InBev, Magazine Luiza, Magalu, Amazon Brazil, Samsung Brazil (last 24h).

  **OUTPUT FORMAT:**
  - 🔔 Action Required: posts where I was tagged that need a response
  - 🎨 Creative Shop Today: key CS posts summarized with links
  - 🌐 Meta & Business: top strategic posts with links
  - 💡 Highlight of the Day: 1 standout post with brief take
  - 📣 Client News: any client-related posts

  **RULES:** Always include clickable links, summarize concisely, prioritize high-engagement posts, state "No updates in the last 24h" if empty.

---

## After Scraping
1. Update each target `.ts` data file with the new data
2. Add a `lastUpdated: "YYYY-MM-DD HH:MM BRT"` timestamp to each file
3. The dashboard will automatically reflect the new data on next page load (no rebuild needed — data is imported at runtime)

## Session Notes
- Meta session is authenticated in the sandbox Chromium browser
- If session expires (SSO timeout), the task will fail and Pedro should be notified to re-authenticate
- All URLs are pre-filtered for Pedro Menezes (fbid: 1084877300, employee_id: 498186)
