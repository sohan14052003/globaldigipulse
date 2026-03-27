const User = require('./models/User');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // In a real app, you'd hash this!
});

module.exports = mongoose.model('User', UserSchema);
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Links to the file you just created
const app = express();

// Middleware: This allows your server to understand the JSON data 
// sent from Postman or your Frontend
app.use(express.json());

// 1. Connect to MongoDB
// Replace 'myDatabase' with whatever you want to name your DB
mongoose.connect('mongodb://127.0.0.1:27017/myDatabase')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB:", err));

// 2. The Registration Route
// This is what "listens" for the POST request to /register
app.post('/register', async (req, res) => {
    try {
        // Create a new user using the data sent in the request body
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        
        // Send a success response back to Postman or the Browser
        res.status(201).send("User registered successfully!");
        console.log("User Saved:", savedUser);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// 3. Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});