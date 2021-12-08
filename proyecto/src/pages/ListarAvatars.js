import React, { useState, useEffect } from "react";
//import { avatars } from "../data/avatars";
import { SeleccionarAvatar } from "./SeleccionarAvatar";
import HeaderStudent from "./HeaderAlumno";
import { API_HOST } from "../constants";
import Cookies from "universal-cookie/es6";
import axios from "axios";

const cookies = new Cookies();
export const ListarAvatars = () => {
  useEffect(() => {
    getAvatars();
  }, []);

  const [avatars, setavatars] = useState([]);
  const getAvatars = async () => {
    const url =
      API_HOST + "user/" + cookies.get("id") + "/avatar/parts/available";

    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        setavatars(response.data.filter((name) => name.startsWith("b")));
      })
      .catch((error) => {
        console.log(error);
        alert("ERROR LIST PARTS");
      });
  };
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div className="fondo_general ml-2 animate__animated animate__fadeInUp align-items-center text-center">
        <br />
        <h2> Haga click en un avatar para seleccionarlo</h2>

        <div className="card-columns">
          {avatars.length !== 0 &&
            avatars.map((av) => <SeleccionarAvatar id={av} />)}
        </div>
      </div>
    </div>
  );
};
