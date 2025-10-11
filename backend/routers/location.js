const express = require("express");
const { createLocation, getLocations, deleteLocation } = require("../controllers/location");
const router = express.Router();

router.post("/", createLocation);

router.get("/", getLocations);

router.delete("/:id", deleteLocation);

module.exports = router;
