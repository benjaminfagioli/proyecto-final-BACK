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

    hasOwner: {
      type: Object,
      default: { 0: false },
    },

    isBusy: {
      type: Object,
      default: false,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },

    images: Array,
  },
  {
    timestamps: true,
  }
);

export default model("Rooms", newRoom);
