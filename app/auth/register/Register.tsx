"use client";

import { Button, Divider, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { BigText, SmallText } from "../styles";
import Link from "next/link";
import { validateMessages } from "@/utils/ValidationMessages";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { RegisterUser } from "@/api/Auth/actions";
import { useRouter } from "next/navigation";

export default function Register() {

  const [ loading, setLoading ] = useState<boolean>(false)
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish = async(e: any) => {
    const request = {
      name: e.name,
      email: e.email,
      password: e.password,
      phone: `+57${e.phone}`,
      userType: "regular"
    }
    setLoading(true)
    const res = await RegisterUser(request)
    if(res.status !== 200){
      setLoading(false)
      return notification.error({
        message: res.response.msg
      })
    }

    form.resetFields()
    setLoading(false)
    router.push('/auth/login')
    return notification.success({
      message: res.response.msg
    })
  }

  return (
    <>
      <SmallText $textalign='left'>Bienvenido a <span style={{ color:"#0366d6" }}>Tennis League by Whynot?</span></SmallText>
      <BigText $textalign='left'>Registrarse</BigText>
      <Form
        form={form}
        onFinish={onFinish}
        style={{ margin: "4em 0 0 auto" }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          rules={[{ required: true }]}
          style={{ margin: "2em 0" }}
        >
          <Input prefix={<UserOutlined />} placeholder="Nombre" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ type: "email", required: true }]}
          style={{ margin: "2em 0" }}
        >
          <Input prefix={<MailOutlined />} placeholder="Correo Electrónico" />
        </Form.Item>

        <Form.Item name="phone" rules={[{ required: true }, {min: 5, message:"Mínimo 5 dígitos"}, {max: 10, message:"Máximo 10 dígitos"}]} style={{ margin:'2em 0' }}>
          <Input type='number' prefix={"+57"} placeholder='Celular / Télefono' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true },
            { min: 6, message: "Minimo 6 caracteres" },
          ]}
          style={{ margin: "2em 0" }}
        >
          <Input
            type="password"
            prefix={<LockOutlined />}
            placeholder="Contraseña"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("¡Las contraseñas deben coincidir!")
                );
              },
            }),
          ]}
          style={{ margin: "2em 0" }}
        >
          <Input
            type="password"
            prefix={<LockOutlined />}
            placeholder="Repetir contraseña"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            {loading ? "Cargando ..." : "Crear Usuario"}
          </Button>
        </Form.Item>
      </Form>
      <Divider> o </Divider>
      <SmallText fontSize="1em">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/auth/login">
          <span
            style={{
              color: "#0366d6",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Inicia Sesión
          </span>
        </Link>
      </SmallText>
    </>
  );
}
