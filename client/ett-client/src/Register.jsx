// Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, getModels } from './requests/user';
import LogoPNGWhite from './imgs/LogoPNGWhite.png';
import './CSS/register.css';

const URL = 'http://localhost:3001/register';
const APIUrl = 'https://api.api-ninjas.com/v1/motorcycles?make=';

const validBikeTypes = [
  'Scooter',
  'Naked bike',
  'Sport',
  'Custom / cruiser',
  'ATV',
  'Cross / motocross',
  'Enduro / offroad',
  'Classic',
  'Minibike, cross',
  'Trial',
  'Allround',
  'Touring',
];

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
    if (bikeBrand && fetchedModels.length > 0) {
      fetchedModels.find((brand) => brand.make === bikeBrand);

      if (fetchedModels) {
        const fetchedModelsSorted = fetchedModels.sort((a, b) =>
          b.displacement.localeCompare(a.displacement)
        );
        setModelsByBrand(fetchedModelsSorted);
      } else {
        setModelsByBrand([]);
      }
    } else {
      setModelsByBrand([]);
    }
  }, [fetchedModels]);

  const getModelsByBrand = async (brand) => {
    let offset = 0;

    const allModels = [];
    let res = await getModels(
      `${APIUrl}${brand}&year=${bikeYear}&offset=${offset * 30}`
    );
    offset++;
    allModels.push(...res.data);
    while (res.data.length === 30 && offset <= 5) {
      res = await getModels(
        `${APIUrl}${brand}&year=${bikeYear}&offset=${offset * 30}`
      );
      allModels.push(...res.data);
      offset++;
    }

    if (!res.error) {
      setFetchedModels(allModels);
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
      navigate('/register');
    } else {
      navigate('/');
    }
  };

  return (
    <div id="register-page-container">
      <div id="nav-container-registeer">
        <img src={LogoPNGWhite} alt="Logo" id="register-logo" />
      </div>
      <div id="input-register-container">
        <form onSubmit={handleRegister}>
          <div className="input-register-group">
            <label>UserName:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="input-register-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-register-group">
            <label>Brand:</label>
            <input
              type="text"
              value={bikeBrand}
              onChange={(e) => setBikeBrand(e.target.value)}
              required
            />
          </div>

          <div className="input-register-group">
            <label>Year</label>
            <input
              type="text"
              value={bikeYear}
              onChange={(e) => setBikeYear(e.target.value)}
              required
            />
            <button
              type="button"
              id="register-input-button"
              onClick={() => getModelsByBrand(bikeBrand)}
            >
              Fetch Models
            </button>
          </div>

          <div className="input-register-group">
            <label>Type:</label>
            <select
              className="selector-register"
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
          </div>

          <div className="input-register-group">
            <label>Model:</label>
            <select
              className="selector-register"
              onChange={(e) => setBikeModel(e.target.value)}
              value={bikeModel}
              required
            >
              <option value="">Seleccione un modelo</option>
              {modelsByBrand
                .filter((model) => model.type === bikeType)
                .map((model, index) => (
                  <option key={index} value={model.model}>
                    {model.model}
                  </option>
                ))}
            </select>
          </div>

          <div className="input-register-group" id="register-input-button">
            <button type="submit" id="button-press-register">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
