"use client"

import { Button, Col, Form, Modal, Popconfirm, Row, Table, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import CreateUser from './CreateUser'
import { validateMessages } from '@/utils/ValidationMessages'
import { RegisterUser } from '@/api/Auth/actions'
import { DeleteUser, GetAllUsers, UpdateUserData } from '@/api/Users/actions'
import { UserSchemaI } from '@/types/users'
import moment from 'moment'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import CustomBadge from '@/components/Badges'
import styles from '../../../components/components.module.css'

export const InitOpenModal: OpenModalT = {
    open: false,
    title: '',
    type: 'create',
    metadata: undefined
}

export type OpenModalT = {
    open: boolean,
    title: string,
    type: 'edit' | 'create' | 'view',
    metadata?: UserSchemaI | undefined
}

const Users = () => {

  const [ openModal, setOpenModal ] = useState<OpenModalT>(InitOpenModal)
  const [ users, setUsers ] = useState<UserSchemaI[] | []>([])
  const [ loading, setLoading ] = useState<boolean>(false)
  const [form] = Form.useForm()

  const onFinish = async(e: any) => {
    setLoading(true)
    const request = {
        name: e.name,
        email: e.email,
        password: e.password,
        phone: `+${e.phone}`,
        userType: e.userType
      }
      const res = await RegisterUser(request)
      console.log(res)
      if(res.status !== 200){
        setLoading(false)
        return notification.error({
          message: res.response.msg
        })
      }
  
      form.resetFields()
      getAllUsers()
      setLoading(false)
      setOpenModal(InitOpenModal)
      return notification.success({
        message: res.response.msg
      })
  }

  const onFinishEdit = async(e: any) => {
    setLoading(true)
    const { name, email, phone, userType } = e
    const request: { uid: string, newData: object } = {
        uid: openModal.metadata?.uid ?? '',
        newData: {
            name,
            email,
            phone: `+${e.phone}`,
            userType
        }
    }
    const res = await UpdateUserData(request)
    console.log(res)
    if(res.status !== 200){
        setLoading(false)
        return notification.error({
          message: res.response.msg
        })
      }
  
    form.resetFields()
    setOpenModal(InitOpenModal)
    getAllUsers()
    setLoading(false)
    return notification.success({
      message: res.response.msg
    })
  }

  const onCreateUser = () => {
    form.resetFields()
    setOpenModal({ open: true, type: 'create', title:'Crear usuario' })
  }

  const getAllUsers = async() => {
    setLoading(true)
    const res = await GetAllUsers()
    if(res.status !== 200){
    setLoading(false)
        return notification.info({
            message: res.response.msg ?? res.response
        })
    }
    setLoading(false)
    setUsers(res.response)
  }

  const deleteUser = async(uid: string) => {
    setLoading(true)
    const res = await DeleteUser(uid)
    if(res.status !== 200){
        setLoading(false)
        return notification.error({
          message: res.response.msg
        })
    }
    form.resetFields()
    setLoading(false)
    setOpenModal(InitOpenModal)
    getAllUsers()
    return notification.success({
        message: "Usuario eliminado"
    })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Telefono',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Fecha de registro',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (e: Date) => <>{ moment(e).format('LLL') }</>
    },
    {
        title: 'Tipo',
        dataIndex: 'metadata',
        key: 'metadata',
        render: (e: any) => {
            return (
                <>
                    { CustomBadge(e.userType) }
                </>
            )
        }
    },
    {
        title: 'Acciones',
        key: 'uid',
        render: (e: any) => {
            return (
                <Row gutter={[10,10]}>
                    <EditOutlined onClick={() => setOpenModal({ open: true, title: 'Editar usuario', type: 'edit', metadata: e })} style={{ fontSize:'20px', margin: '0 5px', color: '#0086c5', cursor: 'pointer' }} />

                    <Popconfirm title='Eliminar usuario' onConfirm={() => deleteUser(e.uid)}>
                        <DeleteOutlined  style={{ fontSize:'20px', margin: '0 5px', color: 'red', cursor: 'pointer' }} />
                    </Popconfirm>
                </Row>
            )
        }
    }
  ]

  const ObtainComponentUser = () => {
    switch (openModal.type) {
        case 'create':
            return (
                <Form layout='vertical' form={form} onFinish={onFinish} validateMessages={validateMessages}>
                    <CreateUser loading={loading} btnTitle='Crear usuario' />
                </Form>
            )
        case 'edit':
            return (
                <Form layout='vertical' form={form} onFinish={onFinishEdit} validateMessages={validateMessages}>
                    <CreateUser loading={loading} btnTitle='Editar usuario' edit={true} />
                </Form>
            )
    
        default:
            break;
    }
  }

  useEffect(() => {
    if(openModal.metadata){
        const { name, email, phone, metadata } = openModal.metadata
        const newPhone = Number(phone?.split('+')[1])
        console.log(newPhone)
        form.setFieldsValue({
            name,
            email,
            phone: newPhone,
            userType: metadata?.userType
        })
    }
  }, [openModal])//eslint-disable-line

  return (
    <>
      <div className={styles.cardContainer}>
        <Row>
          <Col span={24}>
            <Button type='primary' onClick={() => onCreateUser()}>Crear Usuario</Button>
          </Col>
          <Col span={24}>
            <Table columns={columns} dataSource={users ?? []} loading={loading} />
          </Col>
        </Row>
      </div>
      <Modal title={openModal?.title} open={openModal?.open} footer={false} onCancel={() => setOpenModal({ ...openModal, open: false })} style={{ minWidth: '40vw' }}>
        { ObtainComponentUser() }
      </Modal>
    </>
  )
}

export default Users
