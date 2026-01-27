import mongoose from "mongoose";

export const databaseConnection = async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/day7and8")
        console.log("Database connected Successfully..")
    }catch(error){
        console.log("Database connection failded..", error);
    }
}