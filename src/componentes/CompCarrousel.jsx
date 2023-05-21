const CompCarrousel = () => {
  return (
    <div
      id="carouselExample"
      className="carousel slide col-12 col-lg-10 m-auto"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://biblioteca.cuc.edu.co/wp-content/uploads/2023/01/1.png"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://biblioteca.cuc.edu.co/wp-content/uploads/2023/04/2-1.png"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://biblioteca.cuc.edu.co/wp-content/uploads/2023/04/11.png"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default CompCarrousel;
