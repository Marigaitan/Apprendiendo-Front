import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Button } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/AlumnoClassroom.css";
import "../css/Global.css";
import HeaderStudent from "./HeaderAlumno";

const cookies = new Cookies();

export default class AlumnoClassroom extends Component {
  constructor(props) {
    //constructor de mi clase
    super(props);
    this.state = {
      subject: "",
      year: 0,
      division: "",
      teacherId: -1,
      students: [],
      projects: [],
      activeProjects: [],
      teacherName: "",
    };
  }

  async componentDidMount() {
    let classparamUrl = API_HOST + "classroom/" + cookies.get("classid");
    let getStudentsUrl =
      API_HOST + "classroom/" + cookies.get("classid") + "/students";
    let getProjectsUrl =
      API_HOST + "classroom/" + cookies.get("classid") + "/projects";
    let getTeacherUrl = API_HOST + "user/";

    //AXIOS
    const requestOne = axios.get(classparamUrl, {
      headers: { Authorization: cookies.get("token") },
    });
    const requestTwo = axios.get(getStudentsUrl, {
      headers: { Authorization: cookies.get("token") },
    });
    const requestThree = axios.get(getProjectsUrl, {
      headers: { Authorization: cookies.get("token") },
    });
    const requestFour = axios.get(getStudentsUrl, {
      headers: { Authorization: cookies.get("token") },
    });

    await axios
      .all([requestOne, requestTwo, requestThree, requestFour])
      .then(
        axios.spread((classData, studentsData, projectsData, teachersData) => {
          console.log(
            classData.data,
            studentsData,
            projectsData.data,
            teachersData
          );

          //SET DATA
          const subject = classData.data.subject;
          const year = classData.data.year;
          const division = classData.data.division;
          const teacherId = classData.data.teacherId;

          const students = studentsData.data;

          const projects = projectsData.data.map((project) => ({
            id: project.id,
            name: project.name,
            status: project.active,
          }));
          const activeProjects = projects.filter(
            (project) => project.status === true
          );

          //SET STATE
          this.setState({
            subject: subject,
            year: year,
            teacherId: teacherId,
            division: division,
            students: students,
            projects: projects,
            activeProjects: activeProjects,
          });
          return axios.get(getTeacherUrl + classData.data.teacherId, {
            headers: { Authorization: cookies.get("token") },
          });
        })
      )
      .then((response) => {
        const teacherName = response.data.firstName + " " + response.data.lastName;
        console.log(response);
        this.setState({ teacherName: teacherName });
      })
      .catch((error) => console.log(error));
  }

  redirect() {
    if (!cookies.get("token") || cookies.get("role") !== "ROLE_STUDENT") {
      window.location.href = window.location.origin;
    }
  }

  goAlumnoProyecto = (project) => {
    cookies.set("projectid", project.id, { path: "/" });
    this.props.history.push("/menualumno_classroom_proyecto");
  };

  render() {
    console.log(cookies.get("classid"));
    this.redirect();
    console.log(this.state);
    return (
      <div className="mainContainer">
        <HeaderStudent />
        <div className="ClassroomContent">
          <div className="titleAlumnoClassroom">
            <h1>
              {this.state.subject +
                " " +
                this.state.year.toString() +
                "°" +
                this.state.division}
            </h1>
            <br />
            <h3>{"Docente: " + this.state.teacherName}</h3>
          </div>
          <div className="classData">
            <div className="proAlumno">
              <h2>Proyectos</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '15px', width: '200px'}}>
                {this.state.activeProjects.map((project) => (
                    <Button key={project.id} onClick={() => this.goAlumnoProyecto(project)}>
                      {project.name}
                    </Button>
                ))}
              </div>
            </div>
            <div className="barraLateralAlumno">
              <h2>Estudiantes</h2>
              <div>
                {this.state.students.map((student) => {
                  return (
                    <div key={student.id} id={student.id}>
                      <h4>{student.firstName + " " + student.lastName}</h4>
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
