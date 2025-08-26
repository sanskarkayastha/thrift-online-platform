import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { getUserById } from "../../services/user";
import axios from "axios";
import "../../Css/ChatPage.css";

const ChatPage = () => {
  const { sellerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [seller, setSeller] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const currentUserId = localStorage.getItem("authToken");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchSeller = async () => {
      const res = await getUserById(sellerId);
      setSeller(res.data);
    };

    const fetchChat = async () => {
      try {
        const res = await axios.get("http://localhost:4000/chats");
        let chat = res.data.find(
          (c) =>
            c.participants.includes(currentUserId) &&
            c.participants.includes(sellerId)
        );

        // Create chat if not exists
        if (!chat) {
          const newChat = {
            participants: [currentUserId, sellerId],
            messages: [],
          };
          const created = await axios.post(
            "http://localhost:4000/chats",
            newChat
          );
          chat = created.data;
        }

        setMessages(chat.messages);
      } catch (err) {
        console.error("Error fetching chat:", err);
      }
    };

    fetchSeller();
    fetchChat();
  }, [currentUserId, sellerId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.get("http://localhost:4000/chats");
      let chat = res.data.find(
        (c) =>
          c.participants.includes(currentUserId) &&
          c.participants.includes(sellerId)
      );

      const updatedChat = {
        ...chat,
        messages: [
          ...chat.messages,
          { sender: currentUserId, text: newMessage, timestamp: Date.now() },
        ],
      };

      await axios.put(`http://localhost:4000/chats/${chat.id}`, updatedChat);
      setMessages(updatedChat.messages);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat-page">
      <h2>💬 Chat with {seller?.fullName || "Seller"}</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${
              msg.sender === currentUserId ? "sent" : "received"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
