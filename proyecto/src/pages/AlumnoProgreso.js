import React, { useState, useEffect } from "react";
import HeaderStudent from "./HeaderAlumno";
import "../css/ProgresoAlumno.css";
import { API_HOST } from "../constants";
import Cookies from "universal-cookie/es6";
import axios from "axios";

const cookies = new Cookies();

export const AlumnoProgreso = () => {
  useEffect(() => {
    getClassrooms();
  }, []);

  const [clases, setClases] = useState([
    {
      id: "1",
      name: "name",
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

  return (
    <div className="mainContainer">
      <HeaderStudent />

      <div className="containerLogros">
        <h2 className="align-items-center text-center">
          <br /> Logros obtenidos <br />
        </h2>
      </div>

      <div className="containerLogrosCurso">
        <h2 className="align-items-center text-center">
          <br /> Logros por curso <br />
        </h2>
        {clases.map((classroom) => {
          return (
            <button
              key={classroom.id}
              // className="Buttons"
              id={classroom.id}
              // onClick=""
            >
              {classroom.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
