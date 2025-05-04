import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/registration logic here
    console.log('Continuing with email:', email);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="main-heading">Find my tutor</h1>
        <h2 className="sub-heading">Вход</h2>
        
        <div className="content-section">
          <div className="content-columns">
            <div className="left-column">
              <form onSubmit={handleSubmit}>
                <label className="email-label">Введите почту.</label>
                <input 
                  type="email" 
                  className="email-input" 
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <button type="submit" className="continue-button">
                  Продолжить
                </button>
              </form>
              
              <p className="account-info">
                Если у вас нет аккаунта, он будет создан автоматически.
              </p>
              
              <div className="social-login">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/95d4121beea5ecbcb45f7a349d8cd26903df4423?placeholderIfAbsent=true&apiKey=0a8af0bf1ab64edb8b216ef5999fc1f9" 
                  alt="Social login option 1" 
                  className="social-icon"
                />
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/025da22e6d5910807b3d89373780f99929f450cd?placeholderIfAbsent=true&apiKey=0a8af0bf1ab64edb8b216ef5999fc1f9" 
                  alt="Social login option 2" 
                  className="social-icon"
                />
              </div>
            </div>
            
            <div className="right-column">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c506c557bddde56812a804372944a1c7f60bece1?placeholderIfAbsent=true&apiKey=0a8af0bf1ab64edb8b216ef5999fc1f9" 
                alt="Login illustration" 
                className="login-illustration"
              />
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

export default LoginPage;