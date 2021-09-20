import mongoose from "mongoose";

const Player = new mongoose.Schema({
  // status: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  jobPosition: String,
  role: String,
  imgSrc: String,
  userID: String,
  initials: String,
});
export default mongoose.model("Player", Player);
