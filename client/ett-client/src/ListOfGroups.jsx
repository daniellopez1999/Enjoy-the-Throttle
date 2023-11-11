import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListOfGroups } from './requests/group';

const baseURL = 'http://localhost:3001/getAllGroups/'

const ListOfGroups = () => {

  const [list, setList] = useState([]);

    const userID = localStorage.getItem('id')
    const navigate = useNavigate();

  const getList = async (id) => {
    const URL = `${baseURL}${id}`
    console.log(URL)
    const groupList = await getListOfGroups(URL)

    if (groupList.error) {
      console.log(groupList.message);
    } else {
      console.log('Received all the groups: ',groupList);
      setList(groupList)
    }
  }


  useEffect(() => {
    getList(userID)
  }, [userID])


  const handleGroupClick = (groupName) => {
    console.log('LLEGO DEL HANDLEGROUPCLICK. NOMBRE: ', groupName);
    if (groupName) {
      navigate(`/group/${groupName}`);
    } else {
      console.log('Nombre de grupo indefinido.');
    }
  };
  

  return (
    <div>
      <h1>Lista de grupos</h1>
      <div>
        {list.map((group, index) => (
          <div key={index}>
            <button onClick={() => handleGroupClick(group)}> 
            {group}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOfGroups
