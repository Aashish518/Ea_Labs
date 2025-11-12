const fs = require("fs");
const path = require("path");
const AboutUs = require("../models/aboutus");

// Helper: safely delete image if exists
const deleteLocalImage = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("Error deleting image:", err.message);
  }
};

// ✅ Create AboutUs
exports.createAboutUs = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imagePath = req.file.path; // multer saves full path already

    const about = new AboutUs({
      title,
      description,
      image: imagePath,
    });

    await about.save();

    res.status(201).json({
      message: "About Us created successfully",
      data: about,
    });
  } catch (error) {
    console.error("Create AboutUs Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all AboutUs entries
exports.getAllAboutUs = async (req, res) => {
  try {
    const abouts = await AboutUs.find();
    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single AboutUs by ID
exports.getAboutUsById = async (req, res) => {
  try {
    const about = await AboutUs.findById(req.params.id);
    if (!about) return res.status(404).json({ message: "Not found" });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update AboutUs (auto delete old image)
exports.updateAboutUs = async (req, res) => {
  try {
    const { title, description } = req.body;
    const about = await AboutUs.findById(req.params.id);

    if (!about) return res.status(404).json({ message: "Not found" });

    // ✅ If a new image uploaded, delete old one
    if (req.file) {
      deleteLocalImage(about.image);
      about.image = req.file.path;
    }

    about.title = title || about.title;
    about.description = description || about.description;

    await about.save();

    res.status(200).json({
      message: "Updated successfully",
      data: about,
    });
  } catch (error) {
    console.error("Update AboutUs Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete AboutUs (auto delete local image)
exports.deleteAboutUs = async (req, res) => {
  try {
    const about = await AboutUs.findById(req.params.id);
    if (!about) return res.status(404).json({ message: "Not found" });

    // ✅ Delete associated local image
    deleteLocalImage(about.image);

    await AboutUs.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete AboutUs Error:", error);
    res.status(500).json({ message: error.message });
  }
};
