import mongoose, { Mongoose } from "mongoose";

const imageschema= new mongoose.Schema({
    image:{
        type:String,
        require:[true,`Image is missing `]
    },
      userProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserProfile",
      },
})

const imageModel= mongoose.model('Image',imageschema)
export default imageModel