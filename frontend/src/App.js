import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LogIn from './LogIn';
import ActionSelection from './ActionSelection'; 
import MediaPage from './MediaPage'; 
import AddMedia from './AddMedia'; 
import MediaDetailsPage from './MediaDetailsPage';
import ManageUsers from './ManageUsers';
import CheckExchangeRates from "./CheckExchangeRates";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/actionSelect" element={<ActionSelection />} />
          <Route path="/mediaPage" element={<MediaPage />} />
          <Route path="/addMedia" element={<AddMedia />} />
          <Route path="/media/:type/:id" element={<MediaDetailsPage />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route path="/checkExchanges" element={<CheckExchangeRates />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
