import { FeedbackInterface } from '../interfaces/FeedbackInterface';
import FeedbackRepository from '../repository/FeedbackRepository';
import { getProductById } from '../repository/ProductRepository';

export const createFeedbackService = (Feedback: FeedbackInterface): FeedbackInterface => {

    if(!Feedback.id || Feedback.id<=0){
        throw new Error("Invalid feedback ID")
    }

    if(!Feedback.userId || !Feedback.productId){
        throw new Error ("userId and productId are required")
    }
    
    return FeedbackRepository.createFeedback(Feedback);
}


export const getAllFeedbacksService = (): FeedbackInterface[] => {    
    return FeedbackRepository.getAllFeedbacks();
}


export const getFeedbackByProductIdService = (productId: number): FeedbackInterface[] => {

    if(!productId || productId<=0){
        throw new Error ("Invalid feedback productId")
    }
    
    return FeedbackRepository.getFeedbackByProduct(productId);
}


export const deleteFeedbackService = (id: number): boolean => {

    if(!id || id<=0){
        throw new Error ("Invalid feedback ID")
    }
    
    if(!FeedbackRepository.deleteFeedback(id)){
        return false
    } 
    return true; 
}

export default {
    createFeedbackService,
    getAllFeedbacksService,
    getFeedbackByProductIdService,
    deleteFeedbackService    
}