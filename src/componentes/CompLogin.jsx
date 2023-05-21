import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from "../data/firebase";
const CompLogin = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const db = firebase.firestore();
      const data = await db.collection("usuario").get();
      const user = data.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .find((item) => item.email === email);
      if (user) {
        if (user.contrasena === password) {
          localStorage.setItem("isSingIn", true);
          history("/libros");
        } else {
          console.log("contraseña incorrecta");
          // agregar alerta de contraseña incorrecta
        }
      } else {
        console.log("usuario no registrado");
        // agregar alerta de usuario no registrado
      }
    } catch (error) {
      console.error(error);
    }
    //
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    const isSingIn = localStorage.getItem("isSingIn");
    if (isSingIn === "true") {
      history("/libros");
    }
  }, []);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Inicie Sesion</h2>
        <hr className="dropdown-divider" />
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Ingrese Su Correo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Ingrese Su Contraseña"
          />
        </div>
        <button type="submit" className="btn btn-primary m-2">
          Login
        </button>
        <Link to="/register" className="btn btn-secondary m-2">
          Registrarse
        </Link>
      </form>
    </div>
  );
};

export default CompLogin;
