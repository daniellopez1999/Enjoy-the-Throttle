import React from 'react'
import { Link } from 'react-router-dom';
import CreateGroup from './CreateGroup';

const JoinOrCreateGroup = () => {
  return (
    <div>
        <button type="button">
          Group List
        </button>
        {/* Campos del formulario de inicio de sesión */}
        <button type="button">
          Join Group
        </button>
        <button type="button">
          <Link to={"/creategroup"}> Create Group </Link>
        </button>
    </div>
  )
}

export default JoinOrCreateGroup
