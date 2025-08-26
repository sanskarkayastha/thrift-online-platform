import axios from "axios";

const BASE_URL = "http://localhost:4000/chats";

// Get chat by participants
export const getChat = async (userId, sellerId) => {
  const response = await axios.get(`${BASE_URL}?id=chat_${userId}_${sellerId}`);
  return response.data.length > 0 ? response.data[0] : null;
};

// Create new chat
export const createChat = async (userId, sellerId) => {
  const newChat = {
    id: `chat_${userId}_${sellerId}`,
    participants: [userId, sellerId],
    messages: []
  };
  const response = await axios.post(BASE_URL, newChat);
  return response.data;
};

// Send message
export const sendMessage = async (chatId, message) => {
  const chat = await axios.get(`${BASE_URL}/${chatId}`);
  const updatedMessages = [...chat.data.messages, message];

  const response = await axios.patch(`${BASE_URL}/${chatId}`, {
    messages: updatedMessages
  });

  return response.data;
};
