import axios from "axios";
import React, { Component } from "react";
import "react-vertical-timeline-component/style.min.css";
import {
  Button
} from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/DocenteProyecto.css";
import "../css/Global.css";
import Background from "../Images/fondoLetras.png";
import logo from "../Images/logoMini.png";
import DocenteProgresoGrupo from "./DocenteProgresoGrupo";
import HeaderTeacher from "./Header";
import NavDocenteProyecto from "./NavDocenteProyecto";
import Switch from "./Switch";
import VerticalTimeline from "./VerticalTimeline";
import VerticalTimelineElement from "./VerticalTimeLineElement";




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
      alumnos: [],
      openExportarModal: false,
      templateName: "",
      templateDescription: ""
    };
  }

  handleChange = (e) => {
    //con este metodo guardamos en el estado el valor del input
    console.log(e.target.value);

    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  exportarModal() {
    return(
      <Modal isOpen={this.state.openExportarModal}>
      <ModalHeader className="title">
        <h3 className="title">Exportar a repositorio:</h3>
      </ModalHeader>
      <ModalBody>
        <div>
          <h2>Nombre del template:</h2>
          <FormGroup>
            <Input type="textarea" name="templateName" id="exampleText" onChange={this.handleChange} />
          </FormGroup>
        </div>
        <div>
          <h2>Descripción:</h2>
          <FormGroup>
            <Input type="textarea" name="templateDescription" id="exampleText" onChange={this.handleChange} />
          </FormGroup>
        </div>
      </ModalBody>
      <ModalFooter className="modalFooter">
        <Button color="secondary" onClick={() => this.exportar()}>Exportar y Cerrar</Button>
      </ModalFooter>
    </Modal>
    )
  }

  async exportar() {
    const template = {
      name: this.state.templateName,
      description: this.state.templateDescription,
      methodologyId: this.state.project.methodologyId,
      templateType: "PROJECT",
      template: JSON.stringify((await axios.get("project/" + cookies.get("projectid") + "/template")).data),
      ownerId: cookies.get("id")
    }

    axios.post("template", template, { headers: { 'Authorization': cookies.get('token')}});
    this.setState({openExportarModal:false});
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

    cookies.set("project", this.state.project, { path: "/" });
    
    let lessons = (await axios.get("project/" + projectId + "/lessons")).data;
    this.setState({
      lessons: lessons,
    });
    
    let groups = await this.getFullGroups(projectId);
    let project = (await axios.get("project/" + projectId)).data ;
    let status = (await axios.get("project/" + projectId)).data.active;
    let alumnos = (await axios.get("classroom/" + classroomId + "/students")).data.map((alumno) => ({ id: alumno.id, username: alumno.username }));
    this.setState({
      groups: groups, project: project, status: status, alumnos: alumnos,
    });
    
    console.log("Grupos:");
    console.log(groups);
    console.log("Projecto:");
    console.log(project);
    console.log("Lessons:");
    console.log(lessons);
    console.log("EL ESTADO:", status);
    console.log("Alumnos:");
    console.log(alumnos);

  }

  redirect = () => {
    if (!cookies.get("token") || cookies.get("role") !== "ROLE_TEACHER") {
      window.location.href = window.location.origin;
    }
  };

  crearClase = () => {
    this.props.history.push("/menudocente_classroom_proyecto_nuevaclase");
  };

  goClase = (lessonId) => {
    cookies.set("lessonid", lessonId, { path: "/" });
    this.props.history.push("/menudocente_classroom_proyecto_clase");
  };

  goEditGroups = () => {
    this.props.history.push("/menudocente_classroom_proyecto_edit_teams");
  };

  render() {
    const styleButton = {
      width: "50%",
    };
    const flexDivStyle = {
      display: "flex",
      justifyContent: "center",
    };

    const mainStyle = {
      backgroundImage: "url(" + Background + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };

    return (
      <div className="mainContainer" style={mainStyle}>
        {this.exportarModal()}
        <HeaderTeacher />
        <div className="mainProyecto">
          <div className="whiteboxTitle">
            <h2>{this.state.project.name}</h2>
            <h5>{this.state.project.description}</h5>
            <NavDocenteProyecto />
          </div>
          <div className="whiteboxTitle">
            <Switch
              id={cookies.get("projectid")}
              //status={this.state.status}
              type={"project"}
            />
          </div>

          <div className="mainFlex">
            <div className="left">
              <div className="flex-start">
                <h3>Equipos</h3>
                <Button onClick={this.goEditGroups} color="success" size="lg">
                  Editar equipos
                </Button>
              </div>
              <DocenteProgresoGrupo studentGroups={this.state.groups} />
              {/* {this.state.modal} */}
            </div>

            <div className="right">
              <div className="center-div">
                <h3>Clases</h3>
              </div>
              <VerticalTimeline
                layout="2-columns"
                lineColor={"rgb(225, 206, 81)"}
              >
                {this.state.lessons.map((lesson) => {
                  return (
                    <VerticalTimelineElement
                      key={lesson.id}
                      className="vertical-timeline-element--work"
                      contentStyle={{
                        background: "rgb(225, 206, 81)",
                        color: "#000000",
                      }}
                      // contentArrowStyle={{
                      //   borderRight: "7px solid  rgb(33, 150, 243)",
                      // }}
                      // date="1/4 al 10/4"
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
              <Button color="secondary" onClick={() => this.setState({openExportarModal:true})}>Exportar Proyecto</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
