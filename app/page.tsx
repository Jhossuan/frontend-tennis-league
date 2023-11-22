import { GetUserData } from "@/api/AuthToken";
import { Inter } from "next/font/google";
import Home from "./Home";
import ResponsiveAppBar from "@/components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export default async function page() {
  const validateUser = await GetUserData();

  return (
    <html lang="es">
      <body
        className={inter.className}
        style={{ margin: 0, padding: 0, boxSizing: "border-box" }}
      >
        <ResponsiveAppBar  validateUser={ validateUser } />
        <Home user={validateUser}/>
      </body>
    </html>
  );
}
