import express, { response } from 'express'
const router=express.Router()

import connectDB from '../db/conn.js';
import axios from 'axios';
// const mongoose=require('mongoose')
// import author from "../server/router/auth.js"

connectDB().then((res)=>{})
.catch((err)=>{})

// const User=require(

import User from "../models/UserSchema.js" 

import dotenv from 'dotenv'

dotenv.config();



let arr_m=["What is Your Name"];
let arr_u=["My Name is Amit"];

// week array

const weekDay ={
    'Sun':0,
    'Mon':1,
    'Tue':2,
    'Wed':3,
    'Thu':4,
    'Fri':5,
    'Sat':6
}



const generateDocument = async(data) =>{

    let response;

    try{
        

        response= {success:true,message:"The collection is created"}
        
    }
    catch(err){
        response = {success:false,message:err.message};
    }

    return response;
}


// the user data we require from frontend

router.post("/",async(req,res)=>{
    const dataa = req.body;
    const tokens = "token";
    const progress = [[23,43],[70]];

    const week_day = weekDay[(new Date).toDateString().slice(0,3)] 

    console.log("week: ",week_day);

    // console.log("dataa: ",dataa)

    let response;
    // const response= await generateDocument(dataa)

    // fetch the document which has similar 

    const result = await User.find({weekNo:week_day});

    console.log("result: ",result[0])

    if(result[0]){
        const fetchedDocument = result[0];
        const id = fetchedDocument._id;
        const newModel = fetchedDocument.model
        const newUser = fetchedDocument.user;

         (newModel[newModel.length-1]).push(arr_m);

         (newUser[newUser.length-1]).push(arr_u);

        const updating = await User.findByIdAndUpdate(id,{"model":newModel,"user":newUser},{ // it may throw error as updating two things at a time
            new:true
        });
       

        console.log("after updating: ",updating);

        
    } else {
        // if we don't find the 

        let newDay = [];

        if(week_day == 0){ // new week has started 

            // generate new document

           const model = [];
           model.push([arr_m]);
           const user = [];
           user.push([arr_u]);

           const progress = [[]];

           const tokens="token";
           const weekNo = week_day;

          const updating = await generateDocument({model,user,progress,tokens,weekNo});

          console.log("updating new Document: ",updating);

          response = {
            success:true,
            message:"placed"
          }
        }
        try {
            
        const result = await User.find({weekNo:week_day-1});
        const fetchedDocument = result[0];

        const id = fetchedDocument._id;
        // have to make a new array

        const newModel = fetchedDocument.model;
        const newUser = fetchedDocument.user;
        
        const newDayModel = [];
        newDayModel.push(arr_m);
        newModel.push(newDayModel)

        const newDayUser = [];  
        newDayUser.push(arr_u);
        newUser.push(newDayUser)

        const updating = await User.findByIdAndUpdate(id,{"weekNo":week_day,"model":newModel,"user":newUser,"progress":[[]]},{ // it may throw error as updating two things at a time
            new:true
        });

        console.log("after updating: ",updating);

        response = {
            success:true,
            message:"placed"
          }
     

        } catch (err) {
            console.log("error(while posting the data): ",err)

            response  = {
                success:false,
                message:err.message
            }

            
        }
        
    }
    

    if(response.success){
        res.status(200).json(response);
    }
    else res.status(400).json(response);


    
})

export default router;



// {
//     "model":[[["amit","20"],["Fine","AI"]],[["20","Yash"],["Fine","AI"]]],
    
//     "user":[[["what is your name","what is your age"],["How are you","Who are you"]],[["What is Your age","What is Your Name"],["How are you","Who are you"]]],
    
//     "progress":[[20,40],[30,50],[40,60],[50,60]],
    
//     "weekNo":3,
    
//     "tokens":["amitk"]
//   }


// if you find any grammatical errors in this sentence under double quotes "Hello from the Amit's Router Side" , let me know about those parts of line which has the error and also provide the improved version of the same sentence.The grammatical error and the improved version should be separated by an empty line between them
