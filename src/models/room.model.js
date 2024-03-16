import { Schema, model } from "mongoose";

const newRoom = new Schema(
  {
    number: Number,

    stars: {
      type: Number,
      min: 1,
      max: 3,
    },

    description: String,

    properties: Object,

    reserves: {
      type: Array,
      default: [],
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
    images: Array,
    price: Number,
  },
  {
    timestamps: true,
  }
);

export default model("Rooms", newRoom);
