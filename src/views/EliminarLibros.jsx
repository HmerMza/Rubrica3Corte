import CompList from "../componentes/CompList";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
const EliminarLibros = () => {
  return (
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
            endIcon={<ArrowBackRoundedIcon />}
            className=" mb-2"
            style={{ backgroundColor: "#6366f1" }}
          >
            Atras
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EliminarLibros;
