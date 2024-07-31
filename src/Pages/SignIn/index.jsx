import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '../../Firebase';
import Layout from '../../Components/Layout';
import GoogleIcon from '../../assets/icons';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {user ? (
          <div className="flex flex-col items-center">
            <img src={user.photoURL} alt="User Avatar" className="w-20 h-20 rounded-full mb-4" />
            <p className="mb-4">Welcome, {user.displayName}!</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl mt-0">Welcome! Please Sign In or Create an Account</h1>
            </div>
            <div className="text-center mb-2">
              <button
                onClick={handleGoogleSignIn}
                className="bg-blue-500 text-white px-6 py-2 rounded mb-4 flex items-center justify-center w-60"
              >
                <GoogleIcon className="mr-2" />
                Sign in with Google
              </button>
            </div>
            <form onSubmit={handleSignIn} className="flex flex-col items-center mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border rounded p-2 mb-2 w-60 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border rounded p-2 mb-2 w-60 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-18 h-10 text-center mb-4 justify-between bg-green-500 text-white px-4 py-2 rounded"
              >
                Sign In
              </button>
            </form>
            <div className="flex">
              <button
                onClick={() => navigate('/sign-up')}
                className="w-18 h-10 ml-3 text-justify mb-4 justify-between bg-green-500 text-white px-4 py-2 rounded"
              >
                Create Account
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default SignIn;
