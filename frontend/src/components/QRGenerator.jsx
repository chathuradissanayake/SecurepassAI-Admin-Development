import axios from 'axios';
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";


const QRGenerator = () => {
  const [companyName, setCompanyName] = useState("");
  const [doorId, setDoorId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [qrData, setQrData] = useState("");

  // Example company list for the dropdown
  const companyList = ["Company A", "Company B", "Company C", "Company D"];

  const generateQRCode = async (e) => {
    e.preventDefault();
    if (companyName && doorId && roomName) {
      const qrValue = `${companyName}-${doorId}-${roomName}`;
      setQrData(qrValue);

        // Convert the QR code to Base64 image format
        // const canvas = document.getElementById("qrCode");
        // const dataUrl = canvas.toDataURL("image/png");  // Get the QR code image as a Base64 string
        // setQrImage(dataUrl);  // Store the image

     } else {
        alert("Please fill in all fields.");
     }
};


const saveQRCodeToDatabase = async () => {
    try {
      const response = await axios.post('http://localhost:5000/doors/create/', {
        companyName,
        doorId,
        roomName,
        qrData,
        // qrImage,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to save QR Code.');
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${companyName}_${doorId}_${roomName}_QR.png`;
    downloadLink.click();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">QR Code Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Form */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
          <form onSubmit={generateQRCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <select
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border p-2 w-full rounded"
              >
                <option value="">Select a company</option>
                {companyList.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Door ID</label>
              <input
                type="text"
                value={doorId}
                onChange={(e) => setDoorId(e.target.value)}
                placeholder="Enter door ID"
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
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={!companyName || !doorId || !roomName}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Generate QR Code
              </button>
              
            </div>
          </form>
        </div>

        {/* Middle Column: QR Code Display */}
        <div className="flex items-center justify-center bg-white p-6 rounded shadow">
          {qrData ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Generated QR Code</h2>
              <QRCodeCanvas
                id="qrCode"
                value={qrData}
                size={200}
                bgColor={"#ffffff"}
                level={"H"}
              />
              <div>
              <button
                type="button"
                onClick={downloadQRCode}
                disabled={!qrData}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 my-5"
              >
                Download QR Code
              </button>
              </div>
            </div>
            
          ) : (
            <p className="text-gray-500">No QR Code generated yet.</p>
          )}
        </div>

        {/* Right Column: QR Code Details */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">QR Code Details</h2>
          {qrData ? (
            <div className="space-y-2">
              <p>
                <span className="font-medium">Company Name:</span> {companyName}
              </p>
              <p>
                <span className="font-medium">Door ID:</span> {doorId}
              </p>
              <p>
                <span className="font-medium">Room Name:</span> {roomName}
              </p>
              <p>
                <span className="font-medium">QR Data:</span> {qrData}
              </p>
              <button
                    onClick={saveQRCodeToDatabase}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Save to Database
              </button>
            </div>
          ) : (
            <p className="text-gray-500">No details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
