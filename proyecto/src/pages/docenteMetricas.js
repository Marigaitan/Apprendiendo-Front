import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import HeaderStudent from "./HeaderAlumno";
import { API_HOST } from "../constants";
import "../css/Global.css";
import "../css/MenuDocente.css";
import HeaderTeacher from "./Header";
import Background from "../Images/fondoLetras.png";
import { Button } from "reactstrap";

const cookies = new Cookies();
export const docenteMetricas = () => {
  return (
    <div className="mainContainer">
      <HeaderTeacher />
      <div className="secContainer">
        <div className="misCursos">
          <h1 id="Title">
            <b>Metricas</b>
          </h1>
        </div>
      </div>
    </div>
  );
};
