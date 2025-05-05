import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

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
    }
  }, [navigate]);

  return <div className="fullscreen-page">Welcome to Studify</div>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Effect to listen for storage events (in case login state changes in another tab)
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
