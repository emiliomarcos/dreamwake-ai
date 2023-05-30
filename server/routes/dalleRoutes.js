import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openAI = new OpenAIApi(configuration);

router.route("/").get(async (req, res) => res.send("DALLE has woken up"));

router.route("/").post(async (req, res) => {
  const { imagePrompt } = req.body;

  try {
    const data = await openAI.createImage({prompt: imagePrompt});
    const image = data.data;
    console.log(image);
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error processing the request"});
  }
})

export default router;
