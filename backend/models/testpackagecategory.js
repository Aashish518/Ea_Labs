// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const testItemSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     age_range: {
//         type: String,
//         required: true
//     },
// });

// const testPackageCategorySchema = new Schema({
//     men: [testItemSchema],
//     women: [testItemSchema],
// },
// {
//         timestamps: true,
// });

// module.exports = mongoose.model("TestPackageCategory", testPackageCategorySchema);


const mongoose = require("mongoose");
const { Schema } = mongoose;

const testPackageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        enable: {
            type: Boolean,
            default: true,
        },
        tests: [
            {
                type: String, // list of test names or ids
                trim: true,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("TestPackageCategory", testPackageSchema);
