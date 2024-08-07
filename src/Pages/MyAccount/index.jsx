import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import Cart from "../../Components/Cart";
import { auth, signOut } from "../../Firebase";
import Back from "../../Components/Back";

function MyAccount() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };


  return (
    <Layout>
      <Back />
      <div className="flex mt-20">
        <div className="flex items-center justify-between w-full py-3 px-5">
          <h1 className="text-xl font-semibold items-center">
            Welcome, {user ? (user.displayName || user.email) : "Guest"}!
          </h1>
        </div>
        <div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-8 items-end rounded-full hover:bg-red-600 transition duration-300"
            >
          Sign Out
          </button>
        </div>
      </div>
      <Cart />
    </Layout>
  );
}

export default MyAccount;
