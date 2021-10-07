import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  ext: String,
  img: {
    contentType: String,
    data: Buffer,
  },
});
export const Image = new mongoose.model("Image", ImageSchema);
