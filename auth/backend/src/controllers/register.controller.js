const user = require("../models/user.models");
const bcrypt = require("bcrypt")
async function registerUser (req , res){
    const {name , password} = req.body;
    console.log(name);
    
    const user1 = await user.findOne({name : name});
    if(user1){
        res.status(404).json({ msg : "User already exist" , success : false})
    }

    const hashPassword = await bcrypt.hash(password , 10);

    const newUser = await user.create({name : name , password : hashPassword});
    console.log(newUser);
    
    res.status(201).json({msg : "User successfully registered" , success : true , newUser});

}

module.exports = registerUser
