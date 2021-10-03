import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { avatars } from "../data/avatars";
import { useHistory } from "react-router-dom";

import { API_HOST } from "../constants";

const cookies = new Cookies();

const AlumnoPerfil = () => {
  const handleCambio = () => {
    window.location.href = "ListarAvatars";
  };

  const handleEditOrejas = () => {
    window.location.href = "ListarAccesorios?q=orejas";
  };
  const handleEditLentes = () => {
    window.location.href = "ListarAccesorios?q=lentes";
  };
  const handleEditRopa = () => {
    window.location.href = "ListarAccesorios?q=ropa";
  };

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

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
                          <p className="text-secondary mb-1">Alumno de 3</p>
                          <p className="text-muted font-size-sm">
                            Caballito Capital Federal
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
                          Nazareno Anselmi
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-2">Telefono</h6>
                        </div>
                        <div className="col-sm text-secondary">
                          (011) 81629029
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb-0">Mobile</h6>
                        </div>
                        <div className="col-sm text-secondary">
                          (011) 380-4539
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-4">
                          <h6 className="mb">Direccion</h6>
                        </div>
                        <div className="col-sm text-secondary">
                          Del barco centenera 2345
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
                        </div>
                        <div className="d-flex flex-column align-items-center text-center animate__animated animate__fadeInUp">
                          <img
                            src={`./avatars/0005.png`}
                            alt="Avatar"
                            // className="rounded-circle"
                            width="400"
                          />
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <img
                            src={`./accesorios/l0004.png`}
                            alt="Avatar"
                            className="top"
                            width="250"
                          />
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <img
                            src={`./accesorios/o0004.png`}
                            alt="accesorioTop"
                            className="top-cabeza"
                            width="300"
                          />
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <img
                            src={`./accesorios/r0005.png`}
                            alt="accesorioTop"
                            className="torso"
                            width="290"
                          />
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
