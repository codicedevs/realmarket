import * as React from 'react';
import { mockAuthService } from '../components/mockAuthService';
import { UserInfo } from '../types/user.type';

type AuthContextType = {
    user: string | null;
    login: (data: UserInfo) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = React.useState<string | null>(null);

    const login = async (data: UserInfo) => {
        const user = await mockAuthService.login();
        setUser(data.email);
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
