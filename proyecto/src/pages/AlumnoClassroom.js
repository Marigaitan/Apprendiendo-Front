import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/account.png'
import '../css/MenuAlumno.css'

const cookies = new Cookies();
let classparamUrl = "http://localhost:8080/classrooms/" + cookies.get('classid');
let getStudentsUrl = "http://localhost:8080/classroom/" + cookies.get('classid') + "/students";

export default class AlumnoClassroom extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", className: "", teacherId: -1, students: [] };

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
                const className = response.data.name;
                const teacherId = response.data.teacherId;
                this.setState({ subject: subject, className: className, teacherId: teacherId })
            })
            .catch(error => {
                console.log(error);
                alert('error en la materia');
            })
    }

    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('role', { path: "/" });
        cookies.remove('id', { path: "/" });
        window.location.href = './' //to-do no funciona bien
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

    render() {
        console.log(cookies.get('classid'));
        window.onload = () => {
            this.classParam();
            this.getStudents();
        }
        return (
            <div className="containerPrin">
                <Header />
                <div className="containerSec">
                    <div className="barraUser">
                        <input type="image" src={img} id="logoAccount" alt="No se encuentra la imagen" />
                        <h1 id="userName">{cookies.get('username')}</h1>
                        <button id='botonlogout' onClick={() => this.cerrarSesion()}>cerrar sesión</button> {/* Provisorio hasta tener el menu desplegable */}
                    </div>
                    <div>
                        <h1>{this.state.subject}</h1>
                        <h1>{this.state.className}</h1>
                        <h1>{this.state.teacherId}</h1>
                    </div>
                    <div>
                        Users
                        <div>
                            {this.state.students.map(student => { return (<div id={student.id}><label >{student.username}</label></div>) })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
