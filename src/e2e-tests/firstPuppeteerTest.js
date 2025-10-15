const puppeteer = require("puppeteer");

(async () => {
  // 1. Avvia il browser
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });

  // 2. Apri una nuova pagina
  const page = await browser.newPage();

  // 3. Naviga alla tua app locale (assicurati che il server sia in esecuzione)
  await page.goto("http://localhost:3000"); // se usi vite, di solito è 3000

  // 4. Fai uno screenshot della homepage
  await page.screenshot({ path: "homepage.png" });

  // 5. Chiudi il browser
  await browser.close();
})();
