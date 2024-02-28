import { Schema, model } from "mongoose";
import regexImage from "../helpers/regexImage.js";
const newRoom = new Schema({
  number: Number,

  stars: {
    type: Number,
    min: 1,
    max: 3,
  },

  description: String,

  isBusy: {
    type: Boolean,
    default: false,
  },

  userId: {
    type: Schema.Types.ObjectId,
  },

  isVisible: {
    type: Boolean,
    default: true,
  },

  images: Array,
});

export default model("Rooms", newRoom);
