import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: null,
});

const pages = await browser.pages();
console.log("Open pages:");
pages.forEach((p, i) => console.log(` ${i}: ${p.url().slice(0, 100)}`));

// Use the first non-extension, non-chrome tab
let page = pages.find(p => {
  const url = p.url();
  return !url.startsWith("chrome") && !url.startsWith("about") && !url.startsWith("chrome-extension");
}) || pages[0];

console.log("\nUsing tab:", page.url().slice(0, 100));

// Navigate to Outlook calendar week view
await page.goto("https://outlook.office365.com/calendar/view/week", {
  waitUntil: "domcontentloaded",
  timeout: 30000,
});

console.log("Waiting for calendar to render...");
await new Promise(r => setTimeout(r, 10000));

console.log("Current URL:", page.url().slice(0, 100));
console.log("Title:", await page.title());

const data = await page.evaluate(() => {
  const title = document.title;
  const url = window.location.href;
  const totalEls = document.querySelectorAll('*').length;

  // All aria-label elements
  const ariaEls = Array.from(document.querySelectorAll('[aria-label]'))
    .map(el => ({
      tag: el.tagName,
      role: el.getAttribute("role") || "",
      ariaLabel: el.getAttribute("aria-label") || "",
      text: el.textContent?.trim().slice(0, 60) || "",
    }))
    .filter(el => el.ariaLabel.match(/\d+:\d+\s*(AM|PM)/i) || el.ariaLabel.match(/March|Monday|Tuesday|Wednesday|Thursday|Friday|Tue|Wed|Thu/i))
    .slice(0, 80);

  // All buttons with time text
  const timeBtns = Array.from(document.querySelectorAll('[role="button"]'))
    .map(b => ({
      ariaLabel: b.getAttribute("aria-label") || "",
      text: b.textContent?.trim().slice(0, 100) || "",
      dataAttrs: Array.from(b.attributes)
        .filter(a => a.name.startsWith("data-"))
        .reduce((acc, a) => { acc[a.name] = a.value; return acc; }, {}),
    }))
    .filter(b => b.text.match(/AM|PM/) || b.ariaLabel.match(/AM|PM/))
    .slice(0, 50);

  return { title, url, totalEls, ariaEls, timeBtns };
});

console.log(`\nPage: ${data.title}`);
console.log(`URL: ${data.url?.slice(0, 100)}`);
console.log(`Total DOM elements: ${data.totalEls}`);

console.log("\n=== ARIA-LABEL ELEMENTS (time/day related) ===");
data.ariaEls?.forEach(e => console.log(JSON.stringify(e)));

console.log("\n=== BUTTONS WITH TIME ===");
data.timeBtns?.forEach(b => console.log(JSON.stringify(b)));

fs.writeFileSync("/tmp/outlook-live.json", JSON.stringify(data, null, 2));
console.log("\nSaved to /tmp/outlook-live.json");

process.exit(0);
