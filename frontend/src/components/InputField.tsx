import React from 'react';
import './InputField.css';

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  label,
  required = false,
  className = '',
  labelClassName = ''
}) => {
  return (
    <div className="input-field-container">
      {label && (
        <label className={`input-field-label ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${className}`}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;