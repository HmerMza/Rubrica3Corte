/* eslint-disable react-hooks/exhaustive-deps */
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
import EditarLibro from "./views/EditarLibro";
import NoteFound from "./views/NoteFound";

function App() {
  const [listPeliculas, setListPeliculas] = useState([]);
  const [listPeliculasFilter, setListPeliculasFilter] = useState([]);
  const [isSingIn, setIsSingIn] = useState(null);
  const [dataUser, setDataUser] = useState({});

  const getBooks = async (L_Prestados = [], admin = false) => {
    try {
      await onSnapshot(collection(db, "libro"), (query) => {
        let data;
        if (L_Prestados && !admin) {
          data = query.docs
            .filter((doc) => L_Prestados.includes(doc.id) || doc.data().estado)
            .map((doc) => ({ id: doc.id, ...doc.data() }));
        } else {
          data = query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }
        setListPeliculas(data);
        setListPeliculasFilter(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user.uid) {
        setIsSingIn(user.uid);
      } else {
        setIsSingIn(null);
      }
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      await onSnapshot(collection(db, "usuario"), async (query) => {
        const data = query.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((user) => user.id === isSingIn);
        setDataUser(data);
        await getBooks(data.L_Prestados, data.admin);
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
          listPeliculas={listPeliculasFilter}
          firebaseUser={isSingIn}
          dataUser={dataUser}
        />
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/edit-libros/:libroId",
      element: <EditarLibro />,
    },
  ];
  return (
    <BrowserRouter>
      <div className="head col-12">
        <CompNavbar
          peliculaList={listPeliculas}
          isSingIn={isSingIn}
          setIsSingIn={setIsSingIn}
          setListPeliculasFilter={setListPeliculasFilter}
          dataUser={dataUser}
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
        {!isSingIn && <Route path="/login" element={<ViewLogin />} />}
        <Route path="*" Component={NoteFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
