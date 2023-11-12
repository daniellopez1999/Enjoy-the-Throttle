// Chat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postMessage, getMessages } from './requests/message';
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
import './CSS/groupchat.css'

const socket = io('http://localhost:3001');

const Chat = () => {
  const userID = localStorage.getItem('id')
  
  const navigate = useNavigate();
  if (userID) {
    console.log(userID)
  } else { 
    navigate('/')
  }

  const URLPost = 'http://localhost:3001/postMessage'
  const URLGet = 'http://localhost:3001/getAllMessages'

  const { groupName } = useParams();
  const [messages, setMessages] = useState([]); //to get messages when loaded
  const [inputMessage, setInputMessage] = useState('');
  const [newMessage, setNewMessage] = useState([]);
  const [isConnected, setIsConntected] = useState(false);

  const handleSocketConnect = () => {
    setIsConntected(true);
    setNewMessage([]);
    console.log('Socket connected. newMessage:', newMessage);
  };

  useEffect(() => {
    socket.on('connect', handleSocketConnect);

    socket.on('send_message', (data) => {
      console.log('SOOOOCKET', data)
      setNewMessage((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('send_message');
    }
  }, [])
  
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
    //POST MESSAGE IN DB
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
          // Update the messages state with the new message
    // Set the new message for displaying in the UI
    //setNewMessage(messageData);
    }

    //POST MESSAGE IN SOCKET
    socket.emit('send_message', messageData);

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
      <div><h2>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2></div>
      <div className="messages-list">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.userID === userID ? 'message-right' : 'message-left'}`}
            >
              {message.text}
            </div>
          ))}
{Array.isArray(newMessage) && newMessage.map((nwMsg, index) => {
  console.log('Mapping newMessage:', nwMsg);
  return (
    <div key={index} className={`message message-right`}>
      {nwMsg.text}
    </div>
  );
})}
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
