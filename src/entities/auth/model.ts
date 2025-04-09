import { User } from './types';

// Функція, що повертає повне ім'я користувача
export const getFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

// Функція, що перевіряє, чи користувач є адміністратором
export const isAdmin = (user: User): boolean => {
  return user.role === 'admin';
};
