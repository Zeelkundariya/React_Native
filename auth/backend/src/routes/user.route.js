const express = require("express");
const user = require("../models/user.models");
const userRouting = express.Router();
const registerUser = require("../controllers/register.controller")
const loginUser = require("../controllers/login.controller");
userRouting.get("/" , (req , res)=>{
    console.log("Route called");
    
    res.status(200).json({msg : "User route called"})
})
userRouting.post("/register" , registerUser);
userRouting.post("/login" , loginUser);
module.exports = userRouting;