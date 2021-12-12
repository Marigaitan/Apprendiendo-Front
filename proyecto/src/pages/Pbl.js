import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import '../css/Global.css';
import '../css/DocenteEditLesson.css';
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
import DocenteProyectoQuizz from './DocenteProyectoQuizz';
import DocenteProyectoCuestionario from './DocenteProyectoCuestionario';
import DocenteProyectoEntregable from './DocenteProyectoEntregable';

const cookies = new Cookies();

export default class Pbl extends Component {
  constructor(props) {        //constructor de mi clase
    super(props);
    this.state = {
      projectId: -1,
      projectName: '',
      openModal: false,
      modalId: -1,
      lessonIds: [],
      description1: '',
      description2: '',
      description3: '',
      description4: '',
      description5: '',
      description6: '',
      description7: '',
      textClass1: '',
      textClass2: '',
      textClass3: '',
      textClass4: '',
      textClass5: '',
      textClass6: '',
      textClass7: '',
      archivosClase1: [],
      archivosClase2: [],
      archivosClase3: [],
      archivosClase4: [],
      archivosClase5: [],
      archivosClase6: [],
      archivosClase7: [],
      disableButtonProject: false,
      disableButtonClass1: true,
      disableButtonClass2: true,
      disableButtonClass3: true,
      disableButtonClass4: true,
      disableButtonClass5: true,
      disableButtonClass6: true,
      disableButtonClass7: true,





    };
  }

  async createProject() {

    let classparamUrl = API_HOST + "project/template";

    const body = {
      name: this.state.projectName,
      classroomId: cookies.get('classid'),
      position: 0,
      description: '',
      active: true,
      documents: [],
      rewards: [],
      lessons: [
        {
          name: "Pregunta Disparadora",
          position: 0,
          description: '',
          active: false,
          activities: [],
          documents: [],

        },
        {
          name: "Formando Equipos",
          position: 1,
          description: '',
          active: false,
          activities: [],
          documents: [],

        },
        {
          name: "Planificación",
          position: 2,
          description: '',
          active: false,
          activities: [],
          documents: [],

        },
        {
          name: "Investigación",
          position: 3,
          description: '',
          active: false,
          activities: [],
          documents: [],

        },
        {
          name: "Puesta en común y debate",
          position: 4,
          description: '',
          active: false,
          activities: [],
          documents: [],

        },
        {
          name: "Elaborar Producto",
          position: 5,
          description: '',
          active: false,
          activities: [],
          documents: [],

        },
        {
          name: "Presentación del producto",
          position: 6,
          description: '',
          active: false,
          activities: [],
          documents: [],
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
        return projectId;
      }).then(projectId => {
        let lessonsUrl = API_HOST + "project/" + projectId + "/lessons";
        axios.get(lessonsUrl, { headers: { 'Authorization': cookies.get('token') } })
          .then(response => {
            console.log(response.data)
            const ids = response.data.map(lesson => lesson.id);
            console.log(ids);
            this.setState({
              lessonIds: ids,
              disableButtonProject: true,
              disableButtonClass1: false,
              disableButtonClass2: false,
              disableButtonClass3: false,
              disableButtonClass4: false,
              disableButtonClass5: false,
              disableButtonClass6: false,
              disableButtonClass7: false,
            })
            alert("Proyecto creado exitosamente");
          })
      })

  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  addLesson = async (lesson, documents) => {
    let putParamUrl = API_HOST + "lesson";
    await axios.put(putParamUrl, lesson, { headers: { 'Authorization': cookies.get('token') } })
      .then(response => console.log(response.data));
    let sendDocs = documents.map(doc =>
      axios.post(API_HOST + "document", doc, { headers: { 'Authorization': cookies.get('token') } })
    );
    await axios.all(sendDocs).catch(console.log);
    this.closeModal();
  }

  addFirstLesson = () => {
    const lesson = {
      name: this.state.textClass1,
      id: this.state.lessonIds[0], //falta obtener el id de la lesson
      position: 0,
      description: this.state.description1,
      projectId: this.state.projectId,
      active: true
    }
    this.setState({ disableButtonClass1: true })
    console.log(lesson);
    this.addLesson(lesson, this.state.archivosClase1);

  }

  addSecondLesson = () => {
    const lesson = {
      name: this.state.textClass2,
      id: this.state.lessonIds[1], //falta obtener el id de la lesson
      position: 0,
      description: this.state.description2,
      projectId: this.state.projectId,
      active: true
    }
    this.setState({ disableButtonClass2: true })

    console.log(lesson);
    this.addLesson(lesson, this.state.archivosClase2);
  }
  addThirdLesson = () => {
    const lesson = {
      name: this.state.textClass3,
      id: this.state.lessonIds[2], //falta obtener el id de la lesson
      position: 0,
      description: this.state.description3,
      projectId: this.state.projectId,
      active: true
    }
    this.setState({ disableButtonClass3: true })

    console.log(lesson);
    this.addLesson(lesson, this.state.archivosClase3);
  }

  addForthLesson = () => {
    const lesson = {
      name: this.state.textClass4,
      id: this.state.lessonIds[3], //falta obtener el id de la lesson
      position: 0,
      description: this.state.description4,
      projectId: this.state.projectId,
      active: true
    }
    this.setState({ disableButtonClass4: true })

    console.log(lesson);
    this.addLesson(lesson, this.state.archivosClase4);
  }
  addFifthLesson = () => {
    const lesson = {
      name: this.state.textClass5,
      id: this.state.lessonIds[4], //falta obtener el id de la lesson
      position: 0,
      description: this.state.description5,
      projectId: this.state.projectId,
      active: true
    }
    this.setState({ disableButtonClass5: true })

    console.log(lesson);
    this.addLesson(lesson, this.state.archivosClase5);
  }
  addSixthLesson = () => {
    const lesson = {
      name: this.state.textClass6,
      id: this.state.lessonIds[5], //falta obtener el id de la lesson
      position: 0,
      description: this.state.description6,
      projectId: this.state.projectId,
      active: true
    }
    this.setState({ disableButtonClass6: true })

    console.log(lesson);
    this.addLesson(lesson, this.state.archivosClase6);
  }
  addSeventhLesson = () => {
    const lesson = {
      name: this.state.textClass7,
      id: this.state.lessonIds[6], //falta obtener el id de la lesson
      position: 0,
      description: this.state.description7,
      projectId: this.state.projectId,
      active: true,
    }
    this.setState({ disableButtonClass7: true })

    console.log(lesson);
    this.addLesson(lesson, this.state.archivosClase7);
  }

  onValueChange = (event) => {
    this.setState({
      projectName: event.target.value
    });
    console.log(this.state.projectName);
  }

  openModal = (id) => {
    this.setState({ openModal: true, modalId: id });
  }

  closeModal = () => {
    this.setState({ openModal: false, modalId: -1 });
  }

  //--------------------------------------------------------------------------------------------- FILE

  subirArchivos = async (elem, archivosLesson, lessonId) => {
    console.log('imprimiendo elem')
    console.log(elem);
    const base64 = await this.convertToBase64(elem[0]);
    console.log('imprimiendo base64')
    console.log(base64);
    let archivo = {
      position: this.state[archivosLesson].length,
      name: elem[0].name,
      dataType: 'FILE',
      data: base64,
      documentSourceType: 'LESSON',
      sourceId: lessonId
    }
    this.setState(prevState => ({ ...prevState, [archivosLesson]: prevState[archivosLesson].concat(archivo) }));
  }

  convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  borrarArchivo = (e, archivosLesson) => {
    this.setState(prevState => ({ ...prevState, [archivosLesson]: prevState[archivosLesson].filter(archivo => archivo.name !== e.name) }))
  }


  /////////////////////



  render() {
    return (
      <div className='mainContainer'>
        <HeaderTeacher />
        <div className='newClaseForm'>
          {/* aca va el nombre de la clase */}
          <div className='whiteBox'>

            <div>
              <div className="title">
                Aprendizaje Basado en Proyectos
              </div>
              <VerticalTimeline lineColor={"rgb(225, 206, 81)"}>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 73, 51)' }}
                  iconStyle={{ background: 'rgb(255, 73, 51', color: 'rgb(225, 206, 81)' }}
                  icon={<img src={LogoMini} className="small-img" />}
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
                      <Input type="textarea" name="projectName" id="exampleText" onChange={this.handleChange} />
                    </FormGroup>
                  </Form>
                  <div><Button disabled={this.state.disableButtonProject} onClick={() => this.createProject()} color="success" >Crear proyecto</Button></div>
                </VerticalTimelineElement>


                {/* CLASE 1 */}
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"

                  contentStyle={{ background: 'rgb(225, 206, 81)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 110  , 51)' }}
                  iconStyle={{ background: 'rgb(255, 110  , 51', color: 'rgb(225, 206, 81)' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title"> Pregunta Disparadora</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 1 </h4>
                  <p>
                    Formular pregunta disparadora
                    <div>
                      <Button disabled={this.state.disableButtonClass1} color="success" onClick={() => this.openModal(1)}>Activar Clase</Button></div>
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
                      <Form>
                        <FormGroup>
                          <Label for="exampleText"><p>
                          </p></Label>
                          <Input type="textarea" name="textClass1" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </Form>
                      <br />
                      <div>
                        <h3>Descripción acerca del tema (Opcional) </h3>
                        <Form>
                          <FormGroup>
                            <Input type="textarea" name="description1" id="exampleText" onChange={this.handleChange} />
                          </FormGroup>
                        </Form>
                        <h3>Adjuntar documentación </h3>
                      </div>
                      <div> Mediante la opción "Adjuntar Material" puede proporcionar
                        el material que crea conveniente a sus alumnos, tales como
                        documentos en formato word, excel, pdf</div>
                      <div>
                        <h3>Disponibilizar material</h3>
                        <FormGroup>
                          <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase1', this.state.lessonIds[0])} />
                          <br />
                          {this.state.archivosClase1 && this.state.archivosClase1.map(document =>
                            <div key={document.name} >
                              <Alert className="flexSpaceBetween">
                                <Label>{document.name}</Label>
                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase1')}>Borrar</Button>
                              </Alert>
                            </div>
                          )}
                        </FormGroup>
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addFirstLesson()}>Activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>

                {/* CLASE 2 */}

                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 153  , 51)' }}
                  iconStyle={{ background: 'rgb(255, 153  , 51', color: 'rgb(225, 206, 81)' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title">Formando Equipos</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 2</h4>
                  <p>
                    Formar equipos con diversidad de perfiles

                    <div>
                      <Button disabled={this.state.disableButtonClass2} color="success" onClick={() => this.openModal(2)}>Activar Clase</Button></div>
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


                      <h3>Adjuntar documentación </h3>
                      <FormGroup>
                        <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase2', this.state.lessonIds[1])} />
                        <br />
                        {this.state.archivosClase2 && this.state.archivosClase2.map(document =>
                          <div key={document.name} >
                            <Alert className="flexSpaceBetween">
                              <Label>{document.name}</Label>
                              <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase2')}>Borrar</Button>
                            </Alert>
                          </div>
                        )}
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addSecondLesson()}>Activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                    </ModalFooter>
                  </Modal>

                </VerticalTimelineElement>


                {/* clase 3 */}


                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  iconStyle={{ background: 'rgb(255, 175, 51', color: 'rgb(255, 206, 81)' }}
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 175, 51)' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title">Planificación</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 3</h4>
                  <p>
                    Delimitar fechas y lineamientos para la planificación y desarrollo del proyecto
                  </p>
                  <div>  <Button disabled={this.state.disableButtonClass3} color="success" onClick={() => this.openModal(3)}>Activar Clase</Button>
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
                          <h3>Descripción</h3>
                        </div>
                        <div>
                          <Form>
                            <FormGroup>
                              <Label for="exampleText"><p>
                              </p></Label>
                              <Input type="textarea" name="description1" id="exampleText" onChange={this.handleChange} />
                            </FormGroup>
                          </Form>

                          <h3>Adjuntar documentación con lineamientos</h3>
                          <FormGroup>
                            <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase3', this.state.lessonIds[2])} />
                            <br />
                            {this.state.archivosClase3 && this.state.archivosClase3.map(document =>
                              <div key={document.name} >
                                <Alert className="flexSpaceBetween">
                                  <Label>{document.name}</Label>
                                  <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase3')}>Borrar</Button>
                                </Alert>
                              </div>
                            )}
                          </FormGroup>
                        </div>
                      </ModalBody>
                      <ModalFooter className="modalFooter">
                        <Button color="primary" onClick={() => this.addThirdLesson()}>Activar clase</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </VerticalTimelineElement>


                {/* CLASE 4 */}


                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 202, 51)' }}
                  iconStyle={{ background: 'rgb(255, 202, 51)', color: 'rgb(225, 206, 81)' }}
                  icon={<img src={LogoMini} className="small-img" />}

                >
                  <h3 className="vertical-timeline-element-title">Investigación</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 4</h4>
                  <p>
                    Definir los temas que se desarrollarán en la investigación y los entregables

                  </p>
                  <div>  <Button disabled={this.state.disableButtonClass4} color="success" onClick={() => this.openModal(4)}>Activar Clase</Button>
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
                          <Input type="textarea" name="description4" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <div>
                        <div>
                        </div>


                        <h3>Adjuntar documentación con lineamientos</h3>
                        <FormGroup>
                          <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase4', this.state.lessonIds[3])} />
                          <br />
                          {this.state.archivosClase4 && this.state.archivosClase4.map(document =>
                            <div key={document.name} >
                              <Alert className="flexSpaceBetween">
                                <Label>{document.name}</Label>
                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase4')}>Borrar</Button>
                              </Alert>
                            </div>
                          )}
                        </FormGroup>
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addForthLesson()}>Activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>

                {/* CLASE 5 */}

                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 227, 51)' }}
                  iconStyle={{ background: 'rgb(255, 227, 51)', color: '#fff' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title">Puesta en común y debate</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 5</h4>
                  <p>
                    Definir lineamientos para el debate
                  </p>
                  <div>  <Button disabled={this.state.disableButtonClass5} color="success" color="success" onClick={() => this.openModal(5)}>Activar Clase</Button>
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
                          <Input type="textarea" name="description5" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <div>
                        <div>
                        </div>


                        <h3>Adjuntar documentación con lineamientos</h3>
                        <FormGroup>
                          <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase5', this.state.lessonIds[4])} />
                          <br />
                          {this.state.archivosClase5 && this.state.archivosClase6.map(document =>
                            <div key={document.name} >
                              <Alert className="flexSpaceBetween">
                                <Label>{document.name}</Label>
                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase5')}>Borrar</Button>
                              </Alert>
                            </div>
                          )}
                        </FormGroup>
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addFifthLesson()}>Activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>

                {/* CLASE 6 */}
                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(210, 220, 71)' }}

                  iconStyle={{ background: 'rgb(210, 220, 71)', color: '#fff' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title">Elaborar Producto</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 6</h4>
                  <p>
                    Elaborar un producto  para la presentación que contemple la investigación y una posible solución al problema
                  </p>
                  <div> <Button disabled={this.state.disableButtonClass6} color="success" onClick={() => this.openModal(6)}>Activar Clase</Button>
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
                          <Input type="textarea" name="description6" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <div>
                        <div>
                        </div>


                        <h3>Adjuntar documentación con lineamientos</h3>

                        <FormGroup>
                          <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase6', this.state.lessonIds[5])} />
                          <br />
                          {this.state.archivosClase6 && this.state.archivosClase6.map(document =>
                            <div key={document.name} >
                              <Alert className="flexSpaceBetween">
                                <Label>{document.name}</Label>
                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase6')}>Borrar</Button>
                              </Alert>
                            </div>
                          )}
                        </FormGroup>
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addSixthLesson()}>Activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>


                {/* clase 7  */}

                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(184, 232  , 63)' }}
                  iconStyle={{ background: 'rgb(184, 232  , 63)', color: '#fff' }}
                  icon={<img src={LogoMini} className="small-img" />}

                >
                  <h3 className="vertical-timeline-element-title">Presentación del producto y evaluación</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 7</h4>
                  <p>
                    Entregar el producto final e incluir conclusiones. Preparar una presentación oral y realizar la evaluación
                  </p>
                  <div>  <Button disabled={this.state.disableButtonClass7} color="success" onClick={() => this.openModal(7)}>Activar Clase</Button>
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
                          <Input type="textarea" name="description7" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <div>
                        <h3>Adjuntar documentación con lineamientos</h3>
                        <FormGroup>
                          <input type="file" name="files" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase7', this.state.lessonIds[6])} />
                          <br />
                          {this.state.archivosClase7 && this.state.archivosClase7.map(document =>
                            <div key={document.name} >
                              <Alert className="flexSpaceBetween">
                                <Label>{document.name}</Label>
                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase7')}>Borrar</Button>
                              </Alert>
                            </div>
                          )}
                        </FormGroup>
                      </div>
                      <div>
                        <h3>Crear Quizz</h3>
                        <DocenteProyectoQuizz lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                      </div>
                      <div>
                        <h3>Crear Cuestionario</h3>
                        <DocenteProyectoCuestionario lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                      </div>
                      <div>
                        <h3>Crear Entregable</h3>
                        <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addSeventhLesson()}>Activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar sin guardar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                  icon={<img src={LogoMini} className="small-img" />}
                />
              </VerticalTimeline>
            </div >
          </div >
        </div >
      </div >
    )
  }
}