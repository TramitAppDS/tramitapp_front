/* eslint-disable no-undef */
describe("Navegacion usuario", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8000/tramiter-sign-up");
  });

  it("should have titled Sign in", async () => {
    await page.waitForTimeout(3000);
    await expect(page).toMatch("Ingresar");
    await expect(page).toMatch("Registrarse");
    await expect(page).toMatch("Comenzar a Tramitar");
    await expect(page).toMatch("Crear cuenta Tramiter");
    await expect(page).toMatch("Regístrate como Tramiter");
    await expect(page).toMatch("nombre");
    await expect(page).toMatch("Apellido");
    await expect(page).toMatch("Email");
    await expect(page).toMatch("Teléfono");
    await expect(page).toMatch("Ciudad");
    await expect(page).toMatch("Comuna");
    await expect(page).toMatch("Contraseña");
    await expect(page).toMatch("Registrarme");
    await expect(page).toMatch("¿Ya tienes cuenta? Inicia sesión");
  });

  it("should click button Continuar", async () => {
    await page.type("#firstName", "Marcelo");
    await page.type("#lastName", "Diaz");
    await page.type("#email", "marcelo@uc.cl");
    await page.type("#phone", "991591592");
    await page.type("#city", "Santiago");
    await page.type("#commune", "Las Condes");
    await page.type("#password", "Hola123");
    await expect(page).toClick("button", { text: "Registrarme" });
  });

  it("should show sign-up view", async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toMatch("http://localhost:8000/tramiter-sign-up");
    await expect(page).toMatch("Created");
    await page.waitForTimeout(1000);
  });
});
