import express from "express";
import cors from "cors";
import { gptRoutes } from "./routes/index.js";
import { dalleRoutes } from "./routes/index.js";
import { connect } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: ["http://127.0.0.1:5173", "https://dreamwake-ai.vercel.app/", "https://dreamwake.ai"]
}))

app.use("/gpt", gptRoutes);
app.use("/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Server has woken up");
})

async function connectMongoDB() {
  try {
    await connect(process.env.MONGODB_STRING);
    console.log("MongoDB connection success");
  } catch (error) {
    console.error("MongoDB connection fail", error);
    process.exit(1);
  }
}

function startServer() {
  app.listen(5000, () => {
    console.log("Server is running on port http://localhost:5000");
  })
}

connectMongoDB().then(startServer);
