import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LogIn.css";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (email && password) {
        navigate("/actionSelect");
      } else {
        alert("Please enter both email and password.");
      }
    };

    return (
        <div className="logInBox">
            <h1>Log-in</h1>
            
            <form onSubmit={handleSubmit}>
                <label>
                Email
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                
                <label>
                Password
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LogIn;

