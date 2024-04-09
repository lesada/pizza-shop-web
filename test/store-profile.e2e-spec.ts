import { expect, test } from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  await page.goto("/", {
    waitUntil: "networkidle",
  });

  await page.getByRole("button", { name: "Pizza Shop" }).click();
  await page.getByRole("menuitem", { name: "Store Profile" }).click();

  await page.getByLabel("Name").fill("Cafe Shop");
  await page.getByLabel("Description").fill("Cafe Shop Description");

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Profile updated successfully");

  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  await expect(page.getByRole("button", { name: "Close" })).not.toBeVisible();

  await expect(page.getByRole("button", { name: "Cafe Shop" })).toBeVisible();
});
