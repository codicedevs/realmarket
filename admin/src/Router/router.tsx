import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import { CustomLayout } from '../components/layout/Layout';
import Login from '../Views/login/Login';
import UserManager from '../Views/users/UserManager';
import Users from '../Views/users/Users';
import { AuthenticationGuard } from './AuthenticationGuard';

// const HomePage = () => <div>Home</div>;

const routes = createRoutesFromElements(
    <Route element={<CustomLayout />}>
        {/* Protect route based on authentication */}
        <Route element={<AuthenticationGuard guardType="authenticated" />}>
            {/* <Route index path='/' element={<HomePage />} /> */}
            <Route index path="/" element={<Users />} />
            <Route path='/user/creation' element={<UserManager />} />
            <Route path='/user/edition/:id' element={<UserManager />} />
        </Route>
        {/* Login page in case unauthenticated */}
        <Route element={<AuthenticationGuard guardType="unauthenticated" redirectPath="/" />}>
            <Route path="/login" element={<Login />} />
        </Route>
    </Route>
);

export const router = createBrowserRouter(routes);