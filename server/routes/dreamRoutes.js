import { Router } from "express";
import Dream from "../models/dream.js";

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    const dreams = await Dream.find({});
    res.status(200).json(dreams);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "No dreams were found"})
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { keywords, mainOutput, imageUrl, bulletsString } = req.body;

    const newDream = await Dream.create({keywords, mainOutput, imageUrl, bulletsOutput: bulletsString});
    console.log("Dream created successfully")
    res.status(200).json({newDream});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create dream" });
  }
});

export default router;
