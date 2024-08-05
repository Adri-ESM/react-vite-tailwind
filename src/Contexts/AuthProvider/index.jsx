import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '../../Firebase'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form Data para Sign In and Sign Up
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    isAdult: false
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <AuthContext.Provider value={{ 
      currentUser,
      formData,
      setFormData,
      auth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signInWithPopup,
      googleProvider
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};



// import { createContext, useContext, useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '../../Firebase'; // Asegúrate de que esta ruta sea correcta

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

// //Form Data para Sign In and Sign Up
// const [formData, setFormData] = useState({
//   firstName: '',
//   lastName: '',
//   age: '',
//   address: '',
//   phone: '',
//   email: '',
//   password: '',
//   isAdult: false
// });

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ 
//       currentUser,
//       formData,
//       setFormData,
//       auth,
//       createUserWithEmailAndPassword,
//       signInWithEmailAndPassword,
//       signInWithPopup,
//       googleProvider
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
