import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from '../../Firebase';
import Layout from '../../Components/Layout';

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl mb-4">Sign In</h1>
        <button
          onClick={handleGoogleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Sign in with Google
        </button>
        <form onSubmit={handleSignUp} className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded p-2 mb-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded p-2 mb-2"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Account
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
