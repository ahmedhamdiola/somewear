import express from "express";
import cors from "cors";
import db from "./config/db";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
