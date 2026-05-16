import db from "../config/db"
import {OrderItemsInterface} from "../interfaces/OrderItemsInterface";

//create order item
export const createOrderItem=(item:OrderItemsInterface): OrderItemsInterface=>{
     const orderItem=db.prepare<
    [number,number,number,number],OrderItemsInterface
    >(
        `
         INSERT INTO order_items
         (orderId,productVariantid,quantity,price) VALUES (?,?,?,?)
        `
    );
    const result=orderItem.run(
        item.orderId,
        item.productVariantId,
        item.quantity,
        item.price,
    );
    return{
        id: Number(result.lastInsertRowid),
        ...item 
    }
}




//get order items with product details
export const getOrderItemsByOrderId = (id: number) => {
    const orderItems = db.prepare<[number], any>(
        `SELECT 
            order_items.id,
            order_items.orderId,
            order_items.productVariantId,
            order_items.quantity,
            order_items.price,
            product_variants.size,
            products.name AS productName
        FROM order_items
        JOIN product_variants ON order_items.productVariantId = product_variants.id
        JOIN products         ON product_variants.productId   = products.id
        WHERE order_items.orderId = ?`
    );
    return orderItems.all(id);
}




export default{
    createOrderItem,
    getOrderItemsByOrderId,

}