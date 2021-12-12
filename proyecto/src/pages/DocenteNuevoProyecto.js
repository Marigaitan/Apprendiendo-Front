import React, { Component } from "react";
import { Label, Nav, NavItem, NavLink } from "reactstrap";
import "../css/Global.css";
import "../css/DocenteClassroom.css";
import HeaderTeacher from "./Header";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import axios from "axios";
import { Button } from "reactstrap";
import NavDocente from "./NavDocente";

const cookies = new Cookies();

export default class DocenteNuevoProyecto extends Component {
  constructor(props) {
    //constructor de mi clase
    super(props);
    this.state = {
      subject: "",
      year: 0,
      division: "",
      teacherId: -1,
      teacherName: "",
      methodologies: [],
      methodologyId: -1,
      form: { name: "Nuevo Proyecto" },
    };
  }

  async componentDidMount() {
    let classparamUrl = API_HOST + "classroom/" + cookies.get("classid");
    let getTeacherUrl = API_HOST + "user/";
    let getMethodologiesUrl = API_HOST + "methodologies";

    //AXIOS
    const requestOne = axios.get(classparamUrl, {
      headers: { Authorization: cookies.get("token") },
    });
    const requestFour = axios.get(getMethodologiesUrl, {
      headers: { Authorization: cookies.get("token") },
    });

    await axios
      .all([requestOne, requestFour])
      .then(
        axios.spread((classData, methodologiesData) => {
          console.log(classData.data, methodologiesData.data);
          //SET DATA
          const subject = classData.data.subject;
          const year = classData.data.year;
          const division = classData.data.division;
          const teacherId = classData.data.teacherId;

          const methodologies = methodologiesData.data.map((methodology) => ({
            id: methodology.id,
            name: methodology.name,
          }));

          //SET STATE
          this.setState({
            subject: subject,
            year: year,
            teacherId: teacherId,
            division: division,

            methodologies: methodologies,
          });
          return axios.get(getTeacherUrl + classData.data.teacherId, {
            headers: { Authorization: cookies.get("token") },
          });
        })
      )
      .then((response) => {
        const teacherName = response.data.username;
        console.log(response);
        this.setState({ teacherName: teacherName });
      })
      .catch((error) => console.log(error));
  }
  goStandarProject() {
    window.location.href = "/menudocente_classroom_nuevoproyecto_estandar";
  }
  goFlippedProject() {
    window.location.href = "/menudocente_classroom_nuevoproyecto_aulainvertida";
  }
  goPblProject() {
    window.location.href = "/menudocente_classroom_nuevoproyecto_pbl";
  }

  goTblProject() {
    window.location.href = "/menudocente_classroom_nuevoproyecto_tbl";
  }

  render() {
    return (
      <div className="mainContainer">
        <HeaderTeacher />

        <div className="containerDocenteClassroom">
          <div className="navBar">
            <h1>
              {this.state.subject +
                " " +
                this.state.year.toString() +
                "°" +
                this.state.division}
            </h1>
            <NavDocente activeBar="nuevoProyecto" />
          </div>
          <br />
          <div className="newProjectContainer">
            <div className="newProjectBox">
              <h2>Metodología Basada en Proyecto</h2>
              <Button color="success" onClick={() => this.goPblProject()}>
                Crear Proyecto
              </Button>
            </div>
            <div className="newProjectBox">
              <h2>Metodología Basada en el Pensamiento</h2>
              <Button color="success" onClick={() => this.goTblProject()}>
                Crear Proyecto
              </Button>
            </div>
            <div className="newProjectBox">
              <h2>Aula Invertida</h2>
              <Button color="success" onClick={() => this.goFlippedProject()}>
                Crear Proyecto
              </Button>
            </div>
            <div className="newProjectBox">
              <h2>Proyecto Estándar</h2>
              <Button color="success" onClick={() => this.goStandarProject()}>
                Crear Proyecto
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
