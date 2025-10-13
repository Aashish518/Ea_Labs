const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        companyName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/^\+?\d{7,15}$/, "Please enter a valid phone number"],
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        pincode: {
            type: String,
            required: true,
            trim: true,
            match: [/^[0-9]{4,8}$/, "Please enter a valid pincode"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
