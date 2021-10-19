import React, { useState, useEffect } from "react";
import HeaderStudent from "./HeaderAlumno";
import "../css/ProgresoAlumno.css";
import { API_HOST } from "../constants";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { materias } from "../data/materias";
import { logros } from "../data/medallas";
import { ListarLogros } from "./ListarLogros";
import "../css/PerfilAlumno.css";

const cookies = new Cookies();

export const AlumnoProgreso = () => {
  useEffect(() => {
    getClassrooms();
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
        const classrooms = response.data.map((classroom) => ({
          name: classroom.subject,
          id: classroom.id,
        }));
        setClases(classrooms);
      });
  };
  console.log(clases);

  const handleProgress = (e) => {
    window.location.href = `ProgresoMateria?id=${e.target.id}&m=${e.target.name}`;
  };

  return (
    <div className="mainContainer">
      <HeaderStudent />

      <div className="containerLogros">
        <h2 className="align-items-center text-center">
          <br /> Logros obtenidos <br />
        </h2>
        <div className="card-columns">
          {logros.map((logro) => (
            <ListarLogros key={logro.id} {...logro} />
          ))}
        </div>
      </div>

      <div className="containerLogrosCurso">
        <h2 className="align-items-center text-center">
          <br /> Logros por curso <br />
        </h2>
        <div className="containerMaterias">
          {clases.map((classroom) => {
            console.log(classroom.name);
            return (
              <div className="container">
                <div className="row">
                  <div className="col-sm mt-2 mb-4">
                    <img
                      src={`./materias/${classroom.name}.jpg`}
                      className="img"
                      width="200"
                      name={classroom.name}
                      alt={classroom.id}
                      id={classroom.id}
                      key={classroom.id}
                      onClick={handleProgress}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
