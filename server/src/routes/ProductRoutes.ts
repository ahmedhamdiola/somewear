import productcontroller from "../controllers/ProductController";
import express from "express";
import authMiddleWare from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";

const router = express.Router();

router.post("/",authMiddleWare,RoleMiddleware("admin"),productcontroller.createProductController,);
router.get("/:id", productcontroller.getProductByIdController,);
router.get("/",productcontroller.getAllProductsController,);
router.get("/category", productcontroller.getCategoriesAndSubcategoriesController,);
router.get("/featured",productcontroller.getFeaturedProductsController);
router.get("/best-sellers",productcontroller.getBestSellersProductsController);
router.put("/:id",authMiddleWare, RoleMiddleware("admin"), productcontroller.updateProductController,);
router.delete("/:id",authMiddleWare,RoleMiddleware("admin"),productcontroller.deleteProductController,);

export default router;
