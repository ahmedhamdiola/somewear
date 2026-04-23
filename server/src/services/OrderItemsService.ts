import { OrderItemsInterface } from "../interfaces/OrderItemsInterface";
import {OrderItemsRepository} from "../repository/OrderItemsRepository";


export const getOrderItems = (orderId: number): OrderItemsInterface[] => {
    if(!orderId) {
        throw new Error("Order ID is required");
    }
    return OrderItemsRepository.getOrderItems(orderId);
}

export const createOrderItems = (orderItems: OrderItemsInterface, id: number): void => {
    if(!orderItems.orderId) {
        throw new Error("Order ID is required");
    }
    return OrderItemsRepository.createOrderItems(orderItems);
}

export const deleteOrderItems = (orderItems: OrderItemsInterface, id: number): void => {
    if(!orderItems.id) {
        throw new Error("Order Item ID is required");
    }
    return OrderItemsRepository.deleteOrderItems(orderItems);
}


export const OrderItemsService = {
    getOrderItems: getOrderItems,
    createOrderItems: createOrderItems,
    deleteOrderItems: deleteOrderItems
}
