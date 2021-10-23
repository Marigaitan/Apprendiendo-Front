import React from "react";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MenuAlumno.css";
import "../css/ProgresoAlumno.css";
import axios from "axios";
import { API_HOST } from "../constants";

const cookies = new Cookies();

export const ListarLogrosDelCurso = ({ id, reward, name }) => {
  return (
    <div className="card ms-3 mt-2" style={{ maxWidth: 120 }}>
      <div className="row no-gutters">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={`./medallas_cursos/${reward}.png`}
            alt={id}
            // className="card-img img"
            width="100"
          />
        </div>
        <div>
          <div>
            <p style={{ color: "red", fontWeight: "bold" }}>{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
