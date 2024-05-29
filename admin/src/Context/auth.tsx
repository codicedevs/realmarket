import * as React from 'react';
import authService from '../service/auth.service';
import { IUser, UserInfo } from '../types/user.type';

type AuthContextType = {
    user: IUser | null;
    login: (data: UserInfo) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = React.useState<IUser | null>(null);

    const login = async (data: UserInfo) => {
        const userInfo = await authService.login(data.email, data.password)
        if (userInfo) setUser(userInfo.user);
    };

    const logout = async () => {
        setUser(null);
    };

    const checkSession = async () => {
        const res = await authService.whoami()
        setUser(res.data)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, checkSession }}>
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
