"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Button as ButtonAnt } from "antd";
import MenuItem from "@mui/material/MenuItem";
import TennisIcon from "@mui/icons-material/SportsTennisOutlined";
import Link from "next/link";
import { DecodedData } from "@/types/auth";
import closeSession from "@/app/admin/actions/closeSession";
import { useEffect } from 'react'

const pagesAuth = ["INICIO", "TORNEOS", "MIS SUSCRIPCIONES"];
const pages = ["INICIO", "TORNEOS"];

function ResponsiveAppBar({
  validateUser,
}: {
  validateUser: undefined | DecodedData;
}) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const switchRoutes = (page: string) => {
    switch (page) {
      case "INICIO":
        return "/";
      case "TORNEOS":
        return "/tournaments";
      case "MIS SUSCRIPCIONES":
        return "/tournaments/inscriptions";
      default:
        return page;
    }
  };

    const logout = () => {
        closeSession()
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

  return (
    <AppBar position="static" style={{ background: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TennisIcon
            style={{ color: "#008bcd" }}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#008bcd",
              textDecoration: "none",
            }}
          >
            Whynot?
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {[pages, pagesAuth][validateUser ? 1 : 0].map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                        href={`${switchRoutes(page)}`}
                        style={{
                            textDecoration: "none",
                            color: "#000",
                            fontWeight: "600",
                        }}
                        >
                        
                            <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
              ))}
            </Menu>
          </Box>
          <TennisIcon
            style={{ color: "#008bcd" }}
            sx={{ display: { xs: "none", md: "none", sm: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "none", sm: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#008bcd",
              textDecoration: "none",
            }}
          >
            Whynot?
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {[pages, pagesAuth][validateUser ? 1 : 0].map((page) => (
              <Link
                href={`${switchRoutes(page)}`}
                key={page}
                style={{
                  textDecoration: "none",
                  color: "#565656",
                  fontWeight: "400",
                }}
              >
                <p
                  key={page}
                  onClick={handleCloseNavMenu}
                  style={{ color: "#000", margin: "0 10px" }}
                >
                  {page}
                </p>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!validateUser ? (
              <>
                <Link
                  href="/auth/login"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <p style={{ color: "#000", margin: "0 10px" }}>
                    Iniciar Sesión
                  </p>
                </Link>
                <Link href="/auth/register" style={{ textDecoration: "none" }}>
                  <ButtonAnt size="large" type="primary">Registrarse</ButtonAnt>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/register" style={{ textDecoration: "none" }}>
                  <ButtonAnt size="large" type="primary" danger onClick={logout}>Cerrar Sesión</ButtonAnt>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
