/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone number validation (basic international format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Password strength validation
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: getPasswordStrength(password),
  };
};

/**
 * Get password strength (weak, medium, strong)
 */
export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  return 'strong';
};

/**
 * Required field validation
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined && value !== '';
};

/**
 * Minimum length validation
 */
export const minLength = (value, min) => {
  if (typeof value === 'string') {
    return value.trim().length >= min;
  }
  return false;
};

/**
 * Maximum length validation
 */
export const maxLength = (value, max) => {
  if (typeof value === 'string') {
    return value.trim().length <= max;
  }
  return false;
};

/**
 * Number validation
 */
export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Minimum value validation
 */
export const minValue = (value, min) => {
  return isNumber(value) && parseFloat(value) >= min;
};

/**
 * Maximum value validation
 */
export const maxValue = (value, max) => {
  return isNumber(value) && parseFloat(value) <= max;
};

/**
 * URL validation
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Date validation
 */
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

/**
 * Future date validation
 */
export const isFutureDate = (date) => {
  if (!isValidDate(date)) return false;
  return date > new Date();
};

/**
 * Past date validation
 */
export const isPastDate = (date) => {
  if (!isValidDate(date)) return false;
  return date < new Date();
};

/**
 * File size validation (in bytes)
 */
export const isValidFileSize = (file, maxSizeInBytes) => {
  return file && file.size <= maxSizeInBytes;
};

/**
 * File type validation
 */
export const isValidFileType = (file, allowedTypes) => {
  return file && allowedTypes.includes(file.type);
};

/**
 * Validate form field
 */
export const validateField = (name, value, rules = {}) => {
  const errors = [];

  if (rules.required && !isRequired(value)) {
    errors.push(`${name} is required`);
    return errors; // Return early if required field is empty
  }

  if (rules.email && value && !isValidEmail(value)) {
    errors.push(`${name} must be a valid email`);
  }

  if (rules.phone && value && !isValidPhone(value)) {
    errors.push(`${name} must be a valid phone number`);
  }

  if (rules.minLength && value && !minLength(value, rules.minLength)) {
    errors.push(`${name} must be at least ${rules.minLength} characters`);
  }

  if (rules.maxLength && value && !maxLength(value, rules.maxLength)) {
    errors.push(`${name} must be no more than ${rules.maxLength} characters`);
  }

  if (rules.min && value && !minValue(value, rules.min)) {
    errors.push(`${name} must be at least ${rules.min}`);
  }

  if (rules.max && value && !maxValue(value, rules.max)) {
    errors.push(`${name} must be no more than ${rules.max}`);
  }

  if (rules.url && value && !isValidUrl(value)) {
    errors.push(`${name} must be a valid URL`);
  }

  if (rules.custom && typeof rules.custom === 'function') {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }

  return errors;
};

/**
 * Validate entire form
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(fieldName => {
    const fieldErrors = validateField(
      fieldName,
      formData[fieldName],
      validationRules[fieldName]
    );

    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors[0]; // Take first error
      isValid = false;
    }
  });

  return { isValid, errors };
};

export default {
  isValidEmail,
  isValidPhone,
  validatePassword,
  getPasswordStrength,
  isRequired,
  minLength,
  maxLength,
  isNumber,
  minValue,
  maxValue,
  isValidUrl,
  isValidDate,
  isFutureDate,
  isPastDate,
  isValidFileSize,
  isValidFileType,
  validateField,
  validateForm,
};