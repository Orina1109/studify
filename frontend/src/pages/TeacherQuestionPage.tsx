import React, {useState} from "react";
import "./TeacherQuestionPage.css";
import api from "../services/api";

const TeacherQuestionPage: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [languageLevel, setLanguageLevel] = useState("");
  const [timezone, setTimezone] = useState("");
  const [teachingGoals, setTeachingGoals] = useState<string[]>([]);
  const [minStudentLevel, setMinStudentLevel] = useState("");
  const [maxStudentLevel, setMaxStudentLevel] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [teachingFrequency, setTeachingFrequency] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [lessonPrice, setLessonPrice] = useState("");
  const [teachingStyle, setTeachingStyle] = useState("");
  const [feedbackStyle, setFeedbackStyle] = useState("");
  const [teachingMethod, setTeachingMethod] = useState("");
  const [explanationStyle, setExplanationStyle] = useState("");
  const [homeworkApproach, setHomeworkApproach] = useState("");

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const handleLanguageLevelSelect = (selectedLevel: string) => {
    setLanguageLevel(selectedLevel);
  };

  const handleTeachingGoalToggle = (goal: string) => {
    setTeachingGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  };

  const handleStudentLevelSelect = (level: string, type: "min" | "max") => {
    if (type === "min") {
      setMinStudentLevel(level);
    } else {
      setMaxStudentLevel(level);
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (interests.length >= 5 && !interests.includes(interest)) {
      return; // Limit to 5 interests
    }

    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleTeachingFrequencySelect = (frequency: string) => {
    setTeachingFrequency(frequency);
  };

  const handleLessonDurationSelect = (duration: string) => {
    setLessonDuration(duration);
  };

  const handlePreferredTimeSelect = (time: string) => {
    setPreferredTime(time);
  };

  const handleLessonPriceSelect = (price: string) => {
    setLessonPrice(price);
  };

  const handleTeachingStyleSelect = (style: string) => {
    setTeachingStyle(style);
  };

  const handleFeedbackStyleSelect = (style: string) => {
    setFeedbackStyle(style);
  };

  const handleTeachingMethodSelect = (method: string) => {
    setTeachingMethod(method);
  };

  const handleExplanationStyleSelect = (style: string) => {
    setExplanationStyle(style);
  };

  const handleHomeworkApproachSelect = (approach: string) => {
    setHomeworkApproach(approach);
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

      const mapLanguageLevel = (value: string) => {
        switch (value) {
          case "В2": return "B2";
          case "С1": return "C1";
          case "С2": return "C2";
          case "Носитель": return "NATIVE";
          default: return value;
        }
      };

      const mapStudentLevel = (value: string) => {
        switch (value) {
          case "А1": return "A1";
          case "А2": return "A2";
          case "В1": return "B1";
          case "В2": return "B2";
          case "С1": return "C1";
          case "С2": return "C2";
          default: return value;
        }
      };

      const mapTeachingFrequency = (value: string) => {
        switch (value) {
          case "1 раз в неделю": return "ONCE_A_WEEK";
          case "2-3 раза в неделю": return "TWO_TO_THREE_TIMES_A_WEEK";
          case "Каждый день": return "DAILY";
          case "Гибкий график": return "FLEXIBLE";
          default: return value;
        }
      };

      const mapLessonDuration = (value: string) => {
        switch (value) {
          case "30 минут": return "THIRTY_MINUTES";
          case "45 минут": return "FORTY_FIVE_MINUTES";
          case "90 минут": return "NINETY_MINUTES";
          case "Неважно": return "ANY";
          default: return value;
        }
      };

      const mapPreferredTime = (value: string) => {
        switch (value) {
          case "Утро": return "MORNING";
          case "День": return "DAY";
          case "Вечер": return "EVENING";
          case "Неважно": return "ANY";
          default: return value;
        }
      };

      const mapTeachingStyle = (value: string) => {
        switch (value) {
          case "Дружелюбный и поддерживающий": return "FRIENDLY_AND_SUPPORTIVE";
          case "Строгий и структурированный": return "STRICT_AND_STRUCTURED";
          case "Нейтральный, но профессиональный": return "NEUTRAL_BUT_PROFESSIONAL";
          default: return value;
        }
      };

      const mapFeedbackStyle = (value: string) => {
        switch (value) {
          case "Устно": return "VERBAL";
          case "Письменно": return "WRITTEN";
          case "В виде тестов": return "TESTS";
          case "Видеоразбор": return "VIDEO_REVIEW";
          default: return value;
        }
      };

      const mapTeachingMethod = (value: string) => {
        switch (value) {
          case "Визуальный": return "VISUAL";
          case "Аудиальный": return "AUDIO";
          case "Кинестетический": return "KINESTHETIC";
          default: return value;
        }
      };

      const mapExplanationStyle = (value: string) => {
        switch (value) {
          case "Через примеры": return "THROUGH_EXAMPLES";
          case "Через теорию": return "THROUGH_THEORY";
          case "Через практику": return "THROUGH_PRACTICE";
          case "Комбинированный подход": return "COMBINED_APPROACH";
          default: return value;
        }
      };

      const mapHomeworkApproach = (value: string) => {
        switch (value) {
          case "Задаю всегда": return "ALWAYS_ASSIGN";
          case "Задаю редко": return "RARELY_ASSIGN";
          case "Не задаю": return "NEVER_ASSIGN";
          default: return value;
        }
      };

      const mapLessonPrice = (value: string) => {
        switch (value) {
          case "До 1000 руб.": return "LOW";
          case "1000–2000 руб.": return "MEDIUM";
          case "Более 2000 руб.": return "HIGH";
          default: return value;
        }
      };

      const mapTeachingGoal = (value: string) => {
        switch (value) {
          case "Подготовка к экзаменам": return "EXAM_PREPARATION";
          case "Бизнес-английский": return "BUSINESS_ENGLISH";
          case "Разговорная практика": return "CONVERSATION_PRACTICE";
          case "Путешествия и эмиграция": return "TRAVEL_EMIGRATION";
          case "Для работы / карьеры": return "CAREER";
          default: return value;
        }
      };

      const mapInterest = (value: string) => {
        switch (value) {
          case "Кино": return "MOVIES";
          case "Сериалы": return "SERIES";
          case "Музыка": return "MUSIC";
          case "Книги": return "BOOKS";
          case "Искусство": return "ART";
          case "Технологии": return "TECHNOLOGY";
          case "Спорт": return "SPORTS";
          case "Политика": return "POLITICS";
          case "Экономика": return "ECONOMICS";
          case "Путешествия": return "TRAVEL";
          case "Наука": return "SCIENCE";
          case "+": return "OTHER";
          default: return value;
        }
      };

      const response = await api.post('/api/questions/teacher', {
        name,
        age,
        gender: mapGender(gender),
        language: mapLanguage(language),
        languageLevel: mapLanguageLevel(languageLevel),
        timezone,
        teachingGoals: teachingGoals.map(goal => mapTeachingGoal(goal)),
        minStudentLevel: mapStudentLevel(minStudentLevel),
        maxStudentLevel: mapStudentLevel(maxStudentLevel),
        interests: interests.map(interest => mapInterest(interest)),
        teachingFrequency: mapTeachingFrequency(teachingFrequency),
        lessonDuration: mapLessonDuration(lessonDuration),
        preferredTime: mapPreferredTime(preferredTime),
        lessonPrice: mapLessonPrice(lessonPrice),
        teachingStyle: mapTeachingStyle(teachingStyle),
        feedbackStyle: mapFeedbackStyle(feedbackStyle),
        teachingMethod: mapTeachingMethod(teachingMethod),
        explanationStyle: mapExplanationStyle(explanationStyle),
        homeworkApproach: mapHomeworkApproach(homeworkApproach),
      });

      console.log('Teacher question submitted successfully:', response.data);
      alert('Анкета успешно отправлена!');
      // Redirect or show success message
    } catch (error) {
      console.error('Error submitting teacher question:', error);
      alert('Произошла ошибка при отправке анкеты. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className="teacher-question-container">
      <div className="teacher-question-form">
        <h1 className="teacher-question-title">Анкета репетитора</h1>

        <h2 className="teacher-question-section-title">Основная информация</h2>
        <div className="teacher-question-info-grid">
          <div className="teacher-question-info-grid-main">
            <div className="teacher-question-input-group">
              <div className="teacher-question-label">Как вас зовут?</div>
                <input
                    type="text"
                    placeholder="Введите имя"
                    className="teacher-question-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="teacher-question-input-group">
              <div className="teacher-question-label">Сколько вам лет?</div>
                <input
                    type="text"
                    placeholder="Введите возраст"
                    className="teacher-question-input"
                    value={age}
                    onChange={(e) => {
                      // Allow only digits
                      const value = e.target.value.replace(/\D/g, '');
                      setAge(value);
                    }}
                />
            </div>
          </div>
          <div className="teacher-questions-photo-group">
            <div className="teacher-question-label">
              Добавить фото или видео
            </div>
            <div className="teacher-question-photo-upload"></div>
          </div>
        </div>

        {/* Gender Selection */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">Укажите пол</div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option ${gender === "Мужской" ? "selected" : ""}`}
              onClick={() => handleGenderSelect("Мужской")}
            >
              Мужской
            </div>
            <div
              className={`teacher-question-option ${gender === "Женский" ? "selected" : ""}`}
              onClick={() => handleGenderSelect("Женский")}
            >
              Женский
            </div>
            <div
              className={`teacher-question-option ${gender === "Неважно" ? "selected" : ""}`}
              onClick={() => handleGenderSelect("Неважно")}
            >
              Неважно
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Выберите язык, который вы готовы преподавать
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option ${language === "Английский" ? "selected" : ""}`}
              onClick={() => handleLanguageSelect("Английский")}
            >
              Английский
            </div>
            <div
              className={`teacher-question-option ${language === "Немецкий" ? "selected" : ""}`}
              onClick={() => handleLanguageSelect("Немецкий")}
            >
              Немецкий
            </div>
            <div
              className={`teacher-question-option ${language === "Французский" ? "selected" : ""}`}
              onClick={() => handleLanguageSelect("Французский")}
            >
              Французский
            </div>
            <div
              className={`teacher-question-option ${language === "Японский" ? "selected" : ""}`}
              onClick={() => handleLanguageSelect("Японский")}
            >
              Японский
            </div>
            <div
              className={`teacher-question-option ${language === "Китайский" ? "selected" : ""}`}
              onClick={() => handleLanguageSelect("Китайский")}
            >
              Китайский
            </div>
            <div
              className={`teacher-question-option ${language === "Русский" ? "selected" : ""}`}
              onClick={() => handleLanguageSelect("Русский")}
            >
              Русский
            </div>
          </div>
        </div>

        {/* Language Level */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Укажите уровень преподаваемого языка
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-small ${languageLevel === "В2" ? "selected" : ""}`}
              onClick={() => handleLanguageLevelSelect("В2")}
            >
              В2
            </div>
            <div
              className={`teacher-question-option-small ${languageLevel === "С1" ? "selected" : ""}`}
              onClick={() => handleLanguageLevelSelect("С1")}
            >
              С1
            </div>
            <div
              className={`teacher-question-option-small ${languageLevel === "С2" ? "selected" : ""}`}
              onClick={() => handleLanguageLevelSelect("С2")}
            >
              С2
            </div>
            <div
              className={`teacher-question-option-small ${languageLevel === "Носитель" ? "selected" : ""}`}
              onClick={() => handleLanguageLevelSelect("Носитель")}
            >
              Носитель
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="teacher-question-section">
          <label className="teacher-question-label">Ваш часовой пояс</label>
          <select
              className="teacher-question-timezone-select"
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

        {/* Ideal Student Section */}
        <h2 className="teacher-question-section-title">Ваш идеальный ученик</h2>

        {/* Teaching Goals */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Какие цели обучения вам интересны? (можно выбрать несколько)
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-wide ${teachingGoals.includes("Подготовка к экзаменам") ? "selected" : ""}`}
              onClick={() => handleTeachingGoalToggle("Подготовка к экзаменам")}
            >
              Подготовка к экзаменам (IELTS, TOEFL и др.)
            </div>
            <div
              className={`teacher-question-option-medium ${teachingGoals.includes("Бизнес-английский") ? "selected" : ""}`}
              onClick={() => handleTeachingGoalToggle("Бизнес-английский")}
            >
              Бизнес-английский
            </div>
            <div
              className={`teacher-question-option-medium ${teachingGoals.includes("Разговорная практика") ? "selected" : ""}`}
              onClick={() => handleTeachingGoalToggle("Разговорная практика")}
            >
              Разговорная практика
            </div>
            <div
              className={`teacher-question-option-medium ${teachingGoals.includes("Путешествия и эмиграция") ? "selected" : ""}`}
              onClick={() =>
                handleTeachingGoalToggle("Путешествия и эмиграция")
              }
            >
              Путешествия и эмиграция
            </div>
            <div
              className={`teacher-question-option-medium ${teachingGoals.includes("Для работы / карьеры") ? "selected" : ""}`}
              onClick={() => handleTeachingGoalToggle("Для работы / карьеры")}
            >
              Для работы / карьеры
            </div>
          </div>
        </div>

        {/* Minimum Student Level */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Минимальный уровень ученика
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-small ${minStudentLevel === "А1" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("А1", "min")}
            >
              А1
            </div>
            <div
              className={`teacher-question-option-small ${minStudentLevel === "А2" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("А2", "min")}
            >
              А2
            </div>
            <div
              className={`teacher-question-option-small ${minStudentLevel === "В1" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("В1", "min")}
            >
              В1
            </div>
            <div
              className={`teacher-question-option-small ${minStudentLevel === "В2" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("В2", "min")}
            >
              В2
            </div>
            <div
              className={`teacher-question-option-small ${minStudentLevel === "С1" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("С1", "min")}
            >
              С1
            </div>
            <div
              className={`teacher-question-option-small ${minStudentLevel === "С2" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("С2", "min")}
            >
              С2
            </div>
          </div>
        </div>

        {/* Maximum Student Level */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Максимальный уровень ученика
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-small ${maxStudentLevel === "А1" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("А1", "max")}
            >
              А1
            </div>
            <div
              className={`teacher-question-option-small ${maxStudentLevel === "А2" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("А2", "max")}
            >
              А2
            </div>
            <div
              className={`teacher-question-option-small ${maxStudentLevel === "В1" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("В1", "max")}
            >
              В1
            </div>
            <div
              className={`teacher-question-option-small ${maxStudentLevel === "В2" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("В2", "max")}
            >
              В2
            </div>
            <div
              className={`teacher-question-option-small ${maxStudentLevel === "С1" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("С1", "max")}
            >
              С1
            </div>
            <div
              className={`teacher-question-option-small ${maxStudentLevel === "С2" ? "selected" : ""}`}
              onClick={() => handleStudentLevelSelect("С2", "max")}
            >
              С2
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Выберите до 5 ваших интересов
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-interest ${interests.includes("Кино") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Кино")}
            >
              Кино
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Сериалы") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Сериалы")}
            >
              Сериалы
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Музыка") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Музыка")}
            >
              Музыка
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Книги") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Книги")}
            >
              Книги
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Искусство") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Искусство")}
            >
              Искусство
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Технологии") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Технологии")}
            >
              Технологии
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Спорт") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Спорт")}
            >
              Спорт
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Политика") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Политика")}
            >
              Политика
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Экономика") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Экономика")}
            >
              Экономика
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Путешествия") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Путешествия")}
            >
              Путешествия
            </div>
            <div
              className={`teacher-question-option-interest ${interests.includes("Наука") ? "selected" : ""}`}
              onClick={() => handleInterestToggle("Наука")}
            >
              Наука
            </div>
            <div
                className={`teacher-question-option-interest ${interests.includes("+") ? "selected" : ""}`}
                onClick={() => handleInterestToggle("+")}
            >Другое</div>
          </div>
        </div>

        {/* Schedule and Pricing Section */}
        <h2 className="teacher-question-section-title">
          График и стоимость занятий
        </h2>

        {/* Teaching Frequency */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Как часто вы планируете преподавать?
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-medium ${teachingFrequency === "1 раз в неделю" ? "selected" : ""}`}
              onClick={() => handleTeachingFrequencySelect("1 раз в неделю")}
            >
              1 раз в неделю
            </div>
            <div
              className={`teacher-question-option-medium ${teachingFrequency === "2-3 раза в неделю" ? "selected" : ""}`}
              onClick={() => handleTeachingFrequencySelect("2-3 раза в неделю")}
            >
              2-3 раза в неделю
            </div>
            <div
              className={`teacher-question-option-medium ${teachingFrequency === "Каждый день" ? "selected" : ""}`}
              onClick={() => handleTeachingFrequencySelect("Каждый день")}
            >
              Каждый день
            </div>
            <div
              className={`teacher-question-option-medium ${teachingFrequency === "Гибкий график" ? "selected" : ""}`}
              onClick={() => handleTeachingFrequencySelect("Гибкий график")}
            >
              Гибкий график
            </div>
          </div>
        </div>

        {/* Lesson Duration */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Предпочитаемая длительность занятий
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-medium ${lessonDuration === "30 минут" ? "selected" : ""}`}
              onClick={() => handleLessonDurationSelect("30 минут")}
            >
              30 минут
            </div>
            <div
              className={`teacher-question-option-medium ${lessonDuration === "45 минут" ? "selected" : ""}`}
              onClick={() => handleLessonDurationSelect("45 минут")}
            >
              45 минут
            </div>
            <div
              className={`teacher-question-option-medium ${lessonDuration === "90 минут" ? "selected" : ""}`}
              onClick={() => handleLessonDurationSelect("90 минут")}
            >
              90 минут
            </div>
            <div
              className={`teacher-question-option-medium ${lessonDuration === "Неважно" ? "selected" : ""}`}
              onClick={() => handleLessonDurationSelect("Неважно")}
            >
              Неважно
            </div>
          </div>
        </div>

        {/* Preferred Time */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Предпочтительное время занятий
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-medium ${preferredTime === "Утро" ? "selected" : ""}`}
              onClick={() => handlePreferredTimeSelect("Утро")}
            >
              Утро (06:000 – 10:000)
            </div>
            <div
              className={`teacher-question-option-medium ${preferredTime === "День" ? "selected" : ""}`}
              onClick={() => handlePreferredTimeSelect("День")}
            >
              День (10:000 – 16:000)
            </div>
            <div
              className={`teacher-question-option-medium ${preferredTime === "Вечер" ? "selected" : ""}`}
              onClick={() => handlePreferredTimeSelect("Вечер")}
            >
              Вечер (16:00 – 22:000)
            </div>
            <div
              className={`teacher-question-option-medium ${preferredTime === "Неважно" ? "selected" : ""}`}
              onClick={() => handlePreferredTimeSelect("Неважно")}
            >
              Неважно
            </div>
          </div>
        </div>

        {/* Lesson Price */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">Стоимость одного занятия</div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-medium ${lessonPrice === "До 1000 руб." ? "selected" : ""}`}
              onClick={() => handleLessonPriceSelect("До 1000 руб.")}
            >
              До 1000 руб.
            </div>
            <div
              className={`teacher-question-option-medium ${lessonPrice === "1000–2000 руб." ? "selected" : ""}`}
              onClick={() => handleLessonPriceSelect("1000–2000 руб.")}
            >
              1000–2000 руб.
            </div>
            <div
              className={`teacher-question-option-medium ${lessonPrice === "Более 2000 руб." ? "selected" : ""}`}
              onClick={() => handleLessonPriceSelect("Более 2000 руб.")}
            >
              Более 2000 руб.
            </div>
          </div>
        </div>

        {/* Teaching Style Section */}
        <h2 className="teacher-question-section-title">Стиль преподавания</h2>

        {/* Communication Style */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Какой у вас стиль общения с учениками?
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-wide ${teachingStyle === "Дружелюбный и поддерживающий" ? "selected" : ""}`}
              onClick={() =>
                handleTeachingStyleSelect("Дружелюбный и поддерживающий")
              }
            >
              Дружелюбный и поддерживающий
            </div>
            <div
              className={`teacher-question-option-wide ${teachingStyle === "Строгий и структурированный" ? "selected" : ""}`}
              onClick={() =>
                handleTeachingStyleSelect("Строгий и структурированный")
              }
            >
              Строгий и структурированный
            </div>
            <div
              className={`teacher-question-option-wide ${teachingStyle === "Нейтральный, но профессиональный" ? "selected" : ""}`}
              onClick={() =>
                handleTeachingStyleSelect("Нейтральный, но профессиональный")
              }
            >
              Нейтральный, но профессиональный
            </div>
          </div>
        </div>

        {/* Feedback Style */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Как вы даёте обратную связь?
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-medium ${feedbackStyle === "Устно" ? "selected" : ""}`}
              onClick={() => handleFeedbackStyleSelect("Устно")}
            >
              Устно
            </div>
            <div
              className={`teacher-question-option-medium ${feedbackStyle === "Письменно" ? "selected" : ""}`}
              onClick={() => handleFeedbackStyleSelect("Письменно")}
            >
              Письменно
            </div>
            <div
              className={`teacher-question-option-medium ${feedbackStyle === "В виде тестов" ? "selected" : ""}`}
              onClick={() => handleFeedbackStyleSelect("В виде тестов")}
            >
              В виде тестов
            </div>
            <div
              className={`teacher-question-option-medium ${feedbackStyle === "Видеоразбор" ? "selected" : ""}`}
              onClick={() => handleFeedbackStyleSelect("Видеоразбор")}
            >
              Видеоразбор
            </div>
          </div>
        </div>

        {/* Teaching Method */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Какой тип передачи информации вы используете чаще?
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-wide ${teachingMethod === "Визуальный" ? "selected" : ""}`}
              onClick={() => handleTeachingMethodSelect("Визуальный")}
            >
              Визуальный (картинки, видео)
            </div>
            <div
              className={`teacher-question-option-wide ${teachingMethod === "Аудиальный" ? "selected" : ""}`}
              onClick={() => handleTeachingMethodSelect("Аудиальный")}
            >
              Аудиальный (аудио, подкасты)
            </div>
            <div
              className={`teacher-question-option-wide ${teachingMethod === "Кинестетический" ? "selected" : ""}`}
              onClick={() => handleTeachingMethodSelect("Кинестетический")}
            >
              Кинестетический (практика, игры)
            </div>
          </div>
        </div>

        {/* Explanation Style */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Как вы объясняете новый материал?
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-wide ${explanationStyle === "Через примеры" ? "selected" : ""}`}
              onClick={() => handleExplanationStyleSelect("Через примеры")}
            >
              Через примеры
            </div>
            <div
              className={`teacher-question-option-wide ${explanationStyle === "Через теорию" ? "selected" : ""}`}
              onClick={() => handleExplanationStyleSelect("Через теорию")}
            >
              Через теорию
            </div>
            <div
              className={`teacher-question-option-wide ${explanationStyle === "Через практику" ? "selected" : ""}`}
              onClick={() => handleExplanationStyleSelect("Через практику")}
            >
              Через практику
            </div>
            <div
              className={`teacher-question-option-wide ${explanationStyle === "Комбинированный подход" ? "selected" : ""}`}
              onClick={() =>
                handleExplanationStyleSelect("Комбинированный подход")
              }
            >
              Комбинированный подход
            </div>
          </div>
        </div>

        {/* Homework Approach */}
        <div className="teacher-question-section">
          <div className="teacher-question-label">
            Как относитесь к домашним заданиям?
          </div>
          <div className="teacher-question-options">
            <div
              className={`teacher-question-option-interest ${homeworkApproach === "Задаю всегда" ? "selected" : ""}`}
              onClick={() => handleHomeworkApproachSelect("Задаю всегда")}
            >
              Задаю всегда
            </div>
            <div
              className={`teacher-question-option-interest ${homeworkApproach === "Задаю редко" ? "selected" : ""}`}
              onClick={() => handleHomeworkApproachSelect("Задаю редко")}
            >
              Задаю редко
            </div>
            <div
              className={`teacher-question-option-interest ${homeworkApproach === "Не задаю" ? "selected" : ""}`}
              onClick={() => handleHomeworkApproachSelect("Не задаю")}
            >
              Не задаю
            </div>
          </div>
        </div>

        {/* Completion Message */}
        <h2 className="teacher-questions-completion-message">
          Вы проделали большую работу! Отправляйтесь на поиски идеального
          ученика и собеседника.
        </h2>

        {/* Submit Button */}
        <button
          className="teacher-question-submit-button"
          onClick={handleSubmit}
        >
          Искать
        </button>
      </div>

      {/* Footer */}
      <div className="teacher-questions-footer">
          <div className="footer-content">
              <div className="footer-year">2025</div>
              <div className="footer-copyright">©FindMyTutor</div>
              <div className="footer-link">О нас</div>
              <div className="footer-email">FindMy@Tutor.com</div>
              <div className="footer-privacy">Обработка персональных данных</div>
              <div className="footer-policy">Политика конфиденциальности</div>
          </div>
      </div>
    </div>
  );
};

export default TeacherQuestionPage;
