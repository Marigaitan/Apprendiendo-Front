import React, { isValidElement } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno";
import ProgressBar from "./ProgressBar";
import { logros_cursos, logros_cursps } from "../data/logros_cursos";
import { ListarLogrosDelCurso } from "./ListarLogrosDelCurso";

const cookies = new Cookies();
export const ProgresoMateria = () => {
  const location = useLocation();
  const { id = "", m = "" } = queryString.parse(location.search);
  console.log(id);
  console.log(m);

  const testData = [
    { tarea: "Buscar algo", bgcolor: "#6a1b9a", completed: 60 },
    { tarea: "Traer algo", bgcolor: "#00695c", completed: 30 },
    { tarea: "Romper algo", bgcolor: "#ef6c00", completed: 100 },
  ];

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
              {logros_cursos.map((logro) => (
                <ListarLogrosDelCurso key={logro.id} {...logro} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
