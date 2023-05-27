import "./App.css";
import CompNavbar from "./componentes/CompNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Libros from "./views/Libros.jsx";
import ViewLogin from "./views/ViewLogin.jsx";
import Home from "./views/Home";
import Register from "./views/Register.jsx";
import RegisterBook from "./views/RegisterBook.jsx";
import EliminarLibros from "./views/EliminarLibros.jsx";
import { useEffect, useState } from "react";
import { auth, db } from "./data/firebase";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
  const [listPeliculas, setListPeliculas] = useState([]);
  const [isSingIn, setIsSingIn] = useState();
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const getBooks = async () => {
      try {
        await onSnapshot(collection(db, "libro"), (query) => {
          setListPeliculas(
            query.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSingIn(user.uid);
      } else {
        setIsSingIn(null);
      }
    });
    getBooks();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      await onSnapshot(collection(db, "usuario"), (query) => {
        const data = query.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((user) => user.id === isSingIn);
        setDataUser(data);
      });
    };
    if (isSingIn) {
      getUser();
    }
  }, [isSingIn]);

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/libros",
      element: (
        <Libros
          listPeliculas={listPeliculas}
          firebaseUser={isSingIn}
          dataUser={dataUser}
        />
      ),
    },
    {
      path: "/login",
      element: <ViewLogin />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];
  return (
    <BrowserRouter>
      <div className="head col-12">
        <CompNavbar
          peliculaList={listPeliculas}
          isSingIn={isSingIn}
          setIsSingIn={setIsSingIn}
        />
      </div>
      <Routes>
        {routes.map((screen) => (
          <Route
            key={screen.path}
            path={screen.path}
            element={screen.element}
          />
        ))}
        {dataUser.admin && (
          <>
            <Route path="/register-book" element={<RegisterBook />} />
            <Route path="/eliminar-book" element={<EliminarLibros />} />
          </>
        )}
        {/* 
        agrega una vista para las controlar las rutas inexistente como un error 404
        <Route path="*" element={<EliminarLibros />} /> 
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
