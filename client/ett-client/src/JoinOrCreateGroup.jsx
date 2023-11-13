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
<div className="page-container">
  {/* Nav con el logo */}
  <div className="nav-container">
    <div className="nav-logo"><img src={LogoPNGWhite} alt="logo" id="logo"/></div>
    <div className="button-container" id="button-nav">
      <button type="button" className="nav-button" >
        <Link to={"/listofgroups"} className="nav-link"><span>List of groups</span></Link>
      </button>
    </div>
  </div>

  {/* Separator Line Horizontal */}
  {/* Contenedor del botón Join Group */}
  <div className="button-container">
    <button type="button" className="nav-button">
      <Link to={"/joingroup"} className="nav-link"><span>Join Group</span></Link>
    </button>
  </div>

  {/* Separator Line Horizontal */}
  <div className="separator-line-horizontal"></div>

  {/* Contenedor del botón Create Group */}
  <div className="button-container">
    <button type="button" className="nav-button">
      <Link to={"/creategroup"} className="nav-link"><span>Create Group</span></Link>
    </button>
  </div>
</div>

  )
}

export default JoinOrCreateGroup
