import axios from "axios";
import React, { Component } from "react";
import { Label, Table } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/DocenteEditLesson.css";
import HeaderTeacher from "./Header";
import ShowActivity from "./ShowActivity";
import ShowDocs from "./ShowDocs";

const cookies = new Cookies();

export default class CorregirActividades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: undefined,
      activities: [],
      alumnos: [],
    };
  }

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;

    let lesson = (await axios.get("lesson/" + cookies.get("lessonid"))).data;
    let activities = (
      await axios.get("lesson/" + cookies.get("lessonid") + "/activities")
    ).data; //.map(activity =>({ id: activity.documents[0].id, name: activity.documents[0].name})),
    let alumnos = (
      await axios.get("classroom/" + cookies.get("classid") + "/students")
    ).data.map((alumno) => ({ id: alumno.id, username: alumno.username }));

    console.log("lesson");
    console.log(lesson);
    console.log("activities");
    console.log(activities);
    console.log("alumnos");
    console.log(alumnos);

    this.setState({ lesson: lesson, activities: activities, alumnos: alumnos });
  }

  render() {
    return (
      <div className="mainContainer">
        <HeaderTeacher />
        <div className="newClaseForm">
          <div className="whiteBox">
            {/* aca va el nombre de la clase */}
            <div>
              {this.state.lesson && (
                <h1>
                  <Label>{this.state.lesson.name}</Label>
                </h1>
              )}
            </div>
            {/* aca va el enunciado */}
            <div>
              {this.state.lesson && (
                <h3>
                  <Label>{this.state.lesson.description}</Label>
                </h3>
              )}
            </div>
          </div>
          <div className="whiteTable">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Actividades resueltas</th>
                  <th>Documentos subidos por los alumnos</th>
                </tr>
              </thead>
              <tbody>
                {this.state.alumnos.map((alumno, index) => {
                  return (
                    <tr key={alumno.id} id={alumno.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{alumno.username}</td>
                      <td className="width-table">
                        <ShowActivity
                          studentID={alumno.id}
                          activities={this.state.activities}
                        />
                      </td>
                      <td>
                        <ShowDocs
                          studentID={alumno.id}
                          activities={this.state.activities}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
