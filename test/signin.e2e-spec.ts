import { expect, test } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/auth/signin", {
    waitUntil: "networkidle",
  });

  await page.getByLabel("Email address").fill("john.doe@example.com");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(
    page.getByText(
      "Successfully signed in, check your email for the magic link"
    )
  ).toBeVisible();
});

test("sign in with wrong credentials", async ({ page }) => {
  await page.goto("/auth/signin", {
    waitUntil: "networkidle",
  });

  await page.getByLabel("Email address").fill("john.who@example.com");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Invalid email address")).toBeVisible();
});

test("navigate to sign up page", async ({ page }) => {
  await page.goto("/auth/signin", {
    waitUntil: "networkidle",
  });

  await page.getByRole("link", { name: "New here? Sign Up" }).click();

  expect(page.url()).toContain("/auth/signup");
});
