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
            required: true,
            trim: true,
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
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TestMenu", testMenuSchema);