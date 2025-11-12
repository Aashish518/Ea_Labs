const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { createAboutUs, getAllAboutUs, getAboutUsById, updateAboutUs, deleteAboutUs } = require("../controllers/aboutus");

router.post("/", upload.single("image"), createAboutUs);
router.get("/", getAllAboutUs);
router.get("/:id", getAboutUsById);
router.put("/:id", upload.single("image"), updateAboutUs);
router.delete("/:id", deleteAboutUs);

module.exports = router;
