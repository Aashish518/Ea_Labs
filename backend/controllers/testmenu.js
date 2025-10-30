const TestMenu = require("../models/testmenu");

// Create a new test menu
exports.createTestMenu = async (req, res) => {
    try {
        const testMenu = new TestMenu(req.body);
        const savedTestMenu = await testMenu.save();
        res.status(201).json(savedTestMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllTestPage = async (req, res) => {
    try {
        const { page = 1, limit = 2, letter } = req.query;
        const query = {};

        if (letter) {
            query.name = { $regex: `^${letter}`, $options: "i" };
        }

        const totalItems = await TestMenu.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = Math.min(page, totalPages || 1);

        const data = await TestMenu.find(query)
            .skip((currentPage - 1) * limit)
            .limit(parseInt(limit))
            .sort({ name: 1 });

        // ✅ Compute available letters dynamically (for filter)
        const lettersData = await TestMenu.aggregate([
            {
                $group: {
                    _id: { $toUpper: { $substrCP: ["$name", 0, 1] } },
                },
            },
            { $sort: { "_id": 1 } },
        ]);

        const availableLetters = lettersData.map((l) => l._id);

        res.status(200).json({
            success: true,
            data,
            pagination: {
                totalItems,
                totalPages,
                currentPage,
                limit: parseInt(limit),
            },
            availableLetters,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.getAllTestMenus = async (req, res) => {
    try {
        const testMenus = await TestMenu.find();
        res.status(200).json(testMenus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single test menu by ID
exports.getTestMenuById = async (req, res) => {
    try {
        const testMenu = await TestMenu.findById(req.params.id);
        if (!testMenu) {
            return res.status(404).json({ message: "Test menu not found" });
        }
        res.status(200).json(testMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a test menu by ID
exports.updateTestMenu = async (req, res) => {
    try {
        const updatedTestMenu = await TestMenu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTestMenu) {
            return res.status(404).json({ message: "Test menu not found" });
        }
        res.status(200).json(updatedTestMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a test menu by ID
exports.deleteTestMenu = async (req, res) => {
    try {
        const deletedTestMenu = await TestMenu.findByIdAndDelete(req.params.id);
        if (!deletedTestMenu) {
            return res.status(404).json({ message: "Test menu not found" });
        }
        res.status(200).json({ message: "Test menu deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
