import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';

const drawerRoutes = [
  {
    icon: UserOutlined,
    label: "Usuarios",
    id: 1
  }
]

const items2: MenuProps['items'] = drawerRoutes.map(
  (route) => {
    return {
      key: route.id,
      icon: React.createElement(route.icon),
      label: route.label,
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

const Drawer = () => {
  return (
    <Sider >
      <Menu
        mode='inline'
        style={{ height: '100%', borderRight: 0 }}
        items={items2}
        defaultSelectedKeys={['1']}
        theme='dark'
      />
    </Sider>
  )
}

export default Drawer