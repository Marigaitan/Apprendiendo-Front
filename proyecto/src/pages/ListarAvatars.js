import React from "react";
import { avatars } from "../data/avatars";
import { SeleccionarAvatar } from "./SeleccionarAvatar";
import HeaderStudent from "./HeaderAlumno";

export const ListarAvatars = () => {
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="fondo_general ml-2 animate__animated animate__fadeInUp align-items-center text-center">
        <br />
        <h2> Haga click en un avatar para seleccionarlo</h2>

        <div className="card-columns">
          {avatars.map((av) => (
            <SeleccionarAvatar key={av.id} {...av} />
          ))}
        </div>
      </div>
    </div>
  );
};
