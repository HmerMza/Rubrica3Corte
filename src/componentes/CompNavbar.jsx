import React, { useState, useEffect, useRef } from 'react';

const CompNavbar = ({ peliculaList }) => {
  const [searchTerm, setSearchTerm] = useState('');
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
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary col-xs-12 col-9">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Biblio<strong>CUC</strong> 
        </a>
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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Iniciar Sesion
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
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
                    display: 'block',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 1000,
                    minWidth: '100%',
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
