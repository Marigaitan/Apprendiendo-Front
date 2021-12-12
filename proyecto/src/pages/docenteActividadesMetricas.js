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
export const DocenteActividadesMetricas = () => {
  useEffect(() => {
    getActivities();
  }, []);

  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    const url3 =
      API_HOST + "statistics/teacher/" + cookies.get("id") + "/activities";
    //const url3 = "http://localhost:8080/statistics/teacher/42/activities";
    console.log(url3);
    await axios
      .get(url3, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        const activities = response.data.map((activity) => ({
          name: activity.item.name,
          lessonId: activity.item.lessonId,
          id: activity.item.id,
          avgCompletion: activity.averageCompletion,
          percentageCompleted: activity.percentageCompleted,
          avgGrade: activity.averageGrade,
        }));
        setActivities(activities);
      });
  };
  return (
    <div className="mainContainer">
      <HeaderTeacher />
      <div className="fondo_general container">
        <h1> Métricas </h1>
        <NavMetricas activeBar="Actividades" />

        <div className="ml-2 mt-2">
          <h2>Métricas por Actividades</h2>

          {activities.map((activity) => {
            return (
              <div>
                {/* {classroom.name} */}
                <div className="containerAvancesDelCurso animate__animated animate__fadeInUp">
                  <div className="container mb-4">
                    <h2>{activity.name}</h2>
                  </div>

                  <ProgressBar
                    key={activity.id}
                    bgcolor="#1b9a9a"
                    completed={Math.round(activity.avgCompletion * 100) / 100}
                    tarea="Promedio de avance en las actividades"
                  />
                  <ProgressBar
                    key={activity.id}
                    bgcolor="#1b9a9a"
                    completed={
                      Math.round(activity.percentageCompleted * 100) / 100
                    }
                    tarea="Porcentaje completado de la actividad"
                  />
                  <h2>
                    Nota Promedio: {Math.round(activity.avgGrade * 100) / 100}
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
