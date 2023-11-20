"use client"

import { BigText, MediumText, SmallText } from '@/app/auth/styles'
import TournamentI from '@/types/tournament'
import { Col, Row } from 'antd'
import React from 'react'
import moment from 'moment'

const TournamentDetail = ({data}:{data: TournamentI | undefined}) => {

  return (
    <Row gutter={[10, 10]} style={{ padding:'30px' }}>
        <Col span={24}>
            <MediumText fontSize='30px' fontWeight='700'>{data?.title ?? ''}</ MediumText>
        </Col>
        <Col span={24}>
            <SmallText lineHeight='25px'>{data?.description ?? ''}</SmallText>
        </Col>
        <Col span={24} style={{ display: 'flex', justifyContent:'center', alignItems:'center' }}>
            {
                data?.imageUrl
                    ? <img src={data?.imageUrl ?? ''} alt={data?.title ?? 'Image'}  style={{ width:'70%', height: 'auto' }} />
                    : (
                        <div style={{ width: '70%', height:'40em', background: '#c3c3c3', textAlign:'center', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                            Banner publicitario aqui
                        </div>
                    )
            }
        </Col>
        <Col span={24}>
            <MediumText>📍 {data?.location ?? ''}</ MediumText>
        </Col>
        <Col span={24}>
            <SmallText>🏆 {data?.reward}</ SmallText>
        </Col>
        <Col span={12}>
            <SmallText>💲 {Number(data?.price) > 0 ? `${data?.price} USD` : 'Torneo Gratuito'}</ SmallText>
        </Col>
        <Col span={12}>
            <SmallText>📅 {moment(data?.eventDate).format('LLL')}</ SmallText>
        </Col>
    </Row>
  )
}

export default TournamentDetail