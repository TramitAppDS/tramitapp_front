/* eslint-disable no-undef */
describe("Navegacion usuario", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8000/sign-up");
  });

  it("should have titled Sign in", async () => {
    await page.waitForTimeout(3000);
    await expect(page).toMatch("Ingresar");
    await expect(page).toMatch("Registrarse");
    await expect(page).toMatch("Comenzar a Tramitar");
    await expect(page).toMatch("Crear cuenta Tramiter");
    await expect(page).toMatch("Crea tu cuenta");
    await expect(page).toMatch("Nombre");
    await expect(page).toMatch("Apellido");
    await expect(page).toMatch("Teléfono");
    await expect(page).toMatch("Email");
    await expect(page).toMatch("Contraseña");
    await expect(page).toMatch("Continuar");
    await expect(page).toMatch("¿Ya tienes cuenta? Inicia sesión");
  });

  it("should click button Continuar", async () => {
    await page.type("#firstName", "Andrea");
    await page.type("#lastName", "Lopez");
    await page.type("#phone", "902302312");
    await page.type("#email", "andrea@uc.cl");
    await page.type("#password", "Hola123");
    await expect(page).toClick("button", { text: "Continuar" });
  });

  it("should appear various text fields", async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toMatch("http://localhost:8000/home");
    await expect(page).toMatch("Inicio");
    await expect(page).toMatch("Perfil");
    await expect(page).toMatch("Solicitar Tramite");
    await expect(page).toMatch("Tramite");
    await expect(page).toMatch("Usuario");
    await expect(page).toMatch("Status");
    await expect(page).toClick("button", { text: "Cerrar sesion" });
    await page.waitForTimeout(1000);
  });

  it("should show sign-in view", async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toMatch("http://localhost:8000/sign-in");
    await page.waitForTimeout(1000);
  });
});
