const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["Article", "PDF", "Image", "Video"],
      required: true,
    },
    fileUrl: {
      type: String, 
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
