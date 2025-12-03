import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useMarketplace();

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;



