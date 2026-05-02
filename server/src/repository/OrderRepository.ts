import db from "../config/db";
import { OrderInterface } from "../interfaces/OrderInterface";

//create order
export const createOrder = (order: OrderInterface): OrderInterface => {
    const stmt = db.prepare(`
    INSERT INTO orders (userId, totalPrice, shippingFees, city, address, phone, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
        order.userId,
        order.totalPrice,
        order.shippingFees,
        order.city,
        order.address,
        order.phone,
        order.status || "pending",
        order.createdAt || new Date().toISOString()
    );
    return {
        id: Number(result.lastInsertRowid),
        ...order
    };
};

//get order by id
export const getOrderById = (id: number): OrderInterface | null => {
    const res = db.prepare<[number], OrderInterface>(`
    SELECT * FROM orders WHERE id = ?
    `);
    const orderData = res.get(id);
    return orderData || null;
}

//get order by user id
export const getOrderByUserId = (userId: number): OrderInterface [] => {
    const res = db.prepare<[number], OrderInterface>(`
    SELECT * FROM orders WHERE userId = ?
    `);
    const orderData = res.all(userId);
    return orderData || null;
};

//count of orders by user id
export const getCountByUserId = (userId: number) => {
    const count = db.prepare(
        `   
            SELECT count (userId) FROM orders WHERE userId =?
        `
    )
    const result = count.get(userId)
    return result
}


//total amount of orders by user id
export const getTotalAmountByUserId = (userId: number) => {
    const total = db.prepare(
        `SELECT SUM(totalAmount) + SUM(COALESCE(shippingFees, 0)) AS total_revenue FROM orders;`
    )
    const result = total.get(userId)
    return result
}

//get all orders
export const getAllOrders = (): OrderInterface[] => {
    const res = db.prepare<[], OrderInterface>(`
        //SELECT * FROM orders  
        ////////////////////////////// edit by bassam //////////////////////////
        SELECT orders.id,
               orders.status,
               orders.phone,
               orders.address,
               orders.createdAt  AS date,
               orders.totalPrice AS total,
               users.username    AS customerName,
               users.email
        FROM orders
        JOIN users ON orders.userId = users.id
        ///////////////////////////////////////////////////////////////////
    `);
    const ordersData = res.all();
    return ordersData || [];
};


//cancel
export const cancelOrderByOrderId = (orderId: number,) => {
    const cancel = db.prepare(
        ` UPDATE orders
        SET status = "cancelled"
        WHERE id = ?`
    )
    const res = cancel.run(orderId)
    return res || null
}


//update order status
export const updateOrderStatus = (
    id: number,
    status: string
): OrderInterface | null => {
    const stmt = db.prepare<[string, number], { chages: number }>(
        `
        UPDATE orders
        SET status = ?
        WHERE id = ?
        `
    );
    const result = stmt.run(status, id);
    if (result.changes === 0) {
        return null;
    }
    return getOrderById(id);
};

//delete order by id
export const deleteOrderById = (id: number): { message: string } => {
    const stmt = db.prepare<[number], { changes: number }>(`
    DELETE FROM orders WHERE id = ? 
    `);
    const result = stmt.run(id);
    if (result.changes === 0) {
        throw new Error("Order not found");
    }
    return { message: "Order deleted successfully" };

}

export default {
    createOrder,
    getOrderById,
    getOrderByUserId,
    getCountByUserId,
    getTotalAmountByUserId,
    getAllOrders,
    cancelOrderByOrderId,
    updateOrderStatus,
    deleteOrderById
}
