import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inicio",
  description: "Pagina de inicio",
};

function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="es">
      <body className={inter.className} style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
          { children }
      </body>
    </html>
  );
}

export default RootLayout;
