// Chat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postMessage, getMessages } from './requests/message';
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
import './CSS/groupchat.css'

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

    const responsePostMessage = await postMessage(URLPost, messageData);

    if (responsePostMessage.error) {
      console.log(responsePostMessage.message);
    } else {
      console.log('Message posted in DB: ', responsePostMessage);
    }

    socket.emit('send_message', messageData);

    setInputMessage('');
  };

  return (
    <>
      <div id="container">
        <div>
          <h2>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2>
        </div>
        <div className="messages-list">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.userID === userID ? 'message-right' : 'message-left'
              }`}
            >
              {message.text}
            </div>
          ))}
          {Array.isArray(newMessage) &&
            newMessage.map((nwMsg, index) => (
              <div
                key={index}
                className={`message ${
                  nwMsg.userID === userID ? 'message-right' : 'message-left'
                }`}
              >
                {nwMsg.text}
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