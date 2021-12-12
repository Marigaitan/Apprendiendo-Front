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
export const DocenteLessonsMetricas = () => {
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
      <div className="fondo_general container">
        <h1> Métricas </h1>
        <NavMetricas activeBar="Lessons" />

        <div className="ml-2 mt-2">
          <h2>Métricas por Lessons</h2>

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
                    completed={Math.round(lesson.avgCompletion * 100) / 100}
                    tarea="Promedio de avance en las lessons"
                  />
                  <ProgressBar
                    key={lesson.id}
                    bgcolor="#9a261b"
                    completed={
                      Math.round(lesson.percentageCompleted * 100) / 100
                    }
                    tarea="Porcentaje completado de la lesson"
                  />
                  <h2>
                    Nota Promedio: {Math.round(lesson.avgGrade * 100) / 100}
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
