import { expect, test } from "@playwright/test";

test("display day orders amount metric", async ({ page }) => {
  await page.goto("/", {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("30", { exact: true })).toBeVisible();
  await expect(page.getByText("-5% from yesterday")).toBeVisible();
});

test("display month orders amount metric", async ({ page }) => {
  await page.goto("/", {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("20", { exact: true })).toBeVisible();
  await expect(page.getByText("+ 5% from last month")).toBeVisible();
});

test("display canceled month orders amount metric", async ({ page }) => {
  await page.goto("/", {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("7", { exact: true })).toBeVisible();
  await expect(page.getByText("-4% from last month")).toBeVisible();
});

test("display revenues metric", async ({ page }) => {
  await page.goto("/", {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("$20.00")).toBeVisible();
  await expect(page.getByText("+ 7% from last month")).toBeVisible();
});
