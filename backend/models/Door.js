const mongoose = require('mongoose');
const { Schema } = mongoose;

const doorSchema = new Schema({
  doorCode: { type: String, required: true, unique: true },
  doorName: { type: String, required: true },
  location: { type: String }
}, { timestamps: true });

const DoorModel = mongoose.model('Door', doorSchema);

module.exports = DoorModel;