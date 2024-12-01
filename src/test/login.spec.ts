import { test } from '@playwright/test';
import { loginAsAdmin } from './login-admin'; // Asegúrate de que el archivo de `login-admin` esté en la misma carpeta o ajusta la ruta.
import { loginAsCashier } from './login-cashier'; // Importa `loginAsCashier` si lo necesitas para pruebas futuras.

test.describe('Agregar ', () => {
  test('Iniciar sesión como administrador', async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('Iniciar sesión como cajero', async ({ page }) => {
    await loginAsCashier(page);
  });
});
