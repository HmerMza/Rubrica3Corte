/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../data/firebase";

const CardBootstrap = ({
  title = "Titulo por defecto",
  image = "descripcion",
  description = "holamundo",
  autor = "autor",
  anho = "anho de publicacion",
  id = 0,
  estado = true,
  dataUser,
}) => {
  const [plibro, setPlibro] = useState(true);
  const [show, setShow] = useState(true);

  const ocultar = () => {
    setShow(!show);
  };

  const prestarLibro = () => {
    Swal.fire({
      title: "Seguro que desea Prestar el libro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = { ...dataUser };
        data.L_Prestados = [...dataUser.L_Prestados, id];
        const usuariosRef = collection(db, "usuario");
        const q = query(usuariosRef, where("id", "==", dataUser.id));
        //busco el libro
        const getLibro = async () => {
          try {
            const libroDoc = await getDoc(doc(db, "libro", id));
            if (libroDoc.exists()) {
              await updateDoc(libroDoc.ref, { estado: false });
            } else {
              console.log("El libro no existe.");
            }
          } catch (error) {
            console.error(error);
          }
        };
        getLibro();

        try {
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.log(
              "No se encontraron documentos que coincidan con la consulta"
            );
            return;
          }
          querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, data)
              .then(() => console.log("Documento actualizado con éxito"))
              .catch((error) =>
                console.error("Error al actualizar el documento:", error)
              );
          });
        } catch (error) {
          console.error("Error al ejecutar la consulta:", error);
        }
      }
    });
  };
  const devolverLibro = () => {
    Swal.fire({
      title: "Seguro que desea devolver el libro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = { ...dataUser };
        data.L_Prestados = data.L_Prestados.filter((item) => item !== id);
        const usuariosRef = collection(db, "usuario");
        const q = query(usuariosRef, where("id", "==", dataUser.id));
        //busco el libro
        const getLibro = async () => {
          try {
            const libroDoc = await getDoc(doc(db, "libro", id));
            if (libroDoc.exists()) {
              await updateDoc(libroDoc.ref, { estado: true });
            } else {
              console.log("El libro no existe.");
            }
          } catch (error) {
            console.error(error);
          }
        };
        getLibro();

        try {
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.log(
              "No se encontraron documentos que coincidan con la consulta"
            );
            return;
          }
          querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, data)
              .then(() => console.log("Documento actualizado con éxito"))
              .catch((error) =>
                console.error("Error al actualizar el documento:", error)
              );
          });
        } catch (error) {
          console.error("Error al ejecutar la consulta:", error);
        }
      }
    });
  };

  return (
    <div>
      <div className="card m-5" style={{ width: "18rem", height: "545px" }}>
        <div style={{ height: "442px" }}>
          {show ? (
            <img src={image} className="card-img-top" alt="..." />
          ) : (
            <>
              <p className="card-text m-4">
                <h3 className=" mt-4">Resumen</h3> {description}
              </p>
              <p className="card-text m-4">
                <h4 className=" mt-4">Autor</h4> {autor}
              </p>
              <p className="card-text m-4">
                <h4 className=" mt-4">Año</h4> {anho}
              </p>
            </>
          )}
        </div>
        <div className="card-body" style={{ height: "102px" }}>
          <h5 className="card-title">{title}</h5>

          {estado ? (
            <Button
              variant="contained"
              className="m-auto me-2 mb-2"
              style={{ backgroundColor: "#6366f1" }}
              onClick={prestarLibro}
            >
              Prestar
            </Button>
          ) : (
            <Button
              variant="contained"
              className="m-auto me-2 mb-2"
              style={{ backgroundColor: "#6366f1" }}
              onClick={devolverLibro}
            >
              Devolver
            </Button>
          )}

          <Button
            variant="outlined"
            style={{
              borderColor: "#6366f1",
              color: "#6366f1",
            }}
            className="mb-2"
            onClick={ocultar}
          >
            {show ? " + " : " - "}Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardBootstrap;
