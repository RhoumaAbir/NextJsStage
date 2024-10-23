
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import '@/styles/globals.css'
interface LayoutProps {
  children: ReactNode; 
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
