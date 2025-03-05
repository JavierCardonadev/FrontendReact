import React, { createContext, useContext, ReactNode } from "react";
import { useAuthStore, User } from "shared";

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    login: ( username: string, password: string ) => Promise<User>;
    logout: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Obtenemos las propiedades y las acciones desde el Zustand Auth Store
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login: async (username, password) => {
            const result = await login(username, password);
            if (!result) throw new Error("Login failed");
            return result;
        }, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir el contexto con facilidad
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};