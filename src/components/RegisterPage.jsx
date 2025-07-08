import React, { useState } from 'react';
import api from './api';

const RegisterPage = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // for loader

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('⚠️ All fields are required!');
      return;
    }

    setLoading(true); // start loader

    try {
      const res = await api.post('/register.php', {
        email,
        name,
        password
      });

      if (res.data.status === 'success') {
        alert("✅ Registered successfully!");
        onRegister(); // redirect to login
      } else if (res.data.msg === "Email already exists") {
        alert("⚠️ Already registered. Please login.");
      } else {
        alert("❌ Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("🚫 Error during registration");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div style={styles.container}>
      {loading && (
        <div style={styles.overlay}>
          <div style={styles.loader}></div>
        </div>
      )}

      <div style={{ ...styles.card, pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.4 : 1 }}>
        <h2 style={styles.heading}>📝 Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <button onClick={handleRegister} style={styles.button} disabled={loading}>
          Register
        </button>
        <p style={{ marginTop: '10px' }}>
          Already have an account?{' '}
          <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={onRegister}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(255,255,255,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loader: {
    border: '6px solid #ccc',
    borderTop: '6px solid #007bff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1em',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

// Add spinner animation to global CSS (index.css or App.css)
// Or inject via <style> dynamically if needed
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(style);

export default RegisterPage;
