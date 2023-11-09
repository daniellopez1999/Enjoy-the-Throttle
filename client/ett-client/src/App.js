import './App.css';
//import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import JoinOrCreateGroup from './JoinOrCreateGroup';


function App() {

  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joinorcreategroup" element={<JoinOrCreateGroup />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  </>
  );
}

export default App;
