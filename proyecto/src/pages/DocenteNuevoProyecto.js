import React, { Component } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../Images/account.png'
import '../css/MenuAlumno.css'

const cookies = new Cookies();
let newProjectUrl = "http://localhost:8080/classroom/" + cookies.get('classId') + "/project";

export default class DocenteNuevoProyecto extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: "", year: 0, division: "", teacherId: -1, students: [], projects: [], teacherName: "" };
    }
    //Necesitamos un estado y un metodo para capturar lo que el usuario ingrese
    state = {
        form: {
            username: '',
            password: ''
        }
    }

    newProject(name, methodologyId, classroomId,) {
        axios.post(newProjectUrl, {
            headers: {
                'Authorization': cookies.get('token')
            },
            body: {
                'methodologyId': methodologyId.toString(),
                'name': name,
                'challengeId': '0'
            }
        })
            .then(response => {
                console.log(response);
                alert('proyecto creado')
            })
            .catch(error => {
                console.log(error);
                alert('error en la materia');
            });
    }
    

    handleChange = async e => {   //con este metodo guardamos en el estado el valor del imput de acuerdo 
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        var name;
        var methodologyId;
        var teacherId;

        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <input
                        type="user"
                        className="inputs"
                        name="username"
                        placeholder="Usuario"
                        maxLength="10"
                        onChange={this.handleChange} />
                    <br />
                    <input
                        type="password"
                        className="inputs"
                        name="password"
                        placeholder="Contraseña"
                        maxLength="10"
                        onChange={this.handleChange} />
                    <br />
                    <button onClick={() => this.newProject(name, methodologyId, teacherId)} className="submit-button">{"Crear"}</button>
                </div>
            </div>
        );
    }
}
