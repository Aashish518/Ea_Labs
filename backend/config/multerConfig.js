const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only images, videos, and GIFs are allowed"));
    }
};

module.exports = multer({ storage, fileFilter });
