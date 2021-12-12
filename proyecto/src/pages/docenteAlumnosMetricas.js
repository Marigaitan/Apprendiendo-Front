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
export const DocenteAlumnosMetricas = () => {
  useEffect(() => {
    getStuedents();
  }, []);

  const [alumnos, setAlumnos] = useState([]);

  const getStuedents = async () => {
    const url2 =
      API_HOST + "statistics/teacher/" + cookies.get("id") + "/students";
    //const url2 = "http://localhost:8080/statistics/teacher/42/students";
    console.log(url2);
    //console.log(url54);
    await axios
      .get(url2, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        const students = response.data.map((student) => ({
          lastName: student.item.lastName,
          firstName: student.item.firstName,
          avgCompletion: student.averageCompletion,
          percentageCompleted: student.percentageCompleted,
          avgGrade: student.averageGrade,
          userName: student.item.username,
        }));
        setAlumnos(students);
      });
  };

  return (
    <div className="mainContainer">
      <HeaderTeacher />
      <div className="fondo_general container">
        <h1> Métricas </h1>
        <NavMetricas activeBar="Alumnos" />
        <div className="ml-2 mt-2">
          <h2>Métricas por Alumno</h2>

          {alumnos.map((alumno) => {
            return (
              <div>
                {/* {classroom.name} */}
                <div className="containerAvancesDelCurso animate__animated animate__fadeInUp">
                  <div className="container mb-4">
                    <h2>
                      {alumno.firstName} {alumno.lastName}
                    </h2>
                  </div>

                  <ProgressBar
                    key={alumno.userName}
                    bgcolor="#789a1b"
                    completed={Math.round(alumno.avgCompletion * 100) / 100}
                    tarea="Promedio de avance en las tareas"
                  />
                  <ProgressBar
                    key={alumno.userName}
                    bgcolor="#789a1b"
                    completed={
                      Math.round(alumno.percentageCompleted * 100) / 100
                    }
                    tarea="Porcentaje de tareas completadas"
                  />
                  <h2>
                    Nota Promedio: {Math.round(alumno.avgGrade * 100) / 100}
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
