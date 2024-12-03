import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/contactus/messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  
  const handleToggleReadState = async (id, currentStatus) => {
    const newStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      const response = await fetch(`/api/contactus/messages/${id}/toggle-read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), 
      });

      if (response.ok) {
        const updatedMessage = await response.json();
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message._id === id ? updatedMessage : message
          )
        );
      } else {
        console.error("Failed to toggle message status");
      }
    } catch (error) {
      console.error("Error toggling message status:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : messages.length > 0 ? (
        <div className="max-h-96 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {messages.map((message) => (
              <li
                key={message._id}
                className={`p-3 mb-2 border rounded-lg shadow-md ${
                  message.status === "unread" ? "bg-blue-100" : "bg-white"
                }`}
              >
                <div className="my-2 ml-2 flex justify-between">
                <div>
                <p className="text-gray-800 font-medium">
                  User ID: {message.userId}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
                </div>
                <div className="mx-2">
                <button
                  onClick={() => handleToggleReadState(message._id, message.status)}
                  className={` px-4 py-1 text-white font-sm rounded ${
                    message.status === "read"
                      ? "bg-gray-500 hover:bg-gray-600"
                      : "bg-blue-500 hover:bg-blue-600"
                      
                  }`}
                >
                  {message.status === "read" ? "Mark" : "Read"}
                </button>
                </div>
                </div>
                
                <p className="text-gray-600 mx-2 mb-4">{message.message}</p>
                
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No messages available.</p>
      )}
    </div>
  );
};

export default Messages;
