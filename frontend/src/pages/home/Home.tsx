import type React from "react";
import "./Home.css";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const { isLoggedIn, userData, setIsLoggedIn, setUserData } = useAppContext();
  const navigate = useNavigate();

  const getInitials = () => {
    if (!userData?.user) return "";
    const { firstName, lastName } = userData.user;
    return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
  };

  const services = [
    {
      title: "Apply / Renew Normal Passport",
      description: "Standard passport application and renewal services",
      icon: "📄",
      color: "blue",
    },
    {
      title: "Tatkal Passport",
      description: "Fast-track passport services for urgent travel",
      icon: "⚡",
      color: "orange",
    },
    {
      title: "Visa Apply",
      description: "Apply for visas to various countries worldwide",
      icon: "🌍",
      color: "green",
    },
    {
      title: "Cancel Visa",
      description: "Cancel existing visa applications or approvals",
      icon: "❌",
      color: "red",
    },
  ];

  return (
    <div className="home-container">
      <nav className="home-navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="logo-section">
              <div className="logo-text">
                <h1 className="logo-title">PMS</h1>
                <p className="logo-subtitle">Passport Management System</p>
              </div>
            </div>
          </div>

          <div className="navbar-right">
            {isLoggedIn && userData ? (
              <div className="user-section">
                <div className="user-avatar">{getInitials()}</div>
                <button
                  className="login-btn"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserData(null);
                    localStorage.removeItem("userData");
                    localStorage.removeItem("isLoggedIn");
                    navigate("/login", { replace: true });
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="login-btn"
                onClick={() => {
                  navigate("/login", { replace: true });
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        {isLoggedIn && userData ? (
          <>
            <div className="welcome-section">
              <h2 className="welcome-title">
                Welcome back, {userData.user.firstName}!
              </h2>
              <p className="welcome-description">
                Manage your passport and visa applications with ease. Choose
                from our services below.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className={`service-card ${service.color}`}>
                  <div className="card-content">
                    <div className="card-header">
                      <div className={`card-icon ${service.color}-icon`}>
                        {service.icon}
                      </div>
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">{service.title}</h3>
                      <p className="card-description">{service.description}</p>
                    </div>
                    <div className="card-footer">
                      <span className="card-arrow">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="welcome-section">
            <h2 className="welcome-title">
              Welcome to Passport Management System
            </h2>
            <p className="welcome-description">
              Please log in to access our passport and visa services.
            </p>
            <button
              className="login-btn-centered"
              onClick={() => navigate("/login", { replace: true })}
            >
              Login to Get Started
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
