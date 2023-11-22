import { GetUserData } from "@/api/AuthToken";
import ResponsiveAppBar from "@/components/AppBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Torneos",
  description: "Pagina de los torneo",
};

async function layout({ children }: { children: React.ReactNode }) {

    const validateUser = await GetUserData()

  return (
    <html lang="es">
      <body className={inter.className} style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        <ResponsiveAppBar  validateUser={ validateUser } />
          { children }
      </body>
    </html>
  );
}

export default layout;