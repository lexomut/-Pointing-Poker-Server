import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  status: { type: String, required: true },
  users: Array,
  onlineUsers: Array,
  chatMessages: { type: Array, required: true },
});
export const Game = mongoose.model("Game", GameSchema);
