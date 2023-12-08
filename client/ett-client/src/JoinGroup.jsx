import React from 'react';
import { useState, useEffect } from 'react';
import { joinGroupRequest } from './requests/group';
import { useNavigate } from 'react-router-dom';
import './CSS/joingroup.css';
import LogoPNGWhite from './imgs/LogoPNGWhite.png';

const urlJoinGroup = 'http://localhost:3001/joinGroup';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');

  const userIDChecker = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    const checkIfUserLoggedIn = () => {
      if (!userIDChecker) {
        navigate('/');
      }
    };

    checkIfUserLoggedIn();
  }, [userIDChecker, navigate]);

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('id');

    const groupData = {
      groupName: groupName,
      userID: userID,
    };

    const joinGPResponse = await joinGroupRequest(urlJoinGroup, groupData, {
      userID,
    });

    if (joinGPResponse.error) {
      console.error(joinGPResponse.message);
      navigate('/joingroup');
    } else {
      navigate('/joinorcreategroup');
    }
  };

  return (
    <div id="join-group-container">
      <div id="join-group-nav-container">
        <div className="nav-logo">
          <img src={LogoPNGWhite} alt="logo" id="logo-join-or-create" />
        </div>
      </div>

      <div className="input-join-group-container">
        <form onSubmit={handleJoinGroup}>
          <div className="button-container">
            <input
              className="input-button-join-group"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              required
            />
            <div className="trying-to-center-this-div">
              <div id="joingroup-submit-button">
                <button id="join-group-button" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
