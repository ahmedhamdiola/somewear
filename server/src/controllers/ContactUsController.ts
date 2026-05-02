import { Request, Response } from "express"
import { successResponse, errorResponse } from "../utils/response";
import ContactUsService from "../services/ContactUsService";


//create contact us
export const createContactUsController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const contactUs = await ContactUsService.createContactUsService(data);
        return successResponse(res, contactUs, "contact us created successully", 201)
    } catch (error) {
        return errorResponse(res, error, "Failed to create contact us", 400)
    }
}

export const getContactUsController = async (req: Request, res: Response) => {
    try {
        const contactUs = await ContactUsService.getContactUsService(Number(req.params.id));
        return successResponse(res, contactUs, "contact us retrieved successfully")
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve contact us", 400)
    }
}

export const getAllContactUsController = async (req: Request, res: Response) => {
    try {
        const contactUs = await ContactUsService.getAllContactUsService();
        return successResponse(res, contactUs, "contact us retrieved successfully")
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve contact us", 400)
    }
}