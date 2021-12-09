import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import "../css/Global.css";
import "../css/MenuAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderAdmin from "./HeaderAdmin";

const cookies = new Cookies();

export default class MenuAdmin extends Component {
  redirect() {
    //para que lo redirija al login si no hay token
    if (!cookies.get("token") || cookies.get("role") !== "ROLE_ADMIN") {
      this.props.history.push("/");
    }
  }

  render() {
    console.log("role: " + cookies.get("role"));
    console.log("username: " + cookies.get("username"));
    this.redirect();
    return (
      <div className="mainContainer">
        <HeaderAdmin />
        <div className="secContainer">
          <button
            className="classButton"
            id="12"
            onClick={() => this.goDocenteAbm()}
          >
            {"Docentes"}{" "}
          </button>
          <button
            className="classButton"
            id="12"
            onClick={() => this.goAlumnosAbm()}
          >
            {"Alumnos"}{" "}
          </button>
          <button
            className="classButton"
            id="12"
            onClick={() => this.goCursosAbm()}
          >
            {"Cursos"}{" "}
          </button>
        </div>
      </div>
    );
  }
  goDocenteAbm() {
    this.props.history.push("/menuAdmin_docente_abm");
  }
  goAlumnosAbm() {
    this.props.history.push("/menuAdmin_alumno_abm");
  }

  goCursosAbm() {
    this.props.history.push("/menuAdmin/cursos_abm");
  }
}
