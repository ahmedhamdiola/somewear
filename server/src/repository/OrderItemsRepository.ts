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

//get order item by id
export const getOrderItemById=(id:number): OrderItemsInterface | null=>{
    const orderItem=db.prepare<[number],OrderItemsInterface>(
        `SELECT * FROM order_items WHERE id=?`
    );
    const result=orderItem.get(id);
    return result || null;
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


//delete 
export const deleteOrderItem=(id:number): {message:string} =>{
    const orderItem=db.prepare<[number],{changes:number}>(
        `DELETE FROM order_items WHERE id=?`
    );
    const result =orderItem.run(id);
    if(result.changes===0){
        throw new Error("Order item not found");
    }
    return {message:" Order item deleted successfully"}
}

export default{
    createOrderItem,
    getOrderItemById,
    getOrderItemsByOrderId,
    deleteOrderItem
}