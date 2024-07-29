import * as React from 'react';
import Splash from '../components/splash/SplashLogo';
import authService from '../service/auth.service';
import { IUser, UserInfo } from '../types/user.type';

//Tipo del contexto
type AuthContextType = {
    user: IUser | null;
    login: (data: UserInfo) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
};
//genero el contexto
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
//tipo de funcion
type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = React.useState<IUser | null>(null);
    const [loading, setLoading] = React.useState(false)
    const [hasCheckedSession, setHasCheckedSession] = React.useState(false);

    //funcion del login
    const login = async (data: UserInfo) => {
        const userInfo = await authService.login(data.user, data.password)
        if (userInfo) setUser(userInfo.user);
    };

    //funcion del logout, falta cambiar su logica
    const logout = async () => {
        await authService.signOut()
        setUser(null)
    };

    //chequea si ya hay una sesion iniciada
    const checkSession = async () => {
        if (hasCheckedSession) return;
        setHasCheckedSession(true);
        try {
            setLoading(true)
            const res = await authService.whoami()
            setUser(res.data)
        } catch (e) {
            console.log(e)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, checkSession }}>
            {
                loading ?
                    <Splash />
                    :
                    children}
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
