import db from "../config/db";
import { FeedbackInterface } from "../interfaces/FeedbackInterface";

//create feedback
export const createFeedback=(Feedback:FeedbackInterface): FeedbackInterface=>{
     const orderItem=db.prepare<
    [string,number,number,string,number],FeedbackInterface
    >(
        `
         INSERT INTO feedback
         (name,userId,productId,feedback,rating) VALUES (?,?,?,?,?)
        `
    );
    const result=orderItem.run(
        Feedback.name,
        Feedback.userId,
        Feedback.productId,
        Feedback.feedback,
        Feedback.rating
    );
    return{
        id: Number(result.lastInsertRowid),
        ...Feedback 
    }
};


//get all feedback
export const getAllFeedbacks=():FeedbackInterface[]=>{
    const feedback=db.prepare<[],FeedbackInterface>(
        `SELECT * FROM feedback `
    )
    const result =feedback.all()
    return result;
}

//get feedback by productId
export const getFeedbackByProduct=(productId:number):FeedbackInterface[]=>{
    const feedback=db.prepare<[number],FeedbackInterface>(
        `SELECT name,feedback,rating FROM feedback WHERE productId = ?`
    )
    const result =feedback.all(productId)
    return result;
}

export const deleteFeedback=(id:number):boolean=>{
    const feedback=db.prepare<[number],{changes:number}>(
        `DELETE FROM feedback WHERE id = ?`
    )
    const result=feedback.run(id)
    if (result.changes === 0) {
    return false;
  }
  return true;
}

export default {
    createFeedback,
    getAllFeedbacks,
    getFeedbackByProduct,
    deleteFeedback
}