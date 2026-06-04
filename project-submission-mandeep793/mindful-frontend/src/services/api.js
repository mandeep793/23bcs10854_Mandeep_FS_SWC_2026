import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const sendMessage = async (messages, sessionId) => {
  const response = await axios.post(`${BASE_URL}/chat/message`, {
    messages,
    sessionId,
  });
  return response.data;
};

export const checkHealth = async () => {
  const response = await axios.get(`${BASE_URL}/chat/health`);
  return response.data;
};
