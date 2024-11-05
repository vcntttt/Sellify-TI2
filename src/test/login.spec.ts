import { test, expect } from '@playwright/test';

test.describe('Login functionality', () => {
  test('should login and redirect based on user role (admin)', async ({ page }) => {
    // Ir a la página de inicio de sesión
    await page.goto('/');

    // Introduce el RUT y la contraseña
    await page.fill('input[placeholder="211234567"]', '211231237');
    await page.fill('input[type="password"]', '14062806');

    // Haz clic en el botón de 'Entrar'
    await page.click('button:has-text("Entrar")');

    // Esto supone que el usuario con RUT y contraseña dados es 'admin'
    await expect(page).toHaveURL('/dashboard');
  });
});
