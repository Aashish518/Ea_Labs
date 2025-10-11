const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema(
    {
        locationName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
