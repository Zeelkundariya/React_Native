const express = require("express");
const app = express();
const userRouting = require("./routes/user.route")
const cors = require("cors");
// app.use(express);
app.use(cors());
app.use(express.json());
console.log("App file called");

app.get("/" , (req,  res)=>{
    console.log("Route called");
    
    res.status(200).json({msg : "Tested"})
})
app.use("/api" , userRouting);
module.exports = app;