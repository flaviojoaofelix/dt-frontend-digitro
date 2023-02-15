import { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../contexts/AuthContext';

function Header({ logout }) {
  const auth = useContext(AuthContext);

  return(
    <header>
      <h1>Call Control</h1>
      <span>{auth.user.username}</span>
      <input type="button" name="disconnect" value="Desconectar" onClick={logout} />
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Header;
