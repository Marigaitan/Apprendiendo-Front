import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderStudent from './HeaderAlumno';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import '../css/AlumnoClassroom.css';
import {API_HOST} from "../constants";

const cookies = new Cookies();
let classparamUrl = API_HOST + "classroom/" + cookies.get('classid');
let getStudentsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/students";
let getProjectsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/projects";
let getTeacherUrl = API_HOST + "user/";

export default class AlumnoClassroom extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", teacherId: -1, students: [], projects: [], teacherName: "" };
    }


    classParam() {
        axios.get(classparamUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                console.log(response);
                const subject = response.data.subject;
                const year = response.data.year;
                const division = response.data.division;
                const teacherId = response.data.teacherId;
                this.setState({ subject: subject, year: year, teacherId: teacherId, division: division });
                console.log("ESTO TIENE QUE PASAR PRIMERO");
                this.getTeacher(); //tiene que existir alguna forma de usar then para ordenar esto desde render, pero no encontre forma por ahora
            })
            .catch(error => {
                console.log(error);
                alert('error en la materia');
            });
    }

    componentDidMount() {    //para que lo redirija al login si no hay token
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_STUDENT") {
            window.location.href = window.location.origin;
        }
    }

    getStudents() {
        axios.get(getStudentsUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                console.log(response);
                const students = response.data.map(student => ({ id: student.id, username: student.username }));
                this.setState({ students: students });
                console.log(students);
            })
            .catch(error => {
                console.log(error);
                alert('error obteniendo usuarios');
            })
    }
     getTeacher() {
        console.log("ESTO TIENE QUE PASAR SEGUNDO");
        axios.get(getTeacherUrl + this.state.teacherId, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                const teacherName = response.data.username;
                this.setState({ teacherName: teacherName });
                console.log(teacherName);
            })
            .catch(error => {
                console.log(error);
                alert('error obteniendo usuarios');
            })
    }

    getProjects() {
        axios.get(getProjectsUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                const projects = response.data.map(project => ({ id: project.id, name: project.name }));
                this.setState({projects});
            })
            .catch(error => {
                console.log(error);
                alert('error obteniendo usuarios');
            })
    }

    render() {
        console.log(cookies.get('classid'));
        window.onload = () => {
            this.classParam(); //llama a getTeacher adentro, tiene que haber forma de llamarlo desde aca con then, pero se ejecuta fuera de orden
            this.getStudents();
            this.getProjects();
        }
        console.log(this.state);
        return (
            <div className="mainContainer">
                <HeaderStudent/>
                <div className="secContainer">
                    <div className="mainContent">
                        <div className="barraLateral">
                            <h2>Estudiantes</h2>
                            <div>
                                {this.state.students.map(student => { return (<div key={student.id} id={student.id}><h3 >{student.username}</h3></div>) })}
                            </div>
                        </div>
                        <div className="pro">
                            <h1 >{this.state.subject + " " + this.state.year.toString() + "°" + this.state.division}</h1>
                            <h2>{"Docente: " + this.state.teacherName}</h2>  
                            <h2>Proyectos</h2>
                            <div>
                                {this.state.projects.map(project => { return (<div key={project.id} id={project.id}><Link to="/menualumno/classroom/proyecto" >{project.name}</Link></div>) })}
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        )
    }
}