import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MenuAlumno.css";
import axios from "axios";
import HeaderStudent from "./HeaderAlumno";
import { API_HOST } from "../constants";
import { Button } from "reactstrap";

const cookies = new Cookies();

export default class MenuAlumno extends Component {
  constructor(props) {
    //constructor de mi clase
    super(props);
    this.state = { classrooms: [] };
  }

  async componentDidMount() {
    let classUrl = API_HOST + "user/" + cookies.get("id") + "/classrooms";
    await axios
      .get(classUrl, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        console.log(response);
        const classrooms = response.data.map((classroom) => ({
          name: classroom.subject,
          id: classroom.id,
        }));
        this.setState({ classrooms });
      })
      .catch((error) => {
        console.log(error);
        alert("Aun no tiene cursos asignados");
      });

    const url = API_HOST + "avatar/" + cookies.get("avatarId");

    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        cookies.set("body", response.data.body, { path: "/" });
        cookies.set("clothes", response.data.clothes, { path: "/" });
        cookies.set("glasses", response.data.glasses, { path: "/" });
        cookies.set("hat", response.data.hat, { path: "/" });
      });
  }

  //para que lo redirija al login si no hay token
  redirect = () => {
    if (!cookies.get("token") || cookies.get("role") !== "ROLE_STUDENT") {
      this.props.history.push("/");
    }
  };

  irPerfil = () => {
    alert("aca se ve el perfil de usuario");
  };

  goClassroom(classroomId) {
    this.props.history.push("/menualumno/classroom");
    cookies.set("classid", classroomId, { path: "/" });
  }

  render() {
    console.log("role: " + cookies.get("role"));
    console.log("username: " + cookies.get("username"));
    console.log("id: " + cookies.get("id"));
    console.log("token: " + cookies.get("token"));

    this.redirect();

    // window.onload = this.classroomAssigned;

    return (
      <div className="mainContainer animate__animated animate__fadeIn">
        <HeaderStudent />
        <div className="mainMenuAlumno">
          <div className="titleMenuAlumno">
            <h1>Mis Cursos</h1>
          </div>
          <div className="myProjectcontainer">
            {this.state.classrooms.map((classroom) => {
              //react necesita una key para identif elementos siblings
              return (
                <Button
                  key={classroom.id}
                  className="projectButton"
                  id={classroom.id}
                  onClick={() => this.goClassroom(classroom.id)}
                >
                  {classroom.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
