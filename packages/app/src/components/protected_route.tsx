import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const { user } = useAuth();

  console.log(user)

  if (!user) return <Navigate to="/login" />; // Si no está logueado, redirige al Login
  if (role && user.role !== role) return <Navigate to="/" />; // Si no tiene el rol requerido, redirige al home

  return <>{children}</>;
};

export default ProtectedRoute;