const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        include: {
            type: [String],
            default: [],
        },
        for: {
            type: [String],
            default: [],
        },
        reportInTime: {
            type: String,
        },
        overview: {
            type: String,
        },
        testComponent: {
            type: [String],
            default: [],
        },
        prerequisites: {
            type: [String],
            default: [],
        },
        faqs: {
            type: [
                {
                    question: { type: String },
                    answer: { type: String },
                },
            ],
            default: [],
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TestCategory",
            required: true,
        },
        locations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Location",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Test", testSchema);
