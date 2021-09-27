import React from "react";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MenuAlumno.css";
import "../css/PerfilAlumno.css";
import axios from "axios";
import HeaderStudent from "./HeaderAlumno";
import { API_HOST } from "../constants";
import foto from "../avatars/0001.png";

const cookies = new Cookies();

const AlumnoPerfil = () => {
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div>
        <div className="ml-2">
          <br />
          <h2> Informacion de perfil</h2>
          <br />

          <div className="container ">
            <div className="main-body ">
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card align-items-center">
                    <div className="card-body ">
                      <div className="d-flex flex-column align-items-center text-center">
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
                          Pepito Gomez
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
                    <div className="card-body">
                      <div>
                        <div>
                          <h2 className="mb-2">Avatar</h2>
                          <button class="btn btn-primary">Cambiar</button>
                          <button class="btn btn-outline-primary ml-2">
                            Editar
                          </button>
                        </div>
                        <div className="d-flex flex-column align-items-center text-center">
                          <img
                            src={foto}
                            alt="Avatar"
                            className="rounded-circle"
                            width="400"
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
