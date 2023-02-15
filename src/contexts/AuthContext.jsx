import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = ({ username, maxCalls }, callback) => {
    setUser({ username, maxCalls: Number(maxCalls) });
    callback();
  };

  const signOut = (callback) => {
    setUser(null);
    callback();
  };

  const contextValue = useMemo(() => ({
    user, signIn, signOut
  }), [user])

  return(
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
