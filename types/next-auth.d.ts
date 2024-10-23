// src/@types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    address?: string | null; // Ajoutez l'adresse ici
    token?: string;
  }

  interface Session {
    user: User;

  }

  interface JWT {
    id: string;
    address?: string | null; // Ajoutez l'adresse ici également
  }
}
