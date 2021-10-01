import React from "react";
import { avatars } from "../data/avatars";
import { SeleccionarAvatar } from "./SeleccionarAvatar";
import HeaderStudent from "./HeaderAlumno";

export const ListarAvatars = () => {
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="card-columns">
        {avatars.map((av) => (
          <SeleccionarAvatar {...av} />
        ))}
      </div>
    </div>
  );
};
