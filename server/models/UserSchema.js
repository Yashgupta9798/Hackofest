// const mongoose = require("mong/oose");

import mongoose from 'mongoose'

// Assuming 'single' and 'prog' are defined elsewhere as valid schemas
// For demonstration, I'll define them here
const singleSchema = new mongoose.Schema({
    type: String,
    // required: true
});

const progSchema = new mongoose.Schema({
    type: Number,
    // required: true
});

const UserSchema = new mongoose.Schema({
    model: {
        type: [[[String]]], /// Assuming you want an array of 'single' objects
        required: true
    },
    user: {
        type: [[[String]]], // Assuming you want an array of 'single' objects
        required: true
    },
    progress: {
        type: [[Number]], // Assuming you want an array of 'prog' objects
        required: true
    },
    weekNo:{
        type:Number,
        required: true
    },
    tokens: [{
            type: String,
            required: true
    }]
}, { timestamps: true });

const User = mongoose.model("USER", UserSchema);

export default User;

/**
 * 
 * Problems to show
 * 
 * 1. the 3d array becomes - 2d Array
 */