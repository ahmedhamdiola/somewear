export const successResponse = (res: any, data: any, message: string = "Success", statusCode: number = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res: any, error: any, message: string = "Error", statusCode: number = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error ?.message || error
    });
};