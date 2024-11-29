const mongoose = require("mongoose");
const ContactUs = require("../models/Messages");

// Controller to fetch all messages
const getMessages = async (req, res) => {
  try {
    // Fetch all messages from the collection
    const messages = await ContactUs.find().sort({ createdAt: -1 }); // Sorted by newest first
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

module.exports = { getMessages };
