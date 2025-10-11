const express = require("express");
const { trackVisitor } = require("../controllers/visitor");
const router = express.Router();

router.get("/", trackVisitor);

module.exports = router;
