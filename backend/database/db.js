import mongoose, { mongo } from "mongoose";
const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{dbName:"JNexJob",})
        console.log("Connected")
    }   
    catch(error){
        console.log(error)

    }
}

export default connectDb