import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './requests/user';
import './CSS/joinorcreategroup.css';
import LogoPNGWhite from './imgs/LogoPNGWhite.png';

const JoinOrCreateGroup = () => {
  const userIDChecker = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    const checkIfUserLoggedIn = () => {
      if (!userIDChecker) {
        navigate('/');
      }
    };

    checkIfUserLoggedIn();
  }, [userIDChecker, navigate]);

  const logOut = async () => {
    const logingout = await logout('http://localhost:3001/logout');

    if (!logingout.error) {
      localStorage.removeItem('id');
      navigate('/');
    }
  };

  return (
    <div className="page-container" id="join-or-create-cont">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={LogoPNGWhite} alt="logo" id="logo-join-or-create" />
        </div>

        <div>
          <button
            type="button"
            className="button-container nav-button btn-joc-span"
            id="button-logout-css"
            onClick={logOut}
          >
            Log out
          </button>
        </div>

        <div className="button-container" id="button-nav">
          <Link to={'/listofgroups'} className="nav-link">
            <button type="button" className="nav-button btn-joc-span">
              List of groups
            </button>
          </Link>
        </div>
      </div>

      <div className="button-container">
        <Link to={'/joingroup'} className="nav-link">
          <button type="button" className="nav-button">
            Join Group
          </button>
        </Link>
      </div>

      <div className="btn-ctn-jc">
        <div className="button-container">
          <Link to="/creategroup" className="nav-link">
            <button type="button" className="nav-button">
              Create Group
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinOrCreateGroup;
