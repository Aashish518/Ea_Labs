// const TestPackageCategory = require("../models/testpackagecategory");
// const fs = require("fs");
// const path = require("path");

// exports.addTestItem = async (req, res) => {
//     try {
//         const { category } = req.body;
//         const { name, age_range } = req.body;
//         const imageFile = req.file;

//         if (!["men", "women"].includes(category))
//             return res.status(400).json({ message: "Invalid category" });

//         if (!imageFile) return res.status(400).json({ message: "Image is required" });

//         const testItem = {
//             name,
//             age_range,
//             image: "/uploads/" + imageFile.filename,
//         };

//         let testCategory = await TestPackageCategory.findOne();
//         if (!testCategory) {
//             testCategory = new TestPackageCategory();
//         }

//         testCategory[category].push(testItem);
//         await testCategory.save();

//         res.status(201).json({ message: "Test item added", testCategory });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// exports.getAllTestPackages = async (req, res) => {
//     try {
//         const testPackages = await TestPackageCategory.find();
//         res.status(200).json(testPackages);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// exports.deleteTestItem = async (req, res) => {
//     try {
//         const { itemId } = req.params;

//         const testCategory = await TestPackageCategory.findOne();
//         if (!testCategory) return res.status(404).json({ message: "No test package found" });

//         let categoryArray = testCategory.men;
//         let categoryType = "men";

//         let item = categoryArray.id(itemId);

//         if (!item) {
//             categoryArray = testCategory.women;
//             categoryType = "women";
//             item = categoryArray.id(itemId);
//         }

//         if (!item) return res.status(404).json({ message: "Item not found" });

//         const filePath = path.join(__dirname, "..", item.image.replace(/^\/uploads\//, "uploads/"));
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//         categoryArray.pull(itemId);

//         await testCategory.save();

//         res.status(200).json({ message: "Test item deleted", categoryType, testCategory });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// };


// exports.updateTestItem = async (req, res) => {
//     try {
//         const { itemId } = req.params;
//         const { name, age_range } = req.body;
//         const imageFile = req.file;

//         const testCategory = await TestPackageCategory.findOne();
//         if (!testCategory) return res.status(404).json({ message: "No test package found" });

//         let item = testCategory.men.id(itemId);
//         let categoryType = "men";

//         if (!item) {
//             item = testCategory.women.id(itemId);
//             categoryType = "women";
//         }

//         if (!item) return res.status(404).json({ message: "Item not found" });

//         if (name) item.name = name;
//         if (age_range) item.age_range = age_range;

//         if (imageFile) {
//             const oldPath = path.join(__dirname, "..", item.image.replace(/^\/uploads\//, "uploads/"));
//             if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

//             item.image = "/uploads/" + imageFile.filename;
//         }

//         await testCategory.save();

//         res.status(200).json({ message: "Test item updated", categoryType, testCategory });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// };


const TestPackageCategory = require("../models/testpackagecategory");
const Test = require("../models/test");
const fs = require("fs");
const path = require("path");


// ✅ Add Test Package
exports.addTestPackage = async (req, res) => {
    try {
        const { name, price, enable, tests } = req.body;
        const imageFile = req.file;

        if (!imageFile)
            return res.status(400).json({ message: "Image is required" });

        const testPackage = new TestPackageCategory({
            name,
            price,
            enable: enable !== undefined ? enable : true,
            tests: Array.isArray(tests) ? tests : (tests ? [tests] : []),
            image: "/uploads/" + imageFile.filename,
        });

        await testPackage.save();

        res
            .status(201)
            .json({ message: "Test package added successfully", testPackage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


// ✅ Get All Test Packages
exports.getAllTestPackages = async (req, res) => {
    try {
        const testPackages = await TestPackageCategory.find();
        res.status(200).json(testPackages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


// ✅ Update Test Package
exports.updateTestPackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, enable, tests } = req.body;
        const imageFile = req.file;

        const testPackage = await TestPackageCategory.findById(id);
        if (!testPackage)
            return res.status(404).json({ message: "Test package not found" });

        if (name) testPackage.name = name;
        if (price) testPackage.price = price;
        if (enable !== undefined) testPackage.enable = enable;
        if (tests) testPackage.tests = Array.isArray(tests) ? tests : [tests];

        if (imageFile) {
            const oldPath = path.join(
                __dirname,
                "..",
                testPackage.image.replace(/^\/uploads\//, "uploads/")
            );
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            testPackage.image = "/uploads/" + imageFile.filename;
        }

        await testPackage.save();

        res
            .status(200)
            .json({ message: "Test package updated successfully", testPackage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};


// ✅ Delete Test Package
exports.deleteTestPackage = async (req, res) => {
    try {
        const { id } = req.params;

        const testPackage = await TestPackageCategory.findById(id);
        if (!testPackage)
            return res.status(404).json({ message: "Test package not found" });

        // Delete image
        const filePath = path.join(
            __dirname,
            "..",
            testPackage.image.replace(/^\/uploads\//, "uploads/")
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await testPackage.deleteOne();

        res.status(200).json({ message: "Test package deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getTestsByPackageId = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the test package
        const testPackage = await TestPackageCategory.findById(id).lean();
        if (!testPackage)
            return res.status(404).json({ message: "Test package not found" });

        // Find related tests by IDs
        const relatedTests = await Test.find({ _id: { $in: testPackage.tests } }).lean();

        // Return both package info and tests
        res.status(200).json({
            package: testPackage,   // includes name, description, etc.
            tests: relatedTests,    // array of tests
        });
    } catch (err) {
        console.error("Error fetching tests by package ID:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

