import { User } from '@auth/interfaces/auth.interfce';

export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@fitzone.com',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Steven Medina',
    email: 'medina@fitzone.com',
    password: 'password123'
  }
];
