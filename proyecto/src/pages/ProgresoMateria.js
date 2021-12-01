import React, { Profiler, useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno";
import ProgressBar from "./ProgressBar";
import { ListarLogrosDelCurso } from "./ListarLogrosDelCurso";

const cookies = new Cookies();
export const ProgresoMateria = () => {
  const location = useLocation();
  const { id = "", m = "" } = queryString.parse(location.search);
  const [logros, setLogros] = useState([]);
  const [progreso, setprogreso] = useState([]);

  useEffect(() => {
    getLogros();
    getProgreso();
  }, []);

  const getClassroomProjectsProgress = async (classroomId, userId) => {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;
    const url1 = "classroom/" + classroomId + "/projects";
    let projects = (await axios.get(url1)).data;

    return Promise.all(
      projects.map(async (project) => ({
        name: project.name,
        progress: (
          await axios.get(
            "user/" + userId + "/project/" + project.id + "/progress"
          )
        ).data.percentageCompleted,
      }))
    );
  };

  const getProgreso = () => {
    const prueba = getClassroomProjectsProgress(id, cookies.get("id"));
    prueba.then((rta) => {
      setprogreso(rta);
    });
  };

  const getLogros = async () => {
    const url =
      API_HOST +
      "user/" +
      cookies.get("id") +
      "/classroom/" +
      id +
      "/rewards/all";

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
        alert("ERROR en get Logros");
      });
  };

  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="container animate__animated animate__fadeInUp">
        <div className="container align-items-center text-center mt-2 fondo_general rounded-circle">
          <img
            src={`./materias/${m}.jpg`}
            width="300"
            className="rounded-circle"
          />
        </div>
        <div className="containerAvancesDelCurso animate__animated animate__fadeInUp">
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
        </div>
        <div className="containerLogrosDelCurso animate__animated animate__fadeInUp">
          <div className="container">
            <h2 className="mt-2">Lista de logros obtenidos</h2>
            <div className="card-columns">
              {logros.map((logro) => (
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
