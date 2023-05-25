import React from "react";
import CompNavbar from "../componentes/CompNavbar";
import CompList from "../componentes/CompList";
import listPeliculas from "../data/listPeliculas";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

const EliminarLibros = () => {
  const libos = listPeliculas.map((libro) => (
    <CompList title={libro.name} autor={libro.autor} />
  ));
  return (
    <div>
      <CompNavbar />
      <div
        style={{
          width: "90%",
          margin: "auto",
          marginTop: "2%",
          textAlign: "center",
        }}
      >
        {libos}
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
