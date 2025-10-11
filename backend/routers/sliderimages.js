const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { createSlider, getSliders, deleteSlider, deleteImage, updateVisibility,  } = require("../controllers/sliderimages");

router.post(
    "/",
    upload.fields([
        { name: "mobile", maxCount: 10 },
        { name: "desktop", maxCount: 10 },
    ]),
    createSlider
);

router.get("/", getSliders);
router.put("/:mediaId", updateVisibility);
router.delete("/:id", deleteImage);
router.delete("/", deleteSlider);


module.exports = router;
