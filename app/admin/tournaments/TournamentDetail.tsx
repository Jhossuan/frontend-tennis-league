"use client"

import TournamentI from '@/types/tournament'
import { Col, Row } from 'antd'
import React from 'react'
import styles from '../../auth/auth.module.css'
import moment from 'moment'
import Image from 'next/image'

const TournamentDetail = ({data}:{data: TournamentI | undefined}) => {

  return (
    <Row gutter={[10, 10]} style={{ padding: '30px' }}>
      <Col span={24}>
        <div className={styles.mediumText} style={{ textAlign:'center' }}>🏆 {data?.title ?? ''}</div>
      </Col>
      <Col span={24}>
        <div className={styles.smallText} style={{ textAlign:'center' }}>
          {data?.description ?? ''}
        </div>
      </Col>
      <Col span={24}>
        {data?.imageUrl ? (
          <Image
            src={data?.imageUrl ?? ''}
            alt={data?.title ?? 'Image'}
            width={2250}
            unoptimized
            height={1390}
            style={{ width: '100%', height: 'auto' }}
          />
        ) : (
          <div style={{ width:'100%', height:'40em', background:'#b0b0b0', display:'flex', justifyContent:'center', alignItems:'center' }}>
            Banner publicitario aquí
          </div>
        )}
      </Col>
      <Col span={24}>
        <div className={styles.mediumText} style={{ textAlign:'center' }}>📍 {data?.location ?? ''}</div>
      </Col>
      <Col span={24}>
        <div className={styles.smallText} style={{ textAlign:'center' }}>🏆 {data?.reward}</div>
      </Col>
      <Col span={12}>
        <div className={styles.smallText} style={{ textAlign:'center' }}>
          💲 {Number(data?.price) > 0 ? `${data?.price} USD` : 'Torneo Gratuito'}
        </div>
      </Col>
      <Col span={12}>
        <div className={styles.smallText} style={{ textAlign:'center' }}>
          📅 {moment(data?.eventDate).format('LLL')}
        </div>
      </Col>
    </Row>
  )
}

export default TournamentDetail