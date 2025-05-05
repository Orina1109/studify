import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import Button from '../components/Button';
import InputField from '../components/InputField';
import loginIllustration from '../assets/login-illustration.png';

// SHA-256 hash function
async function sha256(message: string): Promise<string> {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Hash the password
      const passwordHash = await sha256(password);

      // Make API call to login endpoint
      console.log('Sending login request with:', { username, passwordHash: passwordHash.substring(0, 10) + '...' });

      // Create a JSON string manually
      const jsonData = JSON.stringify({
        username,
        passwordHash
      });

      const response = await axios.post('/api/auth/login', jsonData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      });

      // Store token in cookies
      document.cookie = `authToken=${response.data.token}; path=/; max-age=86400`;

      // Redirect to home page
      console.log('Login successful:', response.data);

      // Navigate to the root page
      navigate('/');

      // Reset loading state
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error('Login error:', error);

      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', { 
          message: error.message,
          code: error.code,
          response: error.response ? {
            status: error.response.status,
            statusText: error.response.statusText,
            headers: error.response.headers,
            data: error.response.data
          } : null,
          request: error.request ? {
            method: error.config?.method,
            url: error.config?.url,
            headers: error.config?.headers,
            data: error.config?.data
          } : null
        });

        if (error.response) {
          const errorCode = error.response.data?.code;

          if (errorCode === 'USER_NOT_EXISTS') {
            // Redirect to registration page with username and password hash
            const passwordHash = await sha256(password);
            navigate('/register', { 
              state: { 
                username, 
                passwordHash 
              } 
            });
          } else if (errorCode === 'WRONG_CREDENTIALS') {
            setErrorMessage('Неверный логин или пароль');
          } else {
            setErrorMessage('Произошла ошибка при входе. Пожалуйста, попробуйте снова.');
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          setErrorMessage('Сервер не отвечает. Пожалуйста, попробуйте позже.');
        } else {
          // Something happened in setting up the request
          setErrorMessage('Ошибка при отправке запроса: ' + error.message);
        }
      } else {
        setErrorMessage('Не удалось подключиться к серверу. Пожалуйста, проверьте ваше соединение.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="main-heading">Find my tutor</h1>
        <h2 className="sub-heading">Вход</h2>

        <div className="content-section">
          <div className="content-columns">
            <div className="left-column">
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <InputField
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  label="Введите логин"
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
                <Button 
                  type="submit" 
                  className="continue-button"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
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
