import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../data/firebase";
import { Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Swal from "sweetalert2";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditarLibro = () => {
  const { libroId } = useParams();
  const history = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    fecha: "",
    estado: true,
    autor: "",
  });

  useEffect(() => {
    const getLibro = async () => {
      try {
        const libroDoc = await getDoc(doc(db, "libro", libroId));
        if (libroDoc.exists()) {
          //si el libro exite guardo sus datos en un libro nuevo
          const libroData = libroDoc.data();
          setForm({
            //cambio los valores por defecto, por los del libro a cambiar
            nombre: libroData.nombre,
            descripcion: libroData.descripcion,
            imagen: libroData.imagen,
            fecha: libroData.fecha,
            estado: libroData.estado,
            autor: libroData.autor,
          });
        } else {
          console.log("El libro no existe.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLibro();
  }, [libroId]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "libro", libroId), form);
      Swal.fire({
        title: "Excelente",
        text: "El libro fue actualizado exitosamente",
        icon: "success",
        button: "Aceptar",
      });
      history("/Eliminar-Book");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="container mt-5 ">
          <form onSubmit={onSubmit} className=" p-3 rounded-2 border border-2">
            <h2>Modo Edición</h2>
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
                placeholder="Ingrese el nombre del libro"
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
                Descripción
              </label>
              <input
                type="text"
                name="descripcion"
                className="form-control"
                id="descripcion"
                value={form.descripcion}
                onChange={handelInput}
                required
                placeholder="Ingrese la descripción"
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
                placeholder="Ingrese la fecha"
              />
            </div>
            <Link to="/Eliminar-book">
              <Button
                variant="outlined"
                endIcon={<ArrowBackRoundedIcon />}
                style={{
                  borderColor: "#6366f1",
                  color: "#6366f1",
                }}
                className="m-auto me-2 mb-2"
              >
                Atrás
              </Button>
            </Link>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SaveRoundedIcon />}
              className="mb-2 me-2"
              style={{ backgroundColor: "#6366f1" }}
            >
              Guardar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarLibro;
