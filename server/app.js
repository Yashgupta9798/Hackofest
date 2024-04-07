import express, { request } from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cors());

import axios from 'axios';


import httpAdapter from 'axios/lib/adapters/http.js';

// Use the HTTP adapter for streaming
axios.defaults.adapter = httpAdapter;

// promises version

function responseFromModel(body){



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
                    // console.log("respFromModel: ",respFromModel)
                }
            });
        });

         response.data.on('end', () => {
            console.log('Stream ended');
            // return respFromModel;
            res(respFromModel);
        });
        })
        .catch(err=> {throw new Error(err.message)})


})}

app.post('/', async (req, response) => {
    // {"prompt"}
    console.log("body: ", req.body);

    const prompt = req.body?.prompt;

    const payload = {prompt,"model":"mistral"}

    responseFromModel(payload).then( (res) => {
        
        console.log("response I got: ",res);
        response.status(200).json({
            "success":true,
            "message":res
        })
    }).catch((err) => {

        console.log("err: ",err)
         res.status(500).json({
            "success":false,
            message:err.message
        })
    });

    

   
});


app.listen(3000, "0.0.0.0", () => {
    console.log("the server is running at 3000");
});