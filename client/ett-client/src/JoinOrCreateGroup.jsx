import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
    <div>
        <button type="button">
        <Link to={"/listofgroups"}> Group List </Link>
        </button>
        {/* Campos del formulario de inicio de sesión */}
        <button type="button">
        <Link to={"/joingroup"}> Join Group </Link>
        </button>
        <button type="button">
          <Link to={"/creategroup"}> Create Group </Link>
        </button>
    </div>
  )
}

export default JoinOrCreateGroup
