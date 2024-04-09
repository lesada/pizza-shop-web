import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/auth/signup", {
    waitUntil: "networkidle",
  });

  await page.getByLabel("Company name").fill("Pizza Shop");
  await page.getByLabel("Email address").fill("john.doe@example.com");
  await page.getByLabel("Manager name").fill("John Doe");
  await page.getByLabel("Phone number").fill("1234567890");

  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(
    page.getByText(
      "Company account created successfully. Check your email to access the partner panel."
    )
  ).toBeVisible();
});

test("sign up with wrong credentials", async ({ page }) => {
  await page.goto("/auth/signup", {
    waitUntil: "networkidle",
  });

  await page.getByLabel("Company name").fill("Not a Restaurant");
  await page.getByLabel("Email address").fill("john.who@example.com");
  await page.getByLabel("Manager name").fill("John Doe");
  await page.getByLabel("Phone number").fill("1234567890");

  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(
    page.getByText("An error occurred, please try again.")
  ).toBeVisible();
});

test("navigate to sign up page", async ({ page }) => {
  await page.goto("/auth/signup", {
    waitUntil: "networkidle",
  });

  await page
    .getByRole("link", { name: "Already have an account? Sign in" })
    .click();

  expect(page.url()).toContain("/auth/signin");
});
