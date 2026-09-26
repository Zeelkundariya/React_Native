// const User = require("../models/User");

// const register = async(req, res)=>{
//     try{
//         const {email , password} = req.body;

//         if(!email || !password){
//             return res.status(400).json({
//                 message:"Enter valid email and password"
//             })
//         }

//         const existingUser = await User.findOne({email})

//         if(!existingUser){
//             return res.status(400).json({
//                 message:"Email already exist"
//             })
//         }

//         const User = await User.create({
//             email,
//             password
//         })
//         return res.status(201).json({
//             message:"Registration successfully done"
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             message:"Server Error"
//         })
//     }
// }


// const login = async(req, res)=>{
//     try{
//         const {email, password}= req.body;
        
//         const User = await User.findOne({
//             email,
//             password
//         })

//         if(!User){
//             return res.status(400).json({
//                 message:"Invalid email or password"
//             })
//         }

//         res.json({
//             message:"Sucessfully login"
//         })
//     }

//     catch(error){
//         return res.status(500).json({
//             message:"Server Error"
//         })
//     }
// }


// module.exports = {register, login}