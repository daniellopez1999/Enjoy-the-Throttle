import React from 'react'
import { useState } from 'react';
import { createGroupRequest, joinGroupRequest } from './requests/group';
import { useNavigate } from 'react-router-dom';


const urlCreateGroup = 'http://localhost:3001/createGroup';


const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [bikeBrand, setBikeBrand] = useState(null);
  const [bikeModel, setBikeModel] = useState(null);
  const [mandatoryBike, setMandatoryBike] = useState(false);

  const navigate = useNavigate();


  const handleSubmitGroup = async (e) => {
    e.preventDefault();
    console.log('hellooo')
    const userID = localStorage.getItem('id')
    console.log(userID)

    //save in an object the groupData
    const groupData = {
      groupName: groupName,
      bikeBrand: bikeBrand,
      bikeModel: bikeModel,
      mandatoryBike: mandatoryBike,
      memberList: [userID]
    }
    console.log(groupData)

    //do post to create group, and add to memberList the id from localStorage (userID)
    const createGroupResponse = await createGroupRequest(urlCreateGroup, groupData);

    if (createGroupResponse.error) {
      console.log(createGroupResponse.message);
      navigate('/creategroup');
    } else {
      console.log(createGroupResponse);
      console.log('Group Created');
      navigate('/');
    }
  }

  return (
    <div>
    <h1>REGISTER</h1>
    <div className="input-creategroup-container">
      <form onSubmit={handleSubmitGroup}>
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </label>

        <label>
          Mandatory Bike:
          <input
            type="checkbox"
            value={mandatoryBike}
            onChange={(e) => setMandatoryBike(e.target.value)}
          />
        </label>

        <button type="submit">Register</button>
      </form>
      </div>
    </div>
  )
}

export default CreateGroup
