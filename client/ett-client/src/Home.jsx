import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {login} from './requests/user'
import './CSS/home.css'
import LogoPNGWhite from './imgs/LogoPNGWhite.png'

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
      console.log(res)
      localStorage.setItem('id',res.data.id)
      navigate('/joinorcreategroup')
    }
    
    

    console.log('Login ', { userName, password });

    // history.push('/joinorcreategroup');
  };

  return (
    <div id='page-container'>
      <div id='nav-container'>
        <img src={LogoPNGWhite} alt="Logo" id="home-logo"/>
      </div>
      <div id="login-container">
        <form onSubmit={handleLogin}>
  
          <div className="input-login-group">
            <label>User name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
  
          <div className="input-login-group">
            <label>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <div className="button-group-login">
  <button type="submit" className="login-button">Login</button>
    <Link to="/register" id='register-link'>
  <button type="button" id="register-button">
  <span>Register</span>
  </button>
  </Link>
</div>

  
        </form>
      </div>
    </div>
  );
  
};

export default Home;
