const mongoose = require("mongoose");

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
            default: "Submitted"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);