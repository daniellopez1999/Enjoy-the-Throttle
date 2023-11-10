// Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './requests/user';

const URL = 'http://localhost:3001/register'


const mockData = [
  {
    id: 1,
    name: 'Kawasaki',
    models: ['ZX-6R', 'Z900'],
  },
  {
    id: 2,
    name: 'Yamaha',
    models: ['R1', 'R7'],
  },
];

const Register = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [bikeBrand, setBikeBrand] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [modelsByBrand, setModelsByBrand] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    if (bikeBrand && mockData.length > 0) {
      const selectedBrand = mockData.find(
        (brand) => brand.name.toLowerCase() === bikeBrand.toLowerCase()
      );

      if (selectedBrand) {
        setModelsByBrand(selectedBrand.models || []);
      } else {
        // Si la marca no se encuentra, establecer modelos en un array vacío
        setModelsByBrand([]);
      }
    } else {
      // Si no hay marca escrita, establecer modelos en un array vacío
      setModelsByBrand([]);
    }
  }, [bikeBrand]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      name: userName,
      password: password,
      bikeBrand: bikeBrand,
      bikeModel: bikeModel,
    }

    const res = await register(URL,userData)

    if (res.error) {
      console.log(res.message);
      navigate('/register')
    } else {
      console.log(res)
      console.log('Successfully registered')
      navigate('/')
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
            Model:
            <select onChange={(e) => setBikeModel(e.target.value)} value={bikeModel} required>
              <option value="">Seleccione un modelo</option>
              {modelsByBrand.map((modelo, index) => (
                <option key={index} value={modelo}>
                  {modelo}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
