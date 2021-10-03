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
  const handleSelection = () => {
    return [];
  };
  return (
    <div className="fondo_tarjeta card ms-3 mt-4" style={{ maxWidth: 240 }}>
      <div className="row no-gutters">
        <div className="d-flex flex-column align-items-center text-center animate__animated animate__fadeInUp">
          <img
            src={`./${tipo}/${id}.png`}
            alt="Avatar"
            className="card-img"
            width="200"
            onClick={handleSelection}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body ml-4">
            <p style={{ color: "red", fontWeight: "bold" }}>
              Puntaje para desbloquear:
              <span style={{ color: "green", fontWeight: "bold" }}> 3000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
