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
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    console.log(user)
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
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        // height: '100%'
                        justifyContent: "center",
                        display: 'flex'
                    }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};