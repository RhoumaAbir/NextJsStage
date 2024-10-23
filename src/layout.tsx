import { SessionProvider } from "next-auth/react";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) { // Définissez le type pour children
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
