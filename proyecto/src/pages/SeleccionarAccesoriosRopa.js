import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MenuAlumno.css";
import "../css/PerfilAlumno.css";
import axios from "axios";
import { API_HOST } from "../constants";

export const SeleccionarAccesoriosRopa = ({ id }) => {
  return (
    <div className="fondo_tarjeta  card ms-3 mt-4" style={{ maxWidth: 250 }}>
      <div className="row no-gutters d-flex flex-row">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={`./accesorios/${id}.png`}
            className="card-img"
            alt="Avatar"
            width="200"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body ml-4">
            {/* <h5 className="card-title"> {nombre} </h5> */}

            <Link to={``}>Seleccionar.....</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
