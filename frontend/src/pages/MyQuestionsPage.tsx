import React, { useState, useEffect } from "react";
import "./MyQuestionsPage.css";
import api from "../services/api";

const defaultTutorProfileImage =
    "https://media.istockphoto.com/id/2041572395/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8F-%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%B0-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=qJ0J1oSxpRFi5Kb-sYR0yYFc4g4_GQD7jwq4Pep01BU=";


// Define interfaces for the response data
interface StudentQuestionData {
  id: string;
  userId: string;
  name: string;
  age: string;
  photoData: string | null;
  gender: string;
  language: string;
  level: string;
  goals: string[];
  frequency: string;
  duration: string;
  timezone: string;
  preferredTime: string;
  budget: string;
  communicationStyle: string;
  feedbackPreference: string;
  criticismResponse: string;
  lessonFormat: string;
  interests: string[];
  learningStyle: string;
  homeworkAttitude: string;
  createdAt: string;
}

interface TeacherQuestionData {
  id: string;
  userId: string;
  name: string;
  age: string;
  photoData: string | null;
  gender: string;
  language: string;
  languageLevel: string;
  timezone: string;
  teachingGoals: string[];
  minStudentLevel: string;
  maxStudentLevel: string;
  interests: string[];
  teachingFrequency: string;
  lessonDuration: string;
  preferredTime: string;
  lessonPrice: string;
  teachingStyle: string;
  feedbackStyle: string;
  teachingMethod: string;
  explanationStyle: string;
  homeworkApproach: string;
  createdAt: string;
}

const MyQuestionsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStudent, setIsStudent] = useState<boolean | null>(null);
  const [studentData, setStudentData] = useState<StudentQuestionData | null>(null);
  const [teacherData, setTeacherData] = useState<TeacherQuestionData | null>(null);

  // Map backend enum values to UI-friendly values
  const mapGender = (value: string): string => {
    switch (value) {
      case "MALE": return "Мужской";
      case "FEMALE": return "Женский";
      case "ANY": return "Неважно";
      default: return value;
    }
  };

  const mapLanguage = (value: string): string => {
    switch (value) {
      case "ENGLISH": return "Английский";
      case "GERMAN": return "Немецкий";
      case "FRENCH": return "Французский";
      case "JAPANESE": return "Японский";
      case "CHINESE": return "Китайский";
      case "RUSSIAN": return "Русский";
      default: return value;
    }
  };

  const mapLevel = (value: string): string => {
    switch (value) {
      case "A1": return "А1";
      case "A2": return "А2";
      case "B1": return "В1";
      case "B2": return "В2";
      case "C1": return "С1";
      case "C2": return "С2";
      case "UNKNOWN": return "Неизвестно";
      case "NATIVE": return "Носитель";
      default: return value;
    }
  };

  const mapFrequency = (value: string): string => {
    switch (value) {
      case "ONCE_A_WEEK": return "1 раз в неделю";
      case "TWO_TO_THREE_TIMES_A_WEEK": return "2-3 раза в неделю";
      case "DAILY": return "Каждый день";
      case "FLEXIBLE": return "Гибкий график";
      default: return value;
    }
  };

  const mapDuration = (value: string): string => {
    switch (value) {
      case "THIRTY_MINUTES": return "30 минут";
      case "FORTY_FIVE_MINUTES": return "45 минут";
      case "NINETY_MINUTES": return "90 минут";
      case "ANY": return "любое время";
      default: return value;
    }
  };

  const mapPreferredTime = (value: string): string => {
    switch (value) {
      case "MORNING": return "Утро (6:00 – 10:00)";
      case "DAY": return "День (10:00 – 16:00)";
      case "EVENING": return "Вечер (16:00 – 22:00)";
      case "ANY": return "Любое время";
      default: return value;
    }
  };

  const mapBudget = (value: string): string => {
    switch (value) {
      case "LOW": return "До 1000 руб";
      case "MEDIUM": return "1000–2000 руб";
      case "HIGH": return "От 2000 руб";
      default: return value;
    }
  };

  const mapCommunicationStyle = (value: string): string => {
    switch (value) {
      case "FRIENDLY_AND_SUPPORTIVE": return "Дружелюбный и поддерживающий";
      case "STRICT_AND_STRUCTURED": return "Строгий и структурированный";
      case "NEUTRAL_BUT_PROFESSIONAL": return "Нейтральный, но профессиональный";
      default: return value;
    }
  };

  const mapFeedbackPreference = (value: string): string => {
    switch (value) {
      case "VERBAL": return "Устно во время урока";
      case "WRITTEN": return "Письменно после занятия";
      case "TESTS": return "В виде тестов / упражнений";
      case "ANY": return "Не имеет значения";
      case "VIDEO_REVIEW": return "Видеоразбор";
      default: return value;
    }
  };

  const mapCriticismResponse = (value: string): string => {
    switch (value) {
      case "DETAILED_ERROR_ANALYSIS": return "Люблю подробный разбор ошибок";
      case "CONSTRUCTIVE_ONLY": return "Принимаю, если она конструктивная";
      case "MINIMAL": return "Предпочитаю минимум критики";
      default: return value;
    }
  };

  const mapLessonFormat = (value: string): string => {
    switch (value) {
      case "STRUCTURED": return "Структурированные занятия с материалами";
      case "CONVERSATION": return "Свободное общение и практика разговора";
      case "MIXED": return "Смешанный формат";
      default: return value;
    }
  };

  const mapInterest = (value: string): string => {
    switch (value) {
      case "MOVIES": return "Кино";
      case "SERIES": return "Сериалы";
      case "MUSIC": return "Музыка";
      case "BOOKS": return "Книги";
      case "ART": return "Искусство";
      case "TECHNOLOGY": return "Технологии";
      case "SPORTS": return "Спорт";
      case "POLITICS": return "Политика";
      case "ECONOMICS": return "Экономика";
      case "TRAVEL": return "Путешествия";
      case "SCIENCE": return "Наука";
      case "OTHER": return "Другое";
      default: return value;
    }
  };

  const mapGoal = (value: string): string => {
    switch (value) {
      case "EXAM_PREPARATION": return "Подготовка к экзаменам";
      case "BUSINESS_ENGLISH": return "Бизнес-английский";
      case "CONVERSATION_PRACTICE": return "Разговорная практика";
      case "TRAVEL_EMIGRATION": return "Путешествия и эмиграция";
      case "CAREER": return "Для работы / карьеры";
      default: return value;
    }
  };

  const mapLearningStyle = (value: string): string => {
    switch (value) {
      case "VISUAL": return "Визуально (графики, картинки)";
      case "AUDIO": return "Через аудио (лекции, подкасты)";
      case "PRACTICE": return "Через практику (диалоги, кейсы)";
      case "KINESTHETIC": return "Кинестетический (практика, игры)";
      default: return value;
    }
  };

  const mapHomeworkAttitude = (value: string): string => {
    switch (value) {
      case "LOVE": return "Люблю – помогает учиться быстрее!";
      case "NEUTRAL": return "Нейтрально – могу делать, если нужно";
      case "DISLIKE": return "Не люблю – предпочитаю учить на занятиях";
      case "ALWAYS_ASSIGN": return "Задаю всегда";
      case "RARELY_ASSIGN": return "Задаю редко";
      case "NEVER_ASSIGN": return "Не задаю";
      default: return value;
    }
  };

  const mapExplanationStyle = (value: string): string => {
    switch (value) {
      case "THROUGH_EXAMPLES": return "Через примеры";
      case "THROUGH_THEORY": return "Через теорию";
      case "THROUGH_PRACTICE": return "Через практику";
      case "COMBINED_APPROACH": return "Комбинированный подход";
      default: return value;
    }
  };

  // Fetch questionnaire data when component mounts
  useEffect(() => {
    const fetchQuestionnaireData = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, fetch the user profile to determine the role
        const profileResponse = await api.get('/api/users/profile');
        const userRole = profileResponse.data.role;

        // Based on the role, fetch the appropriate questionnaire data
        if (userRole === 'STUDENT') {
          try {
            const studentResponse = await api.get('/api/questions/student');
            setStudentData(studentResponse.data);
            setIsStudent(true);
          } catch (error) {
            setError("Не удалось загрузить данные анкеты студента. Пожалуйста, попробуйте позже.");
          }
        } else if (userRole === 'TEACHER') {
          try {
            const teacherResponse = await api.get('/api/questions/teacher');
            setTeacherData(teacherResponse.data);
            setIsStudent(false);
          } catch (error) {
            setError("Не удалось загрузить данные анкеты преподавателя. Пожалуйста, попробуйте позже.");
          }
        } else {
          setError("Неизвестная роль пользователя.");
        }
      } catch (error) {
        setError("Не удалось загрузить профиль пользователя. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaireData();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="questionnaire-container">
        <div className="loading-message">Загрузка данных анкеты...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="questionnaire-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  // Render student questionnaire
  if (isStudent && studentData) {
    return (
      <div className="questionnaire-container">
        <div className="question-content">
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

        <div className="question-dashboard">
          <div className="question-profile-content">
            <div className="profile-info-column">
              <div className="profile-info-container">
                <div className="profile-image-column">
                  {studentData.photoData ? (
                    <img
                      src={studentData.photoData}
                      className="profile-image"
                      alt="Profile"
                    />
                  ) : (
                    <img
                      src={defaultTutorProfileImage}
                      className="profile-image"
                      alt="Profile"
                    />
                  )}
                </div>
                <div className="profile-details-column">
                  <div className="profile-details">
                    <h2 className="profile-name">{studentData.name}</h2>
                    <div className="profile-detail-row">
                      <div className="profile-detail-box">{mapBudget(studentData.budget)} / {mapDuration(studentData.duration)}</div>
                    </div>
                    <div className="profile-detail-row">
                      <div className="profile-detail-box">{studentData.timezone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="interests-column">
              <div className="interests-container">
                <h3 className="interests-title">Интересы</h3>
                <div className="interests-boxes">
                  {studentData.interests.map((interest, index) => (
                    <div key={index} className="interest-box">
                      {mapInterest(interest)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="basic-data-section">
          <h3 className="basic-data-title">Основные данные: </h3>
          <div className="basic-data-box">Язык: {mapLanguage(studentData.language).toLowerCase()}</div>
          <div className="basic-data-box">Уровень: {mapLevel(studentData.level)}</div>
          <div className="basic-data-box">
            Необходимый формат: <br />
            {studentData.goals.map(goal => mapGoal(goal)).join(', ')}
          </div>
        </div>

        <div className="compatibility-section">
          <div className="compatibility-content">
            <div className="compatibility-title-column">
              <h3 className="compatibility-title">
                Совместимость с преподавателем:
              </h3>
            </div>
            <div className="compatibility-details-column">
              <div className="compatibility-details">
                <div className="compatibility-row">
                  <div className="compatibility-box">
                    Стиль общения: {mapCommunicationStyle(studentData.communicationStyle)}
                  </div>
                  <div className="compatibility-box">
                    {mapCriticismResponse(studentData.criticismResponse)}
                  </div>
                  <div className="compatibility-box">
                    Формат уроков: {mapLessonFormat(studentData.lessonFormat)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="question-footer">
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
  }

  // Render teacher questionnaire
  if (!isStudent && teacherData) {
    return (
      <div className="questionnaire-container">
        <div className="question-content">
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

        <h2 className="section-title">Ваша анкета (преподаватель)</h2>

        <div className="question-dashboard">
          <div className="question-profile-content">
            <div className="profile-info-column">
              <div className="profile-info-container">
                <div className="profile-image-column">
                  {teacherData.photoData ? (
                    <img
                      src={teacherData.photoData}
                      className="profile-image"
                      alt="Profile"
                    />
                  ) : (
                    <img
                      src={defaultTutorProfileImage}
                      className="profile-image"
                      alt="Profile"
                    />
                  )}
                </div>
                <div className="profile-details-column">
                  <div className="profile-details">
                    <h2 className="profile-name">{teacherData.name}</h2>
                    <div className="profile-detail-row">
                      <div className="profile-detail-box">{mapBudget(teacherData.lessonPrice)} / {mapDuration(teacherData.lessonDuration)}</div>
                    </div>
                    <div className="profile-detail-row">
                      <div className="profile-detail-box">{teacherData.timezone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="interests-column">
              <div className="interests-container">
                <h3 className="interests-title">Интересы</h3>
                <div className="interests-boxes">
                  {teacherData.interests.map((interest, index) => (
                    <div key={index} className="interest-box">
                      {mapInterest(interest)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="basic-data-section">
          <h3 className="basic-data-title">Основные данные: </h3>
          <div className="basic-data-box">Язык: {mapLanguage(teacherData.language).toLowerCase()}</div>
          <div className="basic-data-box">Уровень: {mapLevel(teacherData.languageLevel)}</div>
          <div className="basic-data-box">
            Формат преподавания: <br />
            {teacherData.teachingGoals.map(goal => mapGoal(goal)).join(', ')}
          </div>
        </div>

        <div className="compatibility-section">
          <div className="compatibility-content">
            <div className="compatibility-title-column">
              <h3 className="compatibility-title">
                Стиль преподавания:
              </h3>
            </div>
            <div className="compatibility-details-column">
              <div className="compatibility-details">
                <div className="compatibility-row">
                  <div className="compatibility-box">
                    Стиль общения: {mapCommunicationStyle(teacherData.teachingStyle)}
                  </div>
                  <div className="compatibility-box">
                    Обратная связь: {mapFeedbackPreference(teacherData.feedbackStyle)}
                  </div>
                  <div className="compatibility-box">
                    Объяснение материала: {mapExplanationStyle(teacherData.explanationStyle)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="question-footer">
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
  }

  // Fallback if no data is available
  return (
    <div className="questionnaire-container">
      <div className="error-message">Анкета не найдена. Пожалуйста, заполните анкету.</div>
    </div>
  );
};

export default MyQuestionsPage;
