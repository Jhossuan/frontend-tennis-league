"use client";
import { Col, Row } from "antd";
import React from "react";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <div
        style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url("https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',  // Puedes ajustar esto según tus necesidades
            backgroundAttachment: 'fixed',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            minHeight: 'calc(100vh - 4rem)',
        }}
    >
        <Container style={{ padding:'40px' }}>
            <Row>
                <Col span={24}>
                    Hola
                </Col>
            </Row>
        </Container>
    </div>
  );
};

export default Home;
