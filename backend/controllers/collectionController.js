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

module.exports = { getCollectionCounts };
