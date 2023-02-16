import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from '../../contexts/AuthContext';

function RequireAuth({ children }) {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth.user) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
