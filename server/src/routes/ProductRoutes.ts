import productcontroller from "../controllers/ProductController";
import express from "express";
import authMiddleWare from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";
import upload from "../middleware/MulterMiddleWare";

const router = express.Router();

router.post("/", authMiddleWare, RoleMiddleware("admin"),upload.single("image"), productcontroller.createProductController,);
router.get("/product/:id", productcontroller.getProductByIdController,);
router.get("/", productcontroller.getAllProductsController,);
router.get("/category", productcontroller.getCategoriesAndSubcategoriesController,);
router.get("/featured", productcontroller.getFeaturedProductsController);
router.get("/best-sellers", productcontroller.getBestSellersProductsController);
router.put("/:id", authMiddleWare, RoleMiddleware("admin"),upload.single("image"), productcontroller.updateProductController,);
router.delete("/:id", authMiddleWare, RoleMiddleware("admin"), productcontroller.deleteProductController,);

export default router;
