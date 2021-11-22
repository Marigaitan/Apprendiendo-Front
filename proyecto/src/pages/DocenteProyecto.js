import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import "../css/Global.css";
import axios from "axios";
import ShowDocs from "./ShowDocs";

import { API_HOST } from "../constants";
import {
  Button,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Input,
  FormText,
  Container,
  Row,
  Col,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Badge,
  Alert,
} from "reactstrap";
import HeaderTeacher from "./Header";
import DocenteProgresoGrupo from "./DocenteProgresoGrupo";

import "../css/DocenteProyecto.css";
import VerticalTimelineElement from "./VerticalTimeLineElement";
import VerticalTimeline from "./VerticalTimeline";
import "react-vertical-timeline-component/style.min.css";

import logo from "../Images/logoMini.png";
import Switch from "./Switch";

const cookies = new Cookies();

export default class DocenteProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      lessons: [],
      project: "",
      status: "",
      tareasModal: false,
      alumnos: []
    };
  }

  async getGroupMembers(groupId) {
    let members = (await axios.get("group/" + groupId + "/students")).data;
    return Promise.all(
      members.map((member) => {
        return axios.get("user/" + member.studentId).then((response) => ({
          user: response.data.firstName + " " + response.data.lastName,
          role: member.groupRole,
        }));
      })
    );
  }

  async getFullGroups(projectId) {
    let groups = (await axios.get("project/" + projectId + "/groups")).data;

    return Promise.all(
      groups.map(async (group) => ({
        group: group,
        progress: (await axios.get("group/" + group.id + "/progress")).data,
        members: await this.getGroupMembers(group.id),
      }))
    );
  }

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;

    let classroomId = cookies.get("classid");
    let projectId = cookies.get("projectid");

    this.setState({ groups: await this.getFullGroups(projectId) });
    this.setState({
      lessons: (await axios.get("project/" + projectId + "/lessons")).data,
    });
    this.setState({ project: (await axios.get("project/" + projectId)).data });
    this.setState({
      status: (await axios.get("project/" + projectId)).data.active,
    });

    this.setState({
      alumnos: (await axios.get("classroom/" + classroomId + "/students")).data.map(alumno => ({ id: alumno.id, username: alumno.username })),
    });

    console.log("Grupos:");
    console.log(this.state.groups);
    console.log("Projecto:");
    console.log(this.state.project);
    console.log("Lessons:");
    console.log(this.state.lessons);
    console.log("EL ESTADO:", this.state.status);
  }

  redirect = () => {
    if (!cookies.get("token") || cookies.get("role") !== "ROLE_TEACHER") {
      window.location.href = window.location.origin;
    }
  };

  crearClase = () => {
    this.props.history.push("/menudocente/classroom/proyecto/nuevaclase");
  };

  goClase = (lessonId) => {
    cookies.set("lessonid", lessonId, { path: "/" });
    this.props.history.push("/menudocente/classroom/proyecto/clase");
  };

  opModal = () => {
    this.setState({ tareasModal: true });
  };

  cloModal() {
    this.setState({ tareasModal: false });
  }

  render() {
    const styleButton = {
      width: '50%',
    }
    const flexDivStyle = {
      display: 'flex',
      justifyContent: 'center',
    }

    return (
      <div className="mainContainer">
        <HeaderTeacher />
        <div className="mainProyecto">
          <div className="whitebox">
            <h2>{this.state.project.name}</h2>
          </div>
          <div className="whitebox">
            <Switch
              id={cookies.get("projectid")}
              //status={this.state.status}
              type={"project"}
            />
          </div>

          <div className="mainFlex">
            <div className="left">
              <div >
                <h3>Grupos</h3>
              </div>
              <DocenteProgresoGrupo studentGroups={this.state.groups} />
              {/* {this.state.modal} */}

              <br /><br />
              <div >
                <h3>Tareas entregadas por los alumnos</h3>
              </div>
              <div style={flexDivStyle}>
                <Button style={styleButton} onClick={() =>
                  this.opModal()}>VER TAREAS</Button>
                <Modal isOpen={this.state.tareasModal}>
                  <ModalHeader>
                    TAREAS ENTREGADAS
                  </ModalHeader>
                  <ModalBody>
                    {this.state.alumnos.map((alumno) => {
                      return (
                        <h4
                          key={alumno.id}
                          id={alumno.id}
                        >
                          {alumno.username}
                          
                          <ShowDocs studentID= {alumno.id}/>
                            
                        </h4>
                      );
                    })}
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => this.cloModal()}>Finalizar</Button>
                  </ModalFooter>
                </Modal>
              </div >
            </div>

            <div className="right">
              <div className="center-div">
                <h3>Clases</h3>
              </div>
              <VerticalTimeline layout="2-columns" lineColor={"rgb(225, 206, 81)"}>
                {this.state.lessons.map((lesson) => {
                  return (
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      contentStyle={{
                        background: "rgb(225, 206, 81)",
                        color: "#000000",
                      }}
                      contentArrowStyle={{
                        borderRight: "7px solid  rgb(33, 150, 243)",
                      }}
                      date="1/4 al 10/4"
                      iconStyle={{
                        background: "rgb(225, 206, 81)",
                        color: "#000000",
                      }}
                      icon={<img src={logo} className="small-img" />}
                    >
                      <Button
                        key={lesson.id}
                        size="lg"
                        block
                        onClick={() => this.goClase(lesson.id)}
                      >
                        {lesson.name}
                      </Button>
                    </VerticalTimelineElement>
                  );
                })}
              </VerticalTimeline>
              <div className="center-div">
                <Button
                  color="success"
                  size="lg"
                  onClick={() => this.crearClase()}
                >
                  Crear Clase
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
