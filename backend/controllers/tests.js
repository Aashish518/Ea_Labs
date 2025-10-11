const Test = require("../models/test");

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
        res.status(200).json({ message: "Test deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
