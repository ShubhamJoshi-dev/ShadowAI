import mongoose from "mongoose";
import { USER } from "../../constant/roles.constant";
import { isMissingAttributeLog } from "../../utils/common.utils";

const userProfileSchema = new mongoose.Schema({
  userProfileName: {
    type: String,
    required: [true, isMissingAttributeLog("User Profile Name")],
  },
  primaryEmail: {
    type: String,
    required: [true, isMissingAttributeLog("Primary Email")],
  },
  secondaryEmail: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  userRole: {
    type: String,
    default: USER,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  isDeactivated: {
    type: Boolean,
    default: false,
  },

  deactivatedAt: {
    type: Date,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
   imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
});

const userProfileModel = mongoose.model("UserProfile", userProfileSchema);
export default userProfileModel;
