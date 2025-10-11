const TestCategory = require("../models/testcategory");
const fs = require("fs");
const path = require("path");
const Test = require("../models/test");


exports.createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const image = req.file ? req.file.filename : null;

        const category = new TestCategory({ categoryName, image });
        await category.save();

        res.status(201).json({
            success: true,
            message: "Category created successfully!",
            category,
        });
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await TestCategory.find();
        res.status(200).json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        const category = await TestCategory.findById(id);
        if (!category)
            return res.status(404).json({ success: false, message: "Category not found" });

        if (req.file && category.image) {
            const oldPath = path.join(__dirname, "../uploads/", category.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        category.categoryName = categoryName || category.categoryName;
        if (req.file) category.image = req.file.filename;

        await category.save();

        res.status(200).json({
            success: true,
            category,
            message: "Category updated successfully!",
        });
    } catch (err) {
        console.error("Error updating category:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await TestCategory.findById(id);
        if (!category)
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });

        if (category.image) {
            const filePath = path.join(__dirname, "../uploads/", category.image);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        const updatedTests = await Test.updateMany(
            { category: id },
            { $unset: { category: "" } }
        );

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: `Category deleted successfully and removed from ${updatedTests.modifiedCount} test(s).`,
            removedFromTests: updatedTests.modifiedCount,
        });
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ success: false, message: "Server error while deleting category" });
    }
};
