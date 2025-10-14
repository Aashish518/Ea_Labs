const Test = require("../models/test");
const TestCategory = require("../models/testcategory");
const Location = require("../models/location");
const TestPackage = require("../models/testpackagecategory");


exports.createTest = async (req, res) => {
    try {
        const test = new Test(req.body); 
        await test.save();
        res.status(201).json({ message: "Test created successfully", test });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getTests = async (req, res) => {
    try {
        const tests = await Test.find()
            .populate("category", "categoryName")
            .populate("locations", "locationName"); 
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id)
            .populate("category", "categoryName")
            .populate("locations", "locationName");
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("category", "categoryName")
            .populate("locations", "locationName");
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }
        res.status(200).json({ message: "Test updated successfully", test });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);

        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        await TestPackage.updateMany(
            { tests: req.params.id },
            { $pull: { tests: req.params.id } }
        );

        res.status(200).json({ message: "Test deleted successfully and removed from related packages" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getCategoriesWithTestsByLocation = async (req, res) => {
    try {
        const { locationName } = req.query;
        if (!locationName) {
            return res.status(400).json({ message: "Location name is required" });
        }

        // 1️⃣ Find location
        const location = await Location.findOne({ locationName });
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        // 2️⃣ Find tests that include this location
        const tests = await Test.find({ locations: location._id })
            .populate("category", "categoryName") // populate category name
            .select("name description include for reportInTime price category")
            .lean(); // convert to plain JS objects

        // 3️⃣ Group tests by category
        const grouped = {};
        tests.forEach((test) => {
            const catId = test.category._id.toString();
            if (!grouped[catId]) {
                grouped[catId] = {
                    categoryId: test.category._id,
                    categoryName: test.category.categoryName,
                    tests: [],
                };
            }
            if (grouped[catId].tests.length < 3) { // max 3 tests per category
                grouped[catId].tests.push(test);
            }
        });

        const result = Object.values(grouped);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


