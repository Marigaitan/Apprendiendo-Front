import React from "react";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/MenuAlumno.css";
// import "../css/ProgresoAlumno.css";
import axios from "axios";
import { API_HOST } from "../constants";

const cookies = new Cookies();

const ListarLogrosPorCurso = ({ id }) => {
  return (
    <div>
      <img
        src={`/medallas_cursos/${id}.png`}
        alt={id}
        width="50"
      />
    </div>
  );
};

export default ListarLogrosPorCurso;
