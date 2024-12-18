import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/contactus/messages");
        const data = await response.json();
        setMessages(data);

        const unreadMessages = data.filter((message) => message.status === "unread").length;
        setUnreadCount(unreadMessages);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedMessage = await response.json();
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message._id === id ? updatedMessage : message
          )
        );
        setUnreadCount((prevCount) =>
          newStatus === "read" ? prevCount - 1 : prevCount + 1
        );
      } else {
        console.error("Failed to toggle message status");
      }
    } catch (error) {
      console.error("Error toggling message status:", error);
    }
  };

  const handleReply = async (message) => {
    if (replyingTo === message._id) {
      setReplyingTo(null);
    } else {
      if (message.status === "unread") {
        await handleToggleReadState(message._id, "unread");
      }
      setReplyingTo(message._id);
      setReply(message.reply || "");
    }
  };

  const handleSendReply = async (messageId) => {
    try {
      const response = await fetch(`/api/contactus/messages/${messageId}/reply`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });

      if (response.ok) {
        const updatedMessage = await response.json();
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message._id === messageId ? updatedMessage : message
          )
        );

        console.log("Reply sent for message ID:", messageId);
        setReplyingTo(null);
      } else {
        console.error("Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div>
      <h3 className="text-gray-600 text-lg mb-4">
        Messages &nbsp; {unreadCount}
      </h3>
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
                  <p className="text-2xl text-gray-800 font-medium">
                    {message.registerId}
                  </p>
                  <button
                    onClick={() =>
                      handleToggleReadState(message._id, message.status)
                    }
                    className={`px-4 py-1 text-white font-sm rounded ${
                      message.status === "read"
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {message.status === "read" ? "Read" : "Mark"}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-600 mx-2 mb-4">{message.message}</p>
                  <button
                    onClick={() => handleReply(message)}
                    className={`${
                      replyingTo === message._id
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-orange-500 hover:bg-orange-600"
                    } px-3.5 py-1 text-white font-sm rounded`}
                  >
                    {replyingTo === message._id ? "Undo" : "Reply"}
                  </button>
                </div>

                {replyingTo === message._id && (
                  <div className="mt-4">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your reply here..."
                      className="w-full mb-2 p-2 border rounded text-sm"
                      rows="3"
                    ></textarea>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSendReply(message._id)}
                        className="bg-green-500 hover:bg-green-600 px-4 py-1 text-white rounded"
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2 pl-2">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
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
