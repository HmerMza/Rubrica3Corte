/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../data/firebase";
import { Button } from "@mui/material";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import Swal from "sweetalert2";

const CompLogin = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    login();
  };

  const login = useCallback(async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      setEmail("");
      setPassword("");
      setError("");
      history("/libros");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/user-not-found") {
        setError("Usuario no se encuentra registrado");
        Swal.fire({
          icon: "error",
          title: "Correo no registrado",
          text: "Su correo no se encuentra registrado.",
        });
      }
      if (err.code === "auth/wrong-password") {
        setError("contraseña no valida");
        Swal.fire({
          icon: "error",
          title: "Contraseña incorrecta",
          text: "La contraseña no es valida.",
        });
      }
    }
  }, [email, password, history]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history("/libros");
      }
    });
  }, []);

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="p-3 rounded-2 border border-2 col-10 mt-5"
        style={{ maxWidth: "410px" }}
      >
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
        <div
          className="container-buttons row"
          style={{ width: "90%", justifyContent: "center", margin: "auto" }}
        >
          <Button
            type="submit"
            variant="contained"
            endIcon={<HowToRegRoundedIcon />}
            style={{ backgroundColor: "#6366f1" }}
          >
            Login
          </Button>
          <Link to="/register" className="m-2">
            ¿Aun no tienes cuenta?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CompLogin;
