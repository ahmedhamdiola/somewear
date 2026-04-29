import db from "../config/db";
import { CartInterface } from "../interfaces/CartInterface";

//create cart
export const createCart=(cart: CartInterface):CartInterface=>{
    const res=db.prepare<[number],CartInterface>(

        "INSERT INTO carts (userId) VALUES (?)"
    );
    const result=res.run(cart.userId);
    return{
        ...cart,
        id:Number(result.lastInsertRowid)
    }
};

//get cart by user id
export const getCartByUserId=(userId:number):CartInterface|null=>{
    const res=db.prepare<[number],CartInterface>(
        "SELECT * FROM carts WHERE userId = ?"
    );
    const cart = res.get(userId);
    return cart || null;
};

//get cart by id
export const getCartById=(id:number):CartInterface|null=>{
    const res=db.prepare<[number],CartInterface>(
        "SELECT * FROM carts WHERE id = ?"
    );
    const cart = res.get(id);
    return cart || null;
}


//delete cart by id
export const deleteCartById=(id:number):{message: string}=>{
    const res=db.prepare<[number],{changes: number}>(
        "DELETE FROM carts WHERE id = ?"
    );
     const result= res.run(id);
      if(result.changes===0){
        throw new Error("Cart not found");
    }
    return {message:"Cart deleted successfully"}
}



export default {
    createCart,
    getCartByUserId,
    getCartById,
    deleteCartById
};

