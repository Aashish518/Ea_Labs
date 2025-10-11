const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video", "gif"], required: true },
    isVisible: { type: Boolean, required: true, default: true } 
});

const sliderSchema = new mongoose.Schema({
    mobileScreenMedia: [mediaSchema],
    desktopScreenMedia: [mediaSchema],
});

module.exports = mongoose.model("Slider", sliderSchema);
