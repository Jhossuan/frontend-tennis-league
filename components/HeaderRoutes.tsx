"use client"

import SetRoutes from '@/utils/SetRoutes';
import { Typography } from 'antd';
import { routes } from './MapRoutes';

const Header = () => {

    const [ title, description ] = SetRoutes(routes);
    const { Title } = Typography;

  return (
    <div>
        <Title style={{ margin: "40px 0 -15px 0", color: "#fff" }}>
            { title }
        </Title>
        <Title level={4} style={{ color: "#fff" }}>
            { description }
        </Title>
    </div>
  )
}

export default Header