const mongoose = require("mongoose");
const { Schema } = mongoose;

const testCategorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("TestCategory", testCategorySchema);
