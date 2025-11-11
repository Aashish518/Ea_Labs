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
            required: true,
        },
        include: {
            type: [String],
            required: true,
            default: [],
        },
        for: {
            type: [String],
            required: true,
            default: [],
        },
        reportInTime: {
            type: String,
            required: true,
        },
        overview: {
            type: String,
            required: true,
        },
        testComponent: {
            type: [String],
            required: true,
            default: [],
        },
        prerequisites: {
            type: [String],
            required: true,
            default: [],
        },
        faqs: {
            type: [
                {
                    question: { type: String,required: true, },
                    answer: { type: String,required: true, },
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
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Test", testSchema);
