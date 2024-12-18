const ContactUs = require("../models/Messages");

// Fetch all messages
const getMessages = async (req, res) => {
  try {
    const messages = await ContactUs.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Toggle read state
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

// Update reply and set userstatus to 'unread'
const updateUserStatusOnReply = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const updatedMessage = await ContactUs.findByIdAndUpdate(
      id,
      { reply, userstatus: "unread" },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Error updating userstatus on reply:", error);
    res.status(500).json({ error: "Failed to update userstatus on reply" });
  }
};

module.exports = { getMessages, toggleReadState, updateUserStatusOnReply };
