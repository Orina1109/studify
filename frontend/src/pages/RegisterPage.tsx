import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import imgStudent from "../assets/register-student.png";
import imgTeacher from "../assets/register-teacher.png";
import imgBack from "../assets/register-back.png";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    navigate(`/${role}/plan`);
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
        <div className="options-container">
          <div className="option-wrapper">
            <div
              className="option-button"
              onClick={() => handleRoleSelect('tutor')}
            >
              Я репетитор, ищу учеников
            </div>
          </div>
          <div className="option-wrapper">
            <div
              className="option-button"
              onClick={() => handleRoleSelect('student')}
            >
              Я ученик, ищу репетитора
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