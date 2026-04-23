import productcontroller from "../controllers/ProductController";
import express from "express";
import AuthMiddleWare from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";

const router = express.Router();

router.post("/products",AuthMiddleWare,RoleMiddleware("admin"),productcontroller.createProduct,);
router.get("/products/:id", productcontroller.getProductById);
router.get("/products", productcontroller.getAllProducts);
router.put("/products/:id",AuthMiddleWare, RoleMiddleware("admin"), productcontroller.updateProduct,);
router.delete("/products/:id",AuthMiddleWare,RoleMiddleware("admin"),productcontroller.deleteProduct,);

export default router;
