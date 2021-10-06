import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import '../css/Global.css';
//import '../css/DocenteClassroom.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import axios from 'axios';
import { Button } from 'reactstrap';
import LogoMini from '../Images/logoMini.png';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import VerticalTimeline from './VerticalTimeline';
import  VerticalTimelineElement from './VerticalTimeLineElement';
import {VerticalTimelineElementcss} from '../css/VerticalTimeLineElement.css';
import Flipped from '../Images/Flipped.png';
import Campana from '../Images/campana.png';

const cookies = new Cookies();

export default class Pbl extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            subject: "", year: 0, division: "", teacherId: -1, teacherName: "", methodologies: [],
            methodologyId: -1, form: { name: '', fechaInicio: '', fechaFin: '' }
        };
    }

    goClassOne(){
    window.location.href = "/menudocente/classroom/nuevoproyecto/pbl/clase1";
    
    }



    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div>
                    <div className = "title">
                   Aprendizaje Basado en Proyectos
                   </div>
                    <VerticalTimeline>
                         
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date='1/4 al 10/4'
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#00080' }}
                            //icon={Campana}
                        >
                            <h3 className="vertical-timeline-element-title"> Pregunta Disparadora</h3>
                            <h4 className="vertical-timeline-element-subtitle">Clase 1 </h4>
                            <p>
                                Formular pregunta disparadora
                            <Button color="success"Activar Clase onClick={() => this.goClassOne()}></Button>
                            </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            date="10/4 al 11/4"
                            //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            //icon={Campana}
                        >
                            <h3 className="vertical-timeline-element-title">Formando Equipos</h3>
                            <h4 className="vertical-timeline-element-subtitle">Clase 2</h4>
                            <p>
                                Formar equipos con diversidad de perfiles
                                
                            </p>
                          <div>  <Button color="success" >Activar Clase</Button>
                          </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date= '12/4 al 20/4'
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    //icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Planificación</h3>
    <h4 className="vertical-timeline-element-subtitle">Clase 3</h4>
    <p>
      Delimitar fechas y lineamientos para la planificación y desarrollo del proyecto
      
      
    </p>
    <div>  <Button color="success" >Activar Clase</Button>
     </div>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date='25/4 - 5/5'
    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    //icon={LogoMini}
    
  >
    <h3 className="vertical-timeline-element-title">Investigación</h3>
    <h4 className="vertical-timeline-element-subtitle">Clase 4</h4>
    <p>
      Definir los temas que se desarrollarán en la investigación y los entregables 
      
    </p>
    <div>  <Button color="success" >Activar Clase</Button>
     </div>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="10/5 - 15/5"
    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    //icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Puesta en común y debate</h3>
    <h4 className="vertical-timeline-element-subtitle">Clase 5</h4>
    <p>
      Definir lineamientos para el debate
    </p>
    <div>  <Button color="success" >Activar Clase</Button>
     </div>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="20/5 al 03/6"
    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}

    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    //icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Elaborar Producto</h3>
    <h4 className="vertical-timeline-element-subtitle">Clase 6</h4>
    <p>
     Elaborar un producto  para la presentación que contemple la investigación y una posible solución al problema
    </p>
    <Button color="success" >Activar Clase</Button>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="03/6 al 01/7"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    //icon={LogoMini}
  >
    <h3 className="vertical-timeline-element-title">Presentación del producto</h3>
    <h4 className="vertical-timeline-element-subtitle">Clase 7</h4>
    <p>
      Entregar el producto final e incluir conclusiones. Preparar una presentación oral y realizar la evaluación
    </p>
    <div>  <Button color="success" >Activar Clase</Button>
     </div>
    
  </VerticalTimelineElement>
  <VerticalTimelineElement
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    //icon={LogoMini}
  />
</VerticalTimeline>
                </div>
            </div>
        )
    }
}