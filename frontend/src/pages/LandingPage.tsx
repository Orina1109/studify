import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Reusing LoginPage styles for now

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="main-heading">Find my tutor</h1>
        <h2 className="sub-heading">Welcome to Studify</h2>

        <div className="content-section">
          <div className="content-columns">
            <div className="left-column">
              <p>Please log in to access the platform.</p>
              <button 
                onClick={handleLoginClick}
                className="continue-button"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <div className="footer-content">
          <div className="footer-year">2025</div>
          <div className="footer-copyright">©FindMyTutor</div>
          <div className="footer-link">О нас</div>
          <div className="footer-email">FindMy@Tutor.com</div>
          <div className="footer-privacy">Обработка персональных данных</div>
          <div className="footer-policy">Политика конфиденциальности</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;