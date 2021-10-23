import React, { isValidElement, useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno";
import ProgressBar from "./ProgressBar";
import { logros_cursos, logrosPorCurso } from "../data/medallas";
import { ListarLogrosDelCurso } from "./ListarLogrosDelCurso";
import { GiHoleLadder } from "react-icons/gi";

const cookies = new Cookies();
export const ProgresoMateria = () => {
  const location = useLocation();
  const { id = "", m = "" } = queryString.parse(location.search);
  const [logrosproyecto, setLogrosproyecto] = useState([]);
  const [logros, setLogros] = useState([]);
  const filtro = logros.filter((imagen) => imagen.imageData);
  const testData = [
    { tarea: "Buscar algo", bgcolor: "#6a1b9a", completed: 60 },
    { tarea: "Traer algo", bgcolor: "#00695c", completed: 30 },
    { tarea: "Romper algo", bgcolor: "#ef6c00", completed: 100 },
  ];
  //NO PONER INSTRUCCIONES ACA. SOLO PARA DEFINIR FUNCIONES/VARIABLES/CONSTANTES Y PARA EL RETURN
  //CUALQUIER COSA QUE PONGAS ACA SE VA A EJECUTAR COMO PARTE DEL RENDER (VARIAS VECES, NO SABES CUANDO)
  useEffect(() => {
    getLogros();
    getLogrosproyecto();
  }, []);
  //NO PONER INSTRUCCIONES ACA. SOLO PARA DEFINIR FUNCIONES/VARIABLES/CONSTANTES Y PARA EL RETURN
  //CUALQUIER COSA QUE PONGAS ACA SE VA A EJECUTAR COMO PARTE DEL RENDER (VARIAS VECES, NO SABES CUANDO)
  const getLogros = async () => {
    const url =
      API_HOST + "user/" + cookies.get("id") + "/classroom/" + id + "/rewards";
    console.log(url);
    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        setLogros(response.data);
      })

      .catch((error) => {
        console.log(error);
        alert("ERRORRRR2");
      });
  };
  //NO PONER INSTRUCCIONES ACA. SOLO PARA DEFINIR FUNCIONES/VARIABLES/CONSTANTES Y PARA EL RETURN
  //CUALQUIER COSA QUE PONGAS ACA SE VA A EJECUTAR COMO PARTE DEL RENDER (VARIAS VECES, NO SABES CUANDO)
  const getLogrosproyecto = async () => {
    const url = API_HOST + "classroom/" + id + "/projects";

    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        const proyectos = response.data;
        let url2;
        console.log("Proyecto", response.data);
        proyectos.map(async (item) => {
          url2 =
            API_HOST +
            "user/" +
            cookies.get("id") +
            "/project/" +
            item.id +
            "/rewards";
          await axios
            .get(url2, {
              headers: {
                Authorization: cookies.get("token"),
              },
            })
            .then((response) => {
              //console.log("reward x proyecto", response.data);
              console.log("prueba", logrosproyecto);
              setLogrosproyecto((prev) => prev.concat(response.data));
            })

            .catch((error) => {
              console.log(error);
              alert("ERRORRRR2");
            });
        });
      })

      .catch((error) => {
        console.log(error);
        alert("ERRORRRR2");
      });
  };
  //NO PONER INSTRUCCIONES ACA. SOLO PARA DEFINIR FUNCIONES/VARIABLES/CONSTANTES Y PARA EL RETURN
  //CUALQUIER COSA QUE PONGAS ACA SE VA A EJECUTAR COMO PARTE DEL RENDER (VARIAS VECES, NO SABES CUANDO)
  const getLogrosactividad = async () => {
    const url = API_HOST + "classroom/" + id + "/projects";

    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        const proyectos = response.data;
        let url2;
        proyectos.map(async (item) => {
          url2 = API_HOST + "user/" + id + "/project/" + item.id + "/rewards";
          console.log(url2);
          await axios
            .get(url2, {
              headers: {
                Authorization: cookies.get("token"),
              },
            })
            .then((response) => {
              console.log(response.data);
            })

            .catch((error) => {
              console.log(error);
              alert("ERRORRRR2");
            });
        });
      })

      .catch((error) => {
        console.log(error);
        alert("ERRORRRR2");
      });
  };
  //NO PONER INSTRUCCIONES ACA. SOLO PARA DEFINIR FUNCIONES/VARIABLES/CONSTANTES Y PARA EL RETURN
  //CUALQUIER COSA QUE PONGAS ACA SE VA A EJECUTAR COMO PARTE DEL RENDER (VARIAS VECES, NO SABES CUANDO)
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="container">
        <div className="container align-items-center text-center mt-2 fondo_general rounded-circle">
          <img
            src={`./materias/${m}.jpg`}
            width="300"
            className="rounded-circle"
          />
        </div>
        <div className="containerAvancesDelCurso">
          <div className="container mb-4">
            <h2>Progreso de las actividades</h2>
          </div>
          {testData.map((item, idx) => (
            <ProgressBar
              key={idx}
              bgcolor={item.bgcolor}
              completed={item.completed}
              tarea={item.tarea}
            />
          ))}
        </div>
        <div className="containerLogrosDelCurso">
          <div className="container">
            <h2 className="mt-2">Lista de logros obtenidos</h2>
            <div className="card-columns">
              {(logros.concat(logrosproyecto)).map((logro) => (
                <ListarLogrosDelCurso
                  key={logro.id}
                  reward={logro.imageData}
                  name={logro.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
