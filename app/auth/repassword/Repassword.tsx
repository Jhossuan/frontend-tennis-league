"use client"

import React from 'react'
import { Form, Input, Button, Divider, Steps, notification } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BigText, SmallText } from '../styles';
import { validateMessages } from '@/utils/ValidationMessages';
import Link from 'next/link';
import { ResetPassword, SendCodeValidation, ValidateAccount } from '@/api/Auth/actions';
import { useRouter } from 'next/navigation';

export default function Repassword() {

  const [ steps, setSteps ] = useState<number>(0)
  const [ email, setEmail ] = useState<string>('')
  const [ loading, setLoading ] = useState<boolean>(false)

  const [form] = Form.useForm()
  const router = useRouter()

  const sendVerificationCode = async(data: { email: string }) => {
    const res = await SendCodeValidation(data)
    console.log(res.response)
    if(res.status !== 200){
      setLoading(false)
      return notification.error({
        message: res.response.msg
      })
    }

    setEmail(data.email)
    form.resetFields()
    setLoading(false)
    setSteps(1)
    return notification.success({
      message: res.response.msg
    })
  }

  const validateAccount = async(data: { code: string }) => {
    const request = {
      email,
      code: data.code
    }
    const res = await ValidateAccount(request)
    console.log(res.response)
    if(res.status !== 200){
      setLoading(false)
      return notification.error({
        message: res.response.msg
      })
    }

    form.resetFields()
    setLoading(false)
    setSteps(2)
    return notification.success({
      message: res.response.msg
    })
  }

  const createNewPassword = async(data: { password: string }) => {
    const request = {
      email,
      password: data.password
    }
    const res = await ResetPassword(request)
    if(res.status !== 200){
      setLoading(false)
      return notification.error({
        message: res.response.msg
      })
    }

    form.resetFields()
    setLoading(false)
    setSteps(0)
    router.push('/auth/login')
    return notification.success({
      message: res.response.msg
    })
  }

  const stepper = () => {
    switch (steps) {
      case 0:
        return (
          <>
            <SmallText $textalign='left'>Enviaremos un código <span style={{ color:"#0366d6" }}>a tu Whatsapp</span></SmallText>
            <BigText $textalign='left'>Nueva contraseña</BigText>

            <Form form={form} onFinish={sendVerificationCode} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
                <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
                    <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%' }}>{ loading ? 'Cargando ...' : 'Enviar código' }</Button>
                </Form.Item>
            </Form>

          </>
        )
      case 1:
        return (
          <>
            <SmallText $textalign='left'>Ingresa el código enviado <span style={{ color:"#0366d6" }}>a tu Whatsapp</span></SmallText>
            <BigText $textalign='left'>Nueva contraseña</BigText>

            <Form form={form} onFinish={validateAccount} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
                <Form.Item name="code" rules={[{ required: true }, { min:6, message:'Mínimo 6 dígitos' }, { max:6, message:'Máximo 6 dígitos' }]} style={{ margin:'2em 0' }}>
                    <Input prefix={<LockOutlined />} placeholder='Código' />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%' }}>{ loading ? 'Cargando ...' : 'Válidar código' }</Button>
                </Form.Item>
            </Form>
          </>
        )
      case 2:
        return (
          <>
            <SmallText $textalign='left'>Crea tu nueva <span style={{ color:"#0366d6" }}>contraseña</span></SmallText>
            <BigText $textalign='left'>Nueva contraseña</BigText>

            <Form form={form} onFinish={createNewPassword} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
              <Form.Item 
                  name="password"
                  rules={[
                  {required: true },
                  {min: 6, message:"Minimo 6 caracteres"}
                  ]}
                  style={{ margin:'2em 0' }}
              >
                <Input type='password' prefix={<LockOutlined />} placeholder='Contraseña' />
              </Form.Item>

              <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                      validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                      }
                      return Promise.reject(new Error('¡Las contraseñas deben coincidir!'));
                      },
                  }),
                  ]}
                  style={{ margin:'2em 0' }}
              >
                  <Input type='password' prefix={<LockOutlined />} placeholder='Repetir contraseña' />
              </Form.Item>
                  <Form.Item>
                      <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%' }}>{ loading ? 'Cargando ...' : 'Crear nueva contraseña' }</Button>
                  </Form.Item>
              </Form>
          </>
        )
    
      default:
        break;
    }
  }

  return (
    <>

      <Steps
        size='small'
        current={steps}
        items={[{ title: 'Código' }, { title: 'Verificar' }, { title: 'Contraseña' }]}
        style={{ marginBottom:'20px' }}
      />

      { stepper() }

      <Divider> o </Divider>
      <SmallText fontSize='1em'>
        ¿Ya tienes una cuenta? <Link href="/auth/login"><span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }}>Inicia Sesión</span></Link>
      </SmallText>
    </>
  )
}

