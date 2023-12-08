import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListOfGroups } from './requests/group';
import './CSS/listofgroups.css';
import LogoPNGWhite from './imgs/LogoPNGWhite.png';

const baseURL = 'http://localhost:3001/getAllGroups/';

const ListOfGroups = () => {
  const userIDChecker = localStorage.getItem('id');
  const navigate = useNavigate();
  const checkIfUserLoggedIn = () => {
    if (!userIDChecker) {
      return false;
    } else {
      return true;
    }
  };

  const [list, setList] = useState([]);

  const userID = localStorage.getItem('id');

  const getList = async (id) => {
    const URL = `${baseURL}${id}`;
    const groupList = await getListOfGroups(URL);

    if (groupList.error) {
      console.error(groupList.message);
    } else {
      setList(groupList);
    }
  };

  useEffect(() => {
    const loggedIn = checkIfUserLoggedIn();
    if (loggedIn) {
      getList(userID);
    } else {
      navigate('/');
    }
  }, [userID]);

  const handleGroupClick = (groupName) => {
    if (groupName) {
      navigate(`/group/${groupName}`);
    }
  };

  return (
    <div id="list-of-groups-container">
      <div id="list-of-groups-nav-container">
        <div className="nav-logo">
          <img src={LogoPNGWhite} alt="logo" id="logo-join-or-create" />
        </div>
      </div>
      <div id="group-list-container">
        <div className="list-of-groups-button-container">
          {list.map((group, index) => (
            <div key={index}>
              <button
                className="input-button-join-group-list-of-groups"
                onClick={() => handleGroupClick(group)}
              >
                {group}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfGroups;
