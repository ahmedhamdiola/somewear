import OrderService from "../src/services/OrderService";
import { registerUserService } from "../src/services/UserService";
import ProductService from "../src/services/ProductService";

// ─── helpers ─────────────────────────────────────────────────────────────────
const makeUser = async () => {
  const ts = Date.now();
  const res = await registerUserService({
    username: `order_user_${ts}`,
    email: `order_${ts}@test.com`,
    password: "pass123",
    address: "Test St",
    phone: "0123456789",
    role: "customer",
  });
  return res.user.id!;
};

const makeProduct = () =>
  ProductService.createProductService({
    name: `Order Product ${Date.now()}`,
    description: "desc",
    price: 150,
    category: "Men",
    subcategory: "Shirts",
    imageUrl: "https://res.cloudinary.com/test/image/upload/v1/test.jpg",
    imageId: "test_id",
    createdAt: new Date().toISOString(),
    soldAmount: 0,
  });

const makeOrder = (userId: number) =>
  OrderService.createOrderService({
    userId,
    totalPrice: 250,
    shippingFees: 30,
    city: "Cairo",
    address: "123 Test St",
    phone: "0123456789",
    status: "pending",
    createdAt: new Date().toISOString(),
  });

// ─── OrderService tests ───────────────────────────────────────────────────────
describe("OrderService", () => {
  let userId: number;
  let orderId: number;

  beforeAll(async () => {
    userId = await makeUser();
  });

  // CREATE
  test("createOrderService — should create order", () => {
    const order = makeOrder(userId);
    expect(order).toBeDefined();
    expect(order.userId).toBe(userId);
    expect(order.status).toBe("pending");
    orderId = order.id!;
  });

  test("createOrderService — should throw on invalid userId", () => {
    expect(() =>
      OrderService.createOrderService({
        userId: 0,
        totalPrice: 100,
        shippingFees: 10,
        city: "Cairo",
        address: "Addr",
        phone: "0123",
        status: "pending",
        createdAt: new Date().toISOString(),
      }),
    ).toThrow("Invalid user ID");
  });

  test("createOrderService — should throw when totalPrice is 0", () => {
    expect(() =>
      OrderService.createOrderService({
        userId,
        totalPrice: 0,
        shippingFees: 10,
        city: "Cairo",
        address: "Addr",
        phone: "0123",
        status: "pending",
        createdAt: new Date().toISOString(),
      }),
    ).toThrow("Total price must be greater than zero");
  });

  test("createOrderService — should throw when city is empty", () => {
    expect(() =>
      OrderService.createOrderService({
        userId,
        totalPrice: 100,
        shippingFees: 10,
        city: "",
        address: "Addr",
        phone: "0123",
        status: "pending",
        createdAt: new Date().toISOString(),
      }),
    ).toThrow("City is required");
  });

  // GET BY ID
  test("getOrderByIdService — should return order by id", () => {
    const order = OrderService.getOrderByIdService(orderId);
    expect(order).toBeDefined();
    expect(order!.id).toBe(orderId);
  });

  test("getOrderByIdService — should throw on invalid id", () => {
    expect(() => OrderService.getOrderByIdService(0)).toThrow(
      "Invalid order ID",
    );
  });

  // GET BY USER
  test("getOrdersByUserIdService — should return array", () => {
    const orders = OrderService.getOrdersByUserIdService(userId);
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThan(0);
  });

  test("getOrdersByUserIdService — should throw on invalid userId", () => {
    expect(() => OrderService.getOrdersByUserIdService(-1)).toThrow(
      "Invalid user ID",
    );
  });

  // COUNT & TOTAL
  test("getCountByUserIdService — should return count object", () => {
    const result = OrderService.getCountByUserIdService(userId);
    expect(result).toBeDefined();
  });

  test("getTotalAmountByUserIdService — should return total object", () => {
    const result = OrderService.getTotalAmountByUserIdService(userId);
    expect(result).toBeDefined();
  });

  // LAST ORDERS
  test("getLastOrdersByUserIdService — should return array of max 3", () => {
    const orders = OrderService.getLastOrdersByUserIdService(userId);
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeLessThanOrEqual(3);
  });

  // GET ALL
  test("getAllOrdersService — should return array", () => {
    const orders = OrderService.getAllOrdersService();
    expect(Array.isArray(orders)).toBe(true);
  });

  // UPDATE STATUS
  test("updateOrderStatusService — should update status to delivered", () => {
    const updated = OrderService.updateOrderStatusService(orderId, "delivered");
    expect(updated).toBeDefined();
    expect(updated!.status).toBe("delivered");
  });

  test("updateOrderStatusService — should throw on invalid status", () => {
    expect(() =>
      OrderService.updateOrderStatusService(orderId, "unknown"),
    ).toThrow("Invalid order status");
  });

  test("updateOrderStatusService — should throw on invalid id", () => {
    expect(() => OrderService.updateOrderStatusService(0, "pending")).toThrow(
      "Invalid order ID",
    );
  });

  // CANCEL
  test("cancelOrderService — should throw when order is not pending", () => {
    // orderId is now 'delivered', so cancel should fail
    expect(() => OrderService.cancelOrderService(orderId)).toThrow(
      "Only pending orders can be cancelled",
    );
  });

  // DELETE
  test("deleteOrderService — should delete the order", () => {
    const result = OrderService.deleteOrderService(orderId);
    expect(result).toHaveProperty("message");
  });

  test("deleteOrderService — should throw on invalid id", () => {
    expect(() => OrderService.deleteOrderService(-1)).toThrow(
      "Invalid order ID",
    );
  });

  // CHECKOUT — empty cart
  test("checkoutService — should throw when cart is empty", () => {
    expect(() =>
      OrderService.checkoutService(userId, {
        shippingFees: 30,
        city: "Cairo",
        address: "123 Test",
        phone: "0123456789",
      }),
    ).toThrow("Cart is empty");
  });

  test("checkoutService — should throw on invalid userId", () => {
    expect(() =>
      OrderService.checkoutService(0, {
        shippingFees: 30,
        city: "Cairo",
        address: "123 Test",
        phone: "0123456789",
      }),
    ).toThrow("Invalid userId");
  });
});
