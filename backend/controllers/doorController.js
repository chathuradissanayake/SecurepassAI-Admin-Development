const Door = require("../models/Door"); // Import the model

// API Endpoint to save QR code details
const createDoor = async (req, res) => {
  const { companyName, doorId, roomName, qrData} = req.body;

  if (!companyName || !doorId || !roomName || !qrData  ) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const newDoor = new Door({
      companyName,
      doorId,
      roomName,
      qrData,
    //   qrImage,
    });

    await newDoor.save(); // Save to database
    
    res.status(201).json({ success: true, message: "QR Code saved successfully!" });
  } catch (error) {
    console.error("Error saving QR Code:", error);
    res.status(500).json({ success: false, message: "Error saving QR Code." });
  }
};

module.exports = { createDoor};

