import React from 'react'
import { useState, useEffect } from 'react';
import { joinGroupRequest } from './requests/group';
import { useNavigate } from 'react-router-dom';


const urlJoinGroup = 'http://localhost:3001/joinGroup';



const CreateGroup = () => {
  
  const [groupName, setGroupName] = useState('');
  
  const userIDChecker = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    const checkIfUserLoggedIn = () => {
      if (!userIDChecker) {
        console.log('No user ID found');
        navigate('/');
      } else {
        console.log(userIDChecker)
      }
    };

    checkIfUserLoggedIn();
  }, [userIDChecker, navigate]);


  const handleJoinGroup = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('id')

    const groupData = {
      groupName: groupName,
      userID: userID
    }

    const joinGPResponse = await joinGroupRequest(urlJoinGroup,groupData,{userID})
    
    if (joinGPResponse.error) {
      console.log(joinGPResponse.message);
      navigate('/joingroup');
    } else {
      console.log(joinGPResponse);
      console.log('Joined to the group');
      navigate('/joinorcreategroup');
    }

    console.log(joinGPResponse)

    //do post to create group, and add to memberList the id from localStorage (userID)
  //   const createGroupResponse = await createGroupRequest(urlCreateGroup, groupData);

  //   if (createGroupResponse.error) {
  //     console.log(createGroupResponse.message);
  //     navigate('/creategroup');
  //   } else {
  //     console.log(createGroupResponse);
  //     console.log('Group Created');
  //     navigate('/');
  //   }
  // }
}

  return (
    <div>
    <h1>JOIN GORUP</h1>

    <div className="input-creategroup-container">
      <form onSubmit={handleJoinGroup}>

        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </label>

        
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default CreateGroup
