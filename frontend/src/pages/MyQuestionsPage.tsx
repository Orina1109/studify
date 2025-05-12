import React from "react";
import "./MyQuestionsPage.css";

const MyQuestionsPage: React.FC = () => {
  return (
    <div className="questionnaire-container">
      <div className="header-section">
        <div className="header-content">
          <div className="header-title-column">
            <h1 className="main-title">Find my tutor</h1>
          </div>
          <div className="header-buttons-column">
            <div className="buttons-container">
              <div className="button-column">
                <div className="nav-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c97029a100caec3b0a0af85d26f148e9ded7e29d?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Back"
                  />
                </div>
              </div>
              <div className="button-column">
                <div className="nav-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Contact"
                  />
                </div>
              </div>
              <div className="button-column">
                <div className="nav-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/da85ec3f5c371762db65cee6a272c01b19efba18?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Forward"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Ваша анкета (ученик)</h2>

      <div className="profile-section">
        <div className="profile-content">
          <div className="profile-info-column">
            <div className="profile-info-container">
              <div className="profile-image-column">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/517c02fdf31aa69c6bc9268f46ca3b723de21110?placeholderIfAbsent=true"
                  className="profile-image"
                  alt="Profile"
                />
              </div>
              <div className="profile-details-column">
                <div className="profile-details">
                  <h2 className="profile-name">Арина</h2>
                  <div className="profile-detail-row">
                    <div className="profile-detail-box">1500 руб. / 45 мин</div>
                  </div>
                  <div className="profile-detail-row">
                    <div className="profile-detail-box">Москва (GMT+3)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="interests-column">
            <div className="interests-container">
              <h3 className="interests-title">Интересы</h3>
              <div className="interests-boxes">
                <div className="interest-box">Кино</div>
                <div className="interest-box">Сериалы</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="basic-data-section">
        <h3 className="basic-data-title">Основные данные: </h3>
        <div className="basic-data-box">Язык: английский</div>
        <div className="basic-data-box">Уровень:А2</div>
        <div className="basic-data-box">
          Необходимый формат: <br />
          разговорная практика
        </div>
      </div>

      <div className="compatibility-section">
        <div className="compatibility-content">
          <div className="compatibility-title-column">
            <h3 className="compatibility-title">
              Совместимость с преподавателем
            </h3>
          </div>
          <div className="compatibility-details-column">
            <div className="compatibility-details">
              <div className="compatibility-row">
                <div className="compatibility-box">
                  Стиль общения: дружелюбный и поддерживающий
                </div>
                <div className="compatibility-box">
                  Люблю подробный разбор ошибок
                </div>
              </div>
              <div className="compatibility-box format-box">
                Формат уроков: свободное общение и практика разговора
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-section">
        <div className="footer-group">
          <div className="footer-year">2025</div>
          <div className="footer-copyright">©FindMyTutor</div>
          <div className="footer-link">О нас</div>
        </div>
        <div className="footer-links">
          <div className="footer-email">FindMy@Tutor.com</div>
          <div className="footer-link">Обработка персональных данных</div>
          <div className="footer-link">Политика конфиденциальности</div>
        </div>
      </footer>
    </div>
  );
};

export default MyQuestionsPage;
