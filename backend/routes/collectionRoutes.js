const express = require("express");
const { getCollectionCounts,getFilteredHistoriesCount } = require("../controllers/collectionController");

const router = express.Router();

// Route to fetch document counts
router.get("/counts", getCollectionCounts);

router.get("/history", getFilteredHistoriesCount);



module.exports = router;
