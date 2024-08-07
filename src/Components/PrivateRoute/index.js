import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
