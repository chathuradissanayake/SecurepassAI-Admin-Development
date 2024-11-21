const mongoose = require("mongoose");

const doorSchema = new mongoose.Schema({
    location: { type: String, required: true },
    doorCode: { type: String, required: true, unique: true },
    roomName: { type: String, required: true },
    qrData: { type: String, required: true },  // QR code data (location-doorCode-roomName)
    qrImage: { type: String}, // Base64 string for the QR image
    // approvedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }] // New field for approved users
}, { timestamps: true });


const Door = mongoose.model("Doors", doorSchema);

module.exports = Door;







 


