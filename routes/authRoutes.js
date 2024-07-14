const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database: " + error);
});

// Användarmodell
const User = require("../models/User");

// Middleware för att verifiera JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Hämta alla användare
router.get("/users", async (req, res) => {
    try {
        let result = await User.find({});
        console.log(result);
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Kontrollera om användarnamn är upptaget
router.get("/users/user", async (req, res) => {
    try {
        const { username } = req.query;

        // Kontrollera användarnamnet från query
        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input (vidareutveckla med t ex minimumlängd på lösen och användarnamn)
        if (!username || !password) {
            return res.status(400).json({ error: "invalid input - send username and password" });
        }
        // Correct - save user
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input (vidareutveckla med t ex minimumlängd på lösen och användarnamn)
        if (!username || !password) {
            return res.status(400).json({ error: "invalid input - send username and password" });
        }

        // Finns användaren?
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" });
        }

        // Kontrollera lösenord
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" });
        } else {
            // Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            const response = {
                message: "Användare inloggad!",
                token: token
            };
            res.status(200).json({ response });
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Skyddad route
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Detta är skyddad data", username: req.user.username });
});

module.exports = router;