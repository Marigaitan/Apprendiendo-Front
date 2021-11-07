import React, { useState } from 'react';
import '../css/Global.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import axios from 'axios';
import NavDocente from './NavDocente';
import Accordion from './Accordion';

export default function DocenteEstatusClase() {
    const cookies = new Cookies();
    const accordionData = [
        {
          title: 'Proyecto 1',
          content: `otro acordeon por clase y adentro la lista de alumnos. O tabla de alumnos por clase y entregables`
        },
        {
          title: 'Proyecto 2',
          content: `Descripcion 2`
        },
        {
          title: 'Proyecto 3',
          content: `Descripcion 3`
        }
      ];
    return (
        <div className="mainContainer">
            <HeaderTeacher />
            <div>
                <div classname="navBar">
                    <h1 >traer nombre del curso</h1>
                    <NavDocente activeBar='estatusclase' />
                    <h3>Proyectos</h3>
                    <div className="accordion">
                        {accordionData.map(({ title, content }) => (
                            <Accordion title={title} content={content} />
                        ))}
                    </div>
                </div><br />
            </div>
        </div>
    )
}