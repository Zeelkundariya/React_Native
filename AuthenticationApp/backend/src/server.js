require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });


// Auth routes
app.use("/api/auth", authRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGODB_URI)
// .then(()=>{
//     console.log("MONGODB is connected successfully")
// })
// .catch((error)=>{
//     console.log("MONGODB is not connected succesfully")
// })

// app.route("api/auth", authRoutes);

// //test route
// app.get("/",(req, res)=>{
//     res.send("server is running")
// })


// app.listen(5000,()=>{
//     console.log("Server is running on 5000 Port")
// })