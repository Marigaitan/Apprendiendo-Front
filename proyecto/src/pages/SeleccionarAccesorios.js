import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MenuAlumno.css";
import "../css/PerfilAlumno.css";
import axios from "axios";
import { API_HOST } from "../constants";

export const SeleccionarAccesorios = ({ id }) => {
  const handleSelection = (e) => {
    e.target.setAttribute("src", "https://source.unsplash.com/LYK3ksSQyeo");
    e.target.setAttribute("alt", "dog");
  };

  return (
    <div className="fondo_tarjeta  card ms-3 mt-4" style={{ maxWidth: 200 }}>
      <div className="row no-gutters d-flex flex-row">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={`./accesorios/${id}.png`}
            className="card-img img"
            alt="Avatar"
            width="200"
            onClick={handleSelection}
            style={{ "pointer-events": "all" }}
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
