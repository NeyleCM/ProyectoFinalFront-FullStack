import { useState } from 'react';
import axios from 'axios';
import { useNavigate /*, useLocation*/ } from 'react-router-dom';

const RegisterUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //const location = useLocation();

  //const from = location.state?.from || '/'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        'https://proyectofinal-fullstackdev.onrender.com/api/auth/register', 
        { email, 
          password 
        });
        console.log(response);
      localStorage.setItem('token', response.data.token); 
      navigate('/');  
      //navigate(from, { replace: true });;  
    } catch (err) {
      setError('Error al registrar el usuario', err);
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
        required />
        <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Contraseña"
        required />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterUser;