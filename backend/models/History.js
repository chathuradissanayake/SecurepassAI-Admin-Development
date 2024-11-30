const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
  door: { type: Schema.Types.ObjectId, ref: 'Door', required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
  status: { type: String, enum: ['Entered', 'Exited'], default: 'Active' }
}, { timestamps: true });

const HistoryModel = mongoose.model('History', historySchema);

module.exports = HistoryModel;