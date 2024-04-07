import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();
const DB=process.env.DATABASE;
async function connectDB(){
    
mongoose.connect(DB).then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log("Connection not successful")
})
}

export default connectDB;