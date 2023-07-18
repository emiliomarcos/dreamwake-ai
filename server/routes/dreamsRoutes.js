import { v2 as cloudinary } from "cloudinary";
import { Router } from "express";
import Dream from "../models/dream.js";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
    const { keywords, mainOutput, imageUrl, bulletsOutput, userId, isPublic } = req.body;
    const image = await cloudinary.uploader.upload(`data:image/png;base64,${imageUrl}`, {folder: "dreamwake-ai"});

    const newDream = await Dream.create({keywords, mainOutput, imageUrl: image.url, bulletsOutput, userId, isPublic});
    console.log("Dream created successfully")
    res.status(200).json({ newDream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create dream" });
  }
});

export default router;
