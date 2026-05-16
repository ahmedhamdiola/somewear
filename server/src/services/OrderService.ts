import { OrderInterface } from "../interfaces/OrderInterface";
import OrderRepository from "../repository/OrderRepository";
import ProductRepository from "../repository/ProductRepository";
import ProductVariantRepository from "../repository/ProductVariantRepository";
import CartItemsRepository from "../repository/CartItemsRepository";
import OrderItemsRepository from "../repository/OrderItemsRepository";

export const createOrderService = (order: OrderInterface): OrderInterface => {
  // validation
  if (!order.userId || order.userId <= 0) {
    throw new Error("Invalid user ID");
  }
  if (!order.totalPrice || order.totalPrice <= 0) {
    throw new Error("Total price must be greater than zero");
  }
  if (isNaN(order.shippingFees) || order.shippingFees < 0) {
    throw new Error("Shipping fees must be a non-negative number");
  }
  if (!order.city || order.city.trim() === "") {
    throw new Error("City is required");
  }
  if (!order.address || order.address.trim() === "") {
    throw new Error("Address is required");
  }
  if (!order.phone || order.phone.trim() === "") {
    throw new Error("Phone number is required");
  }

  order.status = order.status || "pending";

  return OrderRepository.createOrder(order);
};

export const getOrderByIdService = (id: number): OrderInterface | null => {
  if (!id || id <= 0) {
    throw new Error("Invalid order ID");
  }

  return OrderRepository.getOrderById(id);
};

export const getOrdersByUserIdService = (userId: number): OrderInterface[] => {
  if (!userId || userId <= 0) {
    throw new Error("Invalid user ID");
  }
  return OrderRepository.getOrderByUserId(userId);
};

export const getCountByUserIdService = (userId: number) => {
  if (!userId || userId <= 0) {
    throw new Error("Invalid user ID");
  }
  return OrderRepository.getCountByUserId(userId);
};

export const getTotalAmountByUserIdService = (userId: number) => {
  if (!userId || userId <= 0) {
    throw new Error("Invalid user ID");
  }
  return OrderRepository.getTotalAmountByUserId(userId);
};

export const getLastOrdersByUserIdService = (
  userId: number,
): OrderInterface[] => {
  if (!userId || userId <= 0) {
    throw new Error("Invalid user ID");
  }
  return OrderRepository.getLastOrdersByUserId(userId);
};

export const getTotalAmountService = () => {
  return OrderRepository.getTotalAmount();
};

export const getTotalRevenueService = () => {
  return OrderRepository.getTotalRevenue();
};

export const getTopCityService = () => {
  const res = OrderRepository.getTopCity();
  if (!res) {
    throw new Error("No order found");
  }
  return res;
};

export const getAllOrdersService = (): OrderInterface[] => {
  return OrderRepository.getAllOrders();
};

export const cancelOrderService = (orderId: number): OrderInterface | null => {
  const order = OrderRepository.getOrderById(orderId);

  if (!orderId || orderId <= 0) {
    throw new Error("Invalid order ID");
  }

  if (order?.status !== "pending") {
    throw new Error("Only pending orders can be cancelled");
  }

  const orderItems = OrderItemsRepository.getOrderItemsByOrderId(orderId);
  for (const item of orderItems) {
    const variant = ProductVariantRepository.getProductVariantById(
      item.productVariantId,
    );
    if (variant && variant.id) {
      ProductVariantRepository.updateStock(
        variant.id,
        variant.stock + item.quantity,
      );
      ProductRepository.incrementSoldAmount(variant.productId, -item.quantity);
    }
  }

  return OrderRepository.updateOrderStatus(orderId, "cancelled");
};

export const updateOrderStatusService = (
  id: number,
  status: string,
): OrderInterface | null => {
  if (!id || id <= 0) {
    throw new Error("Invalid order ID");
  }
  const validStatus = ["pending", "delivered", "cancelled"];
  if (!validStatus.includes(status)) {
    throw new Error("Invalid order status");
  }

  const order = OrderRepository.getOrderById(id);
  if (!order) {
    throw new Error("Order not found");
  }

  if (status === "cancelled" && order.status !== "cancelled") {
    const orderItems = OrderItemsRepository.getOrderItemsByOrderId(id);
    for (const item of orderItems) {
      const variant = ProductVariantRepository.getProductVariantById(
        item.productVariantId,
      );
      if (variant && variant.id) {
        ProductVariantRepository.updateStock(
          variant.id,
          variant.stock + item.quantity,
        );
        ProductRepository.incrementSoldAmount(
          variant.productId,
          -item.quantity,
        );
      }
    }
  }

  return OrderRepository.updateOrderStatus(id, status);
};

export const checkoutService = (
  userId: number,
  orderData: {
    shippingFees: number;
    city: string;
    address: string;
    phone: string;
  },
): OrderInterface => {
  if (!userId || userId <= 0) {
    throw new Error("Invalid userId");
  }

  const cartItems = CartItemsRepository.getCartItemsByUserId(userId);

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalPrice = 0;

  // enrich cart items
  const enrichedItems = cartItems.map((item) => {
    const variant = ProductVariantRepository.getProductVariantById(
      item.productVariantId,
    );

    if (!variant) {
      throw new Error("Product variant not found");
    }

    const product = ProductRepository.getProductById(variant.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (variant.stock < item.quantity) {
      throw new Error(
        `Insufficient stock for product variant ${item.productVariantId}`,
      );
    }

    const itemTotal = product.price * item.quantity;

    totalPrice += itemTotal;

    return {
      ...item,
      price: product.price,
      productId: product.id!,
      currStock: variant.stock,
    };
  });

  //create order
  const order = OrderRepository.createOrder({
    userId,
    totalPrice,
    shippingFees: 50, 
    city: orderData.city,
    address: orderData.address,
    phone: orderData.phone,
    createdAt: new Date().toISOString(),
    status: "pending",
  });

  //create order items
  for (const item of enrichedItems) {
    OrderItemsRepository.createOrderItem({
      orderId: order.id!,
      productVariantId: item.productVariantId,
      price: item.price,
      quantity: item.quantity,
    });
  }

  for (const item of enrichedItems) {
    ProductVariantRepository.updateStock(
      item.productVariantId,
      item.currStock - item.quantity,
    );
    ProductRepository.incrementSoldAmount(item.productId, item.quantity);
  }

  //clear cart
  CartItemsRepository.deleteCartItemsByUserId(userId);

  return order;
};

export default {
  createOrderService,
  getOrderByIdService,
  getOrdersByUserIdService,
  getCountByUserIdService,
  getTotalAmountByUserIdService,
  getLastOrdersByUserIdService,
  getTotalAmountService,
  getTotalRevenueService,
  getTopCityService,
  getAllOrdersService,
  cancelOrderService,
  updateOrderStatusService,
  checkoutService,
};
