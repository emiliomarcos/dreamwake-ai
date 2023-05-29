import express from "express";
import cors from "cors";
import gptRoutes from "./routes/gptRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "http://127.0.0.1:5173/"
}))

app.use("/gpt", gptRoutes);

app.get("/", async (req, res) => {
  res.send("Server has woken up");
})

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
})
