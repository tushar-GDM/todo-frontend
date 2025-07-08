import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = 'https://backend.cicowp-ca.com/api';

const Login = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false); // loader state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.post(`${API_BASE}/login.php`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.token);
        setLoading(false);
        navigate('/'); // ✅ redirect after login
      } else {
        setErrorMsg(res.data.message || 'Login failed');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: '#fff',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🔐 Login</h2>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#888' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
