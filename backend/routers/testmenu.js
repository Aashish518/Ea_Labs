const express = require("express");
const { createTestMenu, getAllTestMenus, getTestMenuById, updateTestMenu, deleteTestMenu, getAllTestPage } = require("../controllers/testmenu");
const router = express.Router();

// Create a test menu
router.post("/", createTestMenu);

// Get all test menus
router.get("/page", getAllTestPage)
router.get("/", getAllTestMenus);

// Get a single test menu by ID
router.get("/:id", getTestMenuById);

// Update a test menu by ID
router.put("/:id", updateTestMenu);

// Delete a test menu by ID
router.delete("/:id", deleteTestMenu);


module.exports = router;
