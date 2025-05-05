import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fd5e0bf65a02160b897868360548c744f84483a?placeholderIfAbsent=true" className="hero-logo" alt="Logo" />
          <h1 className="hero-title">Find my tutor</h1>
          <h2 className="hero-subtitle">Языковая практика на одной волне.</h2>
        </div>
      </div>
      <div className="main-content">
        <div className="section-container">
          <div className="two-column-section">
            <div className="column">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/19f0fb7181e2196b85a357dd7ae9282640625e9a?placeholderIfAbsent=true" className="section-image" alt="Connecting people" />
            </div>
            <div className="column">
              <div className="section-text-container right-aligned">
                <h2 className="section-title">Объединяем по вайбу</h2>
                <p className="section-description">
                  Подбираем идеальные совпадения репетиторов и учеников для эффективного и интересного обучения.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h2 className="section-title left-aligned">Ищем по интересам</h2>
        <div className="section-container interests-section">
          <div className="two-column-section">
            <div className="column">
              <p className="section-description left-aligned">
                При подборе репетиторов и учеников руководствуемся совпадением целей, интересов и хобби.
              </p>
            </div>
            <div className="column">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb1eaae23809185dcbf588398dfcbb3769cd128c?placeholderIfAbsent=true" className="section-image" alt="Interests matching" />
            </div>
          </div>
        </div>
        <h2 className="section-title right-aligned">Знаем, что наш подход работает</h2>
        <div className="approach-section">
          <div className="two-column-section">
            <div className="column">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/971fe2a62dbfc5bf6a2409fd62b535458a0cfbb6?placeholderIfAbsent=true" className="section-image" alt="Our approach" />
            </div>
            <div className="column">
              <p className="section-description right-aligned">
                Алгоритм подбирает идеальные совпадения. Это углубляет погружение в язык, культуру, облегчает преподавание заинтересованным ученикам.
              </p>
            </div>
          </div>
          <h2 className="section-title left-aligned testimonials-heading">Отзывы</h2>
        </div>
      </div>
      <div className="testimonials-section">
        <div className="three-column-section">
          <div className="column">
            <div className="testimonial-card-outer">
              <div className="testimonial-card">
                <h3 className="testimonial-name">Иван, фанат научной фантастики</h3>
                <p className="testimonial-text">
                  «Всегда хотел учить французский, но скучные учебники не мотивировали. Теперь обсуждаем фантастические романы с преподавателем – учёба стала интереснее!»
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="testimonial-card-outer">
              <div className="testimonial-card">
                <h3 className="testimonial-name">Олег, преподаватель французского, стаж 8 лет</h3>
                <p className="testimonial-text">
                  «Мне важно, чтобы студентам было интересно учиться. На Find My Tutor я легко нахожу учеников, с которыми у нас общие интересы – так обучение проходит живо и естественно!»
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="testimonial-card-outer">
              <div className="testimonial-card">
                <h3 className="testimonial-name">Алексей, играет в настольные игры</h3>
                <p className="testimonial-text">
                  «Никогда не думал, что можно учить английский через Dungeons & Dragons! Теперь с преподавателем играем и прокачиваем язык одновременно.»
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="success-counter">10 000+ успешных подборов преподавателей и учеников.</h2>
      <div className="cta-section">
        <div className="cta-content">
          <div className="cta-text-container">
            <h2 className="cta-title">
              Начните сейчас
              <br />
              <span className="cta-subtitle">Это бесплатно</span>
            </h2>
          </div>
        </div>
      </div>
      <button className="register-button" onClick={handleRegisterClick}>
        Зарегистрироваться
      </button>
      <div className="footer-divider"></div>
      <div className="footer">
        <div className="footer-item bold">2025</div>
        <div className="footer-item bold">©FindMyTutor</div>
        <div className="footer-item">О нас</div>
        <div className="footer-item">FindMy@Tutor.com</div>
        <div className="footer-item center">Обработка персональных данных</div>
        <div className="footer-item center">Политика конфиденциальности</div>
      </div>
    </div>
  );
};

export default LandingPage;