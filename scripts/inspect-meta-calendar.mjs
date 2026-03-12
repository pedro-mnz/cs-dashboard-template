import puppeteer from "puppeteer";

const browser = await puppeteer.connect({
  browserURL: "http://localhost:9222",
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
await page.goto("https://www.internalfb.com/calendar", {
  waitUntil: "domcontentloaded",
  timeout: 30000,
});
await new Promise(r => setTimeout(r, 5000));

const data = await page.evaluate(() => {
  // Find the main calendar table
  const table = document.querySelector('[role="table"]');
  if (!table) return { error: "no table" };

  // Get column header row (day headers)
  const colHeaders = Array.from(table.querySelectorAll('[role="columnheader"]'))
    .map(h => ({
      text: h.textContent?.trim(),
      ariaLabel: h.getAttribute("aria-label"),
      dataKey: h.getAttribute("data-key") || h.getAttribute("data-date") || h.getAttribute("data-column"),
      innerHTML: h.innerHTML.slice(0, 200),
    }));

  // Get all event buttons with their parent column info
  const eventButtons = Array.from(table.querySelectorAll('[role="button"]'))
    .filter(b => {
      const text = b.textContent?.trim() || "";
      return text.match(/AM|PM/) && text.length > 5;
    })
    .map(b => {
      // Walk up to find the column container
      let el = b;
      let colIndex = -1;
      let colAriaLabel = "";
      let colDataAttrs = {};
      for (let i = 0; i < 10; i++) {
        el = el.parentElement;
        if (!el) break;
        const role = el.getAttribute("role");
        const style = el.getAttribute("style") || "";
        const allAttrs = Array.from(el.attributes).reduce((acc, attr) => {
          acc[attr.name] = attr.value;
          return acc;
        }, {});
        if (role === "gridcell" || role === "columnheader") {
          colAriaLabel = el.getAttribute("aria-label") || "";
          colDataAttrs = allAttrs;
          break;
        }
      }
      return {
        text: b.textContent?.trim().slice(0, 80),
        ariaLabel: b.getAttribute("aria-label"),
        colAriaLabel,
        colDataAttrs: JSON.stringify(colDataAttrs).slice(0, 200),
      };
    })
    .slice(0, 30);

  // Also inspect the gridcell structure directly
  const gridcells = Array.from(table.querySelectorAll('[role="gridcell"]'))
    .map((cell, i) => {
      const allAttrs = Array.from(cell.attributes).reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {});
      const eventBtns = Array.from(cell.querySelectorAll('[role="button"]'))
        .filter(b => (b.textContent?.trim() || "").match(/AM|PM/))
        .map(b => b.textContent?.trim().slice(0, 60));
      return { i, attrs: allAttrs, events: eventBtns };
    });

  return { colHeaders, eventButtons, gridcells };
});

console.log("=== COLUMN HEADERS ===");
data.colHeaders?.forEach(h => console.log(JSON.stringify(h)));

console.log("\n=== EVENT BUTTONS (with parent column info) ===");
data.eventButtons?.forEach(e => console.log(JSON.stringify(e)));

console.log("\n=== GRIDCELLS ===");
data.gridcells?.forEach(c => {
  if (c.events.length > 0 || Object.keys(c.attrs).length > 0) {
    console.log(JSON.stringify({ i: c.i, attrs: c.attrs, events: c.events }));
  }
});

await page.close();
process.exit(0);
