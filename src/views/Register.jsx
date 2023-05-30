import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth, createUserWithEmailAndPassword } from "../data/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import Swal from "sweetalert2";

const Register = () => {
  const history = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    L_Prestados: [],
  });
  const handelInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.contrasena.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña corta",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });

      return;
    }
    registrar();
  };

  const registrar = useCallback(async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.contrasena
      );
      const data = { ...form };
      delete data.contrasena;
      console.log(res);
      await addDoc(collection(db, "usuario"), {
        ...data,
        id: res.user.uid,
      });
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        contrasena: "",
        L_Prestados: [],
      });
      history("/libros");
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/email-already-in-use") {
        console.log("email ya fue registrado");
        Swal.fire({
          icon: "error",
          title: "Correo Registrado",
          text: "Este correo ha sido registrado con anterioridad, por favor ingrese uno nuevo.",
        });
      }
      if (err.code === "auth/invalid-email") {
        console.log("email no valido");
        Swal.fire({
          icon: "error",
          title: "Correo no valido",
          text: "Su correo no cuenta con las normas establecitas, intente de nuevo.",
        });
      }
    }
  }, [form, history]);

  return (
    <div className="main">
      <div className="container">
        <div className="container mt-5">
          <form
            onSubmit={onSubmit}
            className="p-3 rounded-2 border border-2 col-10"
            style={{ maxWidth: "410px" }}
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
            <Link to="/login">
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
              endIcon={<PersonAddRoundedIcon />}
              className="mb-2 me-2"
              style={{ backgroundColor: "#6366f1" }}
            >
              Registrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
