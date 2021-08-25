import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/account.png'
import '../css/AlumnoClassroom.css'

const cookies = new Cookies();
let classparamUrl = "http://localhost:8080/classroom/" + cookies.get('classid');
let getStudentsUrl = "http://localhost:8080/classroom/" + cookies.get('classid') + "/students";
let getProjectsUrl = "http://localhost:8080/classroom/" + cookies.get('classid') + "/projects";
let getTeacherUrl = "http://localhost:8080/user/";

export default class DocenteClassroom extends Component {
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

    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('role', { path: "/" });
        cookies.remove('id', { path: "/" });
        window.location.href = window.location.origin; //to-do no funciona bien
    }
    componentDidMount() {    //para que lo redirija al login si no hay token
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            window.location.href = window.location.origin;
        }
    }
    irPerfil = () => {
        alert("aca se ve el perfil de usuario");
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
                
                <div className="secContainer">
                    <div className="barraUser">
                        <img src={img} id="logoAccount" alt="No se encuentra la imagen" />
                        <div className="menuContent">
                                <a onClick={()=>{this.irPerfil()}}>Ver Perfil</a>
                                <a onClick={() => this.cerrarSesion()}>Cerrar sesión</a>
                        </div>
                        <h1 id="userName">{cookies.get('username')}</h1>
                    </div>
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
                                {this.state.projects.map(project => { return (<div key={project.id} id={project.id}><a href="/menudocente/classroom/proyecto" >{project.name}</a></div>) })}
                            </div>
                        </div>
                    </div>
                    
                        
                    
                </div>
            </div>
        )
    }
}