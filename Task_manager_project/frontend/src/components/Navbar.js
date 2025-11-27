import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav style={{
      backgroundColor: '#343a40',
      padding: '1rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        TaskManager
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span>Welcome, {user.username}</span>
        {user.is_admin && <span style={{ 
          backgroundColor: '#dc3545',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>ADMIN</span>}
        <button
          onClick={onLogout}
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid white',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;