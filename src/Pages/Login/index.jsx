import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../Firebase';

const Login = () => {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn}>Iniciar sesión con Google</button>
    </div>
  );
};

export default Login;
