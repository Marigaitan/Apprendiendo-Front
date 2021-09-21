import React, { Component } from 'react'
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';

import {API_HOST} from "../constants";
import HeaderStudent from "./HeaderAlumno"

const cookies = new Cookies();
let getLessonsUrl = API_HOST + "classroom/" + cookies.get('classid') + "/projects"+ cookies.get('projectid') + "/lessons";


export default class AlumnoProyecto extends Component {
    render() {
        return (
            <div className="mainContainer">
                <HeaderStudent />
                <div className="secContainer">
                    Vista del Proyecto para el Alumno
                </div>
            </div>
        )
    }
}
