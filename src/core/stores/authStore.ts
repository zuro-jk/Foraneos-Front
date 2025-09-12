import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

// Usuarios estáticos por defecto
const DEFAULT_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@foraneos.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: '2',
    email: 'usuario@foraneos.com',
    password: 'user123',
    name: 'Usuario Normal',
    role: 'user'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      
      login: (email: string, password: string) => {
        const foundUser = DEFAULT_USERS.find(
          u => u.email === email && u.password === password
        );
        
        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          set({ 
            user: userWithoutPassword, 
            isLoggedIn: true 
          });
          return userWithoutPassword;
        }
        
        return null;
      },
      
      logout: () => {
        set({ user: null, isLoggedIn: false });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
