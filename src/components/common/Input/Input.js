import React, { useState } from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClasses = [
    'input',
    error && 'input--error',
    disabled && 'input--disabled',
    fullWidth && 'input--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'input-container',
    fullWidth && 'input-container--full-width',
  ]
    .filter(Boolean)
    .join(' ');

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={name} className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}

      <div className="input__wrapper">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
          {...rest}
        />

        {type === 'password' && (
          <button
            type="button"
            className="input__toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>

      {error && (
        <span id={`${name}-error`} className="input__error">
          {error}
        </span>
      )}

      {helperText && !error && (
        <span id={`${name}-helper`} className="input__helper">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;