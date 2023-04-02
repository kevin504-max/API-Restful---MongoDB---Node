// Initial config
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// JSON / middleware reading method 
app.use(
    express.urlencoded({
        extended: true
    }),
);
app.use(express.json());    

// API routes
const personRouter = require("./routes/personRoutes");
app.use("/person", personRouter);

// Initial route / endpoint
app.get("/", (req, res) => {
    //show req
    res.json({ message: "Hello express!"});
});


// Deliver a port
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ha9ezh1.mongodb.net/apidatabase?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(3000);
    })
    .catch((err) => {console.log(err)});