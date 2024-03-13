import config from "./config/config.js"
import mongoose from "mongoose";

const {MONGODB_URI} =  config;

async function dbConnect(){
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("DB connect successfully")
    } catch (error) {
       console.log(error) 
    }
}
dbConnect();