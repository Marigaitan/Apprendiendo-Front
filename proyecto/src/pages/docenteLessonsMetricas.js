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
export const docenteLessonsMetricas = () => {
  useEffect(() => {
    getLessons();
  }, []);

  const [lessons, setLessons] = useState([]);

  const getLessons = async () => {
    const url3 =
      API_HOST + "statistics/teacher/" + cookies.get("id") + "/lessons";
    //const url3 = "http://localhost:8080/statistics/teacher/42/lessons";
    console.log(url3);
    await axios
      .get(url3, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        const lessons = response.data.map((lesson) => ({
          name: lesson.item.name,
          projectId: lesson.item.projectId,
          id: lesson.item.id,
          avgCompletion: lesson.averageCompletion,
          percentageCompleted: lesson.percentageCompleted,
          avgGrade: lesson.averageGrade,
        }));
        setLessons(lessons);
      });
  };
  return (
    <div className="mainContainer">
      <HeaderTeacher />
      <div className="container">
        <h1> METRICAS</h1>
        <NavMetricas activeBar="Lessons" />

        <div className="fondo_general ml-2 mt-2">
          <h2>Metricas por Lessons</h2>

          {lessons.map((lesson) => {
            return (
              <div>
                {/* {classroom.name} */}
                <div className="containerAvancesDelCurso animate__animated animate__fadeInUp">
                  <div className="container mb-4">
                    <h2>{lesson.name}</h2>
                  </div>

                  <ProgressBar
                    key={lesson.id}
                    bgcolor="#9a261b"
                    completed={lesson.avgCompletion}
                    tarea="Promedio completado de la lesson"
                  />
                  <ProgressBar
                    key={lesson.id}
                    bgcolor="#9a261b"
                    completed={lesson.percentageCompleted}
                    tarea="Porcentaje completado de la lesson"
                  />
                  <h2>Nota Promedio: {lesson.avgGrade}</h2>
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
