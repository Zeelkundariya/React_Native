const user = require("../models/user.models");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
async function loginUser(req , res){
    const {name , password} = req.body;
    const user1 = await user.findOne({name : name});
    if(!user1){
        res.status(404).json({msg : "User does not exist. Register once to access" , success : false})
    }

    const comparePassword =await  bcrypt.compare(password , user1.password);

    if(comparePassword){
      const token =  await generateToken(user1._id);
      console.log( "In login",token);
      
        res.status(200).json({msg :  "You can access application now" , success : true , token})
    }
    res.status(400).json({msg : "Password wrong " , success : false});
}

module.exports = loginUser;