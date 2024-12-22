const mongoose = require("mongoose");

// Fetch document counts for all collections
const getCollectionCounts = async (req, res) => {
  try {
    const db = mongoose.connection;
    const collections = await db.db.listCollections().toArray();

    const counts = await Promise.all(
      collections.map(async (collection) => {
        const count = await db.collection(collection.name).countDocuments();
        return {
          name: collection.name,
          count,
        };
      })
    );

    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFilteredHistoriesCount = async (req, res) => {
  try {
    const { entryTime } = req.query; // Get today's date from query parameter
    const db = mongoose.connection;

    // Define start and end of the day
    const startOfDay = new Date(entryTime);
    startOfDay.setUTCHours(0, 0, 0, 0); // 00:00:00.000 UTC
    const endOfDay = new Date(entryTime);
    endOfDay.setUTCHours(23, 59, 59, 999); // 23:59:59.999 UTC

    // Filter histories based on the date range
    const count = await db.collection("histories").countDocuments({
      entryTime: { $gte: startOfDay, $lt: endOfDay },
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUnreadMessageCount = async (req, res) => {
  try {
    const db = mongoose.connection;

    // Count documents where the status is "unread"
    const count = await db.collection("contactus").countDocuments({ status: "unread" });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


const getActiveDoorsCount = async (req, res) => {
  try {
    const db = mongoose.connection;

    // Count documents where the status is "unread"
    const count = await db.collection("doors").countDocuments({ status: "Active" });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};





module.exports = { getCollectionCounts, getFilteredHistoriesCount, getUnreadMessageCount, getActiveDoorsCount };
