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
export const docenteMetricas = () => {
  useEffect(() => {
    getClassrooms();
    getStuedents();
  }, []);

  const [clases, setClases] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const getClassrooms = async () => {
    const url = API_HOST + "user/" + cookies.get("id") + "/classrooms";

    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        console.log("CERO RESPUESTA:", response);
        const classrooms = response.data.map((classroom) => ({
          name: classroom.subject,
          id: classroom.id,
        }));
        setClases(classrooms);
      });
  };

  const getStuedents = async () => {
    //const url54 =
    //API_HOST + "​statistics/teacher/" + cookies.get("id") + "/students";
    const url2 = "http://localhost:8080/statistics/teacher/42/activities";
    console.log(url2);
    //console.log(url54);
    await axios
      .get(url2, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        console.log("PRIMER RESPUESTA:", response);
        // const classrooms = response.data.map((classroom) => ({
        //   name: classroom.subject,
        //   id: classroom.id,
        // }));
        // setClases(classrooms);
      });
  };

  return (
    <div className="mainContainer">
      <HeaderTeacher />
      <div className="navBar">
        <h1> METRICAS</h1>
        <NavMetricas activeBar="Materias" />

        <div className="ml-2 mt-2">
          <h2>Metricas por curso</h2>
          <br />

          {clases.map((classroom) => {
            return (
              <div>
                {/* {classroom.name} */}
                <div className="containerAvancesDelCurso animate__animated animate__fadeInUp">
                  <div className="container mb-4">
                    <h2>Metrica de {classroom.name} </h2>
                  </div>

                  <ProgressBar
                    key={classroom.id}
                    bgcolor="#6a1b9a"
                    completed="80"
                    tarea="Titulo"
                  />
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
