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

// router.route("/").post(async (req, res) => {
//   try {

//   } catch (error) {

//   }
// });

export default router;
