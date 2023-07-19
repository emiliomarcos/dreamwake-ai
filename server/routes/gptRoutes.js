import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openAI = new OpenAIApi(configuration);

router.route("/").get(async (req, res) => res.send("GPT has woken up"));

router.route("/").post(async (req, res) => {
  const { chatPrompt } = req.body;

  try {
    const data = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You are a futuristic dream interpretation tool that only provides positive outlooks."}, {"role": "user", "content": chatPrompt}],
      temperature: 0.85,
      max_tokens: 700
    });
    console.log(data.data);
    const interpretation = data.data;
    res.status(200).json(interpretation);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "There was an error processing the request"});
  }
});

export default router;
