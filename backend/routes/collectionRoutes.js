const express = require("express");
const { getCollectionCounts,getFilteredHistoriesCount, getUnreadMessageCount } = require("../controllers/collectionController");

const router = express.Router();

// Route to fetch document counts
router.get("/counts", getCollectionCounts);

// Route to fetch filtered history
router.get("/history", getFilteredHistoriesCount);

// Route to fetch unread message counts
router.get('/unread-count' , getUnreadMessageCount);



module.exports = router;
