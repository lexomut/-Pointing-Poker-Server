import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  status: { type: String, required: true },
  users: Array,
  onlineUsers: Array,
  chatMessages: { type: Array, required: true },
  gameID: String,
  title: String,
  startTimer: Date,
  dealer: Object,
  issues: Array,
  cards: Array,
  selectedCards: Array,
  gameSettings: Object,
});
export const Game = mongoose.model("Game", GameSchema);
