export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, message: 'Email обязателен' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Некорректный формат email' };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Пароль обязателен' };
  }

  if (password.length < 6) {
    return { isValid: false, message: 'Пароль должен содержать минимум 6 символов' };
  }

  return { isValid: true };
};

export const validateHabitName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, message: 'Название привычки обязательно' };
  }

  if (name.length < 2) {
    return { isValid: false, message: 'Название должно содержать минимум 2 символа' };
  }

  if (name.length > 50) {
    return { isValid: false, message: 'Название не должно превышать 50 символов' };
  }

  return { isValid: true };
};

export const validateTargetDays = (days: number): ValidationResult => {
  if (!days && days !== 0) {
    return { isValid: false, message: 'Укажите цель' };
  }

  if (days <= 0) {
    return { isValid: false, message: 'Цель должна быть больше 0' };
  }

  return { isValid: true };
};
