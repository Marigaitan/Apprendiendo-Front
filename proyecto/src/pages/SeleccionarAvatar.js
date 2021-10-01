import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MenuAlumno.css";
import "../css/PerfilAlumno.css";
import axios from "axios";
import { API_HOST } from "../constants";

export const SeleccionarAvatar = ({ id, tipo }) => {
  console.log(id);
  console.log(tipo);
  return (
    <div className="card ms-3 mt-4" style={{ maxWidth: 240 }}>
      <div className="row no-gutters">
        <div className="d-flex flex-column align-items-center text-center animate__animated animate__fadeInUp">
          <img
            src={`./${tipo}/${id}.png`}
            alt="Avatar"
            className="card-img"
            width="200"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body ml-4">
            {/* <h5 className="card-title"> {nombre} </h5> */}

            <Link className="ml-4" to={``}>
              Seleccionar.....
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
