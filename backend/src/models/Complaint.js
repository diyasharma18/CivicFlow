import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
    {
        complaintId: {
            type: String,
            required: true,
            unique: true
        },

        issueType: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        photo: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Submitted",
                "Verified",
                "Checking",
                "Working",
                "Resolved"
            ],
            default: "Submitted"
        },

        escalated: {
            type: Boolean,
            default: false
        },

        escalatedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Complaint", complaintSchema);