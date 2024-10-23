"use client";

import { useSession } from "next-auth/react";
import AuthButton from '../components/AuthButton';
import Signin from '@/components/SigninForm';

export default function Home() {
  const { data: session, status } = useSession();
  console.log('Session data:', session);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">
        Bienvenue sur notre application authentification
      </h1>
      {!session && <div>
        <Signin />
      </div>}
      <div className="mb-4">
        <AuthButton />
      </div>
    </div>
  );
}
