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
        ...item ,
        id: Number(result.lastInsertRowid)
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


//get order items
export const getOrderItemsByOrderId=(id:number):OrderItemsInterface[]=>{
    const orderItems=db.prepare<[number],OrderItemsInterface>(
        `SELECT * FROM order_items WHERE orderId=?`
    );
    const result= orderItems.all(id);
    return result ;
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