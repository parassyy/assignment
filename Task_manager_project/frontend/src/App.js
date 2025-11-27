import React, { useState, useEffect } from 'react';
import Login from './components/login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('login');
  };

  return (
    <div className="App">
      {user && <Navbar user={user} onLogout={handleLogout} />}
      
      {currentView === 'login' && (
        <div>
          <Login onLogin={handleLogin} />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={() => setCurrentView('register')}
              style={{
                backgroundColor: 'transparent',
                color: '#007bff',
                border: '1px solid #007bff',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Don't have an account? Register
            </button>
          </div>
        </div>
      )}
      
      {currentView === 'register' && (
        <div>
          <Register onRegister={handleLogin} />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={() => setCurrentView('login')}
              style={{
                backgroundColor: 'transparent',
                color: '#007bff',
                border: '1px solid #007bff',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      )}
      
      {currentView === 'dashboard' && user && (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;