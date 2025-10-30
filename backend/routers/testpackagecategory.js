// const express = require("express");
// const router = express.Router();
// const multerUpload = require("../config/multerConfig");
// const { addTestItem, getAllTestPackages, deleteTestItem, updateTestItem } = require("../controllers/testpackagecategory");

// router.post(
//     "/",
//     multerUpload.single("image"),
//     addTestItem
// );

// router.get("/", getAllTestPackages);

// router.delete("/:itemId", deleteTestItem);

// router.put(
//     "/:itemId",
//     multerUpload.single("image"),
//     updateTestItem
// );

// module.exports = router;


const express = require("express");
const router = express.Router();
const multerUpload = require("../config/multerConfig");
const { addTestPackage, getAllTestPackages, deleteTestPackage, updateTestPackage, getTestsByPackageId } = require("../controllers/testpackagecategory");


// ➕ Add a new test package
router.post(
    "/",
    multerUpload.single("image"),
    addTestPackage
);

// 📦 Get all test packages
router.get("/tests/:id", getTestsByPackageId);

router.get("/", getAllTestPackages);

// 📝 Update a test package
router.put(
    "/:id",
    multerUpload.single("image"),
    updateTestPackage
);

// ❌ Delete a test package
router.delete("/:id", deleteTestPackage);

module.exports = router;
