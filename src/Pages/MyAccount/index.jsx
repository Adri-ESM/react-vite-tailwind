import { useState } from "react";
import Layout from "../../Components/Layout";
import Cart from "../../Components/Cart";
import { auth, signOut } from "../../Firebase";

function MyAccount() {
  const [setUser] = useState(null);

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
      <div className="flex">
        <h1 className="">My Account</h1>
        <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-600 transition duration-300"
            >
            Sign Out
        </button>
      </div>
      <Cart />
    </Layout>
  );
}

export default MyAccount;
