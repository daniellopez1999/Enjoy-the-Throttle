// Chat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
//EXTRA TIME:
  //Check if userID is in group
    //If it's not, render ERROR
    //If it's in the group, just normal render
  const userID = localStorage.getItem('id')
  
  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);

  console.log(groupName)

  
  //primero, get de todos los mensajes existentes
//messages where groupName = groupName

//luego implementar socket io para que todo sea a tiempo real
//post de cada mensaje que se escribe en messagesDB
//probablemente sockets deberian estar en useEffect

  useEffect(() => {


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
