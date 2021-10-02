import React from "react";
import { accesorios } from "../data/accesorios";
import { SeleccionarAccesoriosOrejas } from "./SeleccionarAccesoriosOrejas";
import HeaderStudent from "./HeaderAlumno";

export const ListarAccesoriosOrejas = () => {
  const orejas = accesorios.filter((accesorio) => accesorio.tipo === "orejas");
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="card-columns">
        {orejas.map((acc) => (
          <SeleccionarAccesoriosOrejas {...acc} />
        ))}
      </div>
    </div>
  );
};
