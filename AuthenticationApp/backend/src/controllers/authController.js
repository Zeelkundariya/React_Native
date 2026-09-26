const User = require("../models/User");

// Register
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        console.log("gknlgknegke")
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            email,
            password
        });

        res.status(201).json({
            message: "Registration successful",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    register,
    login
};



// const User = require("../models/User");

// const register = async(req, res)=>{
//     try{
//         const {email, password}= req.body;

//         if(!email || !password){
//             return res.status(400).json({
//                 message:"Enter email and password"
//             })
//         }

//         const existingUser = await User.FindOne({emial});

//         if(existingUser){
//             return res.status(400).json({
//                 message:"Email already exist"
//             })
//         }

//         const User = await User.create({
//             email,
//             password
//         })
//         return res.status(201).json({
//             message:"Registration SUccessfully"
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
//         const {email, password} = req.body;

//         const User = await User.FindOne({
//             email,
//             password
//         })

//         if(!User){
//             return res.status(400).json({
//                 message:"User already exits"
//             })
//         }

//         res.json({
//             message:"Login Successfully"
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             message:"Server Error"
//         })
//     }
// }


// module.exports = {register, login}