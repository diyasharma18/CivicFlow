require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const connectDB = require("./src/config/db");
const Complaint = require("./src/models/complaint");
const authRoutes = require("./src/routes/authRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");
const adminMiddleware = require("./src/middleware/adminMiddleware");

const app = express();

/* FILE UPLOAD */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage
});

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

/* HOME */

app.get("/", (req, res) => {
    res.json({
        message: "CivicFlow backend is running!"
    });
});

/* API STATUS */

app.get("/api/status", (req, res) => {
    res.json({
        status: "success",
        message: "CivicFlow API is connected!"
    });
});

/* CREATE COMPLAINT */

app.post("/api/complaints", upload.single("photo"), async (req, res) => {
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
            location,
            photo: req.file
                ? `/uploads/${req.file.filename}`
                : ""
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

/* GET ALL COMPLAINTS - ADMIN */

app.get("/api/complaints", async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .sort({ createdAt: -1 });

        res.json(complaints);

    } catch (error) {
        console.error(
            "Failed to fetch complaints:",
            error.message
        );

        res.status(500).json({
            message: "Failed to fetch complaints."
        });
    }
});

/* UPDATE COMPLAINT STATUS */

app.patch(
    "/api/complaints/:complaintId/status",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const { status } = req.body;

            const allowedStatuses = [
                "Submitted",
                "Verified",
                "Checking",
                "Working",
                "Resolved"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid complaint status."
                });
            }

            const complaint = await Complaint.findOneAndUpdate(
                {
                    complaintId: req.params.complaintId
                },
                {
                    status: status
                },
                {
                    new: true
                }
            );

            if (!complaint) {
                return res.status(404).json({
                    message: "Complaint not found."
                });
            }

            res.json({
                message: "Complaint status updated successfully!",
                complaint: complaint
            });

        } catch (error) {
            console.error(
                "Status update failed:",
                error.message
            );

            res.status(500).json({
                message: "Failed to update complaint status."
            });
        }
    }
);

/* GET SINGLE COMPLAINT */

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

/* ESCALATE COMPLAINT */

app.patch(
    "/api/complaints/:complaintId/escalate",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const complaint = await Complaint.findOneAndUpdate(
                {
                    complaintId: req.params.complaintId
                },
                {
                    escalated: true,
                    escalatedAt: new Date()
                },
                {
                    new: true
                }
            );

            if (!complaint) {
                return res.status(404).json({
                    message: "Complaint not found."
                });
            }

            res.json({
                message: "Complaint escalated successfully!",
                complaint: complaint
            });

        } catch (error) {
            console.error(
                "Complaint escalation failed:",
                error.message
            );

            res.status(500).json({
                message: "Failed to escalate complaint."
            });
        }
    }
);

/* DATABASE */

connectDB();

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `CivicFlow backend running on port ${PORT}`
    );
});