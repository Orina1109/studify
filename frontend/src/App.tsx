import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import StudentQuestionsPage from './pages/StudentQuestionsPage';
import TeacherQuestionPage from './pages/TeacherQuestionPage';
import ProfilePage from './pages/ProfilePage';
import MyQuestionsPage from './pages/MyQuestionsPage';
import LookupPage from './pages/LookupPage';
import api from './services/api';

// Simple placeholder components
const ForgotPassword = () => <div className="fullscreen-page">Forgot Password Page</div>;
const NotFound = () => <div className="fullscreen-page">Page Not Found</div>;

// Home component with auth check
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if auth token exists in cookies
    const cookies = document.cookie.split(';');
    const authTokenCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));

    if (!authTokenCookie) {
      // If no auth token, redirect to landing page
      navigate('/land');
      return;
    }

    // Fetch user profile to check filledQuestions flag and role using api service
    api.get('/api/users/profile')
    .then(response => {
      const user = response.data;
      // Check filledQuestions flag
      if (user.filledQuestions) {
        // If user has filled questions, redirect to the profile page
        navigate('/profile');
      } else {
        // Redirect based on a user role
        if (user.role === 'STUDENT') {
          navigate('/student-questions');
        } else if (user.role === 'TEACHER') {
          navigate('/teacher-questions');
        }
      }
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
      // On error, redirect to the landing page
      navigate('/land');
    });
  }, [navigate]);

  return <div className="fullscreen-page">Welcome to Studify</div>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Effect to listen for storage events (in case the login state changes in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/land" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/student-questions" element={<StudentQuestionsPage />} />
        <Route path="/teacher-questions" element={<TeacherQuestionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-questions" element={<MyQuestionsPage />} />
        <Route path="/lookup" element={<LookupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
