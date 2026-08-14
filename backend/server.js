require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "CivicFlow backend is running!"
    });
});

app.get("/api/status", (req, res) => {
    res.json({
        status: "success",
        message: "CivicFlow API is connected!"
    });
});

connectDB();

app.listen(PORT, () => {
    console.log(`CivicFlow backend running on http://localhost:${PORT}`);
});