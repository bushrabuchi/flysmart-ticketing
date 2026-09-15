import { test, expect } from "@playwright/test";

test("books a demo RUH to DXB ticket", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("search-from").selectOption("RUH");
  await page.getByTestId("search-to").selectOption("DXB");
  await page.getByTestId("search-depart").click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Next month" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "12", exact: true })
    .click();
  await page.getByTestId("search-submit").click();

  await expect(page.getByTestId("flight-card").first()).toBeVisible();
  await page.getByTestId("select-flight").first().click();

  await page.getByTestId("traveller-first-name").fill("Sara");
  await page.getByTestId("traveller-last-name").fill("Ahmed");
  await page.getByTestId("traveller-passport").fill("A1234567");
  await page.getByTestId("traveller-email").fill("sara@example.com");
  await page.getByTestId("traveller-phone").fill("966500000000");
  await page.getByTestId("continue-payment").click();

  await page.getByTestId("agree-terms").check();
  await page.getByTestId("pay-now").click();

  await expect(page.getByTestId("booking-id")).toHaveText(/AMS-\d{5}/);
});
