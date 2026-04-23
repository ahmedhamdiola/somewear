import { OrderInterface } from "../interfaces/OrderInterface";
import OrderRepository from "../repository/OrderRepository";

export const getAllOrders = (): OrderInterface[] => {

    return OrderRepository.getAllOrders();
}

export const createOrder = (order: OrderInterface, id: number): number => {
    return OrderRepository.createOrder(order);
}

export const deleteOrder = (order: OrderInterface, id: number): void => {
    if(!order.id) {
        throw new Error("Order ID is required");
    }
    if(order.id < 0) {
        throw new Error("Invalid Order ID");
    }
    return OrderRepository.deleteOrder(order);
}

export const updateOrderStatus = (order: OrderInterface, id: number): void => {
    if(!order.id) {
        throw new Error("Order ID is required");
    }
    if(order.id < 0) {
        throw new Error("Invalid Order ID");
    }
    return OrderRepository.updateOrderStatus(order);
}

export const OrderService = {
    getAllOrders: getAllOrders,
    createOrder: createOrder,
    deleteOrder: deleteOrder,
    updateOrderStatus: updateOrderStatus
}

