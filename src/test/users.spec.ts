import { expect, test } from "@playwright/test";
import { loginAsAdmin } from "./login-admin";

test.describe("Usuarios: Agregar cliente y buscarlo en panel de caja", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  const newClient = {
    nombre: "Patricio",
    apellido: "Test",
    rut: "212074072",
    email: "test@client.cl",
    password: "123456",
    phone: "123456781",
  };

  test("Agregar Cliente", async ({ page }) => {
    await page.goto("/cashier");
    await page.click('text="Registrar Cliente"');
    await expect(page.locator("label:has-text(\"Nombre\")")).toBeVisible();
    await page.fill('input[name="name"]', newClient.nombre);
    await page.fill('input[name="apellido"]', newClient.apellido);
    await page.fill('input[name="email"]', newClient.email);
    await page.fill('input[name="password"]', newClient.password);
    await page.fill('input[name="rut"]', newClient.rut);
    await page.fill('input[name="phone"]', newClient.phone);
    await page.click('text="Registrar"');
    await expect(
      page.locator("text=Registrar Nuevo Cliente")
    ).not.toBeVisible();
  });

  test("Buscar Cliente", async ({ page }) => {
    await page.goto("/cashier");

    await page.click('text="Buscar Cliente"');
    await page.waitForTimeout(1000);
    await page.waitForSelector(
      'input[placeholder="Buscar cliente por nombre o RUT"]'
    );

    await page.fill(
      'input[placeholder="Buscar cliente por nombre o RUT"]',
      newClient.rut
    );

    await page.waitForSelector("table");

    await expect(
      page.locator(`tr:has-text("${newClient.nombre}")`)
    ).toBeVisible();
  });
});
