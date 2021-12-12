import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cookies from "universal-cookie/es6";

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
