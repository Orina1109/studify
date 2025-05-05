import React, { useState } from 'react';
import './LoginPage.css';
import Button from '../components/Button';
import InputField from '../components/InputField';
import loginIllustration from '../assets/login-illustration.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/registration logic here
    console.log('Continuing with email:', email, 'and password:', password);
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
                <InputField
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  label="Введите почту"
                  required={true}
                  className="email-input"
                  labelClassName="email-label"
                />
                <InputField
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  label="Введите пароль"
                  required={true}
                  className="password-input"
                  labelClassName="email-label password-label"
                />
                <Button type="submit" className="continue-button">
                  Продолжить
                </Button>
              </form>

              <p className="account-info">
                Если у вас нет аккаунта, он будет создан автоматически
              </p>
            </div>

            <div className="right-column">
              <img 
                src={loginIllustration} 
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
