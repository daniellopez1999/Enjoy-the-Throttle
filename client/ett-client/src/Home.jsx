import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {login} from './requests/user'

const URL = 'http://localhost:3001/login'

const Home = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      alert('Obligatorio');
      return;
    }

    const userData = {
      name: userName,
      password: password
    }

    const res = await login(URL,userData)

    if (res.error) {
      console.log(res.message);
      navigate('/')
    } else {
      navigate('/joinorcreategroup')
    }
    
    

    console.log('Login ', { userName, password });

    // history.push('/joinorcreategroup');
  };

  return (
    <div>
      <h1>HOME</h1>
      <div className="input-login-container">
        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>
      </div>

      <button type="button">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Home;
