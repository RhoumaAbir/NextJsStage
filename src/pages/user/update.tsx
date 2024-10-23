"use client";

import React from 'react';
import UpdateUser from '../../components/UpdateUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
const UpdateUserPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p className="text-center text-gray-500">Chargement des informations utilisateur...</p>;
  }

  if (!session?.user?.id) {
    router.push('/');
    return <p>Redirection vers la page de connexion...</p>;
  }
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Mettre à jour les informations utilisateur</h1>
      <UpdateUser />
    </div>
  );
};

export default UpdateUserPage;
