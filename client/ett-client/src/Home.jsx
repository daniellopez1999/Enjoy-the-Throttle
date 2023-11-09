import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userName || !password) {
      alert('Obligatorio');
      return;
    }

    console.log('Login ', { userName, password });

    // history.push('/joinorcreategroup');
    navigate('/joinorcreategroup')
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
