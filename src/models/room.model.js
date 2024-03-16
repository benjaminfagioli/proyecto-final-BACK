import { Schema, model } from "mongoose";

const newRoom = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },

    stars: {
      required: true,
      type: Number,
      min: 1,
      max: 3,
    },

    description: {
      type: String,
      minlength: 8,
      required: true,
    },

    properties: {
      type: Object,
      required: true,
    },

    reserves: {
      type: Array,
      default: [],
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
    images: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Rooms", newRoom);
