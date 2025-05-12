import React, { useState, useEffect } from "react";
import "./PickedTeachersPage.css";
import api from "../services/api";

// Define the interface for teacher data
interface TeacherData {
  id: number;
  userId: number;
  name: string;
  photoData: string;
  timezone: string;
  lessonPrice: number;
  lessonDuration: string;
}

// Define the interface for student data
interface StudentData {
  id: number;
  name: string;
  email: string;
  username: string;
  createdAt: string;
}

// Define user role type
type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

const defaultTutorProfileImage =
    "https://media.istockphoto.com/id/2041572395/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8F-%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%B0-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=qJ0J1oSxpRFi5Kb-sYR0yYFc4g4_GQD7jwq4Pep01BU=";

const PickedTeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile to determine role
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/users/profile');
        setUserRole(response.data.role);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again later.');
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch picked teachers or students based on user role
  useEffect(() => {
    const fetchData = async () => {
      if (!userRole) return; // Wait until we have the user role

      try {
        setLoading(true);

        if (userRole === "TEACHER") {
          // If user is a teacher, fetch students who picked this teacher
          const response = await api.get('/api/questions/get_picked_students');
          setStudents(response.data);
        } else {
          // If user is a student, fetch picked teachers (existing logic)
          const response = await api.get('/api/questions/get_picked');
          setTeachers(response.data);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [userRole]);

  // Function to format lesson duration and price
  const formatPriceAndDuration = (price: number, duration: string) => {
    // Convert duration string to minutes for display
    let durationMinutes = "45";
    let durationEnum = "FORTY_FIVE_MINUTES";

    if (duration === "THIRTY_MINUTES") {
      durationMinutes = "30";
      durationEnum = "THIRTY_MINUTES";
    }
    if (duration === "FORTY_FIVE_MINUTES") {
      durationMinutes = "45";
      durationEnum = "FORTY_FIVE_MINUTES";
    }
    if (duration === "SIXTY_MINUTES") {
      durationMinutes = "60";
      durationEnum = "SIXTY_MINUTES";
    }
    if (duration === "NINETY_MINUTES") {
      durationMinutes = "90";
      durationEnum = "NINETY_MINUTES";
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
    // Example: "GMT+3" -> "Москва (GMT+3)"
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

  return (
    <div className="picked-teachers-container">
      <div className="content-wrapper">
        <div className="picked-header-section">
          <div className="title-column">
            <div className="picked-main-title">Find my tutor</div>
          </div>
          <div className="buttons-column">
            <div className="picked-buttons-container">
              <div className="picked-button-column">
                <div className="nav-button back-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c97029a100caec3b0a0af85d26f148e9ded7e29d?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Back"
                  />
                </div>
              </div>
              <div className="picked-button-column">
                <div className="nav-button contact-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Contact"
                  />
                </div>
              </div>
              <div className="picked-button-column">
                <div className="nav-button next-button">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/da85ec3f5c371762db65cee6a272c01b19efba18?placeholderIfAbsent=true"
                    className="button-icon"
                    alt="Next"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-title">Вы на одной волне</div>

        {loading && <div className="loading-message">Loading teachers...</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="teacher-list">
          {!loading && !error && teachers.length === 0 && (
            <div className="no-teachers-message">No picked teachers found.</div>
          )}

          {teachers.map((teacher) => (
            <div className="teacher-item" key={teacher.id}>
              <div className="teacher-info">
                <img
                  src={teacher.photoData ? `${teacher.photoData}` : defaultTutorProfileImage}
                  className="teacher-avatar"
                  alt={`${teacher.name} avatar`}
                />
                <div className="teacher-name">{teacher.name}</div>
                <div className="price-container">
                  <div className="price-tag">
                    {formatPriceAndDuration(teacher.lessonPrice, teacher.lessonDuration)}
                  </div>
                </div>
                <div className="location-container">
                  <div className="location-tag">{formatTimezone(teacher.timezone)}</div>
                </div>
                <div className="contact-button-container">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b7145d00642cc2b88cafb90c53b920f225c12da?placeholderIfAbsent=true"
                    className="contact-icon"
                    alt="Contact"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PickedTeachersPage;
