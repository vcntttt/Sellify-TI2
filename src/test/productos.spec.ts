import { expect, test } from "@playwright/test";
import { loginAsAdmin } from "./login-admin";

test.describe("Productos", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/dashboard/productos");
  });

  test("Agregar un producto", async ({page}) => {
    await page.click('text="Agregar Producto"');
  });
});
