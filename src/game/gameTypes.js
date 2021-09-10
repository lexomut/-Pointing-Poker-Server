import mongoose from "mongoose";

const Game = new mongoose.Schema({
  status: { type: String, required: true },
  users: Array,
});
export default mongoose.model("Game", Game);
