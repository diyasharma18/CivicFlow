require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const password = "Admin@123";

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name: "CivicFlow Admin",
            email: "admin@civicflow.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully!");
        console.log("Email:", admin.email);
        console.log("Password:", password);

        await mongoose.disconnect();

    } catch (error) {
        console.error("Failed to create admin:", error.message);
    }
};

createAdmin();