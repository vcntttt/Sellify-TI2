import { test } from '@playwright/test';
import { loginAsAdmin } from './login-admin';

test.describe('Agregar ', () => {
  test('Iniciar sesion como administrador', async ({ page }) => {
    await loginAsAdmin(page);
  });
});

