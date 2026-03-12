import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: null,
});

const pages = await browser.pages();
console.log("Open pages:");
pages.forEach((p, i) => console.log(` ${i}: ${p.url()}`));

// Find the Outlook calendar tab
let page = pages.find(p => p.url().includes("outlook.office365.com"));

if (!page) {
  console.log("No Outlook tab found, navigating existing tab...");
  page = pages.find(p => !p.url().includes("internalfb.com")) || pages[0];
  await page.goto("https://outlook.office365.com/calendar/view/week", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await new Promise(r => setTimeout(r, 8000));
} else {
  console.log("Found existing Outlook tab:", page.url());
  await new Promise(r => setTimeout(r, 2000));
}

const data = await page.evaluate(() => {
  // List ALL elements with aria-label
  const withAriaLabel = Array.from(document.querySelectorAll('[aria-label]'))
    .map(el => ({
      tag: el.tagName,
      role: el.getAttribute("role") || "",
      ariaLabel: el.getAttribute("aria-label") || "",
      text: el.textContent?.trim().slice(0, 60) || "",
    }))
    .filter(el => el.ariaLabel.match(/\d+:\d+\s*(AM|PM)/i) || el.ariaLabel.match(/March|Monday|Tuesday|Wednesday|Thursday|Friday/i))
    .slice(0, 80);

  // Get all buttons
  const buttons = Array.from(document.querySelectorAll('button, [role="button"]'))
    .map(b => ({
      tag: b.tagName,
      ariaLabel: b.getAttribute("aria-label") || "",
      text: b.textContent?.trim().slice(0, 80) || "",
    }))
    .filter(b => b.text.match(/AM|PM/) || b.ariaLabel.match(/AM|PM/))
    .slice(0, 50);

  // Page title and URL
  const title = document.title;
  const url = window.location.href;

  // Count elements
  const totalElements = document.querySelectorAll('*').length;

  return { withAriaLabel, buttons, title, url, totalElements };
});

console.log(`\nPage: ${data.title} | ${data.url}`);
console.log(`Total DOM elements: ${data.totalElements}`);

console.log("\n=== ARIA-LABEL ELEMENTS (day/time related) ===");
data.withAriaLabel?.forEach(e => console.log(JSON.stringify(e)));

console.log("\n=== BUTTONS WITH AM/PM ===");
data.buttons?.forEach(b => console.log(JSON.stringify(b)));

fs.writeFileSync("/tmp/outlook-existing-tab.json", JSON.stringify(data, null, 2));
console.log("\nSaved to /tmp/outlook-existing-tab.json");

process.exit(0);
