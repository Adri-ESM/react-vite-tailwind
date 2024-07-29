import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthProvider';
import Layout from '../../Components/Layout';

const SignUp = () => {
  const navigate = useNavigate();
  const { formData, setFormData, createUserWithEmailAndPassword, auth } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password, age, isAdult } = formData;

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      alert('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }

    if (age < 18 || !isAdult) {
      alert('You must be at least 18 years old and confirm that you are an adult to sign up.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        isAdult: false
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      isAdult: false
    });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="mb-8">
          <h1 className="text-3xl mt-0">Create Account</h1>
        </div>
        <form onSubmit={handleSignUp} className="flex flex-col items-center">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="border rounded p-2 mb-2 w-60 focus:outline-none"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="border rounded p-2 mb-2 w-60 focus:outline-none"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="border rounded p-2 mb-2 w-60 focus:outline-none"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border rounded p-2 mb-2 w-60 focus:outline-none"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border rounded p-2 mb-2 w-60 focus:outline-none"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded p-2 mb-2 w-60 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded p-2 mb-2 w-60 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isAdult"
              checked={formData.isAdult}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-sm">I confirm that I am at least 18 years old</label>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear Data
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;

