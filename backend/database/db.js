import mongoose, { mongo } from "mongoose";
import { defaultAdmin } from "../controllers/adminControllers.js";
const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{dbName:"JNexJob",})
        await defaultAdmin();
        console.log("Connected")
    }   
    catch(error){
        console.log(error)

    }
}

export default connectDb