import puppeteer from "puppeteer";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: null,
});

const pages = await browser.pages();
console.log("Open tabs:");
pages.forEach((p, i) => console.log(` ${i}: ${p.url().slice(0, 100)}`));

// Find or create Outlook tab
let page = pages.find(p => p.url().includes("outlook.office365.com"));
if (!page) {
  console.log("\nNo Outlook tab found, opening new one...");
  page = await browser.newPage();
  await page.goto("https://outlook.office365.com/calendar/view/week", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
} else {
  console.log("\nReusing Outlook tab:", page.url().slice(0, 80));
}

await new Promise(r => setTimeout(r, 5000));

const info = await page.evaluate(() => {
  const title = document.title;
  const url = window.location.href;
  const totalEls = document.querySelectorAll('*').length;
  
  // Count all role=button elements with aria-label
  const allBtnsWithAria = Array.from(document.querySelectorAll('[role="button"][aria-label]'));
  
  // Filter for event buttons
  const eventBtns = allBtnsWithAria.filter(b =>
    (b.getAttribute("aria-label") || "").match(/\d+:\d+\s*(AM|PM)/i) &&
    (b.getAttribute("aria-label") || "").match(/(Monday|Tuesday|Wednesday|Thursday|Friday)/i)
  );

  return {
    title,
    url: url.slice(0, 100),
    totalEls,
    totalBtnsWithAria: allBtnsWithAria.length,
    eventBtnCount: eventBtns.length,
    sampleAriaLabels: eventBtns.slice(0, 5).map(b => b.getAttribute("aria-label")),
    allAriaLabels: allBtnsWithAria.slice(0, 20).map(b => b.getAttribute("aria-label")),
  };
});

console.log("\nPage:", info.title);
console.log("URL:", info.url);
console.log("Total DOM elements:", info.totalEls);
console.log("Buttons with aria-label:", info.totalBtnsWithAria);
console.log("Event buttons found:", info.eventBtnCount);
console.log("\nSample event aria-labels:");
info.sampleAriaLabels.forEach(l => console.log(" -", l));
console.log("\nAll aria-labels (first 20):");
info.allAriaLabels.forEach(l => console.log(" -", l));

process.exit(0);
