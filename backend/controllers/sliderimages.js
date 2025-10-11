const Slider = require("../models/sliderimges");
const fs = require("fs");
const path = require("path");

exports.createSlider = async (req, res) => {
    try {
        const mobileFiles = req.files.mobile || [];
        const desktopFiles = req.files.desktop || [];

        const getType = (filename) => {
            const ext = path.extname(filename).toLowerCase();
            if ([".mp4", ".mov", ".avi", ".webm"].includes(ext)) return "video";
            if ([".gif"].includes(ext)) return "gif";
            return "image";
        };

        const mobileMedia = mobileFiles.map(file => ({
            url: "/uploads/" + file.filename,
            type: getType(file.originalname),
            isVisible: true
        }));

        const desktopMedia = desktopFiles.map(file => ({
            url: "/uploads/" + file.filename,
            type: getType(file.originalname),
            isVisible: true
        }));


        let slider = await Slider.findOne();

        if (!slider) {
            slider = new Slider({
                mobileScreenMedia: mobileMedia,
                desktopScreenMedia: desktopMedia,
            });
        } else {
            slider.mobileScreenMedia.push(...mobileMedia);
            slider.desktopScreenMedia.push(...desktopMedia);
        }

        await slider.save();
        res.status(201).json({ message: "Media uploaded successfully", slider });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getSliders = async (req, res) => {
    try {
        const sliders = await Slider.find();
        res.status(200).json(sliders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, path: filePath } = req.body;

        const slider = await Slider.findById(id);
        if (!slider) return res.status(404).json({ message: "Slider not found" });

        if (type === "mobile") {
            slider.mobileScreenMedia = slider.mobileScreenMedia.filter(m => m.url !== filePath);
        } else {
            slider.desktopScreenMedia = slider.desktopScreenMedia.filter(m => m.url !== filePath);
        }

        await slider.save();

        const fullPath = path.join(__dirname, "..", filePath.replace(/^\/uploads\//, "uploads/"));
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

        res.status(200).json({ message: "Media deleted successfully", slider });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findOne();
        if (!slider) return res.status(404).json({ message: "No slider found" });

        const allMedia = [
            ...slider.mobileScreenMedia,
            ...slider.desktopScreenMedia,
        ];

        allMedia.forEach(({ url }) => {
            const filePath = path.join(__dirname, "..", url.replace(/^\/uploads\//, "uploads/"));
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });

        await Slider.deleteOne({ _id: slider._id });
        res.status(200).json({ message: "All media deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updateVisibility = async (req, res) => {
    try {
        const { mediaId } = req.params; 
        const slider = await Slider.findOne();
        if (!slider) return res.status(404).json({ message: "Slider not found" });

        let mediaItem = slider.mobileScreenMedia.id(mediaId);
        let mediaType = "mobile";

        if (!mediaItem) {
            mediaItem = slider.desktopScreenMedia.id(mediaId);
            mediaType = "desktop";
        }

        if (!mediaItem) return res.status(404).json({ message: "Media not found" });

        mediaItem.isVisible = !mediaItem.isVisible;
        await slider.save();

        const visibilityMessage = mediaItem.isVisible
            ? "Media is now visible"
            : "Media is now hidden";
        
        res.status(200).json({
            message: visibilityMessage,
            mediaType,
            media: mediaItem,
            slider
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
