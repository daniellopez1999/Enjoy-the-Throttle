// Chat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postMessage, getMessages } from './requests/message';
import { useNavigate } from 'react-router-dom';

import './CSS/groupchat.css'

const Chat = () => {
  const userID = localStorage.getItem('id')
  const navigate = useNavigate();

  const checkIfUserLoggedIn = () => {
    if (userID) {
      console.log(userID)
    } else { 
      navigate('/')
    }
  }
  checkIfUserLoggedIn();

  const URLPost = 'http://localhost:3001/postMessage'
  const URLGet = 'http://localhost:3001/getAllMessages'

  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  
  useEffect(() => {
    // Esta función se ejecutará solo una vez al montar el componente
    const isLoggedIn = checkIfUserLoggedIn()
    if (!isLoggedIn) {
      navigate('/')
    } else {
      getMessagesWhenLoaded();
    }
    
    const getMessagesWhenLoaded = async () => {
      const receivedMessages = await getMessages(URLGet, groupName);
      console.log(receivedMessages.message)
      setMessages(receivedMessages.message);
    };

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
    <div id="container">
    <div className="messages-list">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.userID === userID ? 'message-right' : 'message-left'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
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
