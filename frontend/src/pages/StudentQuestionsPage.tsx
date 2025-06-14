import React, { useState } from "react";
import "./StudentQuestionsPage.css";
import api from "../services/api";

const StudentQuestionsPage: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [level, setLevel] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [timezone, setTimezone] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [budget, setBudget] = useState("");
  const [communicationStyle, setCommunicationStyle] = useState("");
  const [feedbackPreference, setFeedbackPreference] = useState("");
  const [criticismResponse, setCriticismResponse] = useState("");
  const [lessonFormat, setLessonFormat] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState("");
  const [homeworkAttitude, setHomeworkAttitude] = useState("");

  const handleGoalSelection = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter((g) => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleInterestSelection = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else if (interests.length < 5 || interest === "+") {
      setInterests([...interests, interest]);
    }
  };

  const handlePhotoSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPhotoData(result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = async () => {
    try {
      // Map UI values to backend enum values
      const mapGender = (value: string) => {
        switch (value) {
          case "Мужской": return "MALE";
          case "Женский": return "FEMALE";
          case "Неважно": return "ANY";
          default: return value;
        }
      };

      const mapLanguage = (value: string) => {
        switch (value) {
          case "Английский": return "ENGLISH";
          case "Немецкий": return "GERMAN";
          case "Французский": return "FRENCH";
          case "Японский": return "JAPANESE";
          case "Китайский": return "CHINESE";
          case "Русский": return "RUSSIAN";
          default: return value;
        }
      };

      const mapLevel = (value: string) => {
        switch (value) {
          case "А1": return "A1";
          case "А2": return "A2";
          case "В1": return "B1";
          case "В2": return "B2";
          case "С1": return "C1";
          case "С2": return "C2";
          case "unknown": return "UNKNOWN";
          default: return value;
        }
      };

      const mapFrequency = (value: string) => {
        switch (value) {
          case "once": return "ONCE_A_WEEK";
          case "twice": return "TWO_TO_THREE_TIMES_A_WEEK";
          case "daily": return "DAILY";
          case "flexible": return "FLEXIBLE";
          default: return value;
        }
      };

      const mapDuration = (value: string) => {
        switch (value) {
          case "30": return "THIRTY_MINUTES";
          case "45": return "FORTY_FIVE_MINUTES";
          case "90": return "NINETY_MINUTES";
          case "any": return "ANY";
          default: return value;
        }
      };

      const mapPreferredTime = (value: string) => {
        switch (value) {
          case "morning": return "MORNING";
          case "day": return "DAY";
          case "evening": return "EVENING";
          case "any": return "ANY";
          default: return value;
        }
      };

      const mapBudget = (value: string) => {
        switch (value) {
          case "low": return "LOW";
          case "medium": return "MEDIUM";
          case "high": return "HIGH";
          default: return value;
        }
      };

      const mapCommunicationStyle = (value: string) => {
        switch (value) {
          case "friendly": return "FRIENDLY_AND_SUPPORTIVE";
          case "strict": return "STRICT_AND_STRUCTURED";
          case "neutral": return "NEUTRAL_BUT_PROFESSIONAL";
          default: return value;
        }
      };

      const mapFeedbackPreference = (value: string) => {
        switch (value) {
          case "verbal": return "VERBAL";
          case "written": return "WRITTEN";
          case "tests": return "TESTS";
          case "any": return "ANY";
          default: return value;
        }
      };

      const mapCriticismResponse = (value: string) => {
        switch (value) {
          case "detailed": return "DETAILED_ERROR_ANALYSIS";
          case "constructive": return "CONSTRUCTIVE_ONLY";
          case "minimal": return "MINIMAL";
          default: return value;
        }
      };

      const mapLessonFormat = (value: string) => {
        switch (value) {
          case "structured": return "STRUCTURED";
          case "conversation": return "CONVERSATION";
          case "mixed": return "MIXED";
          default: return value;
        }
      };

      const mapLearningStyle = (value: string) => {
        switch (value) {
          case "visual": return "VISUAL";
          case "audio": return "AUDIO";
          case "practice": return "PRACTICE";
          default: return value;
        }
      };

      const mapHomeworkAttitude = (value: string) => {
        switch (value) {
          case "love": return "LOVE";
          case "neutral": return "NEUTRAL";
          case "dislike": return "DISLIKE";
          default: return value;
        }
      };

      const mapGoal = (value: string) => {
        switch (value) {
          case "exams": return "EXAM_PREPARATION";
          case "business": return "BUSINESS_ENGLISH";
          case "conversation": return "CONVERSATION_PRACTICE";
          case "travel": return "TRAVEL_EMIGRATION";
          case "career": return "CAREER";
          default: return value;
        }
      };

      const mapInterest = (value: string) => {
        switch (value) {
          case "movies": return "MOVIES";
          case "series": return "SERIES";
          case "music": return "MUSIC";
          case "books": return "BOOKS";
          case "art": return "ART";
          case "tech": return "TECHNOLOGY";
          case "sports": return "SPORTS";
          case "politics": return "POLITICS";
          case "economics": return "ECONOMICS";
          case "travel": return "TRAVEL";
          case "science": return "SCIENCE";
          case "+": return "OTHER";
          default: return value;
        }
      };

      const response = await api.post('/api/questions/student', {
        name,
        age,
        photoData,
        gender: mapGender(gender),
        language: mapLanguage(language),
        level: mapLevel(level),
        goals: goals.map(goal => mapGoal(goal)),
        frequency: mapFrequency(frequency),
        duration: mapDuration(duration),
        timezone,
        preferredTime: mapPreferredTime(preferredTime),
        budget: mapBudget(budget),
        communicationStyle: mapCommunicationStyle(communicationStyle),
        feedbackPreference: mapFeedbackPreference(feedbackPreference),
        criticismResponse: mapCriticismResponse(criticismResponse),
        lessonFormat: mapLessonFormat(lessonFormat),
        interests: interests.map(interest => mapInterest(interest)),
        learningStyle: mapLearningStyle(learningStyle),
        homeworkAttitude: mapHomeworkAttitude(homeworkAttitude),
      });

      console.log('Student question submitted successfully:', response.data);
      alert('Анкета успешно отправлена!');
      // Redirect or show success message
    } catch (error) {
      console.error('Error submitting student question:', error);
      alert('Произошла ошибка при отправке анкеты. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className="student-questions-container">
      <div className="student-questions-content">
        <h1 className="student-questions-title">Анкета ученика</h1>

        <h2 className="student-questions-section-title">Основная информация</h2>

        <div className="student-questions-info-row">
          <div className="student-questions-input-group">
            <label className="student-questions-label">Как вас зовут?</label>
            <input
              type="text"
              className="student-questions-input"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="student-questions-photo-group">
            <label className="student-questions-label">
              Добавьте фото
            </label>
            <div 
              className="student-questions-photo-circle" 
              onClick={handlePhotoSelect}
              style={photoData ? { backgroundImage: `url(${photoData})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            ></div>
          </div>
        </div>

        <div className="student-questions-form-section">
          <div className="student-questions-input-group">
            <label className="student-questions-label">Сколько вам лет?</label>
            <input
              type="text"
              className="student-questions-input"
              placeholder="Введите возраст"
              value={age}
              onChange={(e) => {
                // Allow only digits
                const value = e.target.value.replace(/\D/g, '');
                setAge(value);
              }}
            />
          </div>

          <div className="student-questions-full-width">
            <label className="student-questions-label">Укажите пол</label>
            <div className="student-questions-options-row">
              <button
                className={`student-questions-option ${gender === "Мужской" ? "selected" : ""}`}
                onClick={() => setGender("Мужской")}
              >
                Мужской
              </button>
              <button
                className={`student-questions-option ${gender === "Женский" ? "selected" : ""}`}
                onClick={() => setGender("Женский")}
              >
                Женский
              </button>
              <button
                className={`student-questions-option ${gender === "Неважно" ? "selected" : ""}`}
                onClick={() => setGender("Неважно")}
              >
                Неважно
              </button>
            </div>
          </div>

          <div className="student-questions-full-width">
            <label className="student-questions-label">
              Выберите изучаемый язык
            </label>
            <div className="student-questions-options-row">
              <button
                className={`student-questions-option ${language === "Английский" ? "selected" : ""}`}
                onClick={() => setLanguage("Английский")}
              >
                Английский
              </button>
              <button
                className={`student-questions-option ${language === "Немецкий" ? "selected" : ""}`}
                onClick={() => setLanguage("Немецкий")}
              >
                Немецкий
              </button>
              <button
                className={`student-questions-option ${language === "Французский" ? "selected" : ""}`}
                onClick={() => setLanguage("Французский")}
              >
                Французский
              </button>
              <button
                className={`student-questions-option ${language === "Японский" ? "selected" : ""}`}
                onClick={() => setLanguage("Японский")}
              >
                Японский
              </button>
              <button
                className={`student-questions-option ${language === "Китайский" ? "selected" : ""}`}
                onClick={() => setLanguage("Китайский")}
              >
                Китайский
              </button>
              <button
                className={`student-questions-option ${language === "Русский" ? "selected" : ""}`}
                onClick={() => setLanguage("Русский")}
              >
                Русский
              </button>
            </div>
          </div>

          <div className="student-questions-full-width">
            <label className="student-questions-label">
              Укажите уровень изучаемого языка
            </label>
            <div className="student-questions-options-row">
              <button
                className={`student-questions-level-option ${level === "А1" ? "selected" : ""}`}
                onClick={() => setLevel("А1")}
              >
                А1
              </button>
              <button
                className={`student-questions-level-option ${level === "А2" ? "selected" : ""}`}
                onClick={() => setLevel("А2")}
              >
                А2
              </button>
              <button
                className={`student-questions-level-option ${level === "В1" ? "selected" : ""}`}
                onClick={() => setLevel("В1")}
              >
                В1
              </button>
              <button
                className={`student-questions-level-option ${level === "В2" ? "selected" : ""}`}
                onClick={() => setLevel("В2")}
              >
                В2
              </button>
              <button
                className={`student-questions-level-option ${level === "С1" ? "selected" : ""}`}
                onClick={() => setLevel("С1")}
              >
                С1
              </button>
              <button
                className={`student-questions-level-option ${level === "С2" ? "selected" : ""}`}
                onClick={() => setLevel("С2")}
              >
                С2
              </button>
            </div>
            <button
              className={`student-questions-unknown-level ${level === "unknown" ? "selected" : ""}`}
              onClick={() => setLevel("unknown")}
            >
              Не знаю уровень изучаемого языка
            </button>
          </div>
        </div>

        <div className="student-questions-goals-section">
          <label className="student-questions-label">
            Главная цель изучения языка: (можно выбрать несколько)
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-goal-option ${goals.includes("exams") ? "selected" : ""}`}
              onClick={() => handleGoalSelection("exams")}
            >
              Подготовка к экзаменам (IELTS, TOEFL и др.)
            </button>
            <button
              className={`student-questions-goal-option ${goals.includes("business") ? "selected" : ""}`}
              onClick={() => handleGoalSelection("business")}
            >
              Бизнес-английский
            </button>
            <button
              className={`student-questions-goal-option ${goals.includes("conversation") ? "selected" : ""}`}
              onClick={() => handleGoalSelection("conversation")}
            >
              Разговорная практика
            </button>
            <button
              className={`student-questions-goal-option ${goals.includes("travel") ? "selected" : ""}`}
              onClick={() => handleGoalSelection("travel")}
            >
              Путешествия и эмиграция
            </button>
            <button
              className={`student-questions-goal-option ${goals.includes("career") ? "selected" : ""}`}
              onClick={() => handleGoalSelection("career")}
            >
              Для работы / карьеры
            </button>
          </div>
        </div>

        <div className="student-questions-frequency-section">
          <label className="student-questions-label">
            Как часто вы планируете заниматься?
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-frequency-option ${frequency === "once" ? "selected" : ""}`}
              onClick={() => setFrequency("once")}
            >
              1 раз в неделю
            </button>
            <button
              className={`student-questions-frequency-option ${frequency === "twice" ? "selected" : ""}`}
              onClick={() => setFrequency("twice")}
            >
              2-3 раза в неделю
            </button>
            <button
              className={`student-questions-frequency-option ${frequency === "daily" ? "selected" : ""}`}
              onClick={() => setFrequency("daily")}
            >
              Каждый день
            </button>
            <button
              className={`student-questions-frequency-option ${frequency === "flexible" ? "selected" : ""}`}
              onClick={() => setFrequency("flexible")}
            >
              Гибкий график
            </button>
          </div>
        </div>

        <div className="student-questions-duration-section">
          <label className="student-questions-label">
            Продолжительность занятий
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-duration-option ${duration === "30" ? "selected" : ""}`}
              onClick={() => setDuration("30")}
            >
              30 минут
            </button>
            <button
              className={`student-questions-duration-option ${duration === "45" ? "selected" : ""}`}
              onClick={() => setDuration("45")}
            >
              45 минут
            </button>
            <button
              className={`student-questions-duration-option ${duration === "90" ? "selected" : ""}`}
              onClick={() => setDuration("90")}
            >
              90 минут
            </button>
            <button
              className={`student-questions-duration-option ${duration === "any" ? "selected" : ""}`}
              onClick={() => setDuration("any")}
            >
              Неважно
            </button>
          </div>
        </div>

        <div className="student-questions-timezone-section">
          <label className="student-questions-label">Ваш часовой пояс</label>
          <select
            className="student-questions-timezone-select"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option value="">Выберите часовой пояс</option>
            <option value="UTC+2">UTC+2 (Калининград)</option>
            <option value="UTC+3">UTC+3 (Москва, Санкт-Петербург)</option>
            <option value="UTC+4">UTC+4 (Самара)</option>
            <option value="UTC+5">UTC+5 (Екатеринбург)</option>
            <option value="UTC+6">UTC+6 (Омск)</option>
            <option value="UTC+7">UTC+7 (Красноярск)</option>
            <option value="UTC+8">UTC+8 (Иркутск)</option>
            <option value="UTC+9">UTC+9 (Якутск)</option>
            <option value="UTC+10">UTC+10 (Владивосток)</option>
            <option value="UTC+11">UTC+11 (Магадан)</option>
            <option value="UTC+12">UTC+12 (Камчатка)</option>
          </select>
        </div>

        <div className="student-questions-preferred-time-section">
          <label className="student-questions-label">
            Предпочтительное время занятий
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-time-option ${preferredTime === "morning" ? "selected" : ""}`}
              onClick={() => setPreferredTime("morning")}
            >
              Утро (6:00 – 10:00)
            </button>
            <button
              className={`student-questions-time-option ${preferredTime === "day" ? "selected" : ""}`}
              onClick={() => setPreferredTime("day")}
            >
              День (10:00 – 16:00)
            </button>
            <button
              className={`student-questions-time-option ${preferredTime === "evening" ? "selected" : ""}`}
              onClick={() => setPreferredTime("evening")}
            >
              Вечер (16:00 – 22:00)
            </button>
            <button
              className={`student-questions-time-option ${preferredTime === "any" ? "selected" : ""}`}
              onClick={() => setPreferredTime("any")}
            >
              Неважно
            </button>
          </div>
        </div>

        <div className="student-questions-budget-section">
          <label className="student-questions-label">
            Ваш бюджет на занятия (за 1 урок)
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-budget-option ${budget === "low" ? "selected" : ""}`}
              onClick={() => setBudget("low")}
            >
              До 1000 руб.
            </button>
            <button
              className={`student-questions-budget-option ${budget === "medium" ? "selected" : ""}`}
              onClick={() => setBudget("medium")}
            >
              1000–2000 руб.
            </button>
            <button
              className={`student-questions-budget-option ${budget === "high" ? "selected" : ""}`}
              onClick={() => setBudget("high")}
            >
              Более 2000 руб.
            </button>
          </div>
        </div>

        <h2 className="student-questions-section-title">
          Совместимость с преподавателем
        </h2>

        <div className="student-questions-communication-section">
          <label className="student-questions-label">
            Какой стиль общения вам комфортен?
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-communication-option ${communicationStyle === "friendly" ? "selected" : ""}`}
              onClick={() => setCommunicationStyle("friendly")}
            >
              Дружелюбный и поддерживающий
            </button>
            <button
              className={`student-questions-communication-option ${communicationStyle === "strict" ? "selected" : ""}`}
              onClick={() => setCommunicationStyle("strict")}
            >
              Строгий и структурированный
            </button>
            <button
              className={`student-questions-communication-option ${communicationStyle === "neutral" ? "selected" : ""}`}
              onClick={() => setCommunicationStyle("neutral")}
            >
              Нейтральный, но профессиональный
            </button>
          </div>
        </div>

        <div className="student-questions-feedback-section">
          <label className="student-questions-label">
            Как вам удобнее получать обратную связь?
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-feedback-option ${feedbackPreference === "verbal" ? "selected" : ""}`}
              onClick={() => setFeedbackPreference("verbal")}
            >
              Устно во время урока
            </button>
            <button
              className={`student-questions-feedback-option ${feedbackPreference === "written" ? "selected" : ""}`}
              onClick={() => setFeedbackPreference("written")}
            >
              Письменно после занятия
            </button>
            <button
              className={`student-questions-feedback-option ${feedbackPreference === "tests" ? "selected" : ""}`}
              onClick={() => setFeedbackPreference("tests")}
            >
              В виде тестов / упражнений
            </button>
            <button
              className={`student-questions-feedback-option ${feedbackPreference === "any" ? "selected" : ""}`}
              onClick={() => setFeedbackPreference("any")}
            >
              Не имеет значения
            </button>
          </div>
        </div>

        <div className="student-questions-criticism-section">
          <label className="student-questions-label">
            Как вы воспринимаете критику?
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-criticism-option ${criticismResponse === "detailed" ? "selected" : ""}`}
              onClick={() => setCriticismResponse("detailed")}
            >
              Люблю подробный разбор ошибок
            </button>
            <button
              className={`student-questions-criticism-option ${criticismResponse === "constructive" ? "selected" : ""}`}
              onClick={() => setCriticismResponse("constructive")}
            >
              Принимаю, если она конструктивная
            </button>
            <button
              className={`student-questions-criticism-option ${criticismResponse === "minimal" ? "selected" : ""}`}
              onClick={() => setCriticismResponse("minimal")}
            >
              Предпочитаю минимум критики
            </button>
          </div>
        </div>

        <div className="student-questions-format-section">
          <label className="student-questions-label">
            Какой формат уроков вам ближе?
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-format-option ${lessonFormat === "structured" ? "selected" : ""}`}
              onClick={() => setLessonFormat("structured")}
            >
              Структурированные занятия с материалами
            </button>
            <button
              className={`student-questions-format-option ${lessonFormat === "conversation" ? "selected" : ""}`}
              onClick={() => setLessonFormat("conversation")}
            >
              Свободное общение и практика разговора
            </button>
            <button
              className={`student-questions-format-option ${lessonFormat === "mixed" ? "selected" : ""}`}
              onClick={() => setLessonFormat("mixed")}
            >
              Смешанный формат
            </button>
          </div>
        </div>

        <div className="student-questions-interests-section">
          <label className="student-questions-label">
            Выберите до 5 ваших интересов
          </label>
          <div className="student-questions-interests-grid">
            <button
              className={`student-questions-interest-option ${interests.includes("movies") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("movies")}
            >
              Кино
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("series") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("series")}
            >
              Сериалы
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("music") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("music")}
            >
              Музыка
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("books") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("books")}
            >
              Книги
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("art") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("art")}
            >
              Иcкусство
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("tech") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("tech")}
            >
              Технологии
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("sports") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("sports")}
            >
              Спорт
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("politics") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("politics")}
            >
              Политика
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("economics") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("economics")}
            >
              Экономика
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("travel") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("travel")}
            >
              Путешествия
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("science") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("science")}
            >
              Наука
            </button>
            <button
              className={`student-questions-interest-option ${interests.includes("+") ? "selected" : ""}`}
              onClick={() => handleInterestSelection("+")}
            >
              Другое
            </button>
          </div>
        </div>

        <h2 className="student-questions-section-title">Стиль обучения</h2>

        <div className="student-questions-learning-style-section">
          <label className="student-questions-label">
            Как вам легче всего запоминать информацию?
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-learning-option ${learningStyle === "visual" ? "selected" : ""}`}
              onClick={() => setLearningStyle("visual")}
            >
              Визуально (графики, картинки)
            </button>
            <button
              className={`student-questions-learning-option ${learningStyle === "audio" ? "selected" : ""}`}
              onClick={() => setLearningStyle("audio")}
            >
              Через аудио (лекции, подкасты)
            </button>
            <button
              className={`student-questions-learning-option ${learningStyle === "practice" ? "selected" : ""}`}
              onClick={() => setLearningStyle("practice")}
            >
              Через практику (диалоги, кейсы)
            </button>
          </div>
        </div>

        <div className="student-questions-homework-section">
          <label className="student-questions-label">
            Как относитесь к домашним заданиям?
          </label>
          <div className="student-questions-options-row">
            <button
              className={`student-questions-homework-option ${homeworkAttitude === "love" ? "selected" : ""}`}
              onClick={() => setHomeworkAttitude("love")}
            >
              Люблю – помогает учиться быстрее!
            </button>
            <button
              className={`student-questions-homework-option ${homeworkAttitude === "neutral" ? "selected" : ""}`}
              onClick={() => setHomeworkAttitude("neutral")}
            >
              Нейтрально – могу делать, если нужно
            </button>
            <button
              className={`student-questions-homework-option ${homeworkAttitude === "dislike" ? "selected" : ""}`}
              onClick={() => setHomeworkAttitude("dislike")}
            >
              Не люблю – предпочитаю учить на занятиях
            </button>
          </div>
        </div>

        <div className="student-questions-completion-message">
          Вы проделали большую работу! Отправляйтесь на поиски идеального
          преподавателя и собеседника.
        </div>

        <div className="student-questions-submit-container">
          <button
            className="student-questions-submit-button"
            onClick={handleSubmit}
          >
            Искать
          </button>
        </div>
      </div>

      <footer className="student-questions-footer">
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

export default StudentQuestionsPage;
