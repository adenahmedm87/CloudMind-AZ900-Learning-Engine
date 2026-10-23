const { test, expect } = require("@playwright/test");

test("mock entry starts a timed 35-question session and advances", async ({ page }) => {
  await page.goto("http://127.0.0.1:4173/index.html");
  await page.locator("#startBtn").click();
  await page.locator('[data-mode="mock"]').first().click();

  await expect(page.locator("#qNumber")).toHaveText("Question 1 of 35");
  await expect(page.locator("#cmClock")).toContainText(/Timed · 4[45]:\d{2}/);

  await page.locator(".answer").first().click();
  await expect(page.locator("#nextBtn")).toBeEnabled();
  await page.locator("#nextBtn").click();
  await expect(page.locator("#qNumber")).toHaveText("Question 2 of 35");
});

test("Practice again restarts a completed mock with a fresh timer and lab state", async ({ page }) => {
  await page.addInitScript(() => {
    const saved = {
      answers: { "1": { choice: 0, correct: true } },
      confidence: {},
      review: [],
      learning: {},
      index: 35,
      transferDone: {},
      view: "done",
      history: [],
      histories: { mock: [] },
      lastCompletedSignature: "",
      sessionOrder: Array.from({ length: 35 }, (_, i) => i + 1),
      mode: "mock",
      paused: false,
      sessionStarted: false,
      mockLabDone: true,
      timedMode: false,
      timeLeft: 0
    };
    localStorage.setItem("cloudmindAZ900v1", JSON.stringify(saved));
  });

  await page.goto("http://127.0.0.1:4173/index.html");
  // Reveal the already-rendered results without invoking the Practice Room
  // navigation action, which intentionally starts a new session after completion.
  await page.evaluate(() => {
    document.body.classList.remove("cm-cover", "cm-dashboard", "cm-labview");
    document.body.classList.add("cm-practice");
    document.querySelector(".layout")?.classList.remove("hidden");
  });
  await expect(page.locator("#againBtn")).toBeVisible();

  await page.locator("#againBtn").click();
  await expect(page.locator("#qNumber")).toHaveText("Question 1 of 35");
  await expect(page.locator("#cmClock")).toContainText(/Timed · 4[45]:\d{2}/);
  await expect(page.locator("#nextBtn")).toBeDisabled();
});


test("a refreshed mock at the practical-task stage restores the lab and reaches results", async ({ page }) => {
  await page.addInitScript(() => {
    const saved = {
      answers: { "1": { choice: 0, correct: true } },
      confidence: {},
      review: [],
      learning: {},
      index: 35,
      transferDone: {},
      view: "done",
      history: [],
      histories: { mock: [] },
      lastCompletedSignature: "",
      sessionOrder: Array.from({ length: 35 }, (_, i) => i + 1),
      mode: "mock",
      paused: false,
      sessionStarted: true,
      mockLabDone: false,
      timedMode: false,
      timeLeft: 0
    };
    localStorage.setItem("cloudmindAZ900v1", JSON.stringify(saved));
  });

  await page.goto("http://127.0.0.1:4173/index.html");
  await expect(page.locator("#cmLabTitle")).toHaveText("Mock exam · practical scenario");
  await expect(page.locator("#cmLabSubmit")).toBeVisible();

  await page.locator('[data-file="notes"]').click({ button: "right" });
  await page.locator('[data-action="delete"]').click();
  await page.locator('[data-confirm="yes"]').click();
  await page.locator("#cmLabSubmit").click();
  await expect(page.locator("#cmLabContinue")).toBeVisible();
  await page.locator("#cmLabContinue").click();

  await expect(page.locator("#sessionTitle")).toHaveText("Your learning snapshot");
  await expect(page.locator("#qTopic")).toHaveText("MOCK EXAM · RESULTS");
});
