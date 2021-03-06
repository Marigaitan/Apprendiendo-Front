import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/MenuAlumno.css";
import "../css/PerfilAlumno.css";

const cookies = new Cookies();

export const SeleccionarAvatar = ({ id }) => {
  const handleSelection = async (e) => {
    console.log(e.target);
    console.log(e.target.alt);
    // cookies.set("body", e.target.alt, { path: "/" });
    const url = API_HOST + "avatar/";

    await axios
      .put(
        url,
        {
          id: cookies.get("avatarId"),
          name: "lalala",
          body: e.target.alt,
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

    cookies.set("body", e.target.alt, { path: "/" });
    window.location.href = "AlumnoPerfil";
    // e.target.setAttribute("src", "https://source.unsplash.com/LYK3ksSQyeo");
    // e.target.setAttribute("alt", "dog");
  };

  return (
    <div className="fondo_tarjeta card ms-3 mt-4" style={{ maxWidth: 240 }}>
      <div className="row no-gutters">
        <div className="d-flex flex-column align-items-center text-center animate__animated animate__fadeInUp">
          <img
            src={`./avatars/${id}.png`}
            alt={id}
            className="card-img img"
            width="200"
            onClick={handleSelection}
          />
        </div>
        {/* <div className="col-md-8">
          <div className="card-body ml-4">
            <p style={{ color: "red", fontWeight: "bold" }}>
              Puntaje para desbloquear:
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
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
