import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Tela de carregamento
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
