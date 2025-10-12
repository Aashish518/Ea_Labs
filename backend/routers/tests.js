const express = require("express");
const { createTest, getTests, getTestById, updateTest, deleteTest, getCategoriesWithTestsByLocation } = require("../controllers/tests");
const router = express.Router();


router.get("/bylocation", getCategoriesWithTestsByLocation);

router.post("/", createTest);

router.get("/", getTests);

router.get("/:id", getTestById);

router.put("/:id",updateTest);

router.delete("/:id", deleteTest);




module.exports = router;
