import { Schema, model } from "mongoose";

const DreamSchema = new Schema({
  keywords: { type: String, required: true },
  bulletsOutput: { type: Array, required: false },
  mainOutput: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, default: null },
  isPublic: { type: Boolean, required: true}
});

const Dream = model("Dream", DreamSchema);

export default Dream;
