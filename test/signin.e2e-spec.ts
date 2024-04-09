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
