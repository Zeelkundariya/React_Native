const mongoose = require("mongoose");

async function connectDb(){
    mongoose.connect("mongodb://localhost:27017")
    .then(()=> console.log("Connected mongodb successfully"))
    .catch((err) => console.log(err)
    
    )
}

module.exports = connectDb;