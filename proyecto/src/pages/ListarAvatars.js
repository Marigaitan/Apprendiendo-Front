import React from "react";
import { avatars } from "../data/avatars";
import { SeleccionarAvatar } from "./SeleccionarAvatar";
import HeaderStudent from "./HeaderAlumno";

export const ListarAvatars = () => {
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="fondo_general card-columns">
        {avatars.map((av) => (
          <SeleccionarAvatar key={av.id} {...av} />
        ))}
      </div>
    </div>
  );
};
