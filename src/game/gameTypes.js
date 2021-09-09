import mongoose from "mongoose";

const Game = new mongoose.Schema({
  status: { type: String, required: true },
  players: Array,
});
export default mongoose.model("Game", Game);
