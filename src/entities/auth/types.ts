// Інтерфейс, що описує дані користувача
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: 'user' | 'admin';
  token?: string;
}
