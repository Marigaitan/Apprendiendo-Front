import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import '../css/Global.css';
import '../css/DocenteClassroom.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import axios from 'axios';
import { Button } from 'reactstrap';
import LogoMini from '../Images/logoMini.png';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import  VerticalTimelineElement from './VerticalTimeLineElement';
import { ButtonGroup,  Label, Form, FormGroup, Input, FormText, Col } from 'reactstrap'
//import 'react-vertical-timeline-component/style.min.css';

import VerticalTimeLineElement from '../css/VerticalTimeLineElement.css';


  
  VerticalTimeline.PropTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
    animate: PropTypes.bool,
    layout: PropTypes.oneOf([
      '1-column-left',
      '1-column',
      '2-columns',
      '1-column-right',
    ]),
  };
  
  VerticalTimeline.defaultProps = {
    animate: true,
    className: '',
    layout: '2-columns',
  };


export default class AulaInvertida extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            subject: "", year: 0, division: "", teacherId: -1, teacherName: "", methodologies: [],
            methodologyId: -1, form: { name: '', fechaInicio: '', fechaFin: '' }
        };
    }
    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div>
                    <div className = "title">
                   Aula Invertida
                   </div>
                    <VerticalTimeline>
                    <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date="2011 - present"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            img={LogoMini}
                        >
                            <h3 className="vertical-timeline-element-title">Configuración inicial</h3>
                            <h4 className="vertical-timeline-element-subtitle"></h4>
                            <div>
                            <p>
                                
                            </p></div>
                            <Form>
                            <FormGroup>
                            <Label for="exampleText"><p>Para avanzar con la configuración ingresar un nombre con el que se identificará el proyecto y luego guardar.
                                 
                                 Finalmente se debe guardar la configuración.
                                    con los alumnos:</p></Label>
                            <Input type="textarea" name="text" id="exampleText" />
                            </FormGroup>
                            </Form>
                            
                            <div><Button color="success" >Guardar configuración.</Button></div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            //date="2011 - present"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            img={LogoMini}
                        >
                            <h3 className="vertical-timeline-element-title">Lección inicial</h3>
                            <h4 className="vertical-timeline-element-subtitle">Disponibilización de material </h4>
                            <div>
                            <p>
                                Se debe introducir el o los temas a a aprender a los alumnos  disponibilizando material interactivo 
                                para que los alumnos utilicen su tiempo de tarea en el hogar aprendiendo la parte teórica y el tiempo del aula sea utilizado para trabajar en la parte práctica 
                                
                            </p></div>
                            <div><Button color="success" >Activar Clase</Button></div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            //date="2010 - 2011"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={LogoMini}
                        >
                            <h3 className="vertical-timeline-element-title">Práctica Inicial</h3>
                            <h4 className="vertical-timeline-element-subtitle"></h4>
                            <p>
                                Se disponibiliza este espacio 
                                para que los alumnos realicen una actividad con el fin de hacer una primera detección de las dificultades que tuvieron 
                                con los distintos conceptos. Esta detección servira como guía tanto al docente como al alumno para entender sobre que temas se debe trabajar  
                            </p>
                            <div><Button color="success" >Activar Clase</Button></div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
    className="vertical-timeline-element--work"
    //date="2008 - 2010"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Práctica de Refuerzo </h3>
    <h4 className="vertical-timeline-element-subtitle">Optativa</h4>
    <p>
      Esta clase podría activarse para solicitar algún entregable del alumno o alumna relacionado al tema 
      o bien disponibilizar otra actividad cambiando el nivel de dificultad. 
    </p>
    <div><Button color="success" >Activar Clase</Button></div>
  </VerticalTimelineElement>
    </VerticalTimeline>
                    
                </div>

            </div>)
    }
}



