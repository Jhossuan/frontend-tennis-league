import React from "react";
import AuthInit from "./auth";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
        <body>
            <AuthInit>{ children }</AuthInit>
        </body>
    </html>
  );
}
