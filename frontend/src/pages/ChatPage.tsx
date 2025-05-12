import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChatPage.css";
import api from "../services/api";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

interface TeacherData {
  id: number;
  userId: number;
  name: string;
  photoData: string;
  timezone: string;
  lessonPrice: number;
  lessonDuration: string;
}

interface Message {
  id: number;
  sender: User;
  recipient: User;
  text: string;
  sentAt: string;
}

const defaultTutorProfileImage =
  "https://media.istockphoto.com/id/2041572395/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8F-%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%B0-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=qJ0J1oSxpRFi5Kb-sYR0yYFc4g4_GQD7jwq4Pep01BU=";

const ChatPage: React.FC = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interlocutor, setInterlocutor] = useState<TeacherData | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  // Function to format lesson duration and price
  const formatPriceAndDuration = (price: number, duration: string) => {
    // Convert duration string to minutes for display
    let durationMinutes = "45";

    if (duration === "THIRTY_MINUTES") {
      durationMinutes = "30";
    }
    if (duration === "FORTY_FIVE_MINUTES") {
      durationMinutes = "45";
    }
    if (duration === "SIXTY_MINUTES") {
      durationMinutes = "60";
    }
    if (duration === "NINETY_MINUTES") {
      durationMinutes = "90";
    }

    // Map price to budget range as it was in the form
    let priceRange = "До 1000 руб.";
    if (price >= 1000 && price <= 2000) {
      priceRange = "1000–2000 руб.";
    } else if (price > 2000) {
      priceRange = "От 2000 руб.";
    }

    return `${priceRange} / ${durationMinutes} мин`;
  };

  // Function to format timezone
  const formatTimezone = (timezone: string) => {
    // Map timezone to the format used in the forms
    if (timezone.includes("UTC+3")) return "Москва (UTC+3)";
    if (timezone.includes("UTC+5")) return "Екб (UTC+5)";
    if (timezone.includes("UTC+7")) return "Новосибирск (UTC+7)";
    if (timezone.includes("UTC+8")) return "Иркутск (UTC+8)";
    if (timezone.includes("UTC+10")) return "Владивосток (UTC+10)";
    if (timezone.includes("UTC+12")) return "Камчатка (UTC+12)";
    if (timezone.includes("UTC+1")) return "Калининград (UTC+1)";
    if (timezone.includes("UTC+2")) return "Берлин (UTC+2)";
    if (timezone.includes("UTC+0")) return "Лондон (UTC+0)";
    if (timezone.includes("UTC-5")) return "Нью-Йорк (UTC-5)";
    if (timezone.includes("UTC-8")) return "Лос-Анджелес (UTC-8)";

    // If no match, return the original timezone
    return timezone;
  };

  // Fetch interlocutor profile
  const fetchInterlocutorProfile = async () => {
    if (!userId) return;

    setProfileLoading(true);
    try {
      // First try to get the user by ID
      let response = await api.get(`/api/users/${userId}`);
      let user = response.data;

      // Based on the user's role, fetch either teacher or student question
      if (user.role === "TEACHER") {
        try {
          response = await api.get(`/api/questions/teacher/${userId}`);
          let teacherData = response.data;
          setInterlocutor({
            id: teacherData.id,
            userId: teacherData.userId,
            name: teacherData.name,
            photoData: teacherData.photoData,
            timezone: teacherData.timezone,
            lessonPrice: teacherData.lessonPrice,
            lessonDuration: teacherData.lessonDuration
          });
        } catch (teacherErr) {
          console.error("Error fetching teacher data:", teacherErr);

          // Fallback to previous approach if the new endpoint fails
          try {
            response = await api.get('/api/questions/get_picked');
            let teachers = response.data;
            let matchingTeacher = teachers.find((teacher: TeacherData) => teacher.userId === parseInt(userId));

            if (!matchingTeacher) {
              response = await api.get('/api/questions/lookup');
              teachers = response.data;
              matchingTeacher = teachers.find((teacher: TeacherData) => teacher.userId === parseInt(userId));
            }

            if (matchingTeacher) {
              setInterlocutor(matchingTeacher);
            }
          } catch (fallbackErr) {
            console.error("Error in fallback approach:", fallbackErr);
          }
        }
      } else if (user.role === "STUDENT") {
        try {
          response = await api.get(`/api/questions/student/${userId}`);
          let studentData = response.data;
          setInterlocutor({
            id: studentData.id,
            userId: studentData.userId,
            name: studentData.name,
            photoData: studentData.photoData,
            timezone: studentData.timezone,
            lessonPrice: studentData.budget,
            lessonDuration: studentData.duration
          });
        } catch (studentErr) {
          console.error("Error fetching student data:", studentErr);
        }
      } else {
        console.error("Unknown user role:", user.role);
      }
    } catch (err) {
      console.error("Error fetching interlocutor profile:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch messages when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      fetchMessages();
      fetchInterlocutorProfile();
    }
  }, [userId]);

  // Function to fetch messages from the server
  const fetchMessages = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/api/messages/${userId}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to send a message
  const handleSendMessage = async () => {
    if (messageInput.trim() && userId) {
      try {
        await api.post('/api/messages', {
          recipientId: parseInt(userId),
          text: messageInput
        });

        // Clear input field
        setMessageInput("");

        // Fetch updated messages
        fetchMessages();
      } catch (err) {
        console.error("Error sending message:", err);
        setError("Failed to send message. Please try again.");
      }
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
            <div className="chat-teacher-name">
              {profileLoading ? "Загрузка..." : interlocutor ? interlocutor.name : "Собеседник"}
            </div>
          </div>
          <div className="profile-right">
            <img
              src={interlocutor && interlocutor.photoData ? interlocutor.photoData : defaultTutorProfileImage}
              alt="Teacher"
              className="teacher-photo"
            />
            <div className="teacher-details">
              <div className="detail-row">
                <div className="detail-label">Бюджет:</div>
                <div className="detail-value">
                  {profileLoading ? "Загрузка..." : 
                   interlocutor ? formatPriceAndDuration(interlocutor.lessonPrice, interlocutor.lessonDuration) : 
                   "Не указано"}
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Часовой пояс:</div>
                <div className="detail-value">
                  {profileLoading ? "Загрузка..." : 
                   interlocutor ? formatTimezone(interlocutor.timezone) : 
                   "Не указано"}
                </div>
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
          {loading ? (
            <div className="loading-messages">Loading messages...</div>
          ) : error ? (
            <div className="error-messages">{error}</div>
          ) : messages.length === 0 ? (
            <div className="no-messages">Сообщений пока нет!</div>
          ) : (
            <div className="message-group">
              {messages.map((message) => {
                // Determine if the current user is the sender (we need to check if the sender is NOT the user we're chatting with)
                const isCurrentUserSender = message.sender.id !== parseInt(userId || "0");

                return (
                  <div 
                    key={message.id} 
                    className={`message-column ${isCurrentUserSender ? 'right' : 'left'}`}
                  >
                    <div className="message-wrapper">
                      <div className="sender-name">
                        {isCurrentUserSender ? 'Вы' : message.sender.firstName || 'User'}
                      </div>
                      <div className="message">
                        <div className="message-text">{message.text}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
