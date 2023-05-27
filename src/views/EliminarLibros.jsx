import React from "react";
import CompNavbar from "../componentes/CompNavbar";
import CompList from "../componentes/CompList";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { firebase } from "../data/firebase";
const EliminarLibros = () => {
  const [listPeliculas, setListPeliculas] = useState([]);
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
    getBooks();
  }, []);
  
  return (
    <div>
      <CompNavbar peliculaList={listPeliculas} />
      <div
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "2%",
          textAlign: "center",
        }}
      >
        <CompList />
        <div className=" mt-3">
          <Link to="/libros">
            <Button
              variant="contained"
              endIcon={<CheckCircleOutlineRoundedIcon />}
              className=" mb-2"
              style={{ backgroundColor: "#6366f1" }}
            >
              Atras
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EliminarLibros;
