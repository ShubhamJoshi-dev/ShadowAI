import mongoose from "mongoose";

const tokenschema= new mongoose.Schema({
    token:{
        type:String,
        require:[true,`Token is missing`]
    },
    created_at:{
        type: Date,
        default:new Date()
    },
    x_correlation_id:{
        type:String
    },
    user_id:{
        type:String
    }
})

const tokenModel= mongoose.model('Token',tokenschema)
export default tokenModel