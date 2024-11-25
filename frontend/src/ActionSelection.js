import React from 'react';
import "./ActionSelection.css";
import { useNavigate } from 'react-router-dom';
import Film from './images/Film.png';
import User from './images/User.png';

function ActionSelection() {
    const navigate = useNavigate(); 

  return (
    <div className='manageBox'>
        <div className="selectBox" onClick={() => navigate("/mediaPage")}>
            <h1>Manage</h1>
            <h1>Media</h1>

            <img src={Film} />
        </div>

        <div className="selectBox" onClick={() => navigate("/manageUsers")}>
            <h1>Manage</h1>
            <h1>Users</h1>

            <img src={User} />
        </div>
    </div>
  );
}

export default ActionSelection;
