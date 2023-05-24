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
    <div
      style={{
        width: "90%",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <CompNavbar />
      <div style={{ marginBottom: "1%", marginTop: "3%" }}>{libos}</div>
      <Link to="/libros">
        <Button
          variant="contained"
          endIcon={<CheckCircleOutlineRoundedIcon />}
          className=" mb-2"
          style={{ backgroundColor: "#6366f1" }}
        >
          Guardar Cambios
        </Button>
      </Link>
    </div>
  );
};

export default EliminarLibros;
