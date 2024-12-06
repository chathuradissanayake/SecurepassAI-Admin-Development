const express = require("express");
const { getCollectionCounts } = require("../controllers/collectionController");

const router = express.Router();

// Route to fetch document counts
router.get("/counts", getCollectionCounts);

module.exports = router;
