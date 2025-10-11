const Location = require("../models/location");
const Test = require("../models/test");


exports.createLocation = async (req, res) => {
    try {
        const { locationName } = req.body;

        if (!locationName) {
            return res.status(400).json({ message: "Location name is required" });
        }

        const existing = await Location.findOne({ locationName });
        if (existing) {
            return res.status(400).json({ message: "Location already exists" });
        }

        const location = await Location.create({ locationName });
        res.status(201).json(location);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: -1 });
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;

        const location = await Location.findByIdAndDelete(id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        const tests = await Test.find({ locations: id });

        let deletedTestsCount = 0;
        let updatedTestsCount = 0;

        for (const test of tests) {
            if (test.locations.length === 1) {
                await Test.findByIdAndDelete(test._id);
                deletedTestsCount++;
            } else {
                await Test.updateOne(
                    { _id: test._id },
                    { $pull: { locations: id } }
                );
                updatedTestsCount++;
            }
        }

        res.status(200).json({
            message: `Location deleted successfully.`,
            removedFromTests: updatedTestsCount,
            deletedTests: deletedTestsCount,
        });
    } catch (err) {
        console.error("Error deleting location:", err);
        res.status(500).json({ message: "Server error while deleting location" });
    }
};

