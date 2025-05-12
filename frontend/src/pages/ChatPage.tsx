import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChatPage.css";

const ChatPage: React.FC = () => {
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      console.log("Chat opened with user ID:", userId);
      // Here you would typically fetch chat data for this user
    }
  }, [userId]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="header-content">
          <div className="chat-header-title-column">
            <h1 className="header-title">Find my tutor</h1>
          </div>
          <div className="chat-header-buttons-column">
            <div className="header-buttons">
              <div
                className="chat-nav-button back-button"
                onClick={handleBackClick}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c97029a100caec3b0a0af85d26f148e9ded7e29d?placeholderIfAbsent=true"
                  alt="Back"
                  className="button-icon"
                />
              </div>
              <div
                className="chat-nav-button home-button"
                onClick={handleHomeClick}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2aa5bde932033ecfe6bc0bb099de0cdddfa20e0?placeholderIfAbsent=true"
                  alt="Home"
                  className="button-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="teacher-profile">
        <div className="profile-info">
          <div className="profile-left">
            <div className="profile-header">
              <div className="profile-chat-label">Чат</div>
              <button className="chat-contact-button">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7bb6a26fb546fc6d347b6d7d44e8bb4ef33b50a?placeholderIfAbsent=true"
                  alt="Contact"
                  className="chat-contact-icon"
                />
              </button>
            </div>
            <div className="chat-teacher-name">Екатерина</div>
          </div>
          <div className="profile-right">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0983738b056223c68b7ba32445d11b709474ae75?placeholderIfAbsent=true"
              alt="Teacher"
              className="teacher-photo"
            />
            <div className="teacher-details">
              <div className="detail-row">
                <div className="detail-label">Бюджет:</div>
                <div className="detail-value">2000 руб. / занятие</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Часовой пояс:</div>
                <div className="detail-value">Екб (GMT+5)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-container">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7048f4032e08168e712295e5aec1785e0144ae27?placeholderIfAbsent=true"
          alt="Chat background"
          className="chat-background"
        />
        <div className="chat-messages">
          <div className="message-group">
            <div className="message-column right">
              <div className="message-wrapper">
                <div className="sender-name">Вы</div>
                <div className="message">
                  <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3081a45235c365debc3e00efa6c6c800535ada12?placeholderIfAbsent=true"
                      alt="Message bubble"
                      className="message-bubble"
                  />
                  <div className="message-text">
                    Привет! Кажется, наши интересы совпадают. Может быть
                    проведем пробное занятие завтра в 155:000 тут?
                  </div>
                </div>
              </div>
            </div>
            <div className="message-column left">
              <div className="message-wrapper">
                <div className="sender-name">Екатерина</div>
                <div className="message">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5467362a4b1676ef65e7d48974487a1d27fb37d?placeholderIfAbsent=true"
                    alt="Message bubble"
                    className="message-bubble"
                  />
                  <div className="message-text">
                    Привет! Давай, вот ссылка. До встречи завтра!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="message-input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <div className="send-button" onClick={handleSendMessage}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e520290c9350f31b0e83a78f550b0cdceec21fdb?placeholderIfAbsent=true"
              alt="Send"
              className="send-icon"
            />
          </div>
        </div>
      </div>

      <footer className="chat-footer">
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

export default ChatPage;
