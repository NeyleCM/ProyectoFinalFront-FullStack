import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      formErrors.name = "El nombre es obligatorio.";
    }

    if (!formData.email.trim()) {
      formErrors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!formData.password.trim()) {
      formErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 6) {
      formErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setLoading(true);

    if (validate()) {
      try {
        const response = await fetch("https://proyectofinal-fullstackdev.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("Usuario creado con éxito.");
          setFormData({ name: "", email: "", password: "", confirmPassword: "" });
          navigate("/");
        } else {
          setSuccessMessage(""); 
          setErrors({ apiError: data.error || "Hubo un error al registrar el usuario." });
        }
      } catch (error) {
        setSuccessMessage(""); 
        setErrors({ apiError: "Error al registrar el usuario",error });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>

        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Verificar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Cargando..." : "Crear Usuario"}
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.apiError && <p className="error-message">{errors.apiError}</p>}
      </form>
    </div>
  );
};

export default Register;