import express from "express";
import cors from "cors";
import db from "./config/db";
import userRoutes from "./routes/UserRoutes";
import productRoutes from "./routes/ProductRoutes";
import productVariantRoutes from "./routes/ProductVariantRoutes";
import OrderRoutes from "./routes/OrderRoutes";
import OrderItemsRoutes from "./routes/OrderItemsRoutes"
import cartRoutes from "./routes/CartRoutes";
// import cart


const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/variants", productVariantRoutes);
app.use("/order", cartRoutes);
app.use("/orderItem",OrderItemsRoutes);
app.use("/cart", cartRoutes);


app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Somewear API");
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

