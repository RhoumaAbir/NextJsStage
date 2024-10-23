"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import { validateAddress } from '@/utils/validateAddress'; 

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [addressMessage, setAddressMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkAddress = async () => {
      if (session?.user?.address) {
        const validationResponse = await validateAddress(session.user.address);
        if (validationResponse?.error) {
          setAddressMessage(validationResponse.error);
        } else {
          setAddressMessage(validationResponse?.message || null);
        }
      }
    };

    checkAddress();
  }, [session]);

  if (status === "loading") {
    return <button className="bg-gray-400 text-white px-4 py-2 rounded-md" disabled>Chargement...</button>;
  }

  if (session && session.user) {
    return (
      <div className="text-center">
        <p className="mb-2 text-lg text-gray-700">Connecté en tant que {session.user.email}</p>
        <p className="mb-2 text-lg text-gray-700">nom: {session.user.name}</p>

        {addressMessage && (
          <p className={`mb-2 text-lg ${addressMessage.includes('valide') ? 'text-green-500' : 'text-red-500'}`}>
            {addressMessage}
          </p>
        )}

        <Link href={`/user/update?emailInPut=${session.user.email}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4">
            Mettre à jour mes informations
          </button>
        </Link>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={() => signOut()}
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={() => signIn("google")}
      >
        Se connecter avec Google
      </button>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        onClick={() => signIn("facebook")}
      >
        Se connecter avec Facebook
      </button>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
        onClick={() => signIn("github")}
      >
        Se connecter avec GitHub
      </button>
    </div>
  );
}
