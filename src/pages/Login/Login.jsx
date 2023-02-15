import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

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
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({...prevState, [name]: value }))
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
          <label htmlFor="maxcalls">Máximo de chamadas:</label>
          <input type="number" id="maxcalls" name="maxCalls" min={1} max={10} value={formData.maxCalls} onChange={handleChange} />
        </div>
        <div>
          <input type="submit" value="Conectar" />
        </div>
      </form>
    </div>
  );
}

export default Login;