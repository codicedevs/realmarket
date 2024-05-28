import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../Context/auth';
import './layout.css';

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

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
                <Header style={{ height: '10vh', display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: '0 10px' }}>
                        <div className='logo' />
                        <div>
                            Logout
                        </div>
                    </div>
                </Header>
            }
            <Layout>
                {
                    user &&
                    <Sider style={{ background: colorBgContainer }}>
                        <Menu
                            mode='inline'
                            style={{ height: '100%', borderRight: 0 }}
                            items={items2}
                            defaultSelectedKeys={['1']}
                        />
                    </Sider>
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