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
import VerticalTimelineElement from './VerticalTimeLineElement';
import { VerticalTimelineElementcss } from '../css/VerticalTimeLineElement.css';
import Flipped from '../Images/Flipped.png';
import Campana from '../Images/campana.png';
import { ButtonGroup, Label, Form, FormGroup, Input, FormText, Col } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge, Alert } from 'reactstrap';

const cookies = new Cookies();

export default class Pbl extends Component {
  constructor(props) {        //constructor de mi clase
    super(props);
    this.state = {
      projectId: -1,
      projectName: '',
      openModal: false,
      modalId: -1
    };
  }

  async createProject() {

    let classparamUrl = API_HOST + "project/template";

    console.log(Date.now())

    const body = {
      "name": this.state.projectName,
      "classroomId": cookies.get('classid'),
      "position": 0,
      "dueDate": "2021-10-11T01:45:50.611Z",
      "startDate": "2021-10-11T01:45:50.611Z",
      "active": true,
      "lessons": [
        {
          "name": "Pregunta Disparadora",
          "position": 0,
          // "dueDate": "2021-10-11T01:45:50.611Z",
          // "startDate": "2021-10-11T01:45:50.611Z",
          "active": false,
          "activities": []
        },
        {
          "name": "Formando Equipos",
          "position": 1,
          // "dueDate": "2021-10-11T01:45:50.611Z",
          // "startDate": "2021-10-11T01:45:50.611Z",
          "active": false,
          "activities": []
        },
        {
          "name": "Planificación",
          "position": 2,
          // "dueDate": "2021-10-11T01:45:50.611Z",
          // "startDate": "2021-10-11T01:45:50.611Z",
          "active": false,
          "activities": []
        },
        {
          "name": "Investigación",
          "position": 3,
          // "dueDate": "2021-10-11T01:45:50.611Z",
          // "startDate": "2021-10-11T01:45:50.611Z",
          "active": false,
          "activities": []
        },
        {
          "name": "Puesta en común y debate",
          "position": 4,
          // "dueDate": "2021-10-11T01:45:50.611Z",
          // "startDate": "2021-10-11T01:45:50.611Z",
          "active": false,
          "activities": []
        },
        {
          "name": "Elaborar Producto",
          "position": 5,
          // "dueDate": "2021-10-11T01:45:50.611Z",
          // "startDate": "2021-10-11T01:45:50.611Z",
          "active": false,
          "activities": []
        },
        {
          "name": "Presentación del producto",
          "position": 6,
          // "dueDate": "2021-10-11T01:45:50.611Z",
          // "startDate": "2021-10-11T01:45:50.611Z",
          "active": false,
          "activities": []
        },
      ]
    }

    await axios.post(classparamUrl, body, { headers: { 'Authorization': cookies.get('token') } })
      .then(response => {
        const projectId = response.data;
        console.log(projectId)
        this.setState({
          projectId: projectId //TODO agregar state
        })
      })

  }

  //goClassOne() {
  //window.location.href = "/menudocente/classroom/nuevoproyecto/pbl/clase1";
  //}

  onValueChange = (event) => {
    this.setState({
      projectName: event.target.value
    });
    console.log(this.state.projectName);
  }

  openModal = (id) => {
    this.setState({ openModal: true, modalId: id });
  }

  closeModal() {
    this.setState({ openModal: false, modalId: -1 });
  }



  render() {
    return (
      <div className='mainContainer'>
        <HeaderTeacher />
        <div>
          <div className="title">
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
            ><h3 className="vertical-timeline-element-title">Configuración inicial</h3>
              <h4 className="vertical-timeline-element-subtitle"></h4>
              <div>
                <p>

                </p></div>
              <Form>
                <FormGroup>
                  <Label for="exampleText"><p>Para avanzar con la configuración:
                    Ingresar un nombre con el que se identificará el proyecto y luego guardar
                  </p></Label>
                  <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
              </Form>
              <div><Button onClick={() => this.createProject()} color="success" >Guardar</Button></div>
            </VerticalTimelineElement>


{/* CLASE 1 */}
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
                <div>
                  <Button color="success" onClick={() => this.openModal(1)}>Activar Clase</Button></div>
              </p>
              <Modal isOpen={this.state.openModal && this.state.modalId === 1}>
                <ModalHeader className="mainContainer">
                </ModalHeader>
                <ModalBody >
                  <div>
                    <h3 className="title">Pregunta Disparadora </h3>
                  </div>
                  <div className="maincontainer">
                    En esta etapa, el docente selecciona un tema que esté
                    ligado a la realidad de los alumnos, y debe plantear una
                    pregunta abierta que despierte su interés y los motive a
                    aprender.

                    El objetivo en este punto es detectar conocimientos
                    previos y que el alumno  piense qué debe investigar  y cómo
                    resolver la cuestión.
                  </div>
                  <div></div>
                  <div>
                    ¿Qué pregunta desea plantear?:
                  </div>
                  <br />
                  <div>
                    <h3>Adjuntar documentación </h3>
                  </div>
                  <div> Mediante la opción "Adjuntar Material" puede proporcionar
                    el material que crea conveniente a sus alumnos, tales como
                    documentos en formato word, excel, pdf</div>
                  <div className="center-alert">
                   <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                    <FormGroup>
                      <Label for="dueDate"></Label>
                      <Input
                        type="date"
                        name="duedate"
                        id="date"
                        placeholder="Hora de Finalización"
                      />

                    </FormGroup>

                  </div>
                </ModalBody>
                <ModalFooter className="modalFooter">
                  <Button color="secondary" onClick={() => this.closeModal()}>Guardar y Cerrar</Button>
                </ModalFooter>
              </Modal>
            </VerticalTimelineElement>



            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              //date="10/4 al 11/4"
              //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            //icon={Campana}
            >
              <h3 className="vertical-timeline-element-title">Formando Equipos</h3>
              <h4 className="vertical-timeline-element-subtitle">Clase 2</h4>
              <p>
                Formar equipos con diversidad de perfiles

                <div>
                  <Button color="success" onClick={() => this.openModal(2)}>Activar Clase</Button></div>
              </p>
              <Modal isOpen={this.state.openModal && this.state.modalId === 2}>
                <ModalHeader className="title">
                  <h3 className="title">Formando equipos </h3>
                </ModalHeader>
                <ModalBody>
                  <div>
                    
                    
                    En base a las respuestas obtenidas en la clase
                    anterior, el docente deberá formar de equipos de 3 o 4
                    integrantes con diversidad de perfiles. Dándoles la
                    posibilidad de que cada uno desempeñe un rol.

                  </div>
                  
                  <div>
                  
                  <h3>Adjuntar documentación </h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>

                  <div className="center-alert">
                   <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                    <FormGroup>
                      <Label for="dueDate"></Label>
                      <Input
                        type="date"
                        name="duedate"
                        id="date"
                        placeholder="Hora de Finalización"
                      />

                    </FormGroup>

                  </div>
                </ModalBody>
                <ModalFooter className="modalFooter">
                  <Button color="secondary" onClick={() => this.closeModal()}>Guardar y Cerrar</Button>
                </ModalFooter>
              </Modal>

            </VerticalTimelineElement>


{/* clase 3 */}


            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date='12/4 al 20/4'
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
              <div>  <Button color="success" onClick={() => this.openModal(3)}>Activar Clase</Button>
              <Modal isOpen={this.state.openModal && this.state.modalId === 3}>
                <ModalHeader className="title">
                  <h3 className="title">Planificación </h3>
                </ModalHeader>
                <ModalBody>
                  <div>
                    
                    
                  En esta clase se les pide a los alumnos  que armen un 
                  plan de trabajo, donde presenten las tareas previstas, 
                  el encargado de realizarlas y las fechas de resolución 
                  esperadas. 

                  </div>
                  <div>
                  
                  <h3>Adjuntar documentación con lineamientos</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>


                  <div className="center-alert">
                   <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                    <FormGroup>
                      <Label for="dueDate"></Label>
                      <Input
                        type="date"
                        name="duedate"
                        id="date"
                        placeholder="Hora de Finalización"
                      />

                    </FormGroup>

                  </div>
                </ModalBody>
                <ModalFooter className="modalFooter">
                  <Button color="secondary" onClick={() => this.closeModal()}>Guardar y Cerrar</Button>
                </ModalFooter>
              </Modal>
                
              </div>




            </VerticalTimelineElement>
{/* CLASE 4 */}
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
              <div>  <Button color="success" onClick={() => this.openModal(4)}>Activar Clase</Button>
              </div>
  
              <Modal isOpen={this.state.openModal && this.state.modalId === 4}>
                <ModalHeader className="title">
                  <h3 className="title">Investigación</h3>
                </ModalHeader>
                <ModalBody>
                  <div>
                    
                    
                  En esta clase se les solicita a los grupos que comiencen a investigar a partir de un 
                  escenario concreto dado por la pregunta disparadora. El docente no va a preparar la información 
                  que deban preparar. La investigación es por cuenta de cada grupo y deben entregar los resultados 
                  con las fuentes consultadas. 

                  </div>
                  <div>
                    
                  
                  <h3>Descripciones o notas para la visualización del alumno</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>
                  <div>
                  <div>
                  </div>

                  
                  <h3>Adjuntar documentación con lineamientos</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>


                  <div className="center-alert">
                   <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                    <FormGroup>
                      <Label for="dueDate"></Label>
                      <Input
                        type="date"
                        name="duedate"
                        id="date"
                        placeholder="Fecha de presentación"
                      />

                    </FormGroup>

                  </div>
                </ModalBody>
                <ModalFooter className="modalFooter">
                  <Button color="secondary" onClick={() => this.closeModal()}>Guardar y Cerrar</Button>
                </ModalFooter>
              </Modal>
                
              






            </VerticalTimelineElement>
            
            
            
            
            {/* CLASE 5 */}
            
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
              <div>  <Button color="success" color="success" onClick={() => this.openModal(5)}>Activar Clase</Button>
              </div>
             
  
              <Modal isOpen={this.state.openModal && this.state.modalId === 5}>
                <ModalHeader className="title">
                  <h3 className="title">Puesta en común y debate</h3>
                </ModalHeader>
                <ModalBody>
                  <div>
                    
                    
                  Luego de la investigación el docente debe determinar una fecha 
                  en la cual los grupos expondrán los resultados de su investigación
                  y debatirán con el resto de los alumnos acerca de los mismos. 
                  Al finalizar la puesta en común con el resto de los alumnos 
                  deberán en conjunto idear un producto final a elaborar con la investigación realizada
                  (como un folleto, una presentación informativa para algún establecimiento, un trabajo de investigación cientifica).  

                  </div>
                  <div>
                    
                  
                  <h3>Descripciones o notas para la visualización del alumno</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>
                  <div>
                  <div>
                  </div>

                  
                  <h3>Adjuntar documentación con lineamientos</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>


                  <div className="center-alert">
                   <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                    <FormGroup>
                      <Label for="dueDate"></Label>
                      <Input
                        type="date"
                        name="duedate"
                        id="date"
                        placeholder="Fecha de presentación"
                      />

                    </FormGroup>

                  </div>
                </ModalBody>
                <ModalFooter className="modalFooter">
                  <Button color="secondary" onClick={() => this.closeModal()}>Guardar y Cerrar</Button>
                </ModalFooter>
              </Modal>













            </VerticalTimelineElement>







            {/* CLASE 6 */}
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
             <div> <Button color="success" onClick ={() => this.openModal(6)}>Activar Clase</Button>
            </div>
            <Modal isOpen={this.state.openModal && this.state.modalId === 6}>
                <ModalHeader className="title">
                  <h3 className="title">Elaborar Producto</h3>
                </ModalHeader>
                <ModalBody>
                  <div>
                   
                  Luego del debate y la decisión en conjunto del producto a elaborar
                  el docente debe proveer a los alumnos la fecha en la que se deberá finalizar
                  con el producto y condiciones de la entrega en particular.
                    
                    

                  </div>
                  <div>
                    
                  
                  <h3>Descripciones o notas para la visualización del alumno</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>
                  <div>
                  <div>
                  </div>

                  
                  <h3>Adjuntar documentación con lineamientos</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>


                  <div className="center-alert">
                   <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                    <FormGroup>
                      <Label for="dueDate"></Label>
                      <Input
                        type="date"
                        name="duedate"
                        id="date"
                        placeholder="Fecha de presentación"
                      />

                    </FormGroup>

                  </div>
                </ModalBody>
                <ModalFooter className="modalFooter">
                  <Button color="secondary" onClick={() => this.closeModal()}>Guardar y Cerrar</Button>
                </ModalFooter>
              </Modal>



            </VerticalTimelineElement>
            
            
            {/* clase 7  */}
            
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              //contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date="03/6 al 01/7"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            //icon={LogoMini}
            >
              <h3 className="vertical-timeline-element-title">Presentación del producto y evaluación</h3>
              <h4 className="vertical-timeline-element-subtitle">Clase 7</h4>
              <p>
                Entregar el producto final e incluir conclusiones. Preparar una presentación oral y realizar la evaluación
              </p>
              <div>  <Button color="success" onClick ={() => this.openModal(7)}>Activar Clase</Button>
              </div>
              <Modal isOpen={this.state.openModal && this.state.modalId === 7}>
                <ModalHeader className="title">
                  <h3 className="title">Presentación del producto</h3>
                </ModalHeader>
                <ModalBody>
                  <div>
                   
                  Toda la clase se reúne para que cada equipo presente sus productos. La idea es que se cree un proceso iterativo 
                  que convierte al proyecto en un espiral de aprendizaje que puede no tener fin dado que a lo largo de la investigación
                  o en la etapa de conclusiones suelen surgir nuevas preguntas que pueden resultar en un nuevo proyecto. 
                  
                  El docente deberá dar lugar al debate disponibilizando una fecha en la que se realizará 
                  esta etapa y solicitará los entregables finales a los alumnos. 
                    
                    

                  </div>
                  <div>
                    
                  
                  <h3>Descripciones o notas para la visualización del alumno</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>
                  <div>
                  <div>
                  </div>

                  
                  <h3>Adjuntar documentación con lineamientos</h3>
                  <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                  </div>


                  
                  <div className="center-alert">
                   <Alert color="info">Selecciona fecha límite para finalizar con la clase</Alert>
                    <FormGroup>
                      <Label for="dueDate"></Label>
                      <Input
                        type="date"
                        name="duedate"
                        id="date"
                        placeholder="Fecha de presentación"
                      />

                    </FormGroup>

                  </div>
                </ModalBody>
                <ModalFooter className="modalFooter">
                  <Button color="secondary" onClick={() => this.closeModal()}>Guardar y Cerrar</Button>
                </ModalFooter>
              </Modal>


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