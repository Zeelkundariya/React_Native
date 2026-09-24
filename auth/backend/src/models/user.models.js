const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {type : String , required : true , unique :  false},
    password : {type : String , required : true}
})

const user = mongoose.model("login" , userSchema);

module.exports = user;