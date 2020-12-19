const express = require("express");
const router = express.Router();

// Get Characters from marvel api
// Save into database
// Response with data
router.get("/:id", (req, res) => res.send("characters"));

module.exports = router;
