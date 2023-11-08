import './App.css';
import io from 'socket.io-client';
import { useEffect } from 'react'


const socket = io.connect('http://localhost:3001')

function App() {

  const sendMessage = () => {
    socket.emit("send_message", {message: 'Hello world'}) //the second parameter should come from useState, at the moment is just mock data
  };

  
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    })
  }, [socket])

  return (
    <div>
      <input placeholder="Message..."/>
      <button onClick={sendMessage}> Send Message</button>
    </div>
  );
}

export default App;
