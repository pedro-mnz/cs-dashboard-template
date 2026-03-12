import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: { width: 1440, height: 900 },
});

// Use the already-open calendar tab if possible
const pages = await browser.pages();
console.log("Open pages:", pages.map(p => p.url()));

// Find the calendar page or open a new one
let page = pages.find(p => p.url().includes("internalfb.com/calendar"));
if (!page) {
  page = await browser.newPage();
  await page.goto("https://www.internalfb.com/calendar", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await new Promise(r => setTimeout(r, 6000));
} else {
  console.log("Reusing existing calendar tab");
  await new Promise(r => setTimeout(r, 2000));
}

const data = await page.evaluate(() => {
  // Dump the full page structure around the calendar table
  const table = document.querySelector('[role="table"]');
  
  // Try to find all event-like elements
  const allRoleButtons = Array.from(document.querySelectorAll('[role="button"]'))
    .map(b => ({
      text: b.textContent?.trim().slice(0, 100),
      ariaLabel: b.getAttribute("aria-label"),
      className: b.className?.slice(0, 60),
    }))
    .filter(b => b.text && b.text.length > 3)
    .slice(0, 80);

  // Get the table's outer HTML (first 5000 chars)
  const tableHtml = table ? table.outerHTML.slice(0, 5000) : "NO TABLE";
  
  // Get all elements with aria-label containing a day name or time
  const dayElements = Array.from(document.querySelectorAll('*[aria-label]'))
    .map(el => ({
      tag: el.tagName,
      role: el.getAttribute("role"),
      ariaLabel: el.getAttribute("aria-label"),
      text: el.textContent?.trim().slice(0, 60),
    }))
    .filter(el => 
      el.ariaLabel?.match(/Mon|Tue|Wed|Thu|Fri|Monday|Tuesday|Wednesday|Thursday|Friday|\d+:\d+\s*(AM|PM)/i)
    )
    .slice(0, 60);

  return { allRoleButtons, tableHtml: tableHtml.slice(0, 3000), dayElements };
});

// Save to file
fs.writeFileSync("/tmp/calendar-dump.json", JSON.stringify(data, null, 2));
console.log("Saved to /tmp/calendar-dump.json");

console.log("\n=== DAY-RELATED ARIA LABELS ===");
data.dayElements?.forEach(e => console.log(JSON.stringify(e)));

console.log("\n=== ALL ROLE=BUTTON ELEMENTS (first 40) ===");
data.allRoleButtons?.slice(0, 40).forEach(b => console.log(JSON.stringify(b)));

console.log("\n=== TABLE HTML (first 3000 chars) ===");
console.log(data.tableHtml);

process.exit(0);
