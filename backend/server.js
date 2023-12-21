const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect Database
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log("Server running on PORT " + PORT);
    });
}).catch((err) => console.log(err))

//Middleware
app.use(express.json()) //Parse incoming JSON request
app.use(express.urlencoded({extended: false})); //This middleware allows Express to parse data sent in this format and make it available in the request.body object.
app.use(cors({
    origin: ["http://localhost:3000", "https://task-manager-app.onrender.com"]
}))

app.use(taskRoutes);



app.get("/", (req, res) => {
    res.send("Home Page");
});