// Chat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Lógica para cargar mensajes del grupo con el nombre groupName
    // Puedes hacer una llamada a la API, usar sockets, etc.
    // Aquí, se usa un mensaje de ejemplo
    setMessages([`Message 1 in Group ${groupName}`, `Message 2 in Group ${groupName}`]);
  }, [groupName]);

  return (
    <div>
      <h2>Chat for Group {groupName}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
