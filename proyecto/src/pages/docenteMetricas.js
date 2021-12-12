import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import HeaderStudent from "./HeaderAlumno";
import { API_HOST } from "../constants";
import "../css/Global.css";
import "../css/MenuDocente.css";
import HeaderTeacher from "./Header";
import Background from "../Images/fondoLetras.png";
import { Button } from "reactstrap";
import NavMetricas from "./NavMetricas";
import ProgressBar from "./ProgressBar";

const cookies = new Cookies();
export const DocenteMetricas = () => {
  useEffect(() => {
    getStuedents();
  }, []);

  const [clases, setClases] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const getStuedents = async () => {
    const url2 =
      API_HOST + "statistics/teacher/" + cookies.get("id") + "/classrooms";
    await axios
      .get(url2, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        const classrooms = response.data.map((classroom) => ({
          name: classroom.item.subject,
          division: classroom.item.division,
          year: classroom.item.year,
          id: classroom.item.id,

          avgCompletion: classroom.averageCompletion,
          percentageCompleted: classroom.percentageCompleted,
          avgGrade: classroom.averageGrade,
        }));
        setClases(classrooms);
      });
  };
  console.log("CLASES", clases);
  return (
    <div className="mainContainer">
      <HeaderTeacher />
      <div className="fondo_general container">
        <h1> Métricas </h1>
        <NavMetricas activeBar="Materias" />

        <div className="ml-2 mt-2">
          <h2>Métricas por materias</h2>

          {clases.map((classroom) => {
            return (
              <div>
                {/* {classroom.name} */}
                <div className="containerAvancesDelCurso animate__animated animate__fadeInUp">
                  <div className="container mb-4">
                    <h2>
                      {classroom.name} - Curso {classroom.division} - Año{" "}
                      {classroom.year}{" "}
                    </h2>
                  </div>
                  <ProgressBar
                    //key={classroom.id}
                    bgcolor="#1b9a9a"
                    completed={Math.round(classroom.avgCompletion * 100) / 100}
                    tarea="Promedio de avance en las clases"
                  />
                  <ProgressBar
                    //key={classroom.id}
                    bgcolor="#1b9a9a"
                    completed={
                      Math.round(classroom.percentageCompleted * 100) / 100
                    }
                    tarea="Porcentaje completado de la clase"
                  />
                  <h2>
                    Nota Promedio de la clase:{" "}
                    {Math.round(classroom.avgGrade * 100) / 100}
                  </h2>
                </div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="containerAvancesDelCurso animate__animated animate__fadeInUp">
  <div className="container mb-4">
    <h2>Progreso de las actividades</h2>
  </div>
  {progreso.map((item, idx) => (
    <ProgressBar
      key={idx}
      bgcolor="#6a1b9a"
      completed={item.progress}
      tarea={item.name}
    />
  ))}
</div>; */
}
