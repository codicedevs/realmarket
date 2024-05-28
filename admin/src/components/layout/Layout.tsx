import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import MyHeader from '../header/MyHeader';
import './layout.css';

const items2: MenuProps['items'] = [UserOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            // children: new Array(4).fill(null).map((_, j) => {
            //     const subKey = index * 4 + j + 1;
            //     return {
            //         key: subKey,
            //         label: `option${subKey}`,
            //     };
            // }), if children se ve con dropdown
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
                <MyHeader />
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
                            theme='dark'
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