"use client"

import React from "react";
import styles from "./auth.module.css";
import { Col, Row } from "antd";

export default function AuthInit({ children }: { children: React.ReactNode }) {
  return (
      <Row className={styles.row}>
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
