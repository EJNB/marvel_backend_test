const express = require("express");
const router = express.Router();

// Get colaborators from marvel api
// Save into database
// Response with data
router.get("/:id", (req, res) => res.send("colaborators"));

module.exports = router;
