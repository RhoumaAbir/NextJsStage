interface AuthErrorProps {
    error?: string;
  }
  
  export default function AuthError({ error }: AuthErrorProps) {
    return (
      <div>
        <h1>Erreur authentification</h1>
        <p>{error || 'Une erreur est survenue lors de authentification.'}</p>
      </div>
    );
  }
  
