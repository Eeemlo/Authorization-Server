/*
* Routing för inloggning 
*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database..");
});

// Användarmodell
const User = require("../models/")

// Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input (vidareutveckla med t ex minimumlängd på lösen och användarnamn)
        if(!username || !password) {
            return res.status(400).json({ error: "invalid input - send username and password"});
        }

        //Correct - save user
        res.status(201).json({ message: "User created" });

    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input (vidareutveckla med t ex minimumlängd på lösen och användarnamn)
        if(!username || !password) {
            return res.status(400).json({ error: "invalid input - send username and password"});
        }

        // Kontrollera inloggningsuppgifter
        if(username === "Emma" && password === "Sigge") {
            res.status(200).json({message: "Login successful"})
        } else {
            res.status(401).json({error: "Invalid username and/or password"})
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;