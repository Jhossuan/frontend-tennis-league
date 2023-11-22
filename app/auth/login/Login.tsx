"use client"
import React, { useState } from 'react';
import { Button, Divider, Form, Input, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validateMessages } from '@/utils/ValidationMessages';
import { LoginUser } from '@/api/Auth/actions';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css'; // Importa los estilos CSS Modules
import Link from 'next/link';

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (e: any) => {
    setLoading(true);
    const res = await LoginUser(e);

    if (res.status !== 200) {
      setLoading(false);
      return notification.error({
        message: res.response.msg,
      });
    }

    form.resetFields();
    setLoading(false);
    router.push(res.response.type == 'regular' ? '/' : '/admin');
    router.refresh()
    return notification.success({
      message: res.response.msg,
    });
  };

  return (
    <>
      <p className={styles.smallText} style={{ textAlign: 'left' }}>
        Bienvenido a <span style={{ color: '#0366d6' }}>Tennis League by Whynot?</span>
      </p>
      <p className={styles.bigText}>Iniciar Sesión</p>

      <Form
        form={form}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="email" rules={[{ type: 'email', required: true }]} className={styles.loginForm}>
          <Input prefix={<MailOutlined />} placeholder="Correo Electrónico" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]} className={styles.loginForm}>
          <Input type="password" prefix={<LockOutlined />} placeholder="Contraseña" />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" style={{ width: "100%" }}>
            {loading ? 'Cargando ...' : 'Iniciar Sesión'}
          </Button>
          <p className={styles.smallText} style={{ fontSize: '1em', textAlign: 'left' }}>
            <Link href="/auth/repassword">
              <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }}>Olvidé mi contraseña</span>
            </Link>
          </p>
        </Form.Item>
      </Form>

      <Divider> o </Divider>

      <p className={styles.smallText} style={{ fontSize: '1em' }}>
        ¿Aún no tienes cuenta?{' '}
        <Link href="/auth/register">
          <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }}>Registrate</span>
        </Link>
      </p>
    </>
  );
}
