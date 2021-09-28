import React from "react";
import { accesorios } from "../data/accesorios";
import { SeleccionarAccesorios } from "./SeleccionarAccesorios";
import HeaderStudent from "./HeaderAlumno";

export const ListarAccesorios = () => {
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="card-columns">
        {accesorios.map((acc) => (
          <SeleccionarAccesorios {...acc} />
        ))}
      </div>
    </div>
  );
};
