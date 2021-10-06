import React, { useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MenuAlumno.css";
import "../css/PerfilAlumno.css";
import axios from "axios";
import HeaderStudent from "./HeaderAlumno";
import { API_HOST } from "../constants";

const baseUrl = API_HOST + "avatar";
const cookies = new Cookies();
const AlumnoPerfil = () => {
  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = async () => {
    const url = API_HOST + "avatar/" + cookies.get("avatarId");

    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.body);
        cookies.set("body", response.data.body, { path: "/" });
        cookies.set("clothes", response.data.clothes, { path: "/" });
        cookies.set("glasses", response.data.glasses, { path: "/" });
        cookies.set("hat", response.data.hat, { path: "/" });
      })
      .catch((error) => {
        console.log(error);
        alert("ERRORRRR2");
      });
  };

  const handleCambio = () => {
    window.location.href = "ListarAvatars";
  };
  const handleEditOrejas = () => {
    window.location.href = "ListarAccesorios?q=hat";
  };
  const handleEditLentes = () => {
    window.location.href = "ListarAccesorios?q=glasses";
  };
  const handleEditRopa = () => {
    window.location.href = "ListarAccesorios?q=clothes";
  };
  const handleClean = async () => {
    const url = API_HOST + "avatar/";

    cookies.set("clothes", "", { path: "/" });
    cookies.set("glasses", "", { path: "/" });
    cookies.set("hat", "", { path: "/" });

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
        alert("ERRORRRR3");
      });
    window.location.reload();
  };

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  console.log(cookies);
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div>
        <div className="ml-2 animate__animated animate__fadeInUp">
          <br />
          <h2> Informacion de perfil</h2>
          <br />

          <div className="container ">
            <div className="main-body ">
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card align-items-center">
                    <div className="card-body ">
                      <div className="d-flex flex-column align-items-center text-center animate__animated animate__fadeInUp">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Admin"
                          className="rounded-circle"
                          width="150"
                        />
                        <div className="mt-3">
                          <h4>{cookies.get("username")}</h4>
                          <p className="text-secondary mb-1">
                            `Alumno de {cookies.get("studentYear")}-
                            {cookies.get("studentDivision")}`
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-2">Nombre completo</h6>
                        </div>
                        <div className="col-sm text-secondary">
                          {cookies.get("firstName")} {cookies.get("lastName")}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-2">Telefono</h6>
                        </div>
                        <div className="col-sm text-secondary">
                          {cookies.get("homePhone")}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-0">Celular</h6>
                        </div>
                        <div className="col-sm text-secondary">
                          {cookies.get("mobilePhone")}
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb">Direccion</h6>
                        </div>
                        <div className="col-sm text-secondary">
                          {cookies.get("address")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml">
                  <div className="card mb-3">
                    <div className="fondo_avatar card-body">
                      <div>
                        <div>
                          <h2 className="mb-2">Avatar</h2>
                          <button
                            className="btn btn-primary"
                            onClick={handleCambio}
                          >
                            Cambiar
                          </button>

                          <ButtonDropdown
                            className="ml-2"
                            isOpen={dropdownOpen}
                            toggle={toggle}
                          >
                            <DropdownToggle caret>Editar</DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={handleEditOrejas}>
                                Orejas
                              </DropdownItem>
                              <DropdownItem onClick={handleEditLentes}>
                                Lentes
                              </DropdownItem>
                              <DropdownItem onClick={handleEditRopa}>
                                Ropa
                              </DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
                          <button
                            className="btn btn-primary ml-2"
                            onClick={handleClean}
                          >
                            Limpiar
                          </button>
                        </div>
                        <div className="d-flex flex-column align-items-center text-center animate__animated animate__fadeInUp">
                          <img
                            src={`./avatars/${cookies.get("body")}.png`}
                            alt="Avatar"
                            // className="rounded-circle"
                            width="400"
                          />
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          {cookies.get("glasses") !== "" && (
                            <img
                              src={`./accesorios/${cookies.get("glasses")}.png`}
                              alt="Avatar"
                              className="top"
                              width="250"
                            />
                          )}
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          {cookies.get("hat") !== "" && (
                            <img
                              src={`./accesorios/${cookies.get("hat")}.png`}
                              alt="accesorioTop"
                              className="top-cabeza"
                              width="300"
                            />
                          )}
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          {cookies.get("clothes") !== "" && (
                            <img
                              src={`./accesorios/${cookies.get("clothes")}.png`}
                              alt="accesorioTop"
                              className="torso"
                              width="290"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlumnoPerfil;