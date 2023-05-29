/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import CardBootstrap from "../componentes/CardBootstrap";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";

const Libros = ({ listPeliculas = [], firebaseUser, dataUser }) => {
  return (
    <div className="main">
      {dataUser.admin && (
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
              style={{ backgroundColor: "#6366f1", width: 206 }}
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
                width: 206,
              }}
              className="mb-2"
            >
              Invetario de Libros
            </Button>
          </Link>
        </div>
      )}

      <div className="container">
        {firebaseUser &&
          listPeliculas.map((p) => (
            <CardBootstrap
              key={p.id}
              id={p.id}
              title={p.nombre}
              image={p.imagen}
              description={p.descripcion}
              autor={p.autor}
              anho={p.fecha}
              dataUser={dataUser}
              estado={p.estado}
            />
          ))}
      </div>
    </div>
  );
};

export default Libros;
