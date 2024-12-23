const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
  doorCode: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date, default: null },
  location: { type: String },
  roomName: { type: String },
  user: {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true }, // Add company field
});

const History = mongoose.model("History", historySchema);

module.exports = History;