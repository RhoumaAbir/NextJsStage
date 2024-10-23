import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Signin = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error('Login error:', result.error);
      setError(result.error);
    } else {
      window.location.href = '/';
    }

    setLoading(false);
  };

  if (status === 'loading') {
    return (
      <button className="bg-gray-400 text-white px-4 py-2 rounded-md" disabled>
        Chargement...
      </button>
    );
  }

  if (session && session.user) {
    return (
      <div className="text-center">
        <p className="mb-2 text-lg text-gray-700">Connecté en tant que {session.user.email}</p>
        <Link href={{ pathname: '/user/update', query: { emailInPut: session.user.email } }}>
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
    <div className="flex flex-col items-center bg-white shadow-md rounded-md p-6 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Se connecter</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      <div className="rounded-md p-6 ">
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Link href={`/auth/signup`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4">
            SignUp
          </button>
        </Link></div>
    </div>
  );

};

export default Signin;
