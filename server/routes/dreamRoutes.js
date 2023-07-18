import { Router } from "express";
import Dream from "../models/dream.js";
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();

router.route("/").get(async (req, res) => res.send("A dream has started"));

router.route("/").patch(async (req, res) => {
  const { id, isPublic } = req.body;

  try {
    const updatedDream = await Dream.findByIdAndUpdate(id, { isPublic });
    res.status(200).json({ updatedDream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update dream" });
  }
})

router.route("/").delete(async (req, res) => {
  const { id } = req.body;

  try {
    const deletedDream = await Dream.findByIdAndDelete(id);
    res.status(200).json({ deletedDream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete dream" });
  }
})

export default router;
