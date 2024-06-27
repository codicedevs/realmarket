import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { useNavigate } from "react-router-dom";
import './drawer.css';

const drawerRoutes = [
  {
    icon: UserOutlined,
    label: "Usuarios",
    id: 1,
    path: '/'
  }
]


const Drawer = () => {
  const navigate = useNavigate();

  const sendTo = (path: string) => {
    navigate(path)
  }

  const items2: MenuProps['items'] = drawerRoutes.map(
    (route) => {
      return {
        key: route.id,
        icon: React.createElement(route.icon),
        label: route.label,
        path: route.path,
        onClick: () => sendTo(route.path),
        // onClick: sendTo(route.path)
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

  return (
    <Sider >
      <Menu
        mode='inline'
        style={{ borderRight: 0 }}
        items={items2}
        // defaultSelectedKeys={['1']}
        theme='dark'
      />
    </Sider>
  )
}

export default Drawer