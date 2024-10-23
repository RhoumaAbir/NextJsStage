"use client";

import React, { useState, useEffect } from 'react';
import { validateAddress } from '@/utils/validateAddress';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UpdateUser: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { emailInPut } = router.query;
  console.log(emailInPut)
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    firstName: '',
    birthDate: '',
    phoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const updateUser = async (userEmail: string, userData: typeof formData) => {
    try {
      const response = await fetch(`/api/user/${encodeURIComponent(userEmail)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in updateUser function:', error);
      throw error;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    const validationResponse = await validateAddress(formData.address);
    if (validationResponse?.error) {
      setErrorMessage(validationResponse.error);
      return;
    }

    try {
      const userEmail = session?.user?.email;
      if (!userEmail) {
        setErrorMessage('L\'email est invalide.');
        return;
      }

      console.log("Email utilisateur récupéré :", userEmail);

      await updateUser(userEmail, formData);
      setSuccessMessage('Informations mises à jour avec succès !');
      router.push(`/`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Échec de la mise à jour de l\'utilisateur');
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      if (emailInPut) {
        try {
          const response = await axios.get(`/api/user/${emailInPut}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      }
    };

    fetchUserData();
  }, [emailInPut]);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-6 text-center">Modifier les informations de utilisateur</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">Prénom</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">Date de Naissance</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Adresse</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Numéro de Téléphone</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Mettre à jour
        </button>
      </div>

      {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}
    </form>
  );
};

export default UpdateUser;
