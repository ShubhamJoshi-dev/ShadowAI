import mongoose, { Mongoose } from "mongoose";

const imageschema= new mongoose.Schema({
    image:{
        type:String,
        require:[true,`Image is missing `]
    }
})

const imageModel= mongoose.model('Image',imageschema)
export default imageModel