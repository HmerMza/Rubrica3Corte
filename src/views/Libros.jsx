/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CardBootstrap from "../componentes/CardBootstrap";
import CompNavbar from "../componentes/CompNavbar";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from "../data/firebase";
import { Button, Icon } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
const Libros = () => {
  const [listPeliculas, setListPeliculas] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    const getBooks = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("libro").get();
        const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setListPeliculas(result);
      } catch (error) {
        console.log(error);
      }
    };
    const isSingIn = localStorage.getItem("isSingIn");
    if (!(isSingIn === "true")) {
      history("/login");
    } else {
      getBooks();
    }
  }, []);
  return (
    <>
      <div className="head col-12">
        <CompNavbar peliculaList={listPeliculas} />
      </div>
      <div className="main">
        <div
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "15px",
            height: 50,
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
        >
          <Link to="/register-book">
            <Button
              variant="contained"
              endIcon={<AddCircleRoundedIcon />}
              className=" mb-2"
              style={{ backgroundColor: "#6366f1" }}
            >
              Agregar Libro
            </Button>
          </Link>
          <Link to="/Eliminar-book">
            <Button
              variant="outlined"
              endIcon={<DeleteIcon />}
              style={{
                borderColor: "#6366f1",
                color: "#6366f1",
              }}
              className="mb-2"
            >
              Eliminar Libro
            </Button>
          </Link>
        </div>
        <div className="container">
          {listPeliculas.map((p) => (
            <CardBootstrap
              key={p.id}
              title={p.nombre}
              image={p.imagen}
              description={p.descripcion}
              autor={p.autor}
              anho={p.fecha}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Libros;
