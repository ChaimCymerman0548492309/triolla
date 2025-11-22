import Cookies from 'js-cookie';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  console.log("🚀 ~ PrivateRoute ~ Cookies.get('token'):", Cookies.get('token'));
  return Cookies.get('token') || localStorage.getItem('token') ? children : <Navigate to="/login" />;
}
