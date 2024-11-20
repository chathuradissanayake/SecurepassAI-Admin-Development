const mongoose = require("mongoose");

const DoorSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    doorId: { type: String, required: true },
    roomName: { type: String, required: true },
    qrData: { type: String, required: true },  // QR code data (companyName-doorId-roomName)
    qrImage: { type: String}, // Base64 string for the QR image
});

const Door = mongoose.model("Doors", DoorSchema);

module.exports = Door;
