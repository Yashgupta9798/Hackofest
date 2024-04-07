import { Router } from "express";
import express, { response } from 'express'
const router=express.Router()

import connectDB from '../db/conn.js';
import axios from 'axios';

const weekDay ={
    'Sun':0,
    'Mon':1,
    'Tue':2,
    'Wed':3,
    'Thu':4,
    'Fri':5,
    'Sat':6
}

connectDB().then((res)=>{})
.catch((err)=>{})

// const User=require(

import User from "../models/UserSchema.js" 

import dotenv from 'dotenv'


dotenv.config();
const route = Router();

   
function responseFromModel(ele){

    // console.log("eel: ")

    const body = "if you find any grammatical errors in this sentence under double quotes "+ele+" , let me know about those parts of line which has the error and also provide the improved version of the same sentence.The grammatical error and the improved version should be separated by an empty line between them";


    return new Promise((res,rej)=>{
   
   
       let respFromModel = ""
      
           axios.post("http://localhost:11434/api/generate", body, {
               headers: { 
                   'Content-Type': 'application/json',
               },
               responseType: 'stream' // Set responseType to 'stream'
           })
           .then((response)=>{
                 // Handle the stream
           response.data.on('data', (chunk) => {
               const lines = chunk.toString().split('\n');
               lines.forEach(line => {
                   if (line) { // Ignore empty lines
                       const json = JSON.parse(line);
                          respFromModel += (json.response)
             
                   }
               });
           });
   
            response.data.on('end', () => {
               console.log('Stream ended');
               res(respFromModel);
           });
           })
           .catch(err=> {
            console.log("error: ",err)
            rej(err.message)
        })
   
   
   })}

// fetchingTheImporvedVersions
const fetchImprovedVersion = async (user)=>{
   return user.map(async (ele)=>{
       try {
        const newEle = await responseFromModel(ele);
        return newEle;
       } catch (err) {
        console.log("while fetching the response: ",err)

       }
    })

}


route.get("/",async (req,res)=>{
    
    
    let response;
    
    try {
        const week_day = weekDay[(new Date).toDateString().slice(0, 3)]
        // console.log("i am getting request")
        const result = await User.find({ weekNo: week_day });
        // console.log("i am getting once more")
        const fetchedDocument = result[0];

        console.log("fetchedDocument: ",fetchedDocument)

        const todayModel = fetchedDocument.model;
        const todayUser = fetchedDocument.user;


        const model = todayModel[todayModel.length-1];
        const user = todayUser[todayUser.length-1];

        console.log("model: ",model);
        console.log("user: ",user)
        const improved = fetchImprovedVersion(user);

        response = {
            success:true,
            message:{
                // model,
                // user,
                improved
            }
        }

        res.status(200).json(response);

    } catch (err) {

        response = {
            success:false,
            message:err.message
        }

        res.status(400).json(response)
        
    }

    


})

export default route;

// conversations