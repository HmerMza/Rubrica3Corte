/* eslint-disable no-unused-vars */
import { useState } from "react";
import CompNavbar from "../componentes/CompNavbar";
import listPeliculas from "../data/listPeliculas";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from "../data/firebase";
import { Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const RegisterBook = () => {
  const history = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
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
          <div className="container mt-5 ">
            <form
              onSubmit={onSubmit}
              className=" p-3 rounded-2 border border-2"
            >
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
                  placeholder="Ingrese el nombre del Libro"
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
              <Link to="/libros">
                <Button
                  variant="outlined"
                  endIcon={<ArrowBackRoundedIcon />}
                  style={{
                    borderColor: "#6366f1",
                    color: "#6366f1",
                  }}
                  className="m-auto me-2 mb-2"
                >
                  Atras
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                endIcon={<AddCircleRoundedIcon />}
                className="mb-2 me-2"
                style={{ backgroundColor: "#6366f1" }}
              >
                Registrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterBook;
