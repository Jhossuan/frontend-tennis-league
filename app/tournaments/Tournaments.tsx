"use client"
import React, { useEffect, useState } from 'react'
import { Container } from "@mui/material";
import { Col, Row, notification } from 'antd';
import styles from '../auth/auth.module.css'
import { GetTournaments } from '@/api/Tournaments/action';
import TournamentI from '@/types/tournament';
import TournamentsCard from '@/components/Cards';
import { DecodedData } from '@/types/auth';

const Tournaments = ({ user }:{user: DecodedData}) => {

  const [ tournaments, setTournaments ] = useState<TournamentI[] | []>([])
  const [ loading, setLoading ] = useState<boolean>(false)


  const getTournaments = async() => {
    setLoading(true)
    const res = await GetTournaments()
    if(res.status !== 200){
    setLoading(false)
        return notification.info({
            message: res.response.msg ?? res.response
        })
    }
    setLoading(false)
    setTournaments(res.response)
}

  useEffect(() => {
    getTournaments()
  }, [])

  return (
    <div style={{
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url("https://images.unsplash.com/photo-1448743133657-f67644da3008?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
      minHeight: 'calc(100vh - 4rem)',
      width:'100vw'
    }}>

    <Container style={{ padding:'40px' }}>
        <p className={styles.bigText} style={{ color:'#fff' }}>Torneos en esta fecha</p>
        <p className={styles.smallText} style={{ margin: 0, color:'#fff' }}>
          Recuerda que para poder inscribirte en nuestros torneos debes estar registrado en nuestra plataforma.
        </p>
        <Row gutter={[10,10]} style={{ margin:'30px 0', padding:'20px' }}>
          {
            loading ? 'Cargando torneos ...' : tournaments.length > 0
            ? tournaments.map(tournament => {
              return (
                <Col key={tournament.title} xs={24} sm={12} md={8} lg={8}>
                    <TournamentsCard data={tournament} user={user}/>
                  </Col>
                )
              })
              : <p className={styles.smallText} style={{ margin: 0, color:'#fff' }}>No hay torneos disponibles ...</p>
            }
        </Row>
    </Container>
    </div>
  )
}

export default Tournaments