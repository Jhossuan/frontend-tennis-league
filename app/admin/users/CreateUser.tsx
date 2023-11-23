"use client";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import React from "react";

const CreateUser = ({
  loading,
  edit,
  btnTitle,
}: {
  loading: boolean;
  edit?: boolean;
  btnTitle: string;
}) => {
  return (
    <>
      <Form.Item
        name="name"
        rules={[{ required: true }]}
        label="Nombre de usuario"
      >
        <Input prefix={<UserOutlined />} placeholder="Nombre Ejemplo" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ type: "email", required: true }]}
        label="Correo Electrónico"
      >
        <Input prefix={<MailOutlined />} placeholder="ejemplo@ejemplo.com" />
      </Form.Item>

      <Form.Item
        label="Celular"
        name="phone"
        rules={[
          { required: true },
        ]}
      >
        <Input type="number" prefix={"+"} placeholder="1 787 5XX XXXX" />
      </Form.Item>

      <Form.Item
        label="Tipo de usuario"
        name="userType"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Administrador o Participante"
          options={[
            { label: "Administrador", value: "admin" },
            { label: "Participante", value: "regular" },
          ]}
        />
      </Form.Item>

      {!edit && (
        <>
          <Form.Item
            name="password"
            rules={[
              { required: true },
              { min: 6, message: "Minimo 6 caracteres" },
            ]}
            label="Contraseña"
          >
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="*************"
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
            label="Repetir contraseña"
          >
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="*************"
            />
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          {loading ? "Cargando ..." : btnTitle}
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateUser;
