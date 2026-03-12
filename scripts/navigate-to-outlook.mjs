// Navigate the existing Microsoft login tab to Outlook calendar and wait for it to load
import puppeteer from "puppeteer";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: { width: 1440, height: 900 },
});

const pages = await browser.pages();
console.log("Open tabs:");
pages.forEach((p, i) => console.log(` ${i}: ${p.url().slice(0, 100)}`));

// Find the Microsoft login tab
const loginPage = pages.find(p => p.url().includes("microsoftonline.com") || p.url().includes("outlook.office365.com"));
if (!loginPage) {
  console.log("No Microsoft tab found!");
  process.exit(1);
}

console.log("\nNavigating to Outlook calendar...");
await loginPage.goto("https://outlook.office365.com/calendar/view/week", {
  waitUntil: "domcontentloaded",
  timeout: 30000,
});

console.log("Waiting 10s for calendar to render...");
await new Promise(r => setTimeout(r, 10000));

const info = await loginPage.evaluate(() => ({
  title: document.title,
  url: window.location.href.slice(0, 100),
  totalEls: document.querySelectorAll('*').length,
  hintBtns: Array.from(document.querySelectorAll('[role="button"][hint]'))
    .map(b => b.getAttribute("hint"))
    .filter(h => h?.match(/\d+:\d+\s*(AM|PM)/i) && h?.match(/(Monday|Tuesday|Wednesday|Thursday|Friday)/i))
    .slice(0, 10),
}));

console.log("\nPage:", info.title);
console.log("URL:", info.url);
console.log("Total elements:", info.totalEls);
console.log("Event hint buttons:", info.hintBtns.length);
info.hintBtns.forEach(h => console.log(" -", h));

process.exit(0);
