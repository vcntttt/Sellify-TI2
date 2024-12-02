import { Page, expect } from "@playwright/test";

export async function loginAsCashier(page: Page) {
  await page.goto('/');
  await page.fill('input[name="rut"]', '129041935');
  await page.fill('input[name="password"]', '987654');
  await page.click('button:has-text("Entrar")');
  await expect(page).toHaveURL('/cashier');
}
