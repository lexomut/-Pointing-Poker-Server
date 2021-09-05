import mongoose from "mongoose"

const Player = new mongoose.Schema({
  status: {type: String, required: true},
  name: {type: String, required: true},
})
export default mongoose.model("Player", Player);