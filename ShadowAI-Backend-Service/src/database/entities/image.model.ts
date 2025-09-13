import mongoose, { Mongoose } from "mongoose";

const imageschema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, `Image is Missing `],
  },
  imageIv: {
    type: String,
    required: [true, "Image IV is Missing"],
  },

  ImageKey: {
    type: String,
    required: [true, "Image Key is Missing"],
  },
});

const imageModel = mongoose.model("Image", imageschema);
export default imageModel;
