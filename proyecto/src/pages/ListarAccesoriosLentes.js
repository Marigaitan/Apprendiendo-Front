import React from "react";
import { accesorios } from "../data/accesorios";
import { SeleccionarAccesoriosLentes } from "./SeleccionarAccesoriosLentes";
import HeaderStudent from "./HeaderAlumno";

export const ListarAccesoriosLentes = () => {
  const lentes = accesorios.filter((accesorio) => accesorio.tipo === "lentes");
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="card-columns">
        {lentes.map((acc) => (
          <SeleccionarAccesoriosLentes {...acc} />
        ))}
      </div>
    </div>
  );
};
