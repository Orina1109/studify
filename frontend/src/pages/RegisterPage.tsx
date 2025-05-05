import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./RegisterPage.css";
import imgStudent from "../assets/register-student.png";
import imgTeacher from "../assets/register-teacher.png";
import imgBack from "../assets/register-back.png";
import api from "../services/api";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get username and passwordHash from location state
  const { username, passwordHash } = location.state || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  const registerUser = async (role: string) => {
    if (!username || !passwordHash) {
      console.error('Missing username or passwordHash');
      setError('Missing registration information. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Map frontend role to backend UserRole enum
      const userRole = role === 'tutor' ? 'TEACHER' : 'STUDENT';

      // Create registration request
      const registrationData = {
        username,
        passwordHash,
        email: `${username}@example.com`, // Placeholder email
        role: userRole
      };

      console.log('Sending registration request:', { ...registrationData, passwordHash: '***' });

      // Make API call to register endpoint
      const response = await api.post('/api/auth/register', registrationData);

      // Store token in cookies
      document.cookie = `authToken=${response.data.token}; path=/; max-age=86400`;

      console.log('Registration successful:', response.data);

      // Navigate to the appropriate page
      navigate(`/${role}/plan`);
    } catch (error: any) {
      console.error('Registration error:', error);
      setError('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    registerUser(role);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="header-section">
          <h1 className="main-title">Find my tutor</h1>
          <button className="back-button" onClick={handleGoBack}>
            <img src={imgBack} alt="Go back" className="back-icon" />
          </button>
        </div>
        <h2 className="subtitle">Языковая практика на одной волне.</h2>
        <div className="images-container">
          <div className="image-column">
            <img src={imgTeacher} alt="Tutor" className="tutor-image" />
          </div>
          <div className="image-column">
            <img src={imgStudent} alt="Student" className="student-image" />
          </div>
        </div>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        <div className="options-container">
          <div className="option-wrapper">
            <div
              className={`option-button ${isLoading ? 'disabled' : ''}`}
              onClick={() => !isLoading && handleRoleSelect('tutor')}
              style={{ cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading && selectedRole === 'tutor' ? 'Регистрация...' : 'Я репетитор, ищу учеников'}
            </div>
          </div>
          <div className="option-wrapper">
            <div
              className={`option-button ${isLoading ? 'disabled' : ''}`}
              onClick={() => !isLoading && handleRoleSelect('student')}
              style={{ cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading && selectedRole === 'student' ? 'Регистрация...' : 'Я ученик, ищу репетитора'}
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-year">2025</div>
          <div className="footer-copyright">©FindMyTutor</div>
          <div className="footer-about">О нас</div>
          <div className="footer-email">FindMy@Tutor.com</div>
          <div className="footer-privacy">Обработка персональных данных</div>
          <div className="footer-policy">Политика конфиденциальности</div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
