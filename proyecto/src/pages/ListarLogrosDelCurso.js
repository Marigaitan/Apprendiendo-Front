import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cookies from "universal-cookie/es6";
import "../css/MenuAlumno.css";
import "../css/ProgresoAlumno.css";

const cookies = new Cookies();

export const ListarLogrosDelCurso = ({ id, reward, name, proyecto }) => {
  return (
    <div className="card ms-3 mt-2" style={{ maxWidth: 120 }}>
      <div className="row no-gutters">
        <h6> {proyecto} </h6>
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
            <p style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>
              {name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
