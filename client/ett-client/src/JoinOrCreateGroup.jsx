import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/joinorcreategroup.css'
import LogoPNGWhite from './imgs/LogoPNGWhite.png'

const JoinOrCreateGroup = () => {

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

  return (
<div className="page-container" id="join-or-create-cont">
  {/* Nav con el logo */}
  <div className="nav-container">
    <div className="nav-logo"><img src={LogoPNGWhite} alt="logo" id="logo-join-or-create"/></div>
    <div className="button-container" id="button-nav">
        <Link to={"/listofgroups"} className="nav-link">
      <button type="button" className="nav-button" >
      <span>List of groups</span>
      </button>
      </Link>
    </div>
  </div>

  {/* Separator Line Horizontal */}
  {/* Contenedor del botón Join Group */}
  <div className="button-container">
      <Link to={"/joingroup"} className="nav-link">
        <button type="button" className="nav-button">
        <span>Join Group</span>
    </button>
    </Link>
  </div>


  {/* Contenedor del botón Create Group */}

<div className='btn-ctn-jc'>
<div className="button-container">
  <Link to="/creategroup" className="nav-link">
    <button type="button" className="nav-button">
      <span>Create Group</span>
    </button>
  </Link>
</div>
  </div>
</div>

  )
}

export default JoinOrCreateGroup
