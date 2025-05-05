import React from 'react';
import './Button.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  type = 'button', 
  onClick, 
  children, 
  className = '',
  isLoading = false,
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-button ${className} ${isLoading ? 'loading' : ''}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
