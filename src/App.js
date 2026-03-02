// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Intro from './Intro';
import Login from './Login';
import Form from './Form';
import RecruiterLogin from './RecruiterLogin';
import RecruiterDashboard from './RecruiterDashboard';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Intro />} />
      
      {/* Job Seeker Routes */}
      <Route path="/job-seeker/login" element={<Login />} />
      <Route path="/job-seeker/register" element={<Form />} />
      
      {/* Recruiter Routes */}
      <Route path="/recruiter/login" element={<RecruiterLogin />} />
      <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      
      {/* Catch all */}
      <Route path="*" element={<Intro />} />
    </Routes>
  );
}

export default App;