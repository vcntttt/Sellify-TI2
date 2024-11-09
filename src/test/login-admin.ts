import { Page, expect } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto('/');
  await page.fill('input[name="rut"]', '217997607');
  await page.fill('input[name="password"]', '123456');
  await page.click('button:has-text("Entrar")');
  await expect(page).toHaveURL('/dashboard');
}