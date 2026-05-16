import ProductService from "../src/services/ProductService";
import ProductVariantService from "../src/services/ProductVariantService";

// ─── helpers ─────────────────────────────────────────────────────────────────
const makeProduct = () => ({
  name: `Variant Test Product ${Date.now()}`,
  description: "Product for variant tests",
  price: 59.99,
  category: "Women",
  subcategory: "Pants",
  imageUrl: "https://res.cloudinary.com/test/image/upload/v1/test.jpg",
  imageId: "test_image_id",
  createdAt: new Date().toISOString(),
  soldAmount: 0,
});

describe("ProductVariantService", () => {
  let productId: number;
  let variantId: number;

  beforeAll(() => {
    // create a product to attach variants to
    const product = ProductService.createProductService(makeProduct());
    productId = product.id!;
  });

  afterAll(() => {
    // clean up the product
    try {
      ProductService.deleteProductService(productId);
    } catch {}
  });

  // CREATE
  test("createProductVariantService — should create a variant", () => {
    const variant = ProductVariantService.createProductVariantService({
      productId,
      size: "M",
      stock: 10,
    });
    expect(variant).toBeDefined();
    expect(variant.productId).toBe(productId);
    expect(variant.size).toBe("M");
    expect(variant.stock).toBe(10);
    variantId = variant.id!;
  });

  test("createProductVariantService — should throw on invalid productId", () => {
    expect(() =>
      ProductVariantService.createProductVariantService({
        productId: 0,
        size: "L",
        stock: 5,
      }),
    ).toThrow("Product ID is required");
  });

  test("createProductVariantService — should throw on negative stock", () => {
    expect(() =>
      ProductVariantService.createProductVariantService({
        productId,
        size: "L",
        stock: -1,
      }),
    ).toThrow("Stock must be a non-negative number");
  });

  test("createProductVariantService — should throw on empty size", () => {
    expect(() =>
      ProductVariantService.createProductVariantService({
        productId,
        size: "",
        stock: 5,
      }),
    ).toThrow("Size cannot be empty");
  });

  test("createProductVariantService — should throw when product does not exist", () => {
    expect(() =>
      ProductVariantService.createProductVariantService({
        productId: 999999,
        size: "XL",
        stock: 5,
      }),
    ).toThrow("Product not found");
  });

  // GET BY ID
  test("getProductVariantByIdService — should return variant by id", () => {
    const variant =
      ProductVariantService.getProductVariantByIdService(variantId);
    expect(variant).toBeDefined();
    expect(variant!.id).toBe(variantId);
  });

  test("getProductVariantByIdService — should throw on invalid id", () => {
    expect(() =>
      ProductVariantService.getProductVariantByIdService(-1),
    ).toThrow("Invalid product variant ID");
  });

  test("getProductVariantByIdService — should throw when not found", () => {
    expect(() =>
      ProductVariantService.getProductVariantByIdService(999999),
    ).toThrow("Product variant not found");
  });

  // GET BY PRODUCT
  test("getProductVariantsByProductIdService — should return variants array", () => {
    const variants =
      ProductVariantService.getProductVariantsByProductIdService(productId);
    expect(Array.isArray(variants)).toBe(true);
    expect(variants.length).toBeGreaterThan(0);
  });

  test("getProductVariantsByProductIdService — should throw on invalid productId", () => {
    expect(() =>
      ProductVariantService.getProductVariantsByProductIdService(0),
    ).toThrow("Invalid product ID");
  });

  // UPDATE
  test("updateProductVariantService — should update stock", () => {
    const updated = ProductVariantService.updateProductVariantService(
      variantId,
      { stock: 25 },
    );
    expect(updated).toBeDefined();
    expect(updated!.stock).toBe(25);
  });

  test("updateProductVariantService — should throw on invalid id", () => {
    expect(() =>
      ProductVariantService.updateProductVariantService(0, { stock: 5 }),
    ).toThrow("Invalid product variant ID");
  });

  test("updateProductVariantService — should throw on negative stock", () => {
    expect(() =>
      ProductVariantService.updateProductVariantService(variantId, {
        stock: -5,
      }),
    ).toThrow("Stock cannot be negative");
  });

  // DELETE
  test("deleteProductVariantService — should delete the variant", () => {
    const result = ProductVariantService.deleteProductVariantService(variantId);
    expect(result).toBe(true);
  });

  test("deleteProductVariantService — should throw on invalid id", () => {
    expect(() => ProductVariantService.deleteProductVariantService(-1)).toThrow(
      "Invalid product variant ID",
    );
  });

  test("deleteProductVariantService — should throw when variant not found", () => {
    expect(() =>
      ProductVariantService.deleteProductVariantService(999999),
    ).toThrow("Product variant not found");
  });
});
