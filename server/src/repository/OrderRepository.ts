import db from "../config/db";  
import {OrderInterface} from "../interfaces/OrderInterface";

//create order
export const createOrder = (order: Omit<OrderInterface, 'id'>): number => {
    const stmt = db.prepare(
        `INSERT INTO orders (userId, TotalPrice, ShippingFees, city, address, phone, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    const result = stmt.run(
        order.userId,
        order.TotalPrice,
        order.ShippingFees,
        order.city,
        order.address,
        order.phone,
        order.status
    );
    return result.lastInsertRowid as number;
};

// delete order by id
export const deleteOrder = (order: Omit<OrderInterface, 'id'>): void => {
    const stmt = db.prepare(`DELETE FROM orders WHERE id = ?`);
    stmt.run(order.id);
}

// get all orders
export const getAllOrders = (): OrderInterface[] => {
    const stmt = db.prepare(`SELECT * FROM orders`);
    return stmt.all() as OrderInterface[];
}


//update order status
export const updateOrderStatus = (order: Omit<OrderInterface, 'id'>): void => {
    const stmt = db.prepare(`UPDATE orders SET status = ? WHERE id = ?`);
    stmt.run(order.status, order.id);
}



export default {
    createOrder,
    deleteOrder,
    getAllOrders,
    updateOrderStatus
}