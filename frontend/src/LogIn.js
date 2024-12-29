import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api/login';
import "./LogIn.css";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const expiryTime = localStorage.getItem('expiryTime');
        if (accessToken && expiryTime && new Date().getTime() < expiryTime) {
            navigate("/actionSelect");
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (email && password) {
            const result = await login(email, password);

            if (result.success) {
                navigate("/actionSelect");
            } else {
                alert(result.message);
            }
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

