import React, { Component, useState } from 'react';
import Cookies from 'universal-cookie/es6';
import img from '../Images/account.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/MenuDocente.css';
import '../css/DropDown.css';
import axios from 'axios' ;
import * as _ from "lodash";
import Header from "./Header";
import { API_HOST } from "../constants";

const cookies = new Cookies();
let classUrl = API_HOST + "user/" + cookies.get('id') + "/classrooms";

export default class MenuDocente extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { dropdown: false, classrooms: [] };
    }
    componentDidMount() {
        axios.get(classUrl, {
            headers: {
                'Authorization': cookies.get('token')
            }
        })
            .then(response => {
                var classrooms = response.data.map(classroom => ({ key: classroom.id, id: classroom.id, subject: classroom.subject, yearDivision: classroom.year.toString() + classroom.division }));
                console.log(classrooms);
                classrooms = _(classrooms).groupBy('yearDivision').valueOf();
                classrooms = Object.entries(classrooms);
                this.setState({ classrooms });
            })
            .catch(error => {
                console.log(error);
                alert('Aun no tiene cursos asignados');
            })
    }


    //para que lo redirija al login si no hay token
    redirect = () => {
        if (!cookies.get('token') || cookies.get('role') !== "ROLE_TEACHER") {
            this.props.history.push("./");
        }
    }

    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('role', { path: "/" });
        cookies.remove('id', { path: "/" });
        this.props.history.push('./'); //lo redirijo al login
    }


    goClassroom(classroomId) {
        this.props.history.push("/menudocente/classroom");
        cookies.set('classid', classroomId, { path: "/" });
    }



    render() {
        console.log('role: ' + cookies.get('role'));
        console.log('username: ' + cookies.get('username'));
        console.log('id: ' + cookies.get('id'));
        console.log('token: ' + cookies.get('token'));

        this.redirect();

        {/*window.onload = this.classroomAssigned;*/ }

        let list = this.state.classrooms;

        console.log(list);

        console.log(this.state.classrooms.map(classroomGroup => [
            <h1><li>{classroomGroup[0]}</li></h1>, classroomGroup[1].map(classroom =>
                <li><button className="classButton" onClick={() => this.goClassroom(classroom.id)}>{classroom.subject}</button></li>
            )
        ]));

        return (
            <div className="containerPrin">
                <div className="containerSec">
                    <div className="barraUser">
                        <img src={img} alt="No se encuentra la imagen" id="logoAccount" />
                        <div className="menuContent">
                            <button onClick={() => this.irPerfil()}>Ver Perfil</button>
                            <button onClick={() => this.cerrarSesion()}>Cerrar sesión</button>
                        </div>
                        <h1 id="userName">{cookies.get('username')}</h1>
                        <div>
                            {this.state.classrooms.map(classroomGroup => [
                                <h1><li key={classroomGroup[0]}>{classroomGroup[0]}</li></h1>,
                                classroomGroup[1].map(classroom =>
                                    <li key={classroom.id.toString()}><button className="classButton" onClick={() => this.goClassroom(classroom.id)}>{classroom.subject}</button></li>
                                )
                            ])
                            }
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}

//classrooms.map(classroom => "as")