import { OrderItemsInterface } from "../interfaces/OrderItemsInterface"
import OrderItemsRepository from "../repository/OrderItemsRepository"




export const getOrderItemsByOrderIdService=(orderId:number):OrderItemsInterface[]=>{
    if(!orderId || orderId<=0){
         throw new Error ("Invalid order ID ")
    }
    return OrderItemsRepository.getOrderItemsByOrderId(orderId);
};



export default{
    getOrderItemsByOrderIdService,
}