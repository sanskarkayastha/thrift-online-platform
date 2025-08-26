import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { getUserById } from "../../services/user";
import axios from "axios";
import "../../Css/MessagesList.css";

const MessagesList = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/chats`);
        const userChats = res.data.filter((c) =>
          c.participants.includes(currentUserId)
        );
        setChats(userChats);

        // fetch other users in chats
        const userMap = {};
        for (let chat of userChats) {
          const otherId = chat.participants.find((p) => p !== currentUserId);
          if (otherId && !userMap[otherId]) {
            const u = await getUserById(otherId);
            userMap[otherId] = u.data;
          }
        }
        setUsers(userMap);
      } catch (err) {
        console.error("Error loading chats", err);
      }
    };

    fetchChats();
  }, [currentUserId]);

  const openChat = (sellerId) => {
    navigate(`/profile/messages/${sellerId}`);
  };

  return (
    <div className="messages-list">
      <h2>💬 Messages</h2>
      {chats.length === 0 ? (
        <p className="no-messages">No conversations yet.</p>
      ) : (
        <ul>
          {chats.map((chat) => {
            const otherId = chat.participants.find((p) => p !== currentUserId);
            const user = users[otherId];
            const lastMessage =
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].text
                : "No messages yet.";

            return (
              <li
                key={chat.id}
                className="message-preview"
                onClick={() => openChat(otherId)}
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="message-avatar"
                />
                <div>
                  <p className="message-name">{user?.fullName || "Unknown"}</p>
                  <p className="message-snippet">{lastMessage}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MessagesList;
