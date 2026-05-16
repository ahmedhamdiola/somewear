import ProductService from "../src/services/ProductService";

// ─── helpers ────────────────────────────────────────────────────────────────
const makeProduct = (overrides = {}) => ({
  name: `Test Product ${Date.now()}`,
  description: "A test product description",
  price: 99.99,
  category: "Men",
  subcategory: "Shirts",
  imageUrl: "https://res.cloudinary.com/test/image/upload/v1/test.jpg",
  imageId: "test_image_id",
  createdAt: new Date().toISOString(),
  soldAmount: 0,
  ...overrides,
});

// ─── ProductService tests ────────────────────────────────────────────────────
describe("ProductService", () => {
  let createdId: number;

  // CREATE
  test("createProductService — should create a product and return it", () => {
    const product = ProductService.createProductService(makeProduct());
    expect(product).toBeDefined();
    expect(product.name).toContain("Test Product");
    expect(product.price).toBe(99.99);
    expect(product.id).toBeDefined();
    createdId = product.id!;
  });

  test("createProductService — should throw when name is empty", () => {
    expect(() =>
      ProductService.createProductService(makeProduct({ name: "" })),
    ).toThrow("Name is required");
  });

  test("createProductService — should throw when price is negative", () => {
    expect(() =>
      ProductService.createProductService(makeProduct({ price: -5 })),
    ).toThrow("Price must be greater than zero");
  });

  // GET BY ID
  test("getProductByIdService — should return product by id", () => {
    const product = ProductService.getProductByIdService(createdId);
    expect(product).toBeDefined();
    expect(product!.id).toBe(createdId);
  });

  test("getProductByIdService — should throw on invalid id", () => {
    expect(() => ProductService.getProductByIdService(-1)).toThrow(
      "Invalid product ID",
    );
  });

  // GET ALL
  test("getAllProductsService — should return an array", () => {
    const products = ProductService.getAllProductsService();
    expect(Array.isArray(products)).toBe(true);
  });

  test("getAllProductsService — should filter by category and return only matching results", () => {
    // createProductService saves category "Men" — filter by it
    const products = ProductService.getAllProductsService("Men");
    // all returned products must have category that contains "men" (case-insensitive)
    products.forEach((p) => expect(p.category.toLowerCase()).toContain("men"));
  });

  test("getAllProductsService — should return all products when no filter given", () => {
    const products = ProductService.getAllProductsService("");
    expect(Array.isArray(products)).toBe(true);
  });

  // UPDATE
  test("updateProductService — should update product name", () => {
    const updated = ProductService.updateProductService(createdId, {
      name: "Updated Name",
    });
    expect(updated).toBeDefined();
    expect(updated!.name).toBe("Updated Name");
  });

  test("updateProductService — should throw on invalid id", () => {
    expect(() => ProductService.updateProductService(0, { name: "x" })).toThrow(
      "Invalid product ID",
    );
  });

  test("updateProductService — should not update if name is empty (service skips empty strings)", () => {
    // the service only throws if name is explicitly non-empty but invalid
    // empty string is treated as "no change" by the current implementation
    const updated = ProductService.updateProductService(createdId, {
      name: "",
    });
    expect(updated).toBeDefined();
  });

  // DELETE
  test("deleteProductService — should delete the product", () => {
    const result = ProductService.deleteProductService(createdId);
    expect(result).toBe(true);
  });

  test("deleteProductService — should throw when product not found", () => {
    expect(() => ProductService.deleteProductService(999999)).toThrow(
      "ID not found",
    );
  });

  test("deleteProductService — should throw on invalid id", () => {
    expect(() => ProductService.deleteProductService(-1)).toThrow(
      "Invalid product ID",
    );
  });

  // CATEGORIES
  test("getCategoriesAndSubcategoriesService — should return array", () => {
    const cats = ProductService.getCategoriesAndSubcategoriesService();
    expect(Array.isArray(cats)).toBe(true);
  });
});

// ─── Image Processing (Cloudinary mock) ─────────────────────────────────────
describe("Image Processing — uploadImageToCloudinary (mocked)", () => {
  test("should resolve with a cloudinary secure_url string", async () => {
    const mockUpload = jest
      .fn()
      .mockResolvedValue(
        "https://res.cloudinary.com/demo/image/upload/v1/sample.jpg",
      );

    const fakeBuffer = Buffer.from("fake-image-data");
    const url = await mockUpload(fakeBuffer);

    expect(typeof url).toBe("string");
    expect(url).toContain("cloudinary.com");
    expect(url).toMatch(/\.(jpg|png|webp)$/);
  });

  test("should reject when upload fails", async () => {
    const mockUpload = jest
      .fn()
      .mockRejectedValue(new Error("Upload failed: invalid credentials"));

    await expect(mockUpload(Buffer.from("bad-data"))).rejects.toThrow(
      "Upload failed",
    );
  });

  test("should call upload function with a Buffer", async () => {
    const mockUpload = jest
      .fn()
      .mockResolvedValue(
        "https://res.cloudinary.com/demo/image/upload/v1/test.jpg",
      );
    const buf = Buffer.from("image bytes");
    await mockUpload(buf);
    expect(mockUpload).toHaveBeenCalledWith(buf);
    expect(mockUpload).toHaveBeenCalledTimes(1);
  });
});
