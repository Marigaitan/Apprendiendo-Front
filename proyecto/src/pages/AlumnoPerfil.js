import React from 'react';
import Cookies from 'universal-cookie/es6';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MenuAlumno.css';
import axios from 'axios';
import HeaderStudentPerfil from "./HeaderAlumnoPerfil";
import {API_HOST} from "../constants";

const AlumnoPerfil = () => {

        return (
            <div className="mainContainer">
                <HeaderStudentPerfil/>
                <div className="secContainer">
                    <h1>Perfil</h1>
                    <br />                
                </div>
            </div>
        )
    
}

export default AlumnoPerfil;