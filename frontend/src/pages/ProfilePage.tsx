import React from "react";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="header-row">
          <div className="header-left-column">
            <div className="main-title">Find my tutor</div>
          </div>
          <div className="header-right-column">
            <div className="nav-buttons-container">
              <div className="nav-buttons-row">
                <div className="nav-button-column">
                  <div className="nav-button back-button">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c97029a100caec3b0a0af85d26f148e9ded7e29d?placeholderIfAbsent=true"
                      className="nav-button-icon"
                    />
                  </div>
                </div>
                <div className="nav-button-column">
                  <div className="nav-button contact-button">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                      className="nav-button-icon"
                    />
                  </div>
                </div>
                <div className="nav-button-column">
                  <div className="nav-button forward-button">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/da85ec3f5c371762db65cee6a272c01b19efba18?placeholderIfAbsent=true"
                      className="nav-button-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-title">Ваша информация</div>
      <div className="profile-dashboard">
        <div className="sidebar-menu">
          <div className="menu-item">Ваша анкета</div>
          <div className="menu-item">Вы на одной волне</div>
          <div className="menu-item">Архив занятий</div>
          <div className="menu-item">Настройки</div>
          <div className="menu-item">Выход</div>
        </div>
        <div className="calendar-section">
          <div className="calendar-title">Календарь занятий</div>
          <div className="calendar-month">Сентябрь, 2026</div>
          <div className="calendar-grid">
            <div className="calendar-week">
              <div className="calendar-day disabled">1</div>
              <div className="calendar-day">2</div>
              <div className="calendar-day">3</div>
              <div className="calendar-day">4</div>
              <div className="calendar-day">5</div>
              <div className="calendar-day">6</div>
              <div className="calendar-day">7</div>
            </div>
            <div className="calendar-week">
              <div className="calendar-day">8</div>
              <div className="calendar-day">9</div>
              <div className="calendar-day">10</div>
              <div className="calendar-day">11</div>
              <div className="calendar-day current-day">12</div>
              <div className="calendar-day">13</div>
              <div className="calendar-day">14</div>
            </div>
            <div className="calendar-week">
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
            </div>
            <div className="calendar-week">
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
            </div>
            <div className="calendar-week">
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
              <div className="calendar-day"></div>
            </div>
          </div>
        </div>
      </div>
      <footer className="profile-footer">
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

export default ProfilePage;
