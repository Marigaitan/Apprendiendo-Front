import React from "react";
import queryString from "query-string";
import { accesorios } from "../data/accesorios";
import { SeleccionarAccesorios } from "./SeleccionarAccesorios";
import HeaderStudent from "./HeaderAlumno";
import { useLocation } from "react-router";

export const ListarAccesorios = (tipo) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  console.log(q);

  const filtro = accesorios.filter((accesorio) => accesorio.tipo === q);
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="ml-2 animate__animated animate__fadeInUp align-items-center text-center">
        <br />
        <h2> Haga click en un accesorio para seleccionarlo</h2>
        <div className="fondo_general card-columns">
          {filtro.map((acc) => (
            <SeleccionarAccesorios key={acc.id} {...acc} />
          ))}
        </div>
      </div>
    </div>
  );
};
