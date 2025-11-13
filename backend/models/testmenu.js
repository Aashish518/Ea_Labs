const mongoose = require("mongoose");
const { Schema } = mongoose;
const testMenuSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        sampleType: {
            type: String,
            trim: true,
            required: true,
        },
        sampleVolume: {
            type: String,
            required: true,
            trim: true,
        },
        testMethod: {
            type: String,
            required: true,
            trim: true,
        },
        turnaroundTime: {
            type: String,
            required: true,
            trim: true,
        },
        specialInstructions: {
            type: String,
            trim: true,
            required: true,
        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TestMenu", testMenuSchema);