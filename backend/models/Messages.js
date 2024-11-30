// models/messages.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: { 
    type: String, 
    enum: ["unread", "read"], 
    default: "unread" },


});

const Message = mongoose.model('contactus', messageSchema);

module.exports = Message;
