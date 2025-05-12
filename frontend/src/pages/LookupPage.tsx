import React, { useEffect, useState } from "react";
import "./LookupPage.css";
import api from "../services/api";

// Placeholder images - these would be replaced with actual assets
const backIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/7322121926101a5aa13d81fc911f100ee6482cb6";
const userIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/babe4ac13c1c3b0cdb73ca6cf9a7967f493af8c9";
const noIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/74682a452db7ad0de4f6255af12d51c8c917a0a6";
const defaultTutorProfileImage =
  "https://media.istockphoto.com/id/2041572395/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8F-%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%B0-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=qJ0J1oSxpRFi5Kb-sYR0yYFc4g4_GQD7jwq4Pep01BU=";
const yesIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/95cb6a819ac204a4883461914b096b40c3022bd7";

// Define the teacher response interface
interface TeacherLookupResponse {
  id: number;
  userId: number;
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
  compatibilityScore: number;
}

const LookupPage: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherLookupResponse[]>([]);
  const [currentTeacherIndex, setCurrentTeacherIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/questions/lookup');
        setTeachers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setError('Failed to load teachers. Please try again later.');
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Format the duration string
  const formatDuration = (duration: string): string => {
    switch (duration) {
      case 'THIRTY_MINUTES':
        return '30 минут';
      case 'FORTY_FIVE_MINUTES':
        return '45 минут';
      case 'NINETY_MINUTES':
        return '90 минут';
      case 'ANY':
        return 'Неважно';
      default:
        return duration;
    }
  };

  // Format the price string
  const formatPrice = (price: string): string => {
    switch (price) {
      case 'LOW':
        return '1000 руб';
      case 'MEDIUM':
        return '1000–2000 руб';
      case 'HIGH':
        return 'От 2000 руб';
      default:
        return price;
    }
  };

  // Map interest to UI-friendly value
  const mapInterest = (value: string): string => {
    switch (value) {
      case 'MOVIES':
        return 'Кино';
      case 'SERIES':
        return 'Сериалы';
      case 'MUSIC':
        return 'Музыка';
      case 'BOOKS':
        return 'Книги';
      case 'ART':
        return 'Искусство';
      case 'TECHNOLOGY':
        return 'Технологии';
      case 'SPORTS':
        return 'Спорт';
      case 'POLITICS':
        return 'Политика';
      case 'ECONOMICS':
        return 'Экономика';
      case 'TRAVEL':
        return 'Путешествия';
      case 'SCIENCE':
        return 'Наука';
      case 'OTHER':
        return 'Другое';
      default:
        return value;
    }
  };

  // Map student level to UI-friendly value
  const mapLevel = (value: string): string => {
    switch (value) {
      case 'A1':
        return 'А1';
      case 'A2':
        return 'А2';
      case 'B1':
        return 'В1';
      case 'B2':
        return 'В2';
      case 'C1':
        return 'С1';
      case 'C2':
        return 'С2';
      case 'UNKNOWN':
        return 'Неизвестно';
      case 'NATIVE':
        return 'Носитель';
      default:
        return value;
    }
  };

  const currentTeacher = teachers.length > 0 ? teachers[currentTeacherIndex] : null;

  const handleNextTeacher = async () => {
    if (currentTeacher) {
      try {
        await api.post('/api/questions/choose_result', {
          teacherId: currentTeacher.id,
          picked: true
        });

        if (currentTeacherIndex < teachers.length - 1) {
          setCurrentTeacherIndex(currentTeacherIndex + 1);
        } else {
          // No more teachers to show
          setTeachers([]);
        }
      } catch (err) {
        console.error('Error sending choice:', err);
        setError('Failed to send your choice. Please try again later.');
      }
    }
  };

  const handlePreviousTeacher = async () => {
    if (currentTeacher) {
      try {
        await api.post('/api/questions/choose_result', {
          teacherId: currentTeacher.id,
          picked: false
        });

        if (currentTeacherIndex < teachers.length - 1) {
          setCurrentTeacherIndex(currentTeacherIndex + 1);
        } else {
          // No more teachers to show
          setTeachers([]);
        }
      } catch (err) {
        console.error('Error sending choice:', err);
        setError('Failed to send your choice. Please try again later.');
      }
    }
  };

  return (
    <div className="lookup-page">
      <div className="lookup-header">
        <div className="lookup-header-content">
          <div className="lookup-title">Find my tutor</div>
          <div className="lookup-description">
            Мы подобрали для вас несколько кандидатур. Выбирайте карточку,
            просматривайте профиль и начинайте общение.
          </div>
        </div>
        <div className="lookup-nav-buttons">
          <div className="nav-button">
            <img src={backIcon} alt="Back" className="nav-icon" />
          </div>
          <div className="nav-button">
            <img src={userIcon} alt="User" className="nav-icon" />
          </div>
        </div>
      </div>
      <div className="tutor-selection-container">
        {teachers.length > 0 && (
          <img 
            src={noIcon} 
            alt="No" 
            className="selection-icon no-icon" 
            onClick={handlePreviousTeacher}
          />
        )}
        <div className="tutor-profile-container">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : teachers.length === 0 ? (
            <div className="no-more-teachers">
              <h3>Вы просмотрели всех доступных преподавателей</h3>
              <p>Спасибо за ваш выбор! Вы можете найти выбранных преподавателей в своем профиле.</p>
            </div>
          ) : currentTeacher ? (
            <>
              <img
                src={currentTeacher.photoData ? `${currentTeacher.photoData}` : defaultTutorProfileImage}
                alt="Tutor Profile"
                className="tutor-profile-image"
              />
              <div className="tutor-profile-description">
                <div className="tutor-profile-description-title">
                  {`${currentTeacher.name}, для ${mapLevel(currentTeacher.minStudentLevel)}-${mapLevel(currentTeacher.maxStudentLevel)}, ${formatPrice(currentTeacher.lessonPrice)}/${formatDuration(currentTeacher.lessonDuration)}`}
                </div>
                <div className="tutor-profile-description-description">
                  {currentTeacher.interests.map(interest => mapInterest(interest)).join(', ')}
                </div>
              </div>
            </>
          ) : (
            <div>No teachers found</div>
          )}
        </div>
        {teachers.length > 0 && (
          <img 
            src={yesIcon} 
            alt="Yes" 
            className="selection-icon yes-icon" 
            onClick={handleNextTeacher}
          />
        )}
      </div>
      <div className="lookup-footer">
        <div className="footer-content">
          <div className="footer-year">2025</div>
          <div className="footer-copyright">©FindMyTutor</div>
          <div className="footer-about">О нас</div>
          <div className="footer-email">FindMy@Tutor.com</div>
          <div className="footer-privacy">Обработка персональных данных</div>
          <div className="footer-policy">Политика конфиденциальности</div>
        </div>
      </div>
    </div>
  );
};

export default LookupPage;
