import { Inter } from "next/font/google";
import PlatformLayout from "./PlatformLayout";

const inter = Inter({ subsets: ["latin"] });

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={inter.className} style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
                <PlatformLayout>
                { children }
                </PlatformLayout>
            </body>
        </html>
      );
}