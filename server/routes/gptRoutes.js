import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openai = new OpenAIApi(configuration);

router.route("/").get(async (req, res) => res.send("I have woken up"));

router.route("/").post(async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("before api call")
    const data = await openai.createCompletion({model: "text-davinci-003", max_tokens: 1000, prompt});
    console.log(data.data)
    const interpretation = data.data
    res.status(200).json(interpretation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error processing the request"});
  }
});

export default router;
