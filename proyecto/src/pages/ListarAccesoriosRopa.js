import React from "react";
import { accesorios } from "../data/accesorios";
import { SeleccionarAccesoriosRopa } from "./SeleccionarAccesoriosRopa";
import HeaderStudent from "./HeaderAlumno";

export const ListarAccesoriosRopa = () => {
  const ropa = accesorios.filter((accesorio) => accesorio.tipo === "ropa");
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="card-columns">
        {ropa.map((acc) => (
          <SeleccionarAccesoriosRopa {...acc} />
        ))}
      </div>
    </div>
  );
};
