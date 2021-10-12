import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno";

const cookies = new Cookies();
export const ProgresoMateria = () => {
  const location = useLocation();
  const { id = "", m = "" } = queryString.parse(location.search);
  console.log(id);
  console.log(m);

  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="ml-2">Progreso en {m}</div>
    </div>
  );
};
