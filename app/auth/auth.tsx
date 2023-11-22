"use client"

import React from "react";
import styles from "./auth.module.css";
import { Col, Row } from "antd";

export default function AuthInit({ children }: { children: React.ReactNode }) {
  return (
      <Row className={styles.row}
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url("https://images.unsplash.com/photo-1560012057-4372e14c5085?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          minHeight: 'calc(100vh - 4rem)',
          width:'100vw'
        }}
      >
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xl={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.inputCard}>
          {children}
        </div>
      </Col>
      </Row>
  );
}
