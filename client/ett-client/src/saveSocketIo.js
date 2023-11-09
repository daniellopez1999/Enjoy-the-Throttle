import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react'


const socket = io.connect('http://localhost:3001')

function App() {
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] =  useState("");
  const [group, setGroup] = useState("");


  const joinGroup = () => {
    if (group !== "") {
      socket.emit("join_group", group);
    }
  }


  const sendMessage = () => {
    socket.emit("send_message", {message, group});
  };


  
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])

  return (
        <div>
          <h1>App test</h1>

      <input placeholder="Group ID" onChange={(event) => {
        setGroup(event.target.value);
      }} />
      <button onClick={joinGroup}>Join Group</button>
      <input placeholder="Message..." onChange={(event) => setMessage(event.target.value)}/>
      <button onClick={sendMessage}> Send Message</button>
      <h1>{messageReceived}</h1>
    </div>
  );
}

export default App;
