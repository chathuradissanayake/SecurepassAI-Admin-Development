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


const toggleReadState = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 

  try {
    const updatedMessage = await ContactUs.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Error toggling message status:", error);
    res.status(500).json({ error: "Failed to toggle message status" });
  }
};


module.exports = { getMessages, toggleReadState };
