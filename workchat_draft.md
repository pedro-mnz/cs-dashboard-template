# WorkChat Draft — CS Dashboard Introduction

---

Hey team 👋

Sharing something I've been building on the side that I think you'll find interesting — both from a "what it does" and a "how it was built" perspective.

**What it is:** A personal operational dashboard for CS ICs. It aggregates the data I check every day — CRM client interactions, Unidash CI metrics, Rec. Solutions pipeline, AI Usage, Workplace digest, and my weekly calendar — into a single view, updated daily. Think of it as a command center for the IC workflow: instead of opening 5+ tabs every morning to piece together where things stand, everything is in one place.

**How it was built:** I used Manus (external AI agent) to build the full stack — React + tRPC + a MySQL DB, hosted on Manus's own infra. No code written by me. The interesting part is the data layer: since Meta's internal tools require SSO, there's no API access, so Manus navigates the actual CRM/Unidash pages on my behalf (authenticated via browser session), reads the data, and updates the dashboard files. It's essentially an AI-assisted scraping + config workflow rather than a traditional integration.

**Why I'm not using Second Brain for this:** Second Brain is great for context persistence and proactive drafting — it's your AI thought partner that knows your projects and meetings. This dashboard is a different layer: it's about operational visibility and data aggregation, not conversation. They're complementary. Second Brain helps me think and draft; the dashboard helps me see where I stand at a glance. I may explore connecting them down the line.

**The scale angle:** The dashboard is built to replicate. There's a `/setup` wizard where any IC can paste their internal profile URL, and the system auto-generates their personal config (CRM filter URL with their FBID, Unidash name, client portfolio from the CRM Scorecard). The recipe/documentation is also in the repo. My goal is to validate the concept with a few of you before deciding whether to propose it as a team-wide tool.

**What I'd love from you:**
- If you're curious, I can walk you through the setup (takes ~10 min)
- If you see architectural improvements or a smarter way to handle the data layer (especially the SSO constraint), I'm all ears
- If you think this overlaps with something already being built at a higher level, let me know — happy to align

Dashboard link: [pedromenezesdash.manus.space]
Setup wizard: [pedromenezesdash.manus.space/setup]

Happy to jump on a quick call or answer questions here 🙂

— Pedro
