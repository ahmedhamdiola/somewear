import db from "../config/db";
import {OrderItemsInterface} from "../interfaces/OrderItemsInterface";

// get order items by id
export const getOrderItems = (orderId: number): OrderItemsInterface[] => {
    const stmt = db.prepare(`SELECT * FROM order_items WHERE orderId = ?`);
    return stmt.all(orderId) as OrderItemsInterface[];
}

// create order items
export const createOrderItems = (orderItems: Omit<OrderItemsInterface, 'id'>): void => {
    const stmt = db.prepare(
        `INSERT INTO order_items (orderId, product_variant_id, quantity, price)
         VALUES (?, ?, ?, ?)`
    );
    stmt.run(
        orderItems.orderId,
        orderItems.productId,
        orderItems.quantity,
        orderItems.price
    );
}

// delete order items by id
export const deleteOrderItems = (orderItems: Omit<OrderItemsInterface, 'id'>): void => {
    const stmt = db.prepare(`DELETE FROM order_items WHERE id = ?`);
    stmt.run(orderItems.id);
}


export const OrderItemsRepository = {
    getOrderItems: getOrderItems,
    createOrderItems: createOrderItems,
    deleteOrderItems: deleteOrderItems
}