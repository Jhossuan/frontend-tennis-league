import React from "react";
import AuthInit from "./auth";
import { Inter } from "next/font/google";
import { GetUserData } from "@/api/AuthToken";
import ResponsiveAppBar from "@/components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export default async function layout({ children }: { children: React.ReactNode }) {

  const validateUser = await GetUserData()
  
  return (
    <html lang="es">
        <body className={inter.className} style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
          <ResponsiveAppBar  validateUser={ validateUser } />
            <AuthInit>{ children }</AuthInit>
        </body>
    </html>
  );
}
