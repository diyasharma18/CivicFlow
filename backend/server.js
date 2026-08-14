require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const Complaint = require("./src/models/Complaint");

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

/* CREATE COMPLAINT */

app.post("/api/complaints", async (req, res) => {
    try {
        const {
            issueType,
            description,
            location
        } = req.body;

        if (!issueType || !description || !location) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        const complaintId =
            "CF" + Math.floor(1000 + Math.random() * 9000);

        const complaint = await Complaint.create({
            complaintId,
            issueType,
            description,
            location
        });

        res.status(201).json({
            message: "Complaint submitted successfully!",
            complaintId: complaint.complaintId
        });

    } catch (error) {
        console.error(
            "Complaint submission failed:",
            error.message
        );

        res.status(500).json({
            message: "Failed to submit complaint."
        });
    }
});

/* GET COMPLAINT */

app.get("/api/complaints/:complaintId", async (req, res) => {
    try {
        const complaint = await Complaint.findOne({
            complaintId: req.params.complaintId
        });

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found."
            });
        }

        res.json(complaint);

    } catch (error) {
        console.error(
            "Complaint fetch failed:",
            error.message
        );

        res.status(500).json({
            message: "Failed to fetch complaint."
        });
    }
});

connectDB();

app.listen(PORT, () => {
    console.log(
        `CivicFlow backend running on http://localhost:${PORT}`
    );
});