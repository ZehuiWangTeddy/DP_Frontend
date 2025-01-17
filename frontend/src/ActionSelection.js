import React, { useEffect, useState } from 'react';
import "./ActionSelection.css";
import { useNavigate } from 'react-router-dom';
import Film from './images/Film.png';
import User from './images/User.png';

function ActionSelection() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(user.name);
        }
    }, []);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expiryTime');
            navigate("/");
        }
    };

    return (
        <div className='manageBox'>
            <div className="selectBox" onClick={() => navigate("/mediaPage")}>
                <h1>Manage</h1>
                <h1>Media</h1>
                <img src={Film}/>
            </div>

            <div className="selectBox" onClick={() => navigate("/manageUsers")}>
                <h1>Manage</h1>
                <h1>Users</h1>
                <img src={User}/>
            </div>

            <div className="selectBox logoutBtn" onClick={() => navigate("/checkExchanges")}>
                <h1>Currency Exchange Rates</h1>
            </div>

            <div className="selectBox logoutBtn">
                <h1>Welcome, {userName}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default ActionSelection;
