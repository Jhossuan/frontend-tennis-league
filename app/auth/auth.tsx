"use client"

import React from "react";
import { InputCard, Row } from "./styles";
import { Col } from "antd";

export default function AuthInit({ children }: { children: React.ReactNode }) {
  return (
    <Row gutter={[10, 10]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputCard>{children}</InputCard>
      </Col>
    </Row>
  );
}
