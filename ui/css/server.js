const { MongoClient } = require("mongodb");
const express = require("express");

const app = express();
app.use(express.json());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // 👇 TYPE IT HERE
    const db = client.db("userdb");
    const users = db.collection("users");

    // Example route
    app.post("/register", async (req, res) => {
      const { username, password } = req.body;

      await users.insertOne({ username, password });
      res.send("User Registered");
    });

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  } catch (err) {
    console.log(err);
  }
}

startServer();
