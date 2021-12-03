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
  const [aux, setaux] = useState([]);

  useEffect(() => {
    getAux();
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

  const getAux = () => {
    const aux = getLogrosDeProjects();
    aux.then((rta) => {
      setaux(rta);
    });
  };

  const getLogrosDeProjects = async () => {
    let classroomLessons = (await axios.get("classroom/" + id + "/projects"))
      .data;
    return Promise.all(
      classroomLessons.map(async (project) => ({
        projectName: project.name,
        rewards: (
          await axios.get(
            "user/" + cookies.get("id") + "/project/" + project.id + "/rewards"
          )
        ).data,
        lessons: await getLogrosDeLessons(project),
      }))
    );
  };

  const getLogrosDeLessons = async (project) => {
    let projectLessons = (await axios.get("project/" + project.id + "/lessons"))
      .data;
    return Promise.all(
      projectLessons.map(async (lesson) => ({
        lessonName: lesson.name,
        activities: await getLogrosDeActivities(lesson),
      }))
    );
  };

  const getLogrosDeActivities = async (lesson) => {
    return Promise.all(
      lesson.activities.map(async (activity) => ({
        activityName: activity.name,
        rewards: (
          await axios.get(
            "user/" +
              cookies.get("id") +
              "/activity/" +
              activity.id +
              "/rewards"
          )
        ).data,
      }))
    );
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

  console.log("AUUUUXXX:", aux);

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
        <div className="fondo_general containerAvancesDelCurso animate__animated animate__fadeInUp">
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
        <div className="fondo_general containerLogrosDelCurso animate__animated animate__fadeInUp">
          <div className="container">
            <h2 className="mt-2">Lista de logros obtenidos en proyectos</h2>
            <div className="card-columns">
              {aux.map((logro) =>
                logro.rewards.map((reward) => (
                  <ListarLogrosDelCurso
                    key={reward.id}
                    reward={reward.imageData}
                    name={reward.name}
                    proyecto={logro.projectName}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="fondo_general containerLogrosDelCurso animate__animated animate__fadeInUp">
          <div className="container">
            <h2 className="mt-2">Lista de logros obtenidos en actividades</h2>
            <div className="card-columns">
              {aux.map((logro) =>
                logro.lessons.map((lesson) =>
                  lesson.activities.map((activity) =>
                    activity.rewards.map((reward) => (
                      <ListarLogrosDelCurso
                        key={reward.id}
                        reward={reward.imageData}
                        name={reward.name}
                        proyecto={activity.activityName}
                      />
                    ))
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
