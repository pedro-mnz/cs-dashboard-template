// RS Pipeline Data — sourced from Unidash Individual Opportunities CSV export
// Source: fburl.com/datainsights/x5oismt6 | Filtered: cs_ics = Pedro Menezes | Date: 2026-03-20
// Last refreshed: 2026-03-20 (Manus daily refresh)

export type RSStage = "discovery" | "pitching" | "scoping" | "committed" | "actioned" | "partial" | "adopted" | "closed";

export interface StageTransition {
  stage: RSStage;
  date: string;   // ISO date string e.g. "2026-01-15"
  note?: string;  // Optional context note
}

export interface RSEntry {
  id: string;
  client: string;
  clientName: string;
  initiative: string;          // Full initiative name
  initiativeShort: string;     // Grouped initiative name (for charts)
  initiativeUrl: string;       // CRM deep link
  stage: RSStage;
  type: "RS" | "SCS";
  stageHistory?: StageTransition[]; // Ordered list of stage transitions (oldest first)
  lastTouched?: string;             // ISO date of last CRM interaction / touch (YYYY-MM-DD)
  arHeadroom: number;          // Opp Size − Accrued AR Lifetime (remaining upside), USD
  oppSize: number;             // Estimated total revenue potential, USD
  accruedARLifetime: number;   // Revenue attributed all-time, USD
  accruedARQTD: number;        // Revenue attributed this quarter, USD
  targetEligibleRevenue: number; // Total addressable revenue pool, USD
  vertical: string;
  owner: string;               // Initiative owner (Sales IC)
}

export const rsStageConfig: Record<RSStage, { label: string; color: string; bg: string }> = {
  discovery:  { label: "Discovery",         color: "#6B7280", bg: "#F3F4F6" },
  pitching:   { label: "Pitching",          color: "#F59E0B", bg: "#FFFBEB" },
  scoping:    { label: "Scoping",           color: "#8B5CF6", bg: "#F5F3FF" },
  committed:  { label: "Committed",         color: "#3B82F6", bg: "#EFF6FF" },
  actioned:   { label: "Actioned",          color: "#0EA5E9", bg: "#F0F9FF" },
  partial:    { label: "Partially Adopted", color: "#10B981", bg: "#ECFDF5" },
  adopted:    { label: "Adopted",           color: "#059669", bg: "#D1FAE5" },
  closed:     { label: "Closed",            color: "#9CA3AF", bg: "#F9FAFB" },
};

export const rsPipeline: RSEntry[] = [
  { id: "2964730907061360", client: "magalu", clientName: "Magazine Luiza", initiative: "Catalog Product Level Video: Creative", initiativeShort: "Catalog Product Level Video", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/2964730907061360/overview", stage: "partial", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-10-01", note: "Initiative identified" },
    { stage: "pitching", date: "2025-11-12", note: "Pitched to Thelio" },
    { stage: "scoping", date: "2025-12-03", note: "Scope agreed" },
    { stage: "committed", date: "2026-01-08", note: "Client committed" },
    { stage: "actioned", date: "2026-02-01", note: "First creatives live" },
    { stage: "partial", date: "2026-02-20", note: "Partial adoption confirmed" },
  ], lastTouched: "2026-03-10", arHeadroom: 1279528, oppSize: 1530153, accruedARLifetime: 250625, accruedARQTD: 250625, targetEligibleRevenue: 5100512, vertical: "Retail", owner: "Thelio Goncalves" },
  { id: "25589294394025504", client: "amazon", clientName: "Amazon.Com", initiative: "Catalog Product Level Video: Creative", initiativeShort: "Catalog Product Level Video", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/25589294394025504/overview", stage: "partial", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-10-15", note: "Identified alongside Magalu entry" },
    { stage: "pitching", date: "2025-11-20", note: "Pitched to Douglas" },
    { stage: "scoping", date: "2025-12-10", note: "Scope defined" },
    { stage: "committed", date: "2026-01-10", note: "Amazon committed" },
    { stage: "actioned", date: "2026-02-05", note: "Creatives activated" },
    { stage: "partial", date: "2026-02-22", note: "Partial adoption" },
  ], lastTouched: "2026-03-07", arHeadroom: 845000, oppSize: 1006877, accruedARLifetime: 161877, accruedARQTD: 161877, targetEligibleRevenue: 3356258, vertical: "Ecommerce", owner: "Douglas Mendes" },
  { id: "3397688507051624", client: "samsung", clientName: "Samsung Electronics Co Ltd - KR(USD)", initiative: "Adopt CTX", initiativeShort: "Adopt CTX", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/3397688507051624/overview", stage: "discovery", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-01-15", note: "Identified via CS review" },
  ], lastTouched: "2026-01-15", arHeadroom: 579234, oppSize: 579234, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 1930779, vertical: "Technology", owner: "Bruno Boehringer Mastantuono" },
  { id: "3411435762343565", client: "samsung", clientName: "Samsung Electronics Co Ltd - KR(USD)", initiative: "Creative: Increase Creative Diversification", initiativeShort: "Creative: Increase Creative Diversification", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/3411435762343565/overview", stage: "actioned", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-11-01", note: "Creative diversification gap identified" },
    { stage: "pitching", date: "2025-12-01", note: "Pitched to Bruno" },
    { stage: "scoping", date: "2026-01-05", note: "Scope finalized" },
    { stage: "committed", date: "2026-01-20", note: "Samsung committed" },
    { stage: "actioned", date: "2026-02-10", note: "Diversified creatives live" },
  ], lastTouched: "2026-03-05", arHeadroom: 470621, oppSize: 478529, accruedARLifetime: 7908, accruedARQTD: 7908, targetEligibleRevenue: 3560533, vertical: "Technology", owner: "Bruno Boehringer Mastantuono" },
  { id: "889383203505096", client: "amazon", clientName: "Amazon.Com", initiative: "Catalog Product Level Video: Creative", initiativeShort: "Catalog Product Level Video", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/889383203505096/overview", stage: "actioned", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-11-05", note: "E&M vertical opportunity" },
    { stage: "pitching", date: "2025-12-08", note: "Pitched" },
    { stage: "committed", date: "2026-01-15", note: "Committed" },
    { stage: "actioned", date: "2026-02-12", note: "Live" },
  ], lastTouched: "2026-03-12", arHeadroom: 180364, oppSize: 194460, accruedARLifetime: 14096, accruedARQTD: 14096, targetEligibleRevenue: 648203, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
  { id: "3411424922344649", client: "samsung", clientName: "Samsung Electronics Co Ltd - KR(USD)", initiative: "Opt into Reels placements using 9:16 video with audio", initiativeShort: "Opt into Reels placements using 9:16 video with audio", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/3411424922344649/overview", stage: "pitching", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-01-10", note: "Reels 9:16 gap identified" },
    { stage: "pitching", date: "2026-02-14", note: "Pitch deck sent to Bruno" },
  ], lastTouched: "2026-02-14", arHeadroom: 118305, oppSize: 118305, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 2484899, vertical: "Technology", owner: "Bruno Boehringer Mastantuono" },
  { id: "3397679880385820", client: "samsung", clientName: "Samsung Electronics Co Ltd - KR(USD)", initiative: "Scale partnership ads in more campaigns", initiativeShort: "Scale partnership ads in more campaigns", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/3397679880385820/overview", stage: "actioned", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-12-01", note: "Partnership ads scaling opportunity" },
    { stage: "pitching", date: "2026-01-07", note: "Pitched to Samsung team" },
    { stage: "committed", date: "2026-01-28", note: "Samsung committed" },
    { stage: "actioned", date: "2026-02-18", note: "Partnership ads scaled" },
  ], lastTouched: "2026-02-18", arHeadroom: 99326, oppSize: 99568, accruedARLifetime: 242, accruedARQTD: 242, targetEligibleRevenue: 2056074, vertical: "Technology", owner: "Bruno Boehringer Mastantuono" },
  { id: "25589356604019283", client: "amazon", clientName: "Amazon.Com", initiative: "Advantage + audience", initiativeShort: "Advantage + audience", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/25589356604019283/overview", stage: "partial", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-10-20", note: "Advantage+ audience gap" },
    { stage: "pitching", date: "2025-11-25", note: "Pitched" },
    { stage: "scoping", date: "2025-12-15", note: "Scoped" },
    { stage: "committed", date: "2026-01-12", note: "Committed" },
    { stage: "actioned", date: "2026-02-03", note: "Actioned" },
    { stage: "partial", date: "2026-02-25", note: "Partial adoption" },
  ], lastTouched: "2026-02-25", arHeadroom: 96643, oppSize: 123024, accruedARLifetime: 26381, accruedARQTD: 26381, targetEligibleRevenue: 1892688, vertical: "Ecommerce", owner: "Douglas Mendes" },
  { id: "25589447477343529", client: "amazon", clientName: "Amazon.Com", initiative: "Opt into Reels placements using 9:16 video with audio", initiativeShort: "Opt into Reels placements using 9:16 video with audio", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/25589447477343529/overview", stage: "partial", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-11-10", note: "Reels 9:16 opportunity" },
    { stage: "pitching", date: "2025-12-05", note: "Pitched" },
    { stage: "committed", date: "2026-01-18", note: "Committed" },
    { stage: "actioned", date: "2026-02-08", note: "Live" },
    { stage: "partial", date: "2026-03-01", note: "Partial adoption confirmed" },
  ], lastTouched: "2026-03-01", arHeadroom: 44715, oppSize: 67193, accruedARLifetime: 22478, accruedARQTD: 22478, targetEligibleRevenue: 2605954, vertical: "Ecommerce", owner: "Douglas Mendes" },
  { id: "892295729880510", client: "amazon", clientName: "Amazon.Com", initiative: "Opt into Reels placements using 9:16 video with audio", initiativeShort: "Opt into Reels placements using 9:16 video with audio", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/892295729880510/overview", stage: "partial", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-11-15", note: "E&M Reels opportunity" },
    { stage: "pitching", date: "2025-12-12", note: "Pitched" },
    { stage: "committed", date: "2026-01-22", note: "Committed" },
    { stage: "actioned", date: "2026-02-15", note: "Live" },
    { stage: "partial", date: "2026-03-03", note: "Partial adoption" },
  ], lastTouched: "2026-03-03", arHeadroom: 33392, oppSize: 50260, accruedARLifetime: 16868, accruedARQTD: 16868, targetEligibleRevenue: 1018853, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
  { id: "25627641583590719", client: "magalu", clientName: "Magazine Luiza", initiative: "Catalog Product Level Video: Creative", initiativeShort: "Catalog Product Level Video", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/25627641583590719/overview", stage: "scoping", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-01-20", note: "New Magalu Ecommerce entry" },
    { stage: "pitching", date: "2026-02-10", note: "Pitched to Thelio" },
    { stage: "scoping", date: "2026-03-01", note: "Scope in progress" },
  ], lastTouched: "2026-03-01", arHeadroom: 31151, oppSize: 31151, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 103835, vertical: "Ecommerce", owner: "Thelio Goncalves" },
  { id: "25592174927137385", client: "magalu", clientName: "Magazine Luiza", initiative: "Opt into Reels placements using 9:16 video with audio", initiativeShort: "Opt into Reels placements using 9:16 video with audio", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/25592174927137385/overview", stage: "scoping", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-01-25", note: "Reels 9:16 Magalu opportunity" },
    { stage: "pitching", date: "2026-02-18", note: "Pitched" },
    { stage: "scoping", date: "2026-03-05", note: "Scoping underway" },
  ], lastTouched: "2026-03-05", arHeadroom: 10962, oppSize: 10962, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 238238, vertical: "Ecommerce", owner: "Thelio Goncalves" },
  { id: "2681884668876703", client: "amazon", clientName: "Amazon.Com", initiative: "Scale partnership ads in more campaigns", initiativeShort: "Scale partnership ads in more campaigns", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/2681884668876703/overview", stage: "committed", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-01-08", note: "E&M partnership ads gap" },
    { stage: "pitching", date: "2026-02-01", note: "Pitched" },
    { stage: "committed", date: "2026-03-05", note: "Amazon committed" },
  ], lastTouched: "2026-03-05", arHeadroom: 9448, oppSize: 9448, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 88305, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
  { id: "892293123214104", client: "amazon", clientName: "Amazon.Com", initiative: "Scale partnership ads in more campaigns", initiativeShort: "Scale partnership ads in more campaigns", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/892293123214104/overview", stage: "partial", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-11-20", note: "E&M partnership opportunity" },
    { stage: "pitching", date: "2025-12-15", note: "Pitched" },
    { stage: "committed", date: "2026-01-25", note: "Committed" },
    { stage: "actioned", date: "2026-02-20", note: "Live" },
    { stage: "partial", date: "2026-03-08", note: "Partial adoption" },
  ], lastTouched: "2026-03-08", arHeadroom: 7883, oppSize: 10231, accruedARLifetime: 2348, accruedARQTD: 2348, targetEligibleRevenue: 95621, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
  { id: "25592069340481277", client: "magalu", clientName: "Magazine Luiza", initiative: "Add animation to your image ads", initiativeShort: "Add animation to your image ads", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/25592069340481277/overview", stage: "pitching", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-02-01", note: "Animation ads gap for Magalu" },
    { stage: "pitching", date: "2026-03-03", note: "Pitch in progress" },
  ], lastTouched: "2026-03-03", arHeadroom: 4801, oppSize: 4801, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 326647, vertical: "Ecommerce", owner: "Thelio Goncalves" },
  { id: "3859469367693725", client: "samsung", clientName: "Samsung Electronics Co Ltd - KR(USD)", initiative: "Gen AI Creative: Adopt text generation", initiativeShort: "Gen AI Creative: Adopt text generation", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/3859469367693725/overview", stage: "pitching", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-02-05", note: "Gen AI text generation opportunity" },
    { stage: "pitching", date: "2026-03-07", note: "Pitch sent to Bruno" },
  ], lastTouched: "2026-03-07", arHeadroom: 3758, oppSize: 3758, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 242469, vertical: "Technology", owner: "Bruno Boehringer Mastantuono" },
  { id: "2681913198873850", client: "amazon", clientName: "Amazon.Com", initiative: "Opt into Reels placements using 9:16 video with audio", initiativeShort: "Opt into Reels placements using 9:16 video with audio", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/2681913198873850/overview", stage: "actioned", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-12-10", note: "E&M Reels 9:16 gap" },
    { stage: "pitching", date: "2026-01-14", note: "Pitched" },
    { stage: "committed", date: "2026-02-05", note: "Committed" },
    { stage: "actioned", date: "2026-03-01", note: "Live" },
  ], lastTouched: "2026-03-01", arHeadroom: 3463, oppSize: 3463, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 147883, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
  { id: "25335644232774683", client: "magalu", clientName: "Magazine Luiza", initiative: "Creative: Increase Creative Diversification", initiativeShort: "Creative: Increase Creative Diversification", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/25335644232774683/overview", stage: "scoping", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-01-28", note: "Creative diversification gap" },
    { stage: "pitching", date: "2026-02-20", note: "Pitched to Thelio" },
    { stage: "scoping", date: "2026-03-08", note: "Scoping in progress" },
  ], lastTouched: "2026-03-08", arHeadroom: 1653, oppSize: 1653, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 17492, vertical: "Ecommerce", owner: "Thelio Goncalves" },
  { id: "889387453504671", client: "amazon", clientName: "Amazon.Com", initiative: "Add animation to your image ads", initiativeShort: "Add animation to your image ads", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/889387453504671/overview", stage: "pitching", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-02-10", note: "Animation ads E&M opportunity" },
    { stage: "pitching", date: "2026-03-06", note: "Pitch in progress" },
  ], lastTouched: "2026-03-06", arHeadroom: 1519, oppSize: 1519, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 103364, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
  { id: "2681891178876052", client: "amazon", clientName: "Amazon.Com", initiative: "Add animation to your image ads", initiativeShort: "Add animation to your image ads", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/2681891178876052/overview", stage: "pitching", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-02-12", note: "Animation ads E&M opportunity" },
    { stage: "pitching", date: "2026-03-08", note: "Pitch in progress" },
  ], lastTouched: "2026-03-08", arHeadroom: 978, oppSize: 978, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 66545, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
  { id: "2968376880030096", client: "magalu", clientName: "Magazine Luiza", initiative: "Opt into Reels placements using 9:16 video with audio", initiativeShort: "Opt into Reels placements using 9:16 video with audio", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/2968376880030096/overview", stage: "partial", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-10-25", note: "Reels 9:16 Magalu Retail" },
    { stage: "pitching", date: "2025-11-28", note: "Pitched" },
    { stage: "committed", date: "2026-01-05", note: "Committed" },
    { stage: "actioned", date: "2026-01-28", note: "Live" },
    { stage: "partial", date: "2026-02-18", note: "Partial adoption" },
  ], lastTouched: "2026-02-18", arHeadroom: 733, oppSize: 14015, accruedARLifetime: 13282, accruedARQTD: 13282, targetEligibleRevenue: 432226, vertical: "Retail", owner: "Thelio Goncalves" },
  { id: "3397682117052263", client: "samsung", clientName: "Samsung Electronics Co Ltd - KR(USD)", initiative: "Add animation to your image ads", initiativeShort: "Add animation to your image ads", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/3397682117052263/overview", stage: "discovery", type: "RS", stageHistory: [
    { stage: "discovery", date: "2026-03-10", note: "Animation ads Samsung opportunity" },
  ], lastTouched: "2026-03-10", arHeadroom: 550, oppSize: 550, accruedARLifetime: 0, accruedARQTD: 0, targetEligibleRevenue: 37393, vertical: "Technology", owner: "Bruno Boehringer Mastantuono" },
  { id: "2681903652208138", client: "amazon", clientName: "Amazon.Com", initiative: "Creative: Increase Creative Diversification", initiativeShort: "Creative: Increase Creative Diversification", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/2681903652208138/overview", stage: "adopted", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-09-15", note: "Creative diversification E&M" },
    { stage: "pitching", date: "2025-10-10", note: "Pitched" },
    { stage: "scoping", date: "2025-11-01", note: "Scoped" },
    { stage: "committed", date: "2025-11-20", note: "Committed" },
    { stage: "actioned", date: "2025-12-10", note: "Live" },
    { stage: "adopted", date: "2026-01-15", note: "Full adoption confirmed" },
  ], lastTouched: "2026-01-15", arHeadroom: -2613, oppSize: 18293, accruedARLifetime: 20906, accruedARQTD: 20906, targetEligibleRevenue: 171530, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
  { id: "25623065363981740", client: "amazon", clientName: "Amazon.Com", initiative: "Creative: Increase Creative Diversification", initiativeShort: "Creative: Increase Creative Diversification", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/25623065363981740/overview", stage: "adopted", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-09-20", note: "Ecommerce creative diversification" },
    { stage: "pitching", date: "2025-10-15", note: "Pitched" },
    { stage: "scoping", date: "2025-11-05", note: "Scoped" },
    { stage: "committed", date: "2025-11-25", note: "Committed" },
    { stage: "actioned", date: "2025-12-18", note: "Live" },
    { stage: "adopted", date: "2026-01-20", note: "Full adoption" },
  ], lastTouched: "2026-01-20", arHeadroom: -13275, oppSize: 31247, accruedARLifetime: 44522, accruedARQTD: 44522, targetEligibleRevenue: 280268, vertical: "Ecommerce", owner: "Douglas Mendes" },
  { id: "889378756838874", client: "amazon", clientName: "Amazon.Com", initiative: "Creative: Increase Creative Diversification", initiativeShort: "Creative: Increase Creative Diversification", initiativeUrl: "https://www.internalfb.com/crm/pipeline_management/889378756838874/overview", stage: "adopted", type: "RS", stageHistory: [
    { stage: "discovery", date: "2025-09-25", note: "E&M creative diversification" },
    { stage: "pitching", date: "2025-10-20", note: "Pitched" },
    { stage: "committed", date: "2025-11-28", note: "Committed" },
    { stage: "actioned", date: "2025-12-20", note: "Live" },
    { stage: "adopted", date: "2026-01-25", note: "Full adoption" },
  ], lastTouched: "2026-01-25", arHeadroom: -13765, oppSize: 5451, accruedARLifetime: 19216, accruedARQTD: 19216, targetEligibleRevenue: 68018, vertical: "Entertainment and Media", owner: "Douglas Mendes" },
];

// Per-client AR summary (for AR Headroom chart and Client Priority Ranking)
export interface ClientARData {
  clientId: string;
  clientName: string;
  arHeadroom: number;          // Sum of AR Headroom across all RS for this client
  oppSize: number;             // Sum of Opp Size
  accruedARQTD: number;        // Sum of Accrued AR QTD
  accruedARLifetime: number;   // Sum of Accrued AR Lifetime
  targetEligibleRevenue: number; // Sum of Target Eligible Revenue
}

export const clientARData: ClientARData[] = [
  { clientId: "magalu", clientName: "Magazine Luiza", arHeadroom: 1328828, oppSize: 1592735, accruedARQTD: 263907, accruedARLifetime: 263907, targetEligibleRevenue: 6218950 },
  { clientId: "samsung", clientName: "Samsung", arHeadroom: 1271794, oppSize: 1279944, accruedARQTD: 8150, accruedARLifetime: 8150, targetEligibleRevenue: 10312147 },
  { clientId: "amazon", clientName: "Amazon", arHeadroom: 1193752, oppSize: 1522444, accruedARQTD: 328692, accruedARLifetime: 328692, targetEligibleRevenue: 10543490 },
];

// Initiative-level grouping (for AR Headroom by Initiative chart)
export interface InitiativeARData {
  name: string;
  arHeadroom: number;
  oppSize: number;
  accruedARQTD: number;
  count: number;
}

export const initiativeARData: InitiativeARData[] = [
  { name: "Catalog Product Level Video", arHeadroom: 2336043, oppSize: 2762641, accruedARQTD: 426598, count: 4 },
  { name: "Adopt CTX", arHeadroom: 579234, oppSize: 579234, accruedARQTD: 0, count: 1 },
  { name: "Creative: Increase Creative Diversification", arHeadroom: 442621, oppSize: 535173, accruedARQTD: 92552, count: 5 },
  { name: "Opt into Reels placements using 9:16 video with audio", arHeadroom: 211570, oppSize: 264198, accruedARQTD: 52628, count: 6 },
  { name: "Scale partnership ads in more campaigns", arHeadroom: 116657, oppSize: 119247, accruedARQTD: 2590, count: 3 },
  { name: "Advantage + audience", arHeadroom: 96643, oppSize: 123024, accruedARQTD: 26381, count: 1 },
  { name: "Add animation to your image ads", arHeadroom: 7848, oppSize: 7848, accruedARQTD: 0, count: 4 },
  { name: "Gen AI Creative: Adopt text generation", arHeadroom: 3758, oppSize: 3758, accruedARQTD: 0, count: 1 },
];

// Stage distribution (for RS Stage Progression chart)
export const stageDistribution = {
  discovery: 2,
  pitching: 5,
  scoping: 3,
  committed: 1,
  actioned: 4,
  partial: 7,
  adopted: 3,
  closed: 0,
};

// Compatibility exports for SolutionsSection
export const rsSummary = {
  total: rsPipeline.length,
  totalOpportunitySize: rsPipeline.reduce((s, r) => s + r.oppSize, 0),
  totalEligibleTargetRevenue: rsPipeline.reduce((s, r) => s + r.targetEligibleRevenue, 0),
  attributedProgress: rsPipeline.reduce((s, r) => s + r.oppSize, 0) > 0
    ? Math.round((rsPipeline.reduce((s, r) => s + r.accruedARLifetime, 0) / rsPipeline.reduce((s, r) => s + r.oppSize, 0)) * 100)
    : 0,
  eligibleProgress: rsPipeline.reduce((s, r) => s + r.targetEligibleRevenue, 0) > 0
    ? Math.round((rsPipeline.reduce((s, r) => s + r.accruedARQTD, 0) / rsPipeline.reduce((s, r) => s + r.targetEligibleRevenue, 0)) * 100)
    : 0,
  sourceUrl: "https://www.internalfb.com/crm/pipeline_management",
};

export const rsStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  "At Risk": { label: "At Risk", color: "#F59E0B", bg: "#FFFBEB" },
  "Overdue": { label: "Overdue", color: "#EF4444", bg: "#FEF2F2" },
};

export const rsClientColors: Record<string, { name: string; color: string }> = {
  magalu:  { name: "Magalu",  color: "#0064E0" },
  amazon:  { name: "Amazon",  color: "#F59E0B" },
  samsung: { name: "Samsung", color: "#7C3AED" },
};

// Portfolio-level summary
export const portfolioARSummary = {
  totalARHeadroom: 3794374,
  totalOppSize: 4395123,
  totalAccruedQTD: 600749,
  totalAccruedLifetime: 600749,
  totalTargetEligibleRevenue: 27074587,
  // Q4 2025 final accrued AR for QoQ delta badge — update after each quarter close
  accruedARLastQuarter: 480000,
  lastQuarterLabel: "Q4 2025",
  topOpportunity: "Magazine Luiza — $1.33M AR Headroom",
  dataAsOf: "2026-03-20",
  lastRefreshed: "2026-03-20 07:00 BRT",
};
