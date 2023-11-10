// Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, getModels } from './requests/user';

const URL = 'http://localhost:3001/register';
const APIUrl = 'https://api.api-ninjas.com/v1/motorcycles?make='

const validBikeTypes = ['Scooter', 'Naked bike', 'Sport','Custom / cruiser', 'ATV', 'Cross / motocross','Enduro / offroad', 'Classic','Minibike, cross','Trial','Allround','Touring']


const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [bikeBrand, setBikeBrand] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [bikeYear, setBikeYear] = useState('');
  const [bikeType, setBikeType] = useState('');
  const [fetchedModels, setFetchedModels] = useState([]);
  const [modelsByBrand, setModelsByBrand] = useState([]);
  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      name: userName,
      password: password,
      bikeBrand: bikeBrand,
      bikeModel: bikeModel,
    };

    const res = await register(URL, userData);

    if (res.error) {
      console.log(res.message);
      navigate('/register');
    } else {
      console.log(res);
      console.log('Successfully registered');
      navigate('/');
    }
  };

  return (
    <div>
      <h1>REGISTER</h1>
      <div className="input-register-container">
        <form onSubmit={handleRegister}>
          <label>
            UserName:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Brand:
            <input
              type="text"
              value={bikeBrand}
              onChange={(e) => setBikeBrand(e.target.value)}
              required
            />
          </label>

          <label>
            Year:
            <input
              type="text"
              value={bikeYear}
              onChange={(e) => setBikeYear(e.target.value)}
              required
            />
          </label>

          <label>
  Type:
  <select
    onChange={(e) => {
      setBikeType(e.target.value);
      setBikeModel(''); // Resetear bikeModel al cambiar bikeType
    }}
    value={bikeType}
    required
  >
    <option value="">Seleccione un tipo</option>
    {validBikeTypes.map((type, index) => (
      <option key={index} value={type}>
        {type}
      </option>
    ))}
  </select>
</label>

<label>
  Model:
  <select
    onChange={(e) => setBikeModel(e.target.value)}
    value={bikeModel}
    required
  >
    <option value="">Seleccione un modelo</option>
    {modelsByBrand.filter(model => model.type === bikeType).map((model, index) => (
      <option key={index} value={model.model}>
        {model.model}
      </option>
    ))}
  </select>
</label>


          

          <label>
            Fetch Models
            <button type="button" onClick={() => getModelsByBrand(bikeBrand)}>
              Fetch Models
            </button>
          </label>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
