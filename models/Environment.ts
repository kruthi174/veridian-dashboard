import mongoose from "mongoose";

const EnvironmentSchema = new mongoose.Schema({
  village: String,
  waterQuality: Number,
  airQuality: Number,
  forestHealth: Number,
  alert: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Environment ||
  mongoose.model("Environment", EnvironmentSchema);