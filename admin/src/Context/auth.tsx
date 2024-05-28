import * as React from 'react';
import { User, mockAuthService } from '../components/mockAuthService';

type AuthContextType = {
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = React.useState<User | null>(null);

    const login = async () => {
        const user = await mockAuthService.login();
        setUser(user);
    };

    const logout = async () => {
        await mockAuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
