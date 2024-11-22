const mongoose = require('mongoose');
const { Schema } = mongoose;

const doorSchema = new Schema({
  doorCode: { type: String, required: true, unique: true },
  doorName: { type: String, required: true },
  location: { type: String, required: true },
  approvedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Door = mongoose.model('Door', doorSchema); 

module.exports = Door;