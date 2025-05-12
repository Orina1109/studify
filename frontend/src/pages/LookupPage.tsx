import React from "react";
import "./LookupPage.css";

// Placeholder images - these would be replaced with actual assets
const backIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/7322121926101a5aa13d81fc911f100ee6482cb6";
const userIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/babe4ac13c1c3b0cdb73ca6cf9a7967f493af8c9";
const noIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/74682a452db7ad0de4f6255af12d51c8c917a0a6";
const tutorProfileImage =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/40ae79c1aff94655a93de337fafd169b272ec773";
const yesIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/95cb6a819ac204a4883461914b096b40c3022bd7";

const LookupPage: React.FC = () => {
  return (
    <div className="lookup-page">
      <div className="lookup-header">
        <div className="lookup-header-content">
          <div className="lookup-title">Find my tutor</div>
          <div className="lookup-description">
            Мы подобрали для вас несколько кандидатур. Выбирайте карточку,
            просматривайте профиль и начинайте общение.
          </div>
        </div>
        <div className="lookup-nav-buttons">
          <div className="nav-button">
            <img src={backIcon} alt="Back" className="nav-icon" />
          </div>
          <div className="nav-button">
            <img src={userIcon} alt="User" className="nav-icon" />
          </div>
        </div>
      </div>
      <div className="tutor-selection-container">
        <img src={noIcon} alt="No" className="selection-icon no-icon" />
        <div className="tutor-profile-container">
          <img
            src={tutorProfileImage}
            alt="Tutor Profile"
            className="tutor-profile-image"
          />
        </div>
        <img src={yesIcon} alt="Yes" className="selection-icon yes-icon" />
        <div className="tutor-profile-description">
          Описание преподавателя, очень крутой чел
        </div>
      </div>
      <div className="lookup-footer">
        <div className="footer-content">
          <div className="footer-year">2025</div>
          <div className="footer-copyright">©FindMyTutor</div>
          <div className="footer-about">О нас</div>
          <div className="footer-email">FindMy@Tutor.com</div>
          <div className="footer-privacy">Обработка персональных данных</div>
          <div className="footer-policy">Политика конфиденциальности</div>
        </div>
      </div>
    </div>
  );
};

export default LookupPage;
