const express = require("express");
const { createLocation, getLocations, deleteLocation, geocode } = require("../controllers/location");
const router = express.Router();

router.post("/", createLocation);

router.get("/", getLocations);

router.delete("/:id", deleteLocation);

router.get("/reverse-geocode", geocode);

module.exports = router;
