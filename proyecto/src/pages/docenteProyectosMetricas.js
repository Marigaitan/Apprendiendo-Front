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
export const docenteProyectosMetricas = () => {
  useEffect(() => {
    getProjects();
  }, []);

  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    //const url55 =
    //API_HOST + "​​statistics/teacher/" + cookies.get("id") + "​/projects";
    const url3 = "http://localhost:8080/statistics/teacher/42/projects";
    console.log(url3);
    await axios
      .get(url3, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        const proyectos = response.data.map((proyecto) => ({
          name: proyecto.item.name,
          classroomId: proyecto.item.classroomId,
          id: proyecto.item.id,
          avgCompletion: proyecto.averageCompletion,
          percentageCompleted: proyecto.percentageCompleted,
          avgGrade: proyecto.averageGrade,
        }));
        setProjects(proyectos);
      });
  };
  return (
    <div className="mainContainer">
      <HeaderTeacher />
      <div className="container">
        <h1> METRICAS</h1>
        <NavMetricas activeBar="Proyectos" />

        <div className="fondo_general ml-2 mt-2">
          <h2>Metricas por Proyectos</h2>

          {projects.map((project) => {
            return (
              <div>
                {/* {classroom.name} */}
                <div className="containerAvancesDelCurso animate__animated animate__fadeInUp">
                  <div className="container mb-4">
                    <h2>{project.name}</h2>
                  </div>

                  <ProgressBar
                    key={project.id}
                    bgcolor="#1b2a9a"
                    completed={project.avgCompletion}
                    tarea="Promedio completado del proyecto"
                  />
                  <ProgressBar
                    key={project.id}
                    bgcolor="#1b2a9a"
                    completed={project.percentageCompleted}
                    tarea="Porcentaje completado del proyecto"
                  />
                  <h2>Nota Promedio: {project.avgGrade}</h2>
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
