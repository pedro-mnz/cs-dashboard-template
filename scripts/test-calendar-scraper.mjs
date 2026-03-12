import puppeteer from "puppeteer";

const REMOTE_DEBUGGING_URL = "http://localhost:9222";

async function main() {
  console.log("Connecting to browser via CDP...");
  const browser = await puppeteer.connect({
    browserURL: REMOTE_DEBUGGING_URL,
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  // Do NOT block any resources — calendar needs CSS/JS to render
  
  console.log("Navigating to Meta calendar...");
  await page.goto("https://www.internalfb.com/calendar", {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });

  // Give the React app time to fully render
  await new Promise((r) => setTimeout(r, 8000));

  const result = await page.evaluate(() => {
    // Try multiple selectors to find the calendar
    const table = document.querySelector('[role="table"]');
    const grid = document.querySelector('[role="grid"]');
    const main = document.querySelector('main');
    
    const container = table || grid || main;
    
    // 1. Get column headers
    const colHeaders = Array.from(document.querySelectorAll('[role="columnheader"]'))
      .map(h => ({ text: h.textContent?.trim() ?? "", ariaLabel: h.getAttribute("aria-label") ?? "" }));

    // 2. Get ALL buttons with aria-labels that mention a day or time
    const allButtons = Array.from(document.querySelectorAll('[role="button"]'));
    const eventButtons = allButtons
      .map(b => ({
        text: b.textContent?.trim().slice(0, 100) ?? "",
        ariaLabel: b.getAttribute("aria-label") ?? "",
      }))
      .filter(b => 
        b.ariaLabel.match(/\d+:\d+\s*(AM|PM)/i) || 
        b.ariaLabel.match(/Monday|Tuesday|Wednesday|Thursday|Friday/i) ||
        b.text.match(/\d+:\d+\s*(AM|PM)/i)
      )
      .slice(0, 60);

    // 3. Gridcells
    const cells = Array.from(document.querySelectorAll('[role="gridcell"]'));
    const cellSummary = cells.slice(0, 8).map((cell, i) => {
      const btns = Array.from(cell.querySelectorAll('[role="button"]'));
      return {
        i,
        btnCount: btns.length,
        sample: btns.slice(0, 2).map(b => ({
          text: b.textContent?.trim().slice(0, 60),
          aria: b.getAttribute("aria-label"),
        })),
      };
    });

    // 4. Page title and URL
    const pageTitle = document.title;
    const hasTable = !!table;
    const hasGrid = !!grid;
    
    // 5. Any elements with data-testid containing "day" or "event"
    const testIds = Array.from(document.querySelectorAll('[data-testid]'))
      .map(el => el.getAttribute("data-testid") ?? "")
      .filter(id => id.match(/day|event|calendar|week/i))
      .slice(0, 20);

    return { colHeaders, eventButtons, cellSummary, pageTitle, hasTable, hasGrid, testIds };
  });

  console.log("\n=== PAGE INFO ===");
  console.log("Title:", result.pageTitle);
  console.log("Has [role=table]:", result.hasTable);
  console.log("Has [role=grid]:", result.hasGrid);

  console.log("\n=== COLUMN HEADERS ===");
  result.colHeaders.forEach(h => console.log(" -", JSON.stringify(h)));

  console.log("\n=== EVENT BUTTONS (up to 60) ===");
  result.eventButtons.forEach(b => console.log(" -", JSON.stringify(b)));

  console.log("\n=== GRIDCELL SUMMARY ===");
  result.cellSummary.forEach(c => console.log(JSON.stringify(c)));

  console.log("\n=== DATA-TESTID values ===");
  result.testIds.forEach(id => console.log(" -", id));

  await page.close();
  process.exit(0);
}

main().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
