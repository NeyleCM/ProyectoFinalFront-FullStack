import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useUser } from '../context/useUser'; 

const Login = () => {
  const { login } = useUser(); 
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;

      const token = await user.getIdToken();
      localStorage.setItem('token', token); 
      localStorage.setItem('user', JSON.stringify(user));
      
      login(user); 
      navigate('/dashboard'); 
    } catch (err) {
      setError('Credenciales inválidas o error al iniciar sesión', err); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        required
      />
      <button type="submit">Iniciar Sesión</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;

/*
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from '../services/axiosConfig'; 
import { useUser } from '../context/UserContext'; // Importa el contexto para manejar el usuario

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);

      setUser({ uid: user.uid, email: user.email });

      navigate('/dashboard');
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.', error);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginUser;
*/
