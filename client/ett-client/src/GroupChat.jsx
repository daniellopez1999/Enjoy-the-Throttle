// Chat.js
import React, { useState, useEffect } from 'react';

const Chat = ({ groupId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Lógica para cargar mensajes del grupo con el ID groupId
    // Puedes hacer una llamada a la API, usar sockets, etc.
    // Aquí, se usa un mensaje de ejemplo
    setMessages([`Message 1 in Group ${groupId}`, `Message 2 in Group ${groupId}`]);
  }, [groupId]);

  return (
    <div>
      <h2>Chat for Group {groupId}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
