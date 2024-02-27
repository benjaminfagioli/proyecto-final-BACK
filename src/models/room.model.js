import { Schema, model } from "mongoose";

const newRoom = new Schema({
  number: Number,
  environments: Number,
  isBusy: {
    type: Boolean,
    default: false,
  },
  hasPool: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
});

export default model("Rooms", newRoom);
