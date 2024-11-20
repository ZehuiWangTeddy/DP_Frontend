import React from 'react';
import "./LogIn.css";

function LogIn() {
  return (
    <div className="logInBox">
      <h1>Log-in</h1>
      
      <form>
        <label>
          Email
          <input type="text" name="username" />
        </label>
        
        <label>
          Password
          <input type="password" name="password" />
        </label>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LogIn;



