"use client"

import TournamentI from '@/types/tournament'
import { Col, Row } from 'antd'
import React from 'react'
import styles from '../../auth/auth.module.css'
import moment from 'moment'

const TournamentDetail = ({data}:{data: TournamentI | undefined}) => {

  return (
    <Row gutter={[10, 10]} style={{ padding: '30px' }}>
      <Col span={24}>
        <div className={styles.mediumText}>🏆 {data?.title ?? ''}</div>
      </Col>
      <Col span={24}>
        <div className={styles.smallText} style={{ lineHeight: '25px' }}>
          {data?.description ?? ''}
        </div>
      </Col>
      <Col span={24} className={styles.centeredImage}>
        {data?.imageUrl ? (
          <img src={data?.imageUrl ?? ''} alt={data?.title ?? 'Image'} style={{ width: '70%', height: 'auto' }} />
        ) : (
          <div className={styles.bannerPlaceholder}>
            Banner publicitario aquí
          </div>
        )}
      </Col>
      <Col span={24}>
        <div className={styles.mediumText}>📍 {data?.location ?? ''}</div>
      </Col>
      <Col span={24}>
        <div className={styles.smallText}>🏆 {data?.reward}</div>
      </Col>
      <Col span={12}>
        <div className={styles.smallText}>
          💲 {Number(data?.price) > 0 ? `${data?.price} USD` : 'Torneo Gratuito'}
        </div>
      </Col>
      <Col span={12}>
        <div className={styles.smallText}>
          📅 {moment(data?.eventDate).format('LLL')}
        </div>
      </Col>
    </Row>
  )
}

export default TournamentDetail