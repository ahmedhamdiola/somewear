import CartItemsService from "../src/services/CartItemsService";
import ProductService from "../src/services/ProductService";
import ProductVariantService from "../src/services/ProductVariantService";
import { registerUserService } from "../src/services/UserService";

// ─── helpers ─────────────────────────────────────────────────────────────────
describe("CartItemsService", () => {
  let userId: number;
  let productVariantId: number;
  let cartItemId: number;
  let productId: number;

  beforeAll(async () => {
    const ts = Date.now();
    const res = await registerUserService({
      username: `cart_user_${ts}`,
      email: `cart_${ts}@test.com`,
      password: "pass123",
      address: "Test St",
      phone: "0123456789",
      role: "customer",
    });
    userId = res.user.id!;

    // create product + variant for cart tests
    const product = ProductService.createProductService({
      name: `Cart Product ${ts}`,
      description: "desc",
      price: 200,
      category: "Men",
      subcategory: "Pants",
      imageUrl: "https://res.cloudinary.com/test/image/upload/v1/test.jpg",
      imageId: "test_id",
      createdAt: new Date().toISOString(),
      soldAmount: 0,
    });
    productId = product.id!;

    const variant = ProductVariantService.createProductVariantService({
      productId,
      size: "L",
      stock: 20,
    });
    productVariantId = variant.id!;
  });

  afterAll(() => {
    try { ProductService.deleteProductService(productId); } catch {}
  });

  // CREATE
  test("createCartItemService — should add item to cart", () => {
    const item = CartItemsService.createCartItemService({
      userId,
      productVariantId,
      quantity: 2,
    });
    expect(item).toBeDefined();
    expect(item.userId).toBe(userId);
    expect(item.quantity).toBe(2);
    cartItemId = item.id!;
  });

  test("createCartItemService — should throw on invalid userId", () => {
    expect(() =>
      CartItemsService.createCartItemService({ userId: 0, productVariantId, quantity: 1 })
    ).toThrow("Invalid cart ID");
  });

  test("createCartItemService — should throw on invalid variantId", () => {
    expect(() =>
      CartItemsService.createCartItemService({ userId, productVariantId: 0, quantity: 1 })
    ).toThrow("Invalid product variant ID");
  });

  test("createCartItemService — should throw when quantity is 0", () => {
    expect(() =>
      CartItemsService.createCartItemService({ userId, productVariantId, quantity: 0 })
    ).toThrow("Quantity must be greater than 0");
  });

  // GET BY ID
  test("getCartItemByIdService — should return item by id", () => {
    const item = CartItemsService.getCartItemByIdService(cartItemId);
    expect(item).toBeDefined();
    expect(item!.id).toBe(cartItemId);
  });

  test("getCartItemByIdService — should throw on invalid id", () => {
    expect(() => CartItemsService.getCartItemByIdService(0)).toThrow(
      "Invalid cart item ID"
    );
  });

  test("getCartItemByIdService — should throw when not found", () => {
    expect(() => CartItemsService.getCartItemByIdService(999999)).toThrow(
      "Cart item not found"
    );
  });

  // GET BY USER
  test("getCartItemsByUserIdService — should return items array", () => {
    const items = CartItemsService.getCartItemsByUserIdService(userId);
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });

  test("getCartItemsByUserIdService — should throw on invalid userId", () => {
    expect(() => CartItemsService.getCartItemsByUserIdService(-1)).toThrow(
      "Invalid user ID"
    );
  });

  // UPDATE QUANTITY
  test("updateCartItemQuantityService — should update quantity", () => {
    const updated = CartItemsService.updateCartItemQuantityService(cartItemId, 5);
    expect(updated).toBeDefined();
    expect(updated!.quantity).toBe(5);
  });

  test("updateCartItemQuantityService — should throw on invalid id", () => {
    expect(() =>
      CartItemsService.updateCartItemQuantityService(0, 3)
    ).toThrow("Invalid cart item ID");
  });

  test("updateCartItemQuantityService — should throw when quantity is 0", () => {
    expect(() =>
      CartItemsService.updateCartItemQuantityService(cartItemId, 0)
    ).toThrow("Quantity must be greater than 0");
  });

  // DELETE
  test("deleteCartItemService — should delete the cart item", () => {
    const result = CartItemsService.deleteCartItemService(cartItemId);
    expect(result).toBe(true);
  });

  test("deleteCartItemService — should throw on invalid id", () => {
    expect(() => CartItemsService.deleteCartItemService(-1)).toThrow(
      "Invalid cart item ID"
    );
  });
});
