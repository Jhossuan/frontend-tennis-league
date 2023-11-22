"use client"

import { GetCompetitors, UnsuscribeCompetitors } from '@/api/Competitors/actions'
import { Button, Col, Popconfirm, Row, Table, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from '../../../components/components.module.css'
import moment from 'moment'

interface TournamentUserI {
    title: string;
    description: string;
    eventDate: string;
    location: string;
    price: string;
    status: string;
    name: string;
    email: string;
    phone: string;
    uid: string;
    tournament: string
  }

const Competitors = () => {

    const [ loading, setLoading ] = useState<boolean>(false)
    const [ competitors, setCompetitors ] = useState<any>([])

    const getTournaments = async() => {
        setLoading(true)
        const res = await GetCompetitors()
        if(res.status !== 200){
        setLoading(false)
            return notification.info({
                message: res.response.msg ?? res.response
            })
        }
        setLoading(false)
        setCompetitors(res.response)
    }

    const unsuscribeCompetitor = async(data: TournamentUserI) => {
        setLoading(true)
        const request: { uid: string, tid: string } = {
            uid: data.uid,
            tid: data.tournament
        }
        console.log(request)
        const res = await UnsuscribeCompetitors(request)
        if(res.status !== 200){
            setLoading(false)
            return notification.error({
              message: res.response.msg
            })
        }
        getTournaments()
        return notification.success({
            message: res.response.msg ?? "Desuscripcion completa"
        })
    } 

    const columns = [
        {
            title: 'Participante',
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
            title: 'Torneo',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Fecha del torneo',
            dataIndex: 'eventDate',
            key: 'eventDate',
            render: (e: Date) => <>{ moment(e).format('LLL') }</>
        },
        {
            title: 'Acciones',
            key: 'uid',
            render: (e: any) => {
                return (
                    <Row gutter={[10,10]}>
                        <Popconfirm title='Desuscribir participante' onConfirm={() => unsuscribeCompetitor(e)}>
                            <Button type='primary' danger loading={loading}>Desuscribir</Button>
                        </Popconfirm>
                    </Row>
                )
            }
        }
    ]

    useEffect(() => {
        getTournaments()
    }, [])

  return (
    <div className={styles.cardContainer}>
        <Row>
            <Col span={24}>
                <Table columns={columns} loading={loading} dataSource={competitors ?? []}/>
            </Col>
        </Row>
    </div>
  )
}

export default Competitors