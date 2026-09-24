const app = require("./app");
const connectDb = require("./config/db");

async function startServer(){
    await connectDb();

    app.listen(3000 , ()=>{
        console.log("Server started on localhost:3000");
        
    })
}
console.log("Index file");

startServer();