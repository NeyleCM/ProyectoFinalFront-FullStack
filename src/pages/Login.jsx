import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useUser } from '../context/useUser'; 
import '../index.css'
import '../styles/Login.css'

const Login = () => {
  const { login } = useUser(); 
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      );

      const user = userCredential.user;

      const token = await user.getIdToken();
      localStorage.setItem('token', token); 
      
      login(user); 
      navigate('/dashboard'); 
    } catch (err) {
      setError('Credenciales inválidas o error al iniciar sesión', err); 
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Inicia sesión</h1>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Introduce tu correo"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Introduce tu contraseña"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="form-input"
            required
          />
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" /> Mantener la sesión iniciada
          </label>
          <a href="#" className="reset-link">Restablecer contraseña</a>
        </div>

        <button type="submit" className="login-button">Iniciar sesión</button>

        {error && <p className="error-message">{error}</p>}

        <div className="alternative-login">
          <span className="divider">O si lo prefieres</span>
          <button className="alternative-login-button apple">
            Continuar con Apple
          </button>
          <button className="alternative-login-button google">
            Continuar con Google
          </button>
        </div>
      </form>
    </div>
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
