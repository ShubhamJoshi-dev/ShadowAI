import mongoose from "mongoose";

const passwordTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "The Token is Required"],
  },
  name: {
    type: String,
    required: [true, "The Name is Required"],
  },
  expiredAt: {
    type: Date,
    required: [true, "The ExpiredAt is Required"],
  },
});

const passwordTokenModel = mongoose.model("PasswordToken", passwordTokenSchema);
export default passwordTokenModel;
