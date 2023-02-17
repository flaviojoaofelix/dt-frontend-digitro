import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ username: '', maxCalls: '1' });

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (event) => {
    event.preventDefault();

    auth.signIn(formData, () => {
      navigate(from, { replace: true });
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <img
                src="https://flaviojoaofelix.dev/dt-frontend-digitro/assets/images/logo-digitro.png"
                className="card-img-top mx-auto d-block responsive-image"
                alt="Logotipo Dígitro Tecnologia"
              />
              <h4 className="card-title text-center mb-3 fw-light fs-5">Call Control</h4>
              <hr className="my-4"></hr>
              <h5 className="card-title text-center mb-4 fw-light fs-2">Sign In</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Digite seu nome"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Nome de Usuário</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="maxCalls"
                    name="maxCalls"
                    min={1}
                    max={10}
                    value={formData.maxCalls}
                    onChange={handleChange}
                  />
                  <label htmlFor="maxCalls">Limite Máximo de Chamadas</label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-login text-uppercase fw-bold">
                    Conectar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
