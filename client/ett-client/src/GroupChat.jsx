// Chat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postMessage, getMessages } from './requests/message';

const Chat = () => {
//EXTRA TIME:
  //Check if userID is in group
    //If it's not, render ERROR
    //If it's in the group, just normal render
  const userID = localStorage.getItem('id')
  const URLPost = 'http://localhost:3001/postMessage'
  const URLGet = 'http://localhost:3001/getAllMessages'

  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  
  useEffect(() => {
    // Esta función se ejecutará solo una vez al montar el componente
    const getMessagesWhenLoaded = async () => {
      const receivedMessages = await getMessages(URLGet, groupName);
      console.log(receivedMessages.message)
      setMessages(receivedMessages.message);
    };

    getMessagesWhenLoaded();
  }, []); 
  
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    const messageData = {
      userID: userID,
      groupName: groupName,
      text: inputMessage,
    }

    const responsePostMessage = await postMessage(URLPost,messageData);

    if (responsePostMessage.error) {
      console.log(responsePostMessage.message);

    } else {
      console.log('Message posted in DB: ', responsePostMessage);
    }

    setInputMessage('')
  }
  //primero, get de todos los mensajes existentes
//messages where groupName = groupName

//luego implementar socket io para que todo sea a tiempo real
//post de cada mensaje que se escribe en messagesDB
//probablemente sockets deberian estar en useEffect

  return (
    <>
    <div>
      <h2>Chat for Group {groupName}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>

    <div>
      <form onSubmit={handleSubmitMessage}>
        <label>
          INPUT TEXT:
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
        </label>
        
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Chat;
