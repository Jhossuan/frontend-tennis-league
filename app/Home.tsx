"use client";
import { Button } from "antd";
import React from "react";
import { Container } from "@mui/material";
import styles from '../app/auth/auth.module.css'
import Link from "next/link";
import { DecodedData } from "@/types/auth";

export default function Home({ user }:{ user: DecodedData }){

  return (
    <div
        style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url("https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            minHeight: 'calc(100vh - 4rem)',
            width:'100vw'
        }}
    >
        <Container style={{ padding:'40px', textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', minHeight:'calc(100vh - 6rem)' }}>
            <p className={styles.bigText} style={{ color: '#fff' }}>Liga de tenis Whynot?</p>
            <p className={styles.smallText} style={{ color: '#fff' }}>
                Nos hemos unido junto a integrum, no solo para resaltar en el desarrollo y las finanzas. Sino tambien en el tenis, participa en nuestros torneos de talla mundial.
            </p>
            {
                user
                    ? (
                        <Link href="/tournaments">
                            <Button type="primary" size="large" style={{ margin:'20px 0' }}>VER TORNEOS</Button>
                        </Link>
                    )
                    : (
                        <Link href="/auth/register">
                            <Button type="primary" size="large" style={{ margin:'20px 0' }}>REGISTRARME EN LA LIGA</Button>
                        </Link>
                    )
            }

        </Container>
    </div>
  );
};
