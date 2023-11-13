// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { postMessage, getMessages } from './requests/message';
import { getUserName } from './requests/user';
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
import './CSS/groupchat.css'
import sendMsgLogo from './imgs/send-alt-1-svgrepo-com.png'

const socket = io('http://localhost:3001');

const Chat = () => {


  const userID = localStorage.getItem('id');
  const navigate = useNavigate();

  if (!userID) {
    navigate('/');
  }

  const URLPost = 'http://localhost:3001/postMessage';
  const URLGet = 'http://localhost:3001/getAllMessages';

  const { groupName } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [newMessage, setNewMessage] = useState([]);
  const [isConnected, setIsConntected] = useState(false);

  // Unir al usuario al grupo cuando el componente se monte
  useEffect(() => {
    socket.emit('join_group', groupName);
    setIsConntected(true);
  }, [groupName]);

  const handleSocketConnect = () => {
    setIsConntected(true);
  };

  const messagesListRef = useRef();

  useEffect(() => {
    // Hacer scroll hacia abajo cada vez que se actualiza el estado de los mensajes
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  }, [messages, newMessage]);

  useEffect(() => {
    socket.on('connect', handleSocketConnect);

    socket.on('send_message', (data) => {
      setNewMessage((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('connect', handleSocketConnect);
      socket.off('send_message');
    };
  }, [groupName]);

  useEffect(() => {
    // Obtener mensajes cuando el componente se monte o groupName cambie
    const getMessagesWhenLoaded = async () => {
      const receivedMessages = await getMessages(URLGet, groupName);
      setMessages(receivedMessages.message);
    };

    getMessagesWhenLoaded();
  }, [groupName]);

  const handleSubmitMessage = async (e) => {

    e.preventDefault();
    const messageData = {
      userID: userID,
      groupName: groupName,
      text: inputMessage,
    };

    //get userName by ID and set it as userName
    const responseGetUserName = await getUserName(`http://localhost:3001/getUserName/${userID}`)

    if(responseGetUserName.error) {
      console.log(responseGetUserName.error);
    } else {
      console.log('Username received', responseGetUserName)
    }

    
    const responsePostMessage = await postMessage(URLPost, messageData);
    
    if (responsePostMessage.error) {
      console.log(responsePostMessage.message);
    } else {
      console.log('Message posted in DB: ', responsePostMessage);
    }
    
    
    const messageDataSocket = {
      userID: userID,
      groupName: groupName,
      text: inputMessage,
      userName: responseGetUserName,
      createdAt: responsePostMessage.data.createdAt.createdAt
    }

    console.log(messageDataSocket)


    socket.emit('send_message', messageDataSocket);

    setInputMessage('');

  };

  return (
      <div id="group-chat-container">
        <div id="container-group-name-messages-and-input">
        <div id="chat-info-messages-container">
          <div id="group-name-chat">
            <h1>{groupName}</h1>
          </div>

        </div>
        <div className="messages-list" id="messages-list-to-scroll" ref={messagesListRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.userID === userID ? 'message-right' : 'message-left'
              }`}
            >
              <div>{message.userName}:</div>
              <div>{message.text}</div>
              <div>{message.createdAt}</div>
              
              
            </div>
          ))}
          {Array.isArray(newMessage) &&
  newMessage.map((nwMsg, index) => {
    return (
      <div
        key={index}
        className={`message ${
          nwMsg.userID === userID ? 'message-right' : 'message-left'
        }`}
      >
        <div>{nwMsg.userName.data.userName}</div>
        <div>{nwMsg.text}</div>
        <div>{nwMsg.createdAt}</div>
        
      </div>
    );
  })}
        </div>
      <div id="general-input-btn-container">
        <form onSubmit={handleSubmitMessage}>
          <div id="input-sendbtn-container">
            <input
              type="text"
              value={inputMessage}
              placeholder='Write a message here'
              onChange={  (e) => setInputMessage(e.target.value)}
            />

          <button type="submit" id="submitMessagebtn"><img src={sendMsgLogo} alt="sendMsgLogo" className="sndMsgLogo"/></button>
          </div>
        </form>
        </div>
      </div>

      </div>
  );
};

export default Chat;