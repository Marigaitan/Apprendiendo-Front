import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useLocation } from "react-router";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/MenuAlumno.css";
import "../css/PerfilAlumno.css";

const cookies = new Cookies();

export const SeleccionarAccesorios = ({ id }) => {
  const location = useLocation();
  // const { q = "" } = queryString.parse(location.search);

  const handleSelection = async (e) => {
    // console.log(e.target);
    // console.log(e.target.alt);
    // cookies.set("body", e.target.alt, { path: "/" });
    const url = API_HOST + "avatar/";
    if (id.startsWith("l")) cookies.set("glasses", e.target.alt, { path: "/" });
    if (id.startsWith("r")) cookies.set("clothes", e.target.alt, { path: "/" });
    if (id.startsWith("o")) cookies.set("hat", e.target.alt, { path: "/" });

    await axios
      .put(
        url,
        {
          id: cookies.get("avatarId"),
          name: "lalala",
          body: cookies.get("body"),
          glasses: cookies.get("glasses"),
          hat: cookies.get("hat"),
          clothes: cookies.get("clothes"),
        },
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      )

      .catch((error) => {
        console.log(error);
        alert("ERRORRRR2");
      });

    window.location.href = "AlumnoPerfil";
    // e.target.setAttribute("src", "https://source.unsplash.com/LYK3ksSQyeo");
    // e.target.setAttribute("alt", "dog");
  };
  return (
    <div className="fondo_tarjeta card ms-3 mt-4" style={{ maxWidth: 200 }}>
      <div className="row no-gutters d-flex flex-row">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={`./accesorios/${id}.png`}
            className="card-img img"
            alt={id}
            width="200"
            onClick={handleSelection}
          />
        </div>
        {/* <div className="col-md-8">
          <div className="card-body ml-4">
            <p style={{ color: "red", fontWeight: "bold" }}>
              Puntaje para desbloquear:
              <span
                style={{ color: "green", fontWeight: "bold", fontSize: "25px" }}
              >
                {" "}
                3000
              </span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};
