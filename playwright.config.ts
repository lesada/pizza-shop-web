import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://localhost:5432",
  },

  webServer: {
    command: "yarn dev:test",
    url: "http://localhost:5432",
    reuseExistingServer: !process.env.CI,
  },
});
