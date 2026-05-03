import { Request, Response } from 'express';
import FeedbackService from '../services/FeedbackService';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/AuthMiddleWare';
import ProductRepository from '../repository/ProductRepository';

export const createFeedbackController = async(req: Request, res: Response) => {
    try{
        const feedback= await FeedbackService.createFeedbackService(req.body)
    return successResponse(res,feedback,"Feedback created successfully",201)
    }catch(error){
        return errorResponse(res,error,"Failed to create feedback",400)
    }
}


export const getAllFeedbacksController = async(req: Request, res: Response) => {
    try{
        const feedback= await FeedbackService.getAllFeedbacksService()
    return successResponse(res,feedback,"Feedbacks retrieved successfully")
    }catch(error){
        return errorResponse(res,error,"Failed to retrieve feedbacks",400)
    }
}


export const getFeedbackByProductIdController = async(req: Request, res: Response) => {
    try{
        const productId=Number(req.params.productId)
        const feedback= await FeedbackService.getFeedbackByProductIdService(productId)
    return successResponse(res,feedback,"Feedback retrieved successfully")
    }catch(error){
        return errorResponse(res,error,"Failed to get feedback",400)
    }
}


export const deleteFeedbackController = async(req: Request, res: Response) => {
    try{
        const id =Number(req.params.id)

        const feedback= await FeedbackService.deleteFeedbackService(id)
    return successResponse(res,feedback,"Feedback deleted successfully")
    }catch(error){
        return errorResponse(res,error,"Failed to delete feedback",400)
    }
}

export default {
    createFeedbackController,
    getAllFeedbacksController,
    getFeedbackByProductIdController,
    deleteFeedbackController
}