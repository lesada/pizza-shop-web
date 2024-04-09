import { expect, test } from "@playwright/test";

test("list orders", async ({ page }) => {
  await page.goto("/orders", {
    waitUntil: "networkidle",
  });

  expect(await page.title()).toBe("Orders | Pizza Shop");
  expect(
    page.getByRole("cell", { name: "order-1", exact: true })
  ).toBeVisible();
  expect(
    page.getByRole("cell", { name: "order-10", exact: true })
  ).toBeVisible();
});

test("paginate orders", async ({ page }) => {
  await page.goto("/orders", {
    waitUntil: "networkidle",
  });

  const nextButton = page.getByRole("button", { name: "Next Page" });
  await nextButton.click();

  expect(
    page.getByRole("cell", { name: "order-11", exact: true })
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "order-20", exact: true })
  ).toBeVisible();

  const prevButton = page.getByRole("button", { name: "Previous Page" });
  await prevButton.click();

  expect(
    page.getByRole("cell", { name: "order-1", exact: true })
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "order-10", exact: true })
  ).toBeVisible();

  const lastPageButton = page.getByRole("button", { name: "Last Page" });
  await lastPageButton.click();

  expect(
    page.getByRole("cell", { name: "order-51", exact: true })
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "order-60", exact: true })
  ).toBeVisible();

  const firstPageButton = page.getByRole("button", { name: "First Page" });
  await firstPageButton.click();

  expect(
    page.getByRole("cell", { name: "order-1", exact: true })
  ).toBeVisible();
});

test("filter by order id", async ({ page }) => {
  await page.goto("/orders", {
    waitUntil: "networkidle",
  });

  await page.getByPlaceholder("Search by order identifier").fill("order-11");
  await page.getByRole("button", { name: "Filter Results" }).click();

  expect(
    page.getByRole("cell", { name: "order-11", exact: true })
  ).toBeVisible();
});

test("filter by customer name", async ({ page }) => {
  await page.goto("/orders", {
    waitUntil: "networkidle",
  });

  await page.getByPlaceholder("Search by client name").fill("Customer 1");
  await page.getByRole("button", { name: "Filter Results" }).click();

  expect(
    page.getByRole("cell", { name: "order-1", exact: true })
  ).toBeVisible();
});

test("filter by status", async ({ page }) => {
  await page.goto("/orders", {
    waitUntil: "networkidle",
  });

  await page.getByLabel("status", { exact: true }).click();

  await page.getByRole("option", { name: "Delivering" }).click();

  await page.getByRole("button", { name: "Filter Results" }).click();

  await page.waitForLoadState("networkidle");

  const tableRows = await page.getByRole("cell", { name: "Delivering" }).all();

  expect(tableRows.length).toBe(10);

  await page.waitForTimeout(500);
});
