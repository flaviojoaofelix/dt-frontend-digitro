import { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../contexts/AuthContext';

import './Header.css';

function Header({ signOut }) {
  const auth = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid">
        <span className="navbar-brand fs-4">
          <i className="bi bi-phone-vibrate"></i> Call Control
        </span>
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
              <button className="clear-button-style nav-link">Desconectar</button>
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
  signOut: PropTypes.func.isRequired,
};

export default Header;
