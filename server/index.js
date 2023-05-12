import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Server has woken up");
})

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
})
