const jwt = require("jsonwebtoken");
const secretKey = "MYsecretkeyjson";

async function generateToken(userId){
    const token = jwt.sign(
        {userId} ,
        secretKey ,
        {expiresIn : "7d"}
    )
    console.log(token);
    
    return token;
}

module.exports = generateToken;