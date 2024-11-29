import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/contactus/messages"); // Replace with your API endpoint
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

  return (
    <div className="">
      
      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
        
      ) : messages.length > 0 ? (
        <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {messages.map((contactus) => (
            <li key={contactus._id} className="py-3 pl-3 mb-2 bg-white border rounded-lg shadow-md">
              <p className="text-gray-800 font-medium">User ID: {contactus.userId}</p>
              <p className="text-sm text-gray-500 mb-2">{new Date(contactus.createdAt).toLocaleString()}</p>
              <p className="text-gray-600">{contactus.message}</p>
              
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
