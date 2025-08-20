import { selectCurrentUser } from '@auth/authSlice';
import { useAppSelector } from '@app/hooks';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const user = useAppSelector(selectCurrentUser);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
