import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  status: { type: String, required: true },
  users: Array,
  onlineUsers: Array,
  chatMessages: { type: Array, required: true },
  gameID: String,
});
export const Game = mongoose.model("Game", GameSchema);
