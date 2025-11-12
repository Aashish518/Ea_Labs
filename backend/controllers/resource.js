const fs = require("fs");
const path = require("path");
const Resource = require("../models/resource");

// ✅ Helper function to remove local file safely
const deleteLocalFile = (filePath) => {
  if (!filePath) return;
  const fullPath = path.join(__dirname, "..", filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

// ✅ Create Resource
exports.createResource = async (req, res) => {
  try {
    const { title, description, type, isPublished } = req.body;

    // Multer gives files: req.files.file[0], req.files.thumbnail[0]
    const file = req.files?.file?.[0];
    const thumbnail = req.files?.thumbnail?.[0];

    if (!file) {
      return res.status(400).json({ message: "Main resource file is required" });
    }

    const newResource = new Resource({
      title,
      description,
      type,
      fileUrl: `/uploads/${file.filename}`,
      thumbnail: thumbnail ? `/uploads/${thumbnail.filename}` : "",
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    await newResource.save();
    res.status(201).json({ success: true, data: newResource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Single Resource
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Resource (delete old file or thumbnail if new ones uploaded)
exports.updateResource = async (req, res) => {
  try {
    const { title, description, type, isPublished } = req.body;

    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // Access uploaded files
    const file = req.files?.file?.[0];
    const thumbnail = req.files?.thumbnail?.[0];

    // Delete old main file if new uploaded
    if (file && resource.fileUrl) {
      const oldFilePath = resource.fileUrl.replace(/^\//, "");
      deleteLocalFile(oldFilePath);
    }

    // Delete old thumbnail if new uploaded
    if (thumbnail && resource.thumbnail) {
      const oldThumbPath = resource.thumbnail.replace(/^\//, "");
      deleteLocalFile(oldThumbPath);
    }

    // Update data
    const updatedData = {
      title,
      description,
      type,
      isPublished,
      fileUrl: file ? `/uploads/${file.filename}` : resource.fileUrl,
      thumbnail: thumbnail
        ? `/uploads/${thumbnail.filename}`
        : resource.thumbnail,
    };

    const updated = await Resource.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Resource (and remove uploaded file + thumbnail)
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // Delete main file
    if (resource.fileUrl) {
      const filePath = resource.fileUrl.replace(/^\//, "");
      deleteLocalFile(filePath);
    }

    // Delete thumbnail file
    if (resource.thumbnail) {
      const thumbPath = resource.thumbnail.replace(/^\//, "");
      deleteLocalFile(thumbPath);
    }

    await Resource.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
