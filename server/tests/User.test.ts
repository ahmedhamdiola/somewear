import { registerUserService, loginUserService, getUserByIdService } from "../src/services/UserService";

const uniqueEmail = () => `testuser${Date.now()}@example.com`;
const uniqueUsername = () => `user_${Date.now()}`;

describe("UserService", () => {
  let registeredEmail: string;
  let registeredId: number;

  // REGISTER
  test("registerUserService — should register a new user", async () => {
    registeredEmail = uniqueEmail();
    const res = await registerUserService({
      username: uniqueUsername(),
      email: registeredEmail,
      password: "password123",
      address: "123 Test St",
      phone: "1234567890",
      role: "customer",
    });

    expect(res).toHaveProperty("user");
    expect(res).toHaveProperty("token");
    expect(res.user.email).toBe(registeredEmail);
    registeredId = res.user.id!;
  });

  test("registerUserService — should throw on duplicate email", async () => {
    if (!registeredEmail) return;
    await expect(
      registerUserService({
        username: uniqueUsername(),
        email: registeredEmail, // same email
        password: "password123",
        address: "123 Test St",
        phone: "1234567890",
        role: "customer",
      })
    ).rejects.toThrow();
  });

  test("registerUserService — should throw when email is missing", async () => {
    await expect(
      registerUserService({
        username: "testuser",
        email: "",
        password: "password123",
        address: "123 Test St",
        phone: "1234567890",
        role: "customer",
      })
    ).rejects.toThrow();
  });

  // LOGIN
  test("loginUserService — should login successfully", async () => {
    if (!registeredEmail) return;
    const res = await loginUserService(registeredEmail, "password123");
    expect(res).toHaveProperty("safeUser");
    expect(res).toHaveProperty("token");
    expect(res.safeUser.email).toBe(registeredEmail);
  });

  test("loginUserService — should throw on wrong password", async () => {
    await expect(
      loginUserService(registeredEmail, "wrongpassword")
    ).rejects.toThrow();
  });

  test("loginUserService — should throw on non-existent email", async () => {
    await expect(
      loginUserService("nonexistent@example.com", "password123")
    ).rejects.toThrow();
  });

  // GET BY ID
  test("getUserByIdService — should return user by id", () => {
    if (!registeredId) return; // skip if register failed
    const user = getUserByIdService(registeredId);
    expect(user).toBeDefined();
    expect((user as any).email).toBe(registeredEmail);
  });

  test("getUserByIdService — should throw on invalid id (0)", () => {
    expect(() => getUserByIdService(0)).toThrow("Invalid user ID");
  });

  test("getUserByIdService — should throw when user not found", () => {
    expect(() => getUserByIdService(999999)).toThrow("User not found");
  });
});
