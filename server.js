/*
* Applikation för laboration 4 i kursen DT207G - Backend-baserad webbutveckling vid Mittuniversitetet.
*/

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);

// Skyddade routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route!" })
});

// Validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.status(401).json({ message: "Användare ej auktoriserad för denna route - token saknas!"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({message: "Ogiltig JWT"});

        req.username = username;
        next();
    })
}

//Starta applikation
app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
});