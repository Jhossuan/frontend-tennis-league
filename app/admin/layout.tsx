import PlatformLayout from "./PlatformLayout";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>
                <PlatformLayout>
                { children }
                </PlatformLayout>
            </body>
        </html>
      );
}