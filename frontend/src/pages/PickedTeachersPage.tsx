import React from "react";
import "./PickedTeachersPage.css";

const PickedTeachersPage: React.FC = () => {
  return (
    <div className="picked-teachers-container">
      <div className="content-wrapper">
        <div className="header-section">
          <div className="title-column">
            <div className="main-title">Find my tutor</div>
          </div>
          <div className="buttons-column">
            <div className="buttons-container">
              <div className="button-column">
                <div className="nav-button back-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c97029a100caec3b0a0af85d26f148e9ded7e29d?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Back"
                  />
                </div>
              </div>
              <div className="button-column">
                <div className="nav-button contact-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Contact"
                  />
                </div>
              </div>
              <div className="button-column">
                <div className="nav-button next-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/da85ec3f5c371762db65cee6a272c01b19efba18?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Next"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-title">Вы на одной волне</div>
        <div className="teacher-list">
          <div className="teacher-item">
            <div className="teacher-info">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ff174af361be5482002a7af5f3c0d943436fc2a?placeholderIfAbsent=true"
                className="teacher-avatar"
                alt="Teacher avatar"
              />
              <div className="teacher-name">Анна</div>
              <div className="price-container">
                <div className="price-tag">1500 руб. / 45 мин</div>
              </div>
              <div className="location-container">
                <div className="location-tag">Москва (GMT+3)</div>
              </div>
            </div>
            <div className="contact-button-container">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                className="contact-icon"
                alt="Contact"
              />
            </div>
          </div>
          <div className="teacher-item">
            <div className="teacher-info">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/860e9c0f15886ec196fb0acb31684a5b690d4ee1?placeholderIfAbsent=true"
                className="teacher-avatar"
                alt="Teacher avatar"
              />
              <div className="teacher-name">Мартин</div>
              <div className="price-container">
                <div className="price-tag">2000 руб. / 45 мин</div>
              </div>
              <div className="location-container">
                <div className="location-tag">Москва (GMT+3)</div>
              </div>
            </div>
            <div className="contact-button-container">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                className="contact-icon"
                alt="Contact"
              />
            </div>
          </div>
          <div className="teacher-item">
            <div className="teacher-info">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbbee56421412eb660291c345ad642085608b33e?placeholderIfAbsent=true"
                className="teacher-avatar"
                alt="Teacher avatar"
              />
              <div className="teacher-name">Михаил</div>
              <div className="price-container">
                <div className="price-tag">1200 руб. / 60 мин</div>
              </div>
              <div className="location-container">
                <div className="location-tag">Екб (GMT+5)</div>
              </div>
            </div>
            <div className="contact-button-container">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                className="contact-icon"
                alt="Contact"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-left">
            <div className="footer-year">2025</div>
            <div className="footer-copyright">©FindMyTutor</div>
            <div className="footer-about">О нас</div>
          </div>
          <div className="footer-right">
            <div className="footer-email">FindMy@Tutor.com</div>
            <div className="footer-privacy">Обработка персональных данных</div>
            <div className="footer-policy">Политика конфиденциальности</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickedTeachersPage;
