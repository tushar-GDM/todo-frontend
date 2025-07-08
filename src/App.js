// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <KanbanBoard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={() => window.location.href = '/'} />} />
        <Route path="/register" element={<RegisterPage onRegister={() => window.location.href = '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
