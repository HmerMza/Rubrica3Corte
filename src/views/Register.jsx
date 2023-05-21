import { useState } from "react";
import CompNavbar from "../componentes/CompNavbar";
import listPeliculas from "../data/listPeliculas";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from "../data/firebase";
const Register = () => {
  const history = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
  });
  const handelInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = firebase.firestore();
      const data = await db.collection("usuario").get();
      const user = data.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .find((item) => item.email === form.email);
      if (user) {
        //alerta EMAIL existe
        return;
      }
      db.collection("usuario").add(form);
      //alerta se registro el usuario
      history("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="head col-12">
        <CompNavbar peliculaList={listPeliculas} />
      </div>
      <div className="main">
        <div className="container">
          <div className="container mt-5">
            <form onSubmit={onSubmit}>
              <h2>Registro</h2>
              <hr className="dropdown-divider" />
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  id="nombre"
                  value={form.nombre}
                  onChange={handelInput}
                  required
                  placeholder="Ingrese Su nombre"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  className="form-control"
                  id="apellido"
                  value={form.apellido}
                  onChange={handelInput}
                  required
                  placeholder="Ingrese Su apellido"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={form.email}
                  onChange={handelInput}
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
                  name="contrasena"
                  className="form-control"
                  id="password"
                  value={form.contrasena}
                  onChange={handelInput}
                  required
                  placeholder="Ingrese Su Contraseña"
                />
              </div>
              <Link to="/login" className="btn btn-secondary m-2">
                Atras
              </Link>
              <button type="submit" className="btn btn-primary m-2">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
