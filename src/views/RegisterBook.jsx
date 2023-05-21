/* eslint-disable no-unused-vars */
import { useState } from "react";
import CompNavbar from "../componentes/CompNavbar";
import listPeliculas from "../data/listPeliculas";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from "../data/firebase";

const RegisterBook = () => {
  const history = useNavigate();
  const [form, setForm] = useState({
    nombre: "El Cuco de Cristal",
    descripcion:
      "Sigue a un detective privado en su investigación de un asesinato aparentemente imposible, donde las pistas y los engaños lo llevan a los rincones más oscuros de la mente humana. Suspenso y giros sorprendentes.",
    imagen:
      "https://www.penguinlibros.com/es/2484232-home_default/el-cuco-de-cristal.webp",
    fecha: "",
    estado: true,
    autor: "",
  });
  const handelInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpfiles = async (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener(
      "load",
      function () {
        setForm({ ...form, imagen: reader.result });
      },
      false
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const db = firebase.firestore();
      db.collection("libro").add(form);
    } catch (error) {
      console.error(error);
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
                  Autor
                </label>
                <input
                  type="text"
                  name="autor"
                  className="form-control"
                  id="autor"
                  value={form.autor}
                  onChange={handelInput}
                  required
                  placeholder="Ingrese el autor"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Descripcion
                </label>
                <input
                  type="text"
                  name="descripcion"
                  className="form-control"
                  id="descripcion"
                  value={form.descripcion}
                  onChange={handelInput}
                  required
                  placeholder="Ingrese la descripcion"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Foto
                </label>
                <input
                  type="file"
                  name="imagen"
                  className="form-control"
                  id="imagen"
                  accept="image/png, image/jpeg"
                  onChange={handleUpfiles}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Fecha
                </label>
                <input
                  type="date"
                  name="fecha"
                  className="form-control"
                  id="fecha"
                  value={form.fecha}
                  onChange={handelInput}
                  required
                  placeholder="Ingrese Su Contraseña"
                />
              </div>
              <Link to="/libros" className="btn btn-secondary m-2">
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

export default RegisterBook;
