import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

const QRGenerator = () => {
  const [companyName, setCompanyName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [qrData, setQrData] = useState("");

  const generateQRCode = async (e) => {
    e.preventDefault();
    if (companyName && roomCode && roomName) {
      const qrValue = `${companyName}-${roomCode}-${roomName}`;
      setQrData(qrValue);

      try {
        // Send QR code details to the backend to save
        const response = await axios.post("/api/qrcode/generate", {
          companyName,
          roomCode,
          roomName,
          qrCodeData: qrValue,
        });

        if (response.data.success) {
          alert("QR Code generated and saved to the database!");
        }
      } catch (error) {
        console.error("Error saving QR code:", error);
        alert("Failed to save QR Code. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const qrCode = (
    <QRCodeCanvas
      id="qrCode"
      value={qrData}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <form onSubmit={generateQRCode} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Room Code</label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter room code"
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Room Name</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          disabled={!companyName || !roomCode || !roomName}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate QR Code
        </button>
      </form>

      {qrData && (
        <div className="mt-6">
          <h2 className="text-lg font-medium">Generated QR Code</h2>
          <div className="mt-4">{qrCode}</div>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
