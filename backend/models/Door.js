const mongoose = require('mongoose');
const { Schema } = mongoose;

const doorSchema = new Schema({
  doorCode: { type: String, required: true, unique: true },
  doorName: { type: String, required: true },
  location: { type: String },
  approvedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }] // New field for approved users
}, { timestamps: true });

const Door = mongoose.model("Doors", doorSchema);

module.exports = Door;
