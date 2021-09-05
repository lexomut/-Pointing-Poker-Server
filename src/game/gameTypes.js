import mongoose from "mongoose"

const Game = new mongoose.Schema({
  status: {type: String, required: true},
  players: {type: Array, required: true},
})
export default mongoose.model("Game", Game)