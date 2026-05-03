import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import db from "./config/db";
import userRoutes from "./routes/UserRoutes";
import productRoutes from "./routes/ProductRoutes";
import productVariantRoutes from "./routes/ProductVariantRoutes";
import OrderRoutes from "./routes/OrderRoutes";
import OrderItemsRoutes from "./routes/OrderItemsRoutes"
import cartItemsRoutes from "./routes/CartItemsRoutes"
import contactUsRoutes from "./routes/ContactUsRoutes"
import FeedbackRoutes from "./routes/FeedbackRoutes"


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/variants", productVariantRoutes);
app.use("/order", OrderRoutes);
app.use("/orderItem", OrderItemsRoutes);
app.use("/cart", cartItemsRoutes);
app.use("/contact", contactUsRoutes);
app.use("/feedback", FeedbackRoutes);



app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Somewear API");
});

const Port =process.env.port!
app.listen(Port, () => {
  console.log("JWT:", process.env.db_path);
  console.log("Server started");
});

