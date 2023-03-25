import { Navigate, useLocation } from 'react-router-dom';
import LoadingScreen from '../components/loadingScreen';
import useAuth from '../hooks/useAuth';

function AuthRequire({ children }) {
   const { authorize, checkLogin, initialized } = useAuth();
   const location = useLocation();
   if (!initialized) {
      return <LoadingScreen />;
   }
   if (!authorize) {
      return <Navigate to='/login' state={{ from: location }} replace />;
   }
   return children;
}

export default AuthRequire;
