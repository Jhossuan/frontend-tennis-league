"use client"
import { Col, Row } from 'antd'
import React from 'react'
import styles from '../../components/components.module.css'
import { DashboardProps } from '@/types/app'
import UserOneIcon from '@mui/icons-material/AccessibilityOutlined';
import CupIcon from '@mui/icons-material/EmojiEvents';
import UsersIcon from '@mui/icons-material/Group';
import BarChart from '@/components/BarChart'

const Dashboard = ({ data }: { data: DashboardProps }) => {

  return (
    <Row gutter={[10,10]}>

        <Col xs={24} sm={12} md={5} lg={5} >
            <div className={styles.cardContainer} style={{ borderBottom:'5px solid #8657d2' }}>
            <p style={{ fontWeight:'500', textAlign:'center', margin:'0 0 20px 0' }}>Cantidad de participantes</p>
                <div style={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <UserOneIcon style={{ background:'#8657d2', color:'#fff', padding:'5px', width:'18%', height:'18%', borderRadius:'10px' }} />
                    <p style={{ fontWeight:'500' }}>{data.qtyCompetitors ?? 0}</p>
                </div>
            </div>
        </Col>

        <Col xs={24} sm={12} md={5} lg={5} >
            <div className={styles.cardContainer} style={{ borderBottom:'5px solid #b6ce08' }}>
            <p style={{ fontWeight:'500', textAlign:'center', margin:'0 0 20px 0' }}>Cantidad de usuarios</p>
                <div style={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <UsersIcon style={{ background:'#b6ce08', color:'#fff', padding:'5px', width:'18%', height:'18%', borderRadius:'10px' }} />
                    <p style={{ fontWeight:'500' }}>{data.qtyUsers ?? 0}</p>
                </div>
            </div>
        </Col>

        <Col xs={24} sm={12} md={5} lg={5} >
            <div className={styles.cardContainer} style={{ borderBottom:'5px solid #d04511' }}>
            <p style={{ fontWeight:'500', textAlign:'center', margin:'0 0 20px 0' }}>Cantidad de torneos</p>
                <div style={{ display: 'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <CupIcon style={{ background:'#d04511', color:'#fff', padding:'5px', width:'18%', height:'18%', borderRadius:'10px' }} />
                    <p style={{ fontWeight:'500' }}>{data.qtyTournaments ?? 0}</p>
                </div>
            </div>
        </Col>

        <Col xs={24} sm={24} md={18} lg={18}>
            <div className={styles.cardContainer}>
                <BarChart data={data.statusTournaments ?? []} isLoading={false} />
            </div>
        </Col>

    </Row>
  )
}

export default Dashboard