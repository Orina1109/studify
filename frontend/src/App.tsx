import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Simple placeholder components
const Home = () => <div className="page">Welcome to Studify</div>;
const Login = () => <div className="page">Login Page</div>;
const Register = () => <div className="page">Register Page</div>;
const NotFound = () => <div className="page">Page Not Found</div>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <h1>Studify</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {!isLoggedIn ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              <li><button onClick={() => setIsLoggedIn(false)}>Logout</button></li>
            )}
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Studify</p>
      </footer>
    </div>
  );
}

export default App;