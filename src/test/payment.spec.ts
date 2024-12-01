import { test, expect } from '@playwright/test';
import { loginAsCashier } from './login-cashier';

test.describe('Payment Component', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsCashier(page);
    await page.goto('/cashier'); 
  });

  test('Debe abrirse y mostrar el contenido inicial', async ({ page }) => {
    await page.click('button[data-testid="open-payment-dialog"]');

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    const title = dialog.locator('h2');
    await expect(title).toHaveText('Rut del Cliente');
  });

  test('Debe permitir ingresar y confirmar un RUT', async ({ page }) => {
    await page.click('button[data-testid="open-payment-dialog"]');

    const input = page.locator('#customer-rut');
    await input.fill('222222221');

    const confirmButton = page.locator('button:has-text("Confirmar RUT")');
    await confirmButton.click();

    const description = page.locator('[role="dialog"] p');
    await expect(description).toHaveText(/Elija un método de pago para continuar/i);
  });

  test('Debe permitir seleccionar un método de pago', async ({ page }) => {
    await page.click('button[data-testid="open-payment-dialog"]');
    await page.locator('#customer-rut').fill('222222221');
    await page.locator('button:has-text("Confirmar RUT")').click();

    const paymentButton = page.locator('button:has-text("Pagar en Efectivo")');
    await paymentButton.click();

    const paymentText = page.locator('[role="dialog"] p');
    await expect(paymentText).toContainText('¿Está seguro que desea realizar el pago con el método: efectivo?');
  });

  test('Debe mostrar mensaje de pago confirmado', async ({ page }) => {
    await page.click('button[data-testid="open-payment-dialog"]');

    await page.locator('#customer-rut').fill('222222221');
    await page.locator('button:has-text("Confirmar RUT")').click();
    await page.locator('button:has-text("Pagar en Efectivo")').click();
    await page.locator('button:has-text("Confirmar Pago")').click();

    const confirmationText = page.locator('[role="dialog"] p');
    await expect(confirmationText).toHaveText('Su pago con el método: efectivo ha sido confirmado.');
  });
});
