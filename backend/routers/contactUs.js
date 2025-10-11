const express = require("express");
const router = express.Router();
const {
    createContact,
    getAllContacts,
    deleteContact,
    getContactById,
} = require("../controllers/contactUs");

router.post("/", createContact);

router.get("/", getAllContacts);
router.get("/:id", getContactById); 

router.delete("/:id", deleteContact);

module.exports = router;