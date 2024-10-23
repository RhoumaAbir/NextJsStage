import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ConfirmEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const confirmEmail = async () => {
      if (typeof token === 'string') {
        try {
          const response = await axios.post('/api/auth/confirm-email', { token });
          setMessage(response.data.message);
          setIsSuccess(true);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error('Error details:', error.response?.data);
          }
          setMessage('Échec de la confirmation de l\'email. Veuillez réessayer.');
          setIsSuccess(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [token, router]); // Include router in the dependency array

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Confirmation de email</h1>
      <div className={`flex flex-col items-center bg-white shadow-md rounded-md p-6 w-full max-w-sm transition-all duration-300 ${isSuccess ? 'border-green-500' : 'border-red-500'}`}>
        <p className={`text-lg text-center ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
          {loading ? 'Chargement...' : message}
        </p>
      </div>
    </div>
  );
};

export default ConfirmEmail;
