import { OrderInterface } from "../interfaces/OrderInterface";
import OrderRepository from "../repository/OrderRepository";

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
    
    order.status=order.status || "pending";
    
    return OrderRepository.createOrder(order);
};

export const getOrderByIdService = (id: number): OrderInterface | null => {
    if (!id || id <= 0) {
        throw new Error("Invalid order ID");
    }
    
    return OrderRepository.getOrderById(id);
};

export const getOrderByUserIdService = (userId: number): OrderInterface |null => {
    if (!userId || userId <= 0) {
        throw new Error("Invalid user ID");
    }
    return OrderRepository.getOrderByUserId(userId);
};

export const getTotalAmountByUserIdService =(userId:number)=>{
    if (!userId || userId <= 0) {
        throw new Error("Invalid user ID");
    }
    return OrderRepository.getTotalAmountByUserId(userId);
}

export const getCountByUserIdService =(userId:number)=>{
    if (!userId || userId <= 0) {
        throw new Error("Invalid user ID");
    }
    return OrderRepository.getCountByUserId(userId);
}


export const getAllOrdersService = (): OrderInterface[] => {
    return OrderRepository.getAllOrders();
};

export const cancelOrderService=(orderId:number,):OrderInterface | null=>{
    const order=OrderRepository.getOrderById(orderId);

   
    if (!orderId || orderId <= 0) {
        throw new Error("Invalid order ID");
    }

    if (order?.status !== "pending") {
        throw new Error("Only pending orders can be cancelled");
    }

    return OrderRepository.updateOrderStatus(orderId, "cancelled");
};


export const updateOrderStatusService = (
    id: number,
    status: string
): OrderInterface | null => {
   
    if (!id || id <= 0) {
        throw new Error("Invalid order ID");
    }
    const validStatus=["pending","delivered","cancelled"];
    if (!validStatus.includes(status)) {
        throw new Error("Invalid order status");
    }   
    return OrderRepository.updateOrderStatus(id, status);
};


export const deleteOrderService = (id: number): {message: string} => {
    if (!id || id <= 0) {
        throw new Error("Invalid order ID");
    }
    return OrderRepository.deleteOrderById(id);
};

export default {
    createOrderService,
    getOrderByIdService,
    getOrderByUserIdService,
    getAllOrdersService,
    cancelOrderService,
    updateOrderStatusService,
    deleteOrderService
};