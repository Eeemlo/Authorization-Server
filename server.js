/*
* Applikation för laboration 4 i kursen DT207G - Backend-baserad webbutveckling vid Mittuniversitetet.
*/

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);

//Starta applikation
app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
});