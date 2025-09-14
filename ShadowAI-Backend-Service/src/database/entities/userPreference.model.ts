import mongoose from "mongoose";

const userPreferencschema = new mongoose.Schema({
    userPreference:{
        type:[String],
        required:[true,`Preference is missing`]
    }
})
const userPreferenceModel= mongoose.model("User-Preference",userPreferencschema)
export default userPreferenceModel