import { Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import Drawer from '../drawer/Drawer';
import MyHeader from '../header/MyHeader';
import './layout.css';

export const CustomLayout = () => {
    const { user } = useAuth();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ height: '100vh' }}>
            {
                user &&
                <MyHeader />
            }
            <Layout>
                {
                    user &&
                    <Drawer />
                }
                <Layout>
                    <Content style={{
                        background: colorBgContainer,
                        justifyContent: "center",
                        overflowY: 'auto'
                    }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};