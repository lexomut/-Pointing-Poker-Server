import mongoose from "mongoose";

const Player = new mongoose.Schema({
  status: { type: String, required: true },
  firstName: { type: String, required: true },
  lastNme: String,
  jobPosition: String,
  avatarUrl: String,
});
export default mongoose.model("Player", Player);
