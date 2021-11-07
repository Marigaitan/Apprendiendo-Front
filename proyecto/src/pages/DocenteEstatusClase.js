import React, { useState} from 'react';
import '../css/Global.css';
import '../css/DocenteEstatusClase.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import {API_HOST} from "../constants";
import axios from 'axios';
import NavDocente from './NavDocente';

export default function DocenteEstatusClase() {
    const cookies = new Cookies();

    return (
        <div className="mainContainer">
            <HeaderTeacher />
            <div>
                <div classname="navBar">
                    <h1 >traer nombre del curso</h1>
                    <NavDocente activeBar='estatusclase' />
                </div><br />
            </div>
        </div>
    )
}