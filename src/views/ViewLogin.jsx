import CompNavbar from "../componentes/CompNavbar";
import listPeliculas from "../data/listPeliculas";
import CompLogin from "../componentes/CompLogin";

const ViewLogin = () => {
  return (
    <>
      <div className="head col-12">
        <CompNavbar peliculaList={listPeliculas} />
      </div>
      <div className="main">
        <div className="container">
          <CompLogin />
        </div>
      </div>
    </>
  );
};

export default ViewLogin;
