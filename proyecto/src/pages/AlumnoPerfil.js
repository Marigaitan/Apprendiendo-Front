import React from "react";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MenuAlumno.css";
import "../css/PerfilAlumno.css";
import axios from "axios";
import HeaderStudent from "./HeaderAlumno";
import { API_HOST } from "../constants";
import NavBarAlumnoPerfil from "./NavBarAlumnoPerfil";

const AlumnoPerfil = () => {
  return (
    <div className="mainContainer">
      <HeaderStudent />
      <div>
        <div>
          <NavBarAlumnoPerfil />
        </div>
        <div className="ml-4">
          <br />
          <h2> Informacion de perfil</h2>
          <br />

          <div class="container ">
            <div class="main-body ">
              <div class="row gutters-sm">
                <div class="col-md-4 mb-3">
                  <div class="card align-items-center">
                    <div class="card-body ">
                      <div class="d-flex flex-column align-items-center text-center">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Admin"
                          class="rounded-circle"
                          width="150"
                        />
                        <div class="mt-3">
                          <h4>Pepito Gomez</h4>
                          <p class="text-secondary mb-1">Alumno de 3</p>
                          <p class="text-muted font-size-sm">
                            Caballito Capital Federal
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-4">
                          <h6 class="mb-2">Nombre completo</h6>
                        </div>
                        <div class="col-sm text-secondary">Pepito Gomez</div>
                      </div>
                      <hr />
                      <div class="row"></div>

                      <div class="row">
                        <div class="col-sm-4">
                          <h6 class="mb-2">Telefono</h6>
                        </div>
                        <div class="col-sm text-secondary">(011) 81629029</div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-4">
                          <h6 class="mb-0">Mobile</h6>
                        </div>
                        <div class="col-sm text-secondary">(011) 380-4539</div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-4">
                          <h6 class="mb">Direccion</h6>
                        </div>
                        <div class="col-sm text-secondary">
                          Del barco centenera 2345
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-12"></div>
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
