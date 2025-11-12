const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require("../controllers/resource");

// ✅ Create Resource (upload file + optional thumbnail)
router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createResource
);

// ✅ Get All Resources
router.get("/", getAllResources);

// ✅ Get Single Resource
router.get("/:id", getResourceById);

// ✅ Update Resource (can upload new file and/or new thumbnail)
router.put(
  "/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateResource
);

// ✅ Delete Resource
router.delete("/:id", deleteResource);

module.exports = router;
