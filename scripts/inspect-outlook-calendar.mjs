import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
await page.goto("https://outlook.office365.com/calendar/view/week", {
  waitUntil: "domcontentloaded",
  timeout: 30000,
});
await new Promise(r => setTimeout(r, 6000));

const data = await page.evaluate(() => {
  // 1. Find all elements with aria-label containing day names or times
  const dayElements = Array.from(document.querySelectorAll('*[aria-label]'))
    .map(el => ({
      tag: el.tagName,
      role: el.getAttribute("role"),
      ariaLabel: el.getAttribute("aria-label"),
      text: el.textContent?.trim().slice(0, 80),
      dataAttrs: Array.from(el.attributes)
        .filter(a => a.name.startsWith("data-"))
        .reduce((acc, a) => { acc[a.name] = a.value; return acc; }, {}),
    }))
    .filter(el =>
      el.ariaLabel?.match(/Mon|Tue|Wed|Thu|Fri|Monday|Tuesday|Wednesday|Thursday|Friday|\d+:\d+\s*(AM|PM)/i)
    )
    .slice(0, 80);

  // 2. Find the calendar grid/table
  const gridEl = document.querySelector('[role="grid"]') || document.querySelector('[role="table"]');
  const gridHtml = gridEl ? gridEl.outerHTML.slice(0, 8000) : "NO GRID";

  // 3. Find all event-like buttons
  const eventButtons = Array.from(document.querySelectorAll('[role="button"][aria-label]'))
    .map(b => ({
      ariaLabel: b.getAttribute("aria-label"),
      text: b.textContent?.trim().slice(0, 100),
    }))
    .filter(b => b.ariaLabel?.match(/\d+:\d+\s*(AM|PM)/i))
    .slice(0, 50);

  // 4. Look for day column containers
  const dayColumns = Array.from(document.querySelectorAll('[class*="calendarDay"], [class*="day-column"], [data-date]'))
    .slice(0, 10)
    .map(el => ({
      tag: el.tagName,
      class: el.className?.slice(0, 80),
      dataDate: el.getAttribute("data-date"),
      ariaLabel: el.getAttribute("aria-label"),
      childCount: el.children.length,
    }));

  return { dayElements, gridHtml: gridHtml.slice(0, 6000), eventButtons, dayColumns };
});

fs.writeFileSync("/tmp/outlook-calendar-dump.json", JSON.stringify(data, null, 2));
console.log("Saved to /tmp/outlook-calendar-dump.json");

console.log("\n=== EVENT BUTTONS WITH ARIA-LABEL ===");
data.eventButtons?.forEach(b => console.log(JSON.stringify(b)));

console.log("\n=== DAY-RELATED ARIA LABELS ===");
data.dayElements?.slice(0, 30).forEach(e => console.log(JSON.stringify(e)));

console.log("\n=== DAY COLUMNS ===");
data.dayColumns?.forEach(c => console.log(JSON.stringify(c)));

console.log("\n=== GRID HTML (first 6000 chars) ===");
console.log(data.gridHtml?.slice(0, 3000));

await page.close();
process.exit(0);
