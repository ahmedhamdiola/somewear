import { OrderItemsInterface } from "../interfaces/OrderItemsInterface"
import OrderItemsRepository from "../repository/OrderItemsRepository"
import OrderRepository from "../repository/OrderRepository";

export const createOrderItemService=(item:OrderItemsInterface):OrderItemsInterface=>{
    if(!item.orderId || item.orderId<=0){
        throw new Error ("Invalid order ID ")
    }
     if(!item.price || item.price<=0){
        throw new Error ("Price must be greater than 0")
    } if(!item.productVariantId || item.productVariantId<=0){
        throw new Error ("Invalid product variant ID ")
    } if(!item.quantity || item.quantity<=0){
        throw new Error ("Quantity must be greater than 0")
    }
    const order=OrderRepository.getOrderById(item.orderId)
    if(!order){
     throw new Error ("Order not found")   
    }
    return OrderItemsRepository.createOrderItem(item);
};


export const getOrderItemByIdService=(id:number):OrderItemsInterface | null=>{
    if(!id || id<=0){
         throw new Error ("Invalid order item ID ")
    }
    return OrderItemsRepository.getOrderItemById(id);
};

export const getOrderItemsByOrderIdService=(orderId:number):OrderItemsInterface[]=>{
    if(!orderId || orderId<=0){
         throw new Error ("Invalid order ID ")
    }
    return OrderItemsRepository.getOrderItemsByOrderId(orderId);
};


export const deleteOrderItemService=(id:number):{message:string}=>{
    if(!id || id<=0){
         throw new Error ("Invalid order item ID ")
    }
    return OrderItemsRepository.deleteOrderItem(id);
};

export default{
    createOrderItemService,
    getOrderItemByIdService,
    getOrderItemsByOrderIdService,
    deleteOrderItemService
}