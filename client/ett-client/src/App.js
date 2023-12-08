import './App.css';
import React from 'react';
//import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import JoinOrCreateGroup from './JoinOrCreateGroup';
import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';
import ListOfGroups from './ListOfGroups';
import GroupChat from './GroupChat';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/creategroup" element={<CreateGroup />} />
            <Route path="/joingroup" element={<JoinGroup />} />
            <Route path="/joinorcreategroup" element={<JoinOrCreateGroup />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listofgroups" element={<ListOfGroups />} />
            <Route path="/group/:groupName" element={<GroupChat />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
