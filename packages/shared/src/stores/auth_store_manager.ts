import { create } from "zustand";
import { mockLogin } from "..";
import {createJSONStorage, persist} from "zustand/middleware";

// Tipos para el usuario
export interface User {
  id: number;
  user: string;
  name: string;
  role: string;
}

// Tipos para el estado del AuthStore
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: string, password: string) => Promise<User | false>;
  logout: () => void;
}

// Función para crear el Zustand Store
export const useAuthStore = create(
    persist<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (user, password): Promise<User> => {
    try {
      const response =  mockLogin(user, password); // Llama a la función mockLogin para simular la validacion de credenciales

      if (response.success) {
        set({
          user: {
            id: response.id,
            user: response.username,
            name: response.name,
            role: response.role,
          },
          isAuthenticated: true,
        });
      }

      return {
        id: response.id,
        user: response.username,
        name: response.name,
        role: response.role,
      };

    } catch (error) {
      console.error("Error durante el login:", error);
      return {} as User;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}),
    {
      name: "authStorage", // Nombre para el almacenamiento en localStorage
      storage: createJSONStorage(() => localStorage), // Cambia a sessionStorage si deseas un alcance más corto
    }
)
);
