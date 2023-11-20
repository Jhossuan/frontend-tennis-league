"use client"
import { FlagOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
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
        route: "/admin/users",
        type: "item",
        icon: <UserOutlined />,
    },
    Tournaments: {
        title: "Torneos",
        type: "subitem",
        icon: <FlagOutlined />,
        children: [
            {title: "Inicio", subtitle: "Torneos", route: "/admin/tournaments"},
            {title: "Participantes", subtitle: "Participantes", route: "/admin/competitors"},
        ]
    }
}

export { UserMenu }