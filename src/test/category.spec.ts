import { expect, test } from "@playwright/test";
import { loginAsAdmin } from "./login-admin";

test.describe("Categoria", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/dashboard/productos");
  });

  test("Agregar nueva categoria", async ({ page }) => {
    await page.click('text="Agregar Categoria"');
    await expect(
      page.locator("text=Agregar una nueva categoria")
    ).toBeVisible();
    const nuevaCategoria = "Testing!";
    await page.fill('input[name="name"]', nuevaCategoria);
    await page.click('text="Agregar"');
    await expect(
      page.locator("text=Agregar una nueva categoria")
    ).not.toBeVisible();
    await page.click('text="Agregar Producto"');
    await expect(page.locator("text=Nombre del producto")).toBeVisible();
    await page.click('text="Selecciona una categoria"');
    await expect(
      page.locator(`span:has-text("${nuevaCategoria}")`)
    ).toBeVisible();
  });

  test("Cambiarle la categoria a un producto", async ({ page }) => {
    const categoriaActual = await page.locator('tr:has-text("Tomate") >> td:nth-child(6)').innerText();
    await page.click('tr:has-text("Tomate") >> text=Editar Producto');
    await expect(page.locator("text=Nombre del producto")).toBeVisible();
    await page.click(`span:has-text("${categoriaActual}")`);
    await page.click('span:has-text("Testing!")');
    await page.click('button:has-text("Guardar cambios")');

    await expect(page.locator("text=Nombre del producto")).not.toBeVisible();
    await expect(
      page.locator(`tr:has-text("Tomate") >> text=Testing!`)
    ).toBeVisible();
  });
});
