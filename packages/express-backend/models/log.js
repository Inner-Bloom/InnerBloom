import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      required: true,
      trim: true,
    },
    sleep: String,
    eat: String,
    Exercise: Boolean,
    Relationships: String,
    Time: Date
  }
);

export default LogSchema;