import React from 'react'
import { useState, useEffect } from 'react';
import { createGroupRequest, joinGroupRequest } from './requests/group';
import { useNavigate } from 'react-router-dom';
import { getModels } from './requests/user';
import './CSS/creategroup.css'
import LogoPNGWhite from './imgs/LogoPNGWhite.png'


const urlCreateGroup = 'http://localhost:3001/createGroup';

const APIUrl = 'https://api.api-ninjas.com/v1/motorcycles?make='

const validBikeTypes = ['Scooter', 'Naked bike', 'Sport','Custom / cruiser', 'ATV', 'Cross / motocross','Enduro / offroad', 'Classic','Minibike, cross','Trial','Allround','Touring']

const userID = localStorage.getItem('id')


const CreateGroup = () => {
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


  const [groupName, setGroupName] = useState('');
  const [bikeBrand, setBikeBrand] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [bikeYear, setBikeYear] = useState('');
  const [bikeType, setBikeType] = useState('');
  const [fetchedModels, setFetchedModels] = useState([]);
  const [modelsByBrand, setModelsByBrand] = useState([]);
  const [mandatoryBike, setMandatoryBike] = useState(false);



  useEffect(() => {
    console.log(bikeBrand)
    console.log(fetchedModels)
    if (bikeBrand && fetchedModels.length > 0) {
      const selectedBrand = fetchedModels.find(
        (brand) => brand.make === bikeBrand
      );

      if (fetchedModels) {
        console.log(fetchedModels)
        const fetchedModelsSorted = fetchedModels.sort((a,b) => b.displacement.localeCompare(a.displacement));
        setModelsByBrand(fetchedModelsSorted)

      } else {
        setModelsByBrand([]);
      }
    } else {
      setModelsByBrand([]);
    }
  }, [fetchedModels]);


  const getModelsByBrand = async (brand) => {
    let offset = 0;
    // let url = `${APIUrl}${brand}&type=${bikeType}&year=${bikeYear}&offset=${offset * 30}`
    // console.log(url)
    let urlBikeType = bikeType.replace(' ', '%20')
    console.log(urlBikeType)
    const allModels = []
    let res = await getModels(`${APIUrl}${brand}&year=${bikeYear}&offset=${offset * 30}`)
    offset++;
    allModels.push(...res.data)
    console.log(allModels)
    while (res.data.length === 30 && offset <= 5) {
      console.log(res.data.length === 30 && offset <= 1, offset)
      console.log(`${APIUrl}${brand}&year=${bikeYear}&offset=${offset * 30}`)
      res = await getModels(`${APIUrl}${brand}&year=${bikeYear}&offset=${offset * 30}`);
      allModels.push(...res.data)
      console.log(allModels)
      offset++;
    }

    if (res.error) {
      console.log(res.message);
    } else {
      console.log(allModels);
      setFetchedModels(allModels)
     }

  };


  const handleSubmitGroup = async (e) => {
    e.preventDefault();
    console.log('hellooo')
    let userIDtoSend = localStorage.getItem('id')
    console.log(userIDtoSend)

    //save in an object the groupData
    const groupData = {
      groupName: groupName,
      bikeBrand: bikeBrand,
      bikeModel: bikeModel,
      mandatoryBike: mandatoryBike,
      memberList: userIDtoSend
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
      navigate('/joinorcreategroup');
    }
  }

  return (
    <div>
    <div className="input-creategroup-container">
      <div id='nav-creategroup-container'>
      <img src={LogoPNGWhite} alt="Logo" id="create-group-logo"/>
      </div>
      <div id="input-create-group-container">
      <form onSubmit={handleSubmitGroup}>

      <div className="input-create-group-group">
        <label>Group Name:</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div className="input-create-group-group">
        <label>Mandatory Bike:</label>
          <input
            type="checkbox"
            checked={mandatoryBike}
            onChange={(e) => setMandatoryBike(e.target.checked)}
          />
        </div>


        <div className="input-create-group-group">
        <label>Brand:</label>
            <input
              type="text"
              value={bikeBrand}
              onChange={(e) => setBikeBrand(e.target.value)}
              
            />
        </div>
          
        <div className="input-create-group-group">
          <label>Year:</label>
            <input
              type="text"
              value={bikeYear}
              onChange={(e) => setBikeYear(e.target.value)}
              
            />
          <button type="button" id="creategroup-input-button" onClick={() => getModelsByBrand(bikeBrand)}>
              Fetch Models
            </button>
        </div>
          
        <div className="input-create-group-group">
          <label>Type:</label>
            <select className='selector-register'
              onChange={(e) => {
                setBikeType(e.target.value);
                setBikeModel(''); // Resetear bikeModel al cambiar bikeType
              }}
              value={bikeType}
              
            >
              <option value="">Seleccione un tipo</option>
              {validBikeTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
        </div>

        <div className="input-create-group-group">
          <label>Model:</label>
            <select className='selector-register'
              onChange={(e) => setBikeModel(e.target.value)}
              value={bikeModel}
              
            >
              <option value="">Seleccione un modelo</option>
              {modelsByBrand.filter(model => model.type === bikeType).map((model, index) => (
                <option key={index} value={model.model}>
                  {model.model}
                </option>
              ))}
            </select>
        </div>

        <div className="input-create-group-group">
          <button type="submit" id="creategroup-input-button">Submit</button>
        </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default CreateGroup
