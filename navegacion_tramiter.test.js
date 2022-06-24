/* eslint-disable no-undef */
describe("Navegacion usuario", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8000/tramiter-sign-in");
  });

  it("should have titled Sign in", async () => {
    await page.waitForTimeout(3000);
    await expect(page).toMatch("Ingresar");
    await expect(page).toMatch("Registrarse");
    await expect(page).toMatch("Comenzar a Tramitar");
    await expect(page).toMatch("Crear cuenta Tramiter");
    await expect(page).toMatch("Hora de tramitar");
    await expect(page).toMatch("Email");
    await expect(page).toMatch("Contraseña");
    await expect(page).toMatch("Continuar");
    await expect(page).toMatch("¿No tienes una cuenta? Regístrate");
  });

  it("should click button Continuar", async () => {
    await page.type("#email", "rbloomfield@uc.cl");
    await page.type("#password", "Hola123");
    await expect(page).toClick("button", { text: "Continuar" });
  });

  it("should appear various text fields", async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toMatch("http://localhost:8000/home");
    await expect(page).toMatch("Inicio");
    await expect(page).toMatch("Perfil");
    await expect(page).toMatch("Mis Trámites");
    await expect(page).toMatch("Tramite");
    await expect(page).toMatch("Usuario");
    await expect(page).toMatch("Status");
    await page.goto("http://localhost:8000/tramiter-procedures");
  });

  it("should show create procedure view", async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toMatch("http://localhost:8000/tramiter-procedures");
    await expect(page).toMatch("Inicio");
    await expect(page).toMatch("Perfil");
    await expect(page).toMatch("Mis Trámites");
    await expect(page).toMatch("Tramite");
    await expect(page).toMatch("Usuario");
    await expect(page).toMatch("Status");
    await page.goto("http://localhost:8000/profile");
  });

  it("should show profile view", async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toMatch("http://localhost:8000/profile");
    await expect(page).toMatch("Inicio");
    await expect(page).toMatch("Perfil");
    await expect(page).toMatch("Mis Trámites");
    await expect(page).toMatch("Rodrigo Bloomfield");
    await expect(page).toMatch("Telefono");
    await expect(page).toMatch("+56991571692");
    await expect(page).toMatch("Email");
    await expect(page).toMatch("rbloomfield@uc.cl");
    await expect(page).toMatch("Ciudad");
    await expect(page).toMatch("Santiago");
    await expect(page).toMatch("Comuna");
    await expect(page).toMatch("Vitacura");
    await expect(page).toMatch("Información de Pago");
    await expect(page).toMatch("Actualmente no presenta información de pago");
    await expect(page).toClick("button", { text: "Cerrar sesion" });
    await page.waitForTimeout(1000);
  });

  it("should show sign-in view", async () => {
    await page.waitForTimeout(1000);
    expect(page.url()).toMatch("http://localhost:8000/sign-in");
    await page.waitForTimeout(1000);
  });
});
