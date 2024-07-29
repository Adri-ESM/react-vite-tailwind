import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from '../../Firebase';
import Layout from '../../Components/Layout';
import GoogleIcon from '../../assets/icons';

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
        <div className="mb-60">
          <h1 className="text-3xl mt-0">Welcome! Please Sign In or Create an Account</h1>
        </div>
        <div className="text-center mb-60">
          <button 
            onClick={handleGoogleSignIn}
            className="bg-blue-500 text-white px-6 py-6 rounded mb-4 flex items-center justify-between w-60  h-12  border border-gray-300  hover:bg-blue-600  hover:border-blue-600  focus:outline-none  focus:ring-2  focus:ring-blue-600  focus:ring-opacity-50  transition duration-300 ease-in-out"
          >
            <GoogleIcon className="mr-2" />
            Sign in with Google
          </button>
          <form onSubmit={handleSignUp} className="flex flex-col items-center">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border rounded p-2 mb-2 w-60 focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded p-2 mb-2 w-60 focus:outline-none"
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
      </div>
    </Layout>
  );
};

export default SignIn;
