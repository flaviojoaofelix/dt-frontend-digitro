import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthContext } from '../../contexts/AuthContext';

import './Header.css';

function Header({ isConnected, connect, disconnect, signOut }) {
  const auth = useContext(AuthContext);

  const handleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src="https://flaviojoaofelix.dev/dt-frontend-digitro/logo-digitro.png"
            alt="Logo Dígitro Tecnologia"
            className="d-inline-block align-text-top logo-size"
          />{' '}
          Call Control
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`btn btn-outline-${isConnected ? 'danger' : 'primary'} btn-sm`}
                onClick={handleConnection}
              >
                {isConnected ? 'Desconectar' : 'Conectar'}
              </button>
            </li>
          </ul>
          <i className="bi bi-person-circle"></i>
          <span className="navbar-text mx-1">{auth.user.username}</span>
          <button type="submit" className="btn btn-outline-primary btn-sm ms-1" onClick={signOut}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Header;
