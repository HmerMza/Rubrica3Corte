/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CompNavbar = ({ peliculaList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSingIn, setIsSingIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const results = peliculaList.filter((pelicula) =>
      pelicula.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    const data = localStorage.getItem("isSingIn");
    setIsSingIn(data === "true");
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary col-12 col-md-11 col-lg-10  m-auto">
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
          </ul>
          <form className="d-flex">
            <div ref={searchRef} className="position-relative">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchResults.length > 0 && (
                <ul
                  className="dropdown-menu"
                  style={{
                    display: "block",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 1000,
                    minWidth: "100%",
                  }}
                >
                  {searchResults.map((pelicula, index) => (
                    <li key={index}>
                      <a className="dropdown-item" href="#">
                        {pelicula.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default CompNavbar;
