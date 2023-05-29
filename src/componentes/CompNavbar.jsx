/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./style.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { IconButton } from "@mui/material";
import { auth } from "../data/firebase";

const CompNavbar = ({
  peliculaList = [],
  isSingIn,
  setIsSingIn,
  setListPeliculasFilter,
  dataUser,
}) => {
  const histoy = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filter = peliculaList.filter((libro) =>
        libro.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setListPeliculasFilter(filter.length > 0 ? filter : peliculaList);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  //cerrando sesion
  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsSingIn(false);
      histoy("/login");
    }); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg col-12 col-md-11 col-lg-10  m-auto"
      id="nav"
    >
      <div className="container-fluid">
        <Link
          to={"https://biblioteca.cuc.edu.co/"}
          className="text-decoration-none"
        >
          <a className="navbar-brand">
            Biblio<strong>CUC</strong>{" "}
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/"} className="text-decoration-none">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            {isSingIn && (
              <li className="nav-item">
                <Link to={"/libros"} className="text-decoration-none">
                  <a className="nav-link">Libros</a>
                </Link>
              </li>
            )}
            {!isSingIn && (
              <li className="nav-item">
                <Link to={"/login"} className="text-decoration-none">
                  <a className="nav-link">Iniciar Sesion</a>
                </Link>
              </li>
            )}
            {isSingIn && (
              <li className="nav-item dropdown">
                <a
                  href=""
                  className=" nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hola, {dataUser.nombre}
                </a>
                <ul className=" dropdown-menu">
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    <li className=" dropdown-item" onClick={handleLogout}>
                      Cerrar Sesion
                      <IconButton>
                        <ExitToAppRoundedIcon />
                      </IconButton>
                    </li>
                  </Link>
                  <Link>
                    <li className="dropdown-item">mis libros</li>
                  </Link>
                </ul>
              </li>
            )}
          </ul>
          {isSingIn && (
            <form className="d-flex">
              <div ref={searchRef} className="position-relative">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CompNavbar;
