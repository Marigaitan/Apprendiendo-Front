import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/Global.css";
import "../css/MenuDocente.css";
import HeaderTeacher from "./Header";
import NavMetricas from "./NavMetricas";
import ProgressBar from "./ProgressBar";

const cookies = new Cookies();
export const DocenteProyectosMetricas = () => {
  useEffect(() => {
    getProjects();
  }, []);

  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const url3 =
      API_HOST + "statistics/teacher/" + cookies.get("id") + "/projects";
    //const url3 = "http://localhost:8080/statistics/teacher/42/projects";
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
      <div className="fondo_general container">
        <h1> Métricas </h1>
        <NavMetricas activeBar="Proyectos" />

        <div className="ml-2 mt-2">
          <h2>Métricas por Proyectos</h2>

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
                    completed={Math.round(project.avgCompletion * 100) / 100}
                    tarea="Promedio de avance en los proyectos"
                  />
                  <ProgressBar
                    key={project.id}
                    bgcolor="#1b2a9a"
                    completed={
                      Math.round(project.percentageCompleted * 100) / 100
                    }
                    tarea="Porcentaje completado del proyecto"
                  />
                  <h2>
                    Nota Promedio: {Math.round(project.avgGrade * 100) / 100}
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
