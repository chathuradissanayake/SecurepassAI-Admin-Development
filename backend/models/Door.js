const mongoose = require("mongoose");
const { Schema } = mongoose;

const doorSchema = new mongoose.Schema({
    location: { type: String, required: true },
    doorCode: { type: String, required: true, unique: true },
    roomName: { type: String, required: true },
    qrData: { type: String, required: true },  // QR code data (location-doorCode-roomName)
    qrImage: { type: String}, // Base64 string for the QR image
    approvedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
}, { timestamps: true });


const Door = mongoose.model('Door', doorSchema); 

module.exports = Door;
