"use client"
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { SectionsObject } from '../types/app'

const UserMenu: SectionsObject = {
    Inicio: {
        title: "Inicio",
        route: "/admin",
        type: "item",
        icon: <HomeOutlined />
    },
    Usuarios: {
        title: "Usuarios",
        type: "subitem",
        icon: <UserOutlined />,
        children: [
            {title: "Inicio", subtitle: "Usuarios", route: "/admin/users"}
        ]

    }
}

export { UserMenu }