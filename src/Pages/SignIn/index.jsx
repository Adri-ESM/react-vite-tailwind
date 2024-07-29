import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from '../../Firebase';
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  const redirectToSignUp = () => {
    navigate('/sign-up');
  };

  // const handleClear = () => {
  //   setFormData({
  //     email: '',
  //     password: '',
  //     isAdult: false
  //   });
  // };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
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
            className="w-18 h-10 text-center mb-4 justify-between bg-green-500 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
        </form>
        <div className="flex">
          <button
            onClick={redirectToSignUp}
            className="w-18 h-10 ml-3 text-justify mb-4 justify-between bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Account
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;

