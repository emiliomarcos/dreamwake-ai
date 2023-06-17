import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openAI = new OpenAIApi(configuration);

router.route("/").get(async (req, res) => res.send("Lucid dreams have started"));

router.route("/").post(async (req, res) => {
  const { lucidPrompt } = req.body;

  try {
    const data = await openAI.createCompletion({model: "text-davinci-003", max_tokens: 1000, prompt: lucidPrompt});
    const tips = data.data
    res.status(200).json(tips);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "There was an error processing the request"});
  }
});

export default router;
