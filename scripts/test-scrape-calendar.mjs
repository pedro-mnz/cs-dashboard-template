// Quick end-to-end test of the new Outlook-based scrapeCalendar
import { scrapeCalendar } from "../server/scraperRouter.ts";

console.log("Running scrapeCalendar()...");
const result = await scrapeCalendar();

if (!result.success) {
  console.error("FAILED:", result.error);
  process.exit(1);
}

console.log(`\nSuccess! Found ${result.eventsFound} events:\n`);
result.meetings.forEach(m => {
  console.log(`  [${m.dayLabel}] ${m.startTime}${m.endTime ? ' – ' + m.endTime : ''} | ${m.title}`);
});

console.log("\nweeklyMeetingsData.ts has been updated.");
process.exit(0);
