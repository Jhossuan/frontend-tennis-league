"use client"

import { Button, Divider, Form, Input, notification } from 'antd'
import React, { useState } from 'react'
import { BigText, SmallText } from '../styles'
import Link from 'next/link'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validateMessages } from '@/utils/ValidationMessages'
import { LoginUser } from '@/api/Auth/actions'
import { useRouter } from 'next/navigation'

export default function Login() {
  
  const [ loading, setLoading ] = useState<boolean>(false)

  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish = async(e: any) => {
    setLoading(true)
    const res = await LoginUser(e)
    if(res.status !== 200){
      setLoading(false)
      return notification.error({
        message: res.response.msg
      })
    }

    form.resetFields()
    setLoading(false)
    router.push('/admin')
    return notification.success({
      message: res.response.msg
    })
  }

  return (
    <>
      <SmallText $textalign='left'>Bienvenido a <span style={{ color:"#0366d6" }}>Tennis League by Whynot?</span></SmallText>
      <BigText $textalign='left'>Iniciar Sesión</BigText>

        <Form form={form} onFinish={onFinish} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>

          <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
            <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]} style={{ margin:'2em 0' }}>
            <Input type='password' prefix={<LockOutlined />} placeholder='Contraseña' />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%' }}>{ loading ? 'Cargando ...' : 'Iniciar Sesión' }</Button>
            <SmallText fontSize='1em' $textalign='left'><Link href="/auth/repassword"><span style={{ color:"#0366d6", cursor: 'pointer' }}>Olvidé mi contraseña</span></Link></SmallText>
          </Form.Item>

        </Form>
      <Divider> o </Divider>
      <SmallText fontSize='1em'>
        ¿Aún no tienes cuenta? <Link href="/auth/register"><span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }}>Registrate</span></Link>
      </SmallText>
    </>
  )
}