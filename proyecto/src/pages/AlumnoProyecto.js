import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/AlumnoProyecto.css";
import "../css/Global.css";
import "../css/VerticalTimeLine.css";
import "../css/VerticalTimeLineElement.css";
import LogoMini from "../Images/logoMini.png";
import HeaderStudent from "./HeaderAlumno";
import VerticalTimelineElement from "./VerticalTimeLineElement";

const cookies = new Cookies();

VerticalTimeline.PropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool,
  layout: PropTypes.oneOf([
    "1-column-left",
    "1-column",
    "2-columns",
    "1-column-right",
  ]),
};

VerticalTimeline.defaultProps = {
  animate: true,
  className: "",
  layout: "2-columns",
};

export default class AlumnoProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grupo: "",
      integrantes: [],
      lessons: [],
      activeLessons: [],
      project: "",
    };
  }

  async getGroupMembers(studentId, projectId) {
    let grupo = (
      await axios.get("project/" + projectId + "/groups/student/" + studentId)
    ).data;
    if (grupo.id != undefined) {
      let miembros = (await axios.get("group/" + grupo.id + "/students")).data;
      return Promise.all(
        miembros.map((miembro) => {
          return axios.get("user/" + miembro.studentId).then((response) => ({
            name: response.data.firstName + " " + response.data.lastName,
            role: miembro.groupRole,
          }));
        })
      );
    } else return [];
  }

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;
    await axios
      .get("project/" + cookies.get("projectid") + "/lessons")
      .then((response) => {
        console.log("LA RESPONSE:", response);
        const lessons = response.data.map((lessons) => ({
          name: lessons.name,
          id: lessons.id,
          description: lessons.description,
          status: lessons.active,
        }));
        const activeLessons = lessons.filter(
          (lesson) => lesson.status === true
        );
        this.setState({ lessons: lessons, activeLessons: activeLessons });
        this.setState({ project: response.data[0].project.name });
      })
      .catch((error) => {
        console.log(error);
        alert("Aun no hay clases");
      });

    await this.getGroupMembers(cookies.get("id"), cookies.get("projectid"))
      .then((response) => {
        const integrantes = response.map((integrantes) => ({
          name: integrantes.name,
          role: integrantes.role,
        }));
        this.setState({ integrantes });
        console.log(integrantes);
      })
      .catch((error) => {
        console.log(error);
        alert("Aun no hay alumnos en este grupo");
      });
  }

  goLesson = (id) => {
    this.props.history.push("/menualumno_classroom_proyecto_clase");
    cookies.set("lessonid", id, { path: "/" });
  };

  render() {
    return (
      <div className="mainContainer">
        <HeaderStudent />
        <div className="AlumnoProyecto">
          <div className="titleAlumnoProyecto">
            <h2>{this.state.project}</h2>
          </div>
          <div className="myProject">
            <div className="availableLessons">
              <h2>Clases</h2>
              <VerticalTimeline>
                {this.state.activeLessons.map((lessons) => {
                  return (
                    <VerticalTimelineElement
                      key={lessons.id}
                      id={lessons.id}
                      className="vertical-timeline-element--work"
                      contentStyle={{ background: "rgb(225, 206, 81)", color: "#000000", }}
                      contentArrowStyle={{
                        borderRight: "7px solid  rgb(33, 150, 243)",
                      }}
                      iconStyle={{
                        background: "rgb(225, 206, 81)",
                        color: "#000000",
                      }}
                      icon={<img src={LogoMini} className="smallImgAlumnoProyecto" />}
                      iconOnClick={() => this.goLesson(lessons.id)}
                      align="alternate"
                    >
                      <h3 className="vertical-timeline-element-title">
                        {lessons.name}
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        {lessons.description}
                      </h4>
                    </VerticalTimelineElement>
                  );
                })}
              </VerticalTimeline>
            </div>
            <div className="myTeam">
              <h2>Mi Equipo</h2>
              <div>
                {this.state.integrantes.map((integrantes) => {
                  return (
                    <div key={integrantes.id} id={integrantes.id}>
                      <h4>{integrantes.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
