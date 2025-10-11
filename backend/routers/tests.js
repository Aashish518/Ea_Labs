const express = require("express");
const { createTest, getTests, getTestById, updateTest, deleteTest } = require("../controllers/tests");
const router = express.Router();



router.post("/", createTest);

router.get("/", getTests);

router.get("/:id", getTestById);

router.put("/:id",updateTest);

router.delete("/:id",deleteTest);



module.exports = router;
