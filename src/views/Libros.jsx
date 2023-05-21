/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CardBootstrap from "../componentes/CardBootstrap";
import CompNavbar from "../componentes/CompNavbar";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from "../data/firebase";
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
            width: "100%",
            height: 50,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link
            to="/register-book"
            className="btn btn-primary"
            style={{ marginRight: 30 }}
          >
            +
          </Link>
        </div>
        <div className="container">
          {listPeliculas.map((p) => (
            <CardBootstrap
              key={p.id}
              title={p.nombre}
              image={p.imagen}
              description={p.descripcion}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Libros;
