import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', maxCalls: '1' });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('callsUser', JSON.stringify(formData));
    navigate('/');
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