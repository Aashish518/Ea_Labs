const express = require("express");
const router = express.Router();
const multerUpload = require("../config/multerConfig");
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/testcategory");

router.post("/", multerUpload.single("image"), createCategory);
router.get("/", getAllCategories);
router.put("/:id", multerUpload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
