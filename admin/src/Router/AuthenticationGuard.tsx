import * as React from 'react';
import { useAuth } from '../Context/auth';
import { ProtectedRoute } from './ProtectedRoute';

export type AuthenticationGuardProps = {
    children?: React.ReactElement;
    redirectPath?: string;
    guardType?: 'authenticated' | 'unauthenticated';
};

//Te lleva al opuesto, si estas en una ruta donde se supone que solo podes estar si tenes usuario, si no tenes usuario te lleva al redirect path
// es decir, si estas en un Route del grupo authenticated, el redirectPath deberia ser /login, porque en caso que no estes autentificado te lleva ahi
export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
    redirectPath = '/login',
    guardType,
    ...props
}) => {
    const { user } = useAuth();
    const isAllowed = guardType === 'authenticated' ? !!user : !user;
    return (
        <ProtectedRoute
            redirectPath={redirectPath}
            isAllowed={isAllowed}
            {...props}
        />
    );
};