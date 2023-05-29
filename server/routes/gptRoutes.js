import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();

const configuration = new Configuration({apikey: process.env.OPENAI_API_KEY});
const openAI = new OpenAIApi(configuration);

router.route("/").get(async (req, res) => res.send("I have woken up"));

router.route("/").post(async (req, res) => {
  console.log(req.body);
  const { prompt } = req.body;

  try {
    const interpretation = await openAI.createCompletion({model: "text-davinci-003", max_tokens: 100, prompt});
    res.status(200).json(interpretation);
  } catch (error) {
    console.error(error);
  }
});

export default router;
