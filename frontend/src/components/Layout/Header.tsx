import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Shield } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <Shield className="logo-icon" />
            <span className="logo-text">Passport Portal</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <User className="user-icon" />
            <span className="user-name">{user?.firstName} {user?.lastName}</span>
            {isAdmin() && <span className="admin-badge">Admin</span>}
          </div>
          <button className="logout-btn" onClick={logout}>
            <LogOut className="logout-icon" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;