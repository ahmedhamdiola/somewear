import express from "express";
import cors from "cors";
import db from "./config/db";
import productRoutes from "./routes/ProductRoutes";
import productVariantRoutes from "./routes/ProductVariantRoutes";
import userRoutes from "./routes/UserRoutes";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/variants", productVariantRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Somewear API");
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
