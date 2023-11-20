"use client"
import { Button, Layout, Menu, Tooltip } from 'antd'
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import React from 'react'
import { UserMenu } from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import closeSession from './actions/closeSession';
import HeaderRoutes from '../../components/HeaderRoutes'

const { Content, Sider, Footer, Header } = Layout;

export default function PlatformLayout({ children }: { children: React.ReactNode }) {

    const router = useRouter()

    const logout = () => {
        closeSession()
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

  return (
    <Layout style={{ width: '100vw', height:'100vh' }}>
    <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ position: "relative", height: "100vh" }}
    >
    <Menu
        mode="inline"
        style={{ height: "100%", padding: "20px 0", zIndex: "999" }}
    >
        <div className='logo'>
            Logo Here
        </div>
        {Object.values(UserMenu).map((section) => {
            return (
                <>
                    {section.type === "item" ? (
                        <Menu.Item
                            key={section.route}
                            icon={section.icon}
                            onClick={() => router.push(section.route)}
                        >
                            {section.title}
                        </Menu.Item>
                    ) : (
                            section.type === "subitem" &&
                            section.children && (
                                <Menu.SubMenu title={section.title} icon={section.icon}>
                                    {section.children.map((item: any) => {
                                        return (
                                            <Menu.Item
                                                key={item.route}
                                                onClick={() => router.push(item.route)}
                                            >
                                                {item.title}
                                            </Menu.Item>
                                        )
                                    })
                                    }
                                </Menu.SubMenu>
                            )
                        )
                    }
                </>
            )
        })}
    </Menu>
    <Footer
        style={{
            padding: '10px',
            marginTop: '-60px',
            display: 'flex',
            justifyContent: 'space-around',
        }}
    >
        <Tooltip title="Cerrar Sesión">
            <Button
                type='primary'
                icon={<LogoutOutlined />}
                danger
                onClick={() => logout()}
            />
        </Tooltip>
        <Tooltip title="Configuraciones">
            <Button
                type='primary'
                icon={<SettingOutlined />}
                onClick={() => console.log('Configuraciones')}
            />
        </Tooltip>
    </Footer>
    </Sider>
    <Layout style={{ background: "#e5e5e5" }}>
        <Header
            style={{
                background: "#4CAF50",
                color: "#fff",
                height: "15em",
                boxShadow: "0px 5px 10px 1px #00000004"
            }}
        >
            <div className='header'>
                <HeaderRoutes />
            </div>
        </Header>
        <Content
            style={{
                margin: "-50px 16px 0",
                overflowY: "auto",
                padding: "5px",
            }}
        >
            {children}
        </Content>
    </Layout>
    </Layout>
  )
}
