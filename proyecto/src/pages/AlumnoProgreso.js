import React, { useState, useEffect } from "react";
import HeaderStudent from "./HeaderAlumno";
import "../css/ProgresoAlumno.css";
import { API_HOST } from "../constants";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { materias } from "../data/materias";

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

  useEffect(() => {
    getLogros();
  }, []);

  const [logros, setLogros] = useState([
    {
      id: "",
      name: "",
      conditionId: "",
      text: "",
      data: "",
      targetType: "",
      targetId: "",
      imageData: "",
      rewardType: "",
    },
  ]);

  const getLogros = async () => {
    const url = API_HOST + "user/" + cookies.get("id") + "/rewards/";
    console.log(url);
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
        alert("ERRORRRR2");
      });
  };

  const filtro1 = logros.filter((imagen) => imagen.imageData);
  const filtro2 = filtro1.filter((imagen) => !imagen.targetId);
  const filtroa = filtro2.filter((imagen) => !imagen.imageData.startsWith("b"));
  const filtrob = filtroa.filter((imagen) => !imagen.imageData.startsWith("o"));
  const filtroc = filtrob.filter((imagen) => !imagen.imageData.startsWith("l"));
  const filtrod = filtroc.filter(
    (imagen) => !imagen.imageData.startsWith("mc")
  );
  const filtro = filtrod.filter((imagen) => !imagen.imageData.startsWith("r"));

  console.log("este filtro", filtro);
  console.log("CLASESSS:", clases);
  return (
    <div className="mainContainer">
      <HeaderStudent />

      <div className="fondo_general containerLogros animate__animated animate__fadeIn">
        <h2 className="align-items-center text-center">
          <br /> Insignias Apprendiendo <br />
        </h2>

        <div className="card-columns">
          {filtro.map((logro) => (
            <ListarLogros
              key={logro.id}
              medalla={logro.imageData}
              nombre={logro.name}
              texto={logro.text}
            />
          ))}
        </div>
      </div>

      <div className="fondo_general containerLogrosCurso animate__animated animate__fadeIn">
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
