import axios from 'axios';
import React, { Component } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import '../css/DocenteEditLesson.css';
import '../css/Global.css';
import LogoMini from '../Images/logoMini.png';
import DocenteProyectoCuestionario from './DocenteProyectoCuestionario';
import DocenteProyectoEntregable from './DocenteProyectoEntregable';
import DocenteProyectoQuizz from './DocenteProyectoQuizz';
//import '../css/DocenteClassroom.css';
import HeaderTeacher from "./Header";
import VerticalTimeline from './VerticalTimeline';
import VerticalTimelineElement from './VerticalTimeLineElement';


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
          name: "Planificaci??n",
          position: 2,
          description: '',
          active: false,
          activities: [],
          documents: [],

        },
        {
          name: "Investigaci??n",
          position: 3,
          description: '',
          active: false,
          activities: [],
          documents: [],

        },
        {
          name: "Puesta en com??n y debate",
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
          name: "Presentaci??n del producto",
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

  addFourthLesson = () => {
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
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: ' rgb(87, 87, 87)' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 73, 51)' }}
                  iconStyle={{ background: 'rgb(255, 73, 51', color: 'rgb(225, 206, 81)' }}
                  icon={<img src={LogoMini} className="small-img" />}
                ><h3 className="vertical-timeline-element-title">Configuraci??n inicial</h3>
                  <h4 className="vertical-timeline-element-subtitle"></h4>
                  <div>
                    <p>

                    </p></div>
                  <Form>
                    <FormGroup>
                      <Label for="exampleText"><p>Para avanzar con la configuraci??n:
                        Ingresar un nombre con el que se identificar?? el proyecto y luego guardar
                      </p></Label>
                      <Input type="textarea" name="projectName" id="exampleText" onChange={this.handleChange} />
                    </FormGroup>
                  </Form>
                  <div><Button disabled={this.state.disableButtonProject} onClick={() => this.createProject()} color="success" >Crear proyecto</Button></div>
                </VerticalTimelineElement>


                {/* CLASE 1 */}
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: ' rgb(87, 87, 87)' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 110  , 51)' }}
                  iconStyle={{ background: 'rgb(255, 110  , 51', color: 'rgb(225, 206, 81)' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title"> Pregunta Disparadora</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 1 </h4>
                  <p>
                    Formular pregunta disparadora. Se debe seleccionar una pregunta abierta que despierte el inter??s y motive a los alumnos.
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
                        En esta etapa, el docente selecciona un tema que est??
                        ligado a la realidad de los alumnos, y debe plantear una
                        pregunta abierta que despierte su inter??s y los motive a
                        aprender.

                        El objetivo en este punto es detectar conocimientos
                        previos y que el alumno  piense qu?? debe investigar  y c??mo
                        resolver la cuesti??n.
                      </div>
                      <div></div>
                      <div>
                        <h3>T??tulo: </h3>
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
                        <h3>Descripci??n:</h3>
                        <Form>
                          <FormGroup>
                            <Input type="textarea" name="description1" id="exampleText" onChange={this.handleChange} />
                          </FormGroup>
                        </Form>
                        <h3>Disponibilizar material</h3>
                        <FormGroup>
                          <input type="file" name="archivosClase1" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase1', this.state.lessonIds[0])} />
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
                        <div>
                          <h3>Crear Quizz</h3>
                          <DocenteProyectoQuizz lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[0] : -1} />
                        </div>
                        <div>
                          <h3>Crear Cuestionario</h3>
                          <DocenteProyectoCuestionario lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[0] : -1} />
                        </div>
                        <div>
                          <h3>Crear actividad entregable</h3>
                          <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[0] : -1} />
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addFirstLesson()}>Guardar y activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>

                {/* CLASE 2 */}

                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: ' rgb(87, 87, 87)' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 153  , 51)' }}
                  iconStyle={{ background: 'rgb(255, 153  , 51', color: 'rgb(225, 206, 81)' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title">Formando Equipos</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 2</h4>
                  <p>
                    Dictar la consigna de formar equipos a los alumnos
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
                        anterior, el docente deber?? formar de equipos de 3 o 4
                        integrantes con diversidad de perfiles. D??ndoles la
                        posibilidad de que cada uno desempe??e un rol.

                      </div>
                      <div>
                        <h3>T??tulo: </h3>
                        <Form>
                          <FormGroup>
                            <Label for="exampleText"><p>
                            </p></Label>
                            <Input type="textarea" name="textClass2" id="exampleText" onChange={this.handleChange} />
                          </FormGroup>
                        </Form>
                      </div>
                      <br />
                      <div>
                        <h3>Breve descripci??n:</h3>
                        <FormGroup>
                          <Label for="exampleText"><p>
                          </p></Label>
                          <Input type="textarea" name="description2" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <h3>Adjuntar documentaci??n:</h3>
                      <FormGroup>
                        <input type="file" name="archivosClase2" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase2', this.state.lessonIds[1])} />
                        <br />
                        {this.state.archivosClase2 && this.state.archivosClase2.map(document =>
                          <div key={document.name} >
                            <Alert className="flexSpaceBetween">
                              <Label>{document.name}</Label>
                              <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase2')}>Borrar</Button>
                            </Alert>
                          </div>
                        )}
                        <div>
                          <h3>Crear Entregable:</h3>
                          <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[1] : -1} />
                        </div>
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addSecondLesson()}>Guardar y activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar</Button>
                    </ModalFooter>
                  </Modal>

                </VerticalTimelineElement>


                {/* clase 3 */}


                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  iconStyle={{ background: 'rgb(255, 175, 51', color: 'rgb(255, 206, 81)' }}
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: ' rgb(87, 87, 87)' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 175, 51)' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title">Planificaci??n</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 3</h4>
                  <p>
                    Delimitar fechas y lineamientos para la planificaci??n y desarrollo del proyecto
                  </p>
                  <div>  <Button disabled={this.state.disableButtonClass3} color="success" onClick={() => this.openModal(3)}>Activar Clase</Button>
                    <Modal isOpen={this.state.openModal && this.state.modalId === 3}>
                      <ModalHeader className="title">
                        <h3 className="title">Planificaci??n </h3>
                      </ModalHeader>
                      <ModalBody>
                        <div>


                          En esta clase se les solicita a los alumnos  que armen un
                          plan de trabajo donde: presenten las tareas previstas, responsables y las fechas de resoluci??n
                          estimadas.

                        </div>
                        <div>
                          <h3>T??tulo</h3>
                          <Form>
                            <FormGroup>
                              <Label for="exampleText"><p>
                              </p></Label>
                              <Input type="textarea" name="textClass3" id="exampleText" onChange={this.handleChange} />
                            </FormGroup>
                          </Form>
                        </div>
                        <br />
                        <div>
                          <h3>Breve descripci??n (opcional)</h3>
                          <FormGroup>
                            <Label for="exampleText"><p>
                            </p></Label>
                            <Input type="textarea" name="description3" id="exampleText" onChange={this.handleChange} />
                          </FormGroup>
                        </div>
                        <div>
                          <h3>Adjuntar documentaci??n con lineamientos</h3>
                          <FormGroup>
                            <input type="file" name="archivosClase3" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase3', this.state.lessonIds[2])} />
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
                          <div>
                            <h3>Crear Entregable</h3>
                            <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[2] : -1} />

                          </div>
                        </div>


                        <ModalFooter className="modalFooter">
                          <Button color="primary" onClick={() => this.addThirdLesson()}>Guardar y activar clase</Button>
                          <Button color="secondary" onClick={this.closeModal}>Cerrar</Button>

                        </ModalFooter>
                      </ModalBody>
                    </Modal>
                  </div>
                </VerticalTimelineElement>


                {/* CLASE 4 */}


                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: ' rgb(87, 87, 87)' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 202, 51)' }}
                  iconStyle={{ background: 'rgb(255, 202, 51)', color: 'rgb(225, 206, 81)' }}
                  icon={<img src={LogoMini} className="small-img" />}

                >
                  <h3 className="vertical-timeline-element-title">Investigaci??n</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 4</h4>
                  <p>
                    Definir los temas que se desarrollar??n en la investigaci??n y los entregables

                  </p>
                  <div>  <Button disabled={this.state.disableButtonClass4} color="success" onClick={() => this.openModal(4)}>Activar Clase</Button>
                  </div>

                  <Modal isOpen={this.state.openModal && this.state.modalId === 4}>
                    <ModalHeader className="title">
                      <h3 className="title">Investigaci??n</h3>
                    </ModalHeader>
                    <ModalBody>
                      <div>


                        En esta clase se les solicita a los grupos que comiencen a investigar a partir de un
                        escenario concreto dado por la pregunta disparadora. El docente no va a preparar la informaci??n
                        que deban preparar aunque si puede disponibilizar preguntas que sirvan como gu??a.
                        La investigaci??n es por cuenta de cada grupo y deben entregar los resultados
                        con las fuentes consultadas.

                      </div>
                      <div>
                          <h3>T??tulo</h3>
                          <Form>
                            <FormGroup>
                              <Label for="exampleText"><p>
                              </p></Label>
                              <Input type="textarea" name="textClass4" id="exampleText" onChange={this.handleChange} />
                            </FormGroup>
                          </Form>
                        </div>
                      <div>


                        <h3>Descripciones</h3>
                        <FormGroup>
                          <Input type="textarea" name="description4" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <div>
                        <div>
                        </div>


                        <h3>Adjuntar documentaci??n con lineamientos</h3>
                        <FormGroup>
                          <input type="file" name="archivosClase4" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase4', this.state.lessonIds[3])} />
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
                      <div>
                        <h3>Crear Quizz</h3>
                        <DocenteProyectoQuizz lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[3] : -1} />
                      </div>
                      <div>
                        <h3>Crear Cuestionario</h3>
                        <DocenteProyectoCuestionario lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[3] : -1} />
                      </div>
                      <div>
                        <h3>Crear Entregable</h3>
                        <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[3] : -1} />
                      </div>


                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addFourthLesson()}>Guardar y activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>

                {/* CLASE 5 */}

                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: ' rgb(87, 87, 87)' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(255, 227, 51)' }}
                  iconStyle={{ background: 'rgb(255, 227, 51)', color: '#fff' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title">Puesta en com??n y debate</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 5</h4>
                  <p>
                    Definir lineamientos y condiciones para el debate que se dar?? en el aula.
                  </p>
                  <div>  <Button disabled={this.state.disableButtonClass5} color="success" color="success" onClick={() => this.openModal(5)}>Activar Clase</Button>
                  </div>


                  <Modal isOpen={this.state.openModal && this.state.modalId === 5}>
                    <ModalHeader className="title">
                      <h3 className="title">Puesta en com??n y debate</h3>
                    </ModalHeader>
                    <ModalBody>
                      <div>


                        Luego de la investigaci??n el docente debe determinar una fecha
                        en la cual los grupos expondr??n los resultados de su investigaci??n
                        y debatir??n con el resto de los alumnos acerca de los mismos.
                        Al finalizar la puesta en com??n con el resto de los alumnos
                        deber??n en conjunto idear un producto final a elaborar con la investigaci??n realizada
                        (como un folleto, una presentaci??n informativa para alg??n establecimiento, un trabajo de investigaci??n cientifica).
                        El docente puede disponibilizar nuevas preguntas que los alumnos deber??n responder en la puesta en com??n.

                      </div>
                      <div>
                        <h3>T??tulo: </h3>
                        <Form>
                          <FormGroup>
                            <Label for="exampleText"><p>
                            </p></Label>
                            <Input type="textarea" name="textClass5" id="exampleText" onChange={this.handleChange} />
                          </FormGroup>
                        </Form>
                      </div>
                      <div>


                        <h3>Descripciones</h3>
                        <FormGroup>
                          <Input type="textarea" name="description5" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <div>
                        <div>
                        </div>


                        <h3>Adjuntar documentaci??n con lineamientos</h3>
                        <FormGroup>
                          <input type="file" name="archivosClase5" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase5', this.state.lessonIds[4])} />
                          <br />
                          {this.state.archivosClase5 && this.state.archivosClase5.map(document =>
                            <div key={document.name} >
                              <Alert className="flexSpaceBetween">
                                <Label>{document.name}</Label>
                                <Button name={document.name} onClick={() => this.borrarArchivo(document, 'archivosClase5')}>Borrar</Button>
                              </Alert>
                            </div>
                          )}
                        </FormGroup>
                      </div>
                      <div>
                        <h3>Crear Quizz</h3>
                        <DocenteProyectoQuizz lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[4] : -1} />
                      </div>
                      <div>
                        <h3>Crear Cuestionario</h3>
                        <DocenteProyectoCuestionario lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[4] : -1} />
                      </div>

                      <div>
                        <h3>Crear Entregable</h3>
                        <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[4] : -1} />
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addFifthLesson()}>Guardar y activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>

                {/* CLASE 6 */}
                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: ' rgb(87, 87, 87)' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(210, 220, 71)' }}

                  iconStyle={{ background: 'rgb(210, 220, 71)', color: '#fff' }}
                  icon={<img src={LogoMini} className="small-img" />}
                >
                  <h3 className="vertical-timeline-element-title">Elaborar Producto</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 6</h4>
                  <p>
                    Elaborar un producto  para la presentaci??n que contemple la investigaci??n y una posible soluci??n al problema
                  </p>
                  <div> <Button disabled={this.state.disableButtonClass6} color="success" onClick={() => this.openModal(6)}>Activar Clase</Button>
                  </div>
                  <Modal isOpen={this.state.openModal && this.state.modalId === 6}>
                    <ModalHeader className="title">
                      <h3 className="title">Elaborar Producto</h3>
                    </ModalHeader>
                    <ModalBody>
                      <div>

                        Luego del debate y la decisi??n en conjunto del producto a elaborar
                        el docente debe proveer a los alumnos la fecha en la que se deber?? finalizar
                        con el producto y condiciones de la entrega en particular.



                      </div>
                      <div>
                        <h3>T??tulo:</h3>
                        <Form>
                          <FormGroup>
                            <Label for="exampleText"><p>
                            </p></Label>
                            <Input type="textarea" name="textClass6" id="exampleText" onChange={this.handleChange} />
                          </FormGroup>
                        </Form>
                      </div>
                      <div>


                        <h3>Descripciones </h3>
                        <FormGroup>
                          <Input type="textarea" name="description6" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <div>
                        <div>
                        </div>


                        <h3>Adjuntar documentaci??n con lineamientos</h3>

                        <FormGroup>
                          <input type="file" name="archivosClase6" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase6', this.state.lessonIds[5])} />
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
                      <div>
                        <h3>Crear Entregable</h3>
                        <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[5] : -1} />
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addSixthLesson()}>Guardar y activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar</Button>
                    </ModalFooter>
                  </Modal>
                </VerticalTimelineElement>


                {/* clase 7  */}

                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  contentStyle={{ background: 'rgb(225, 206, 81)', color: ' rgb(87, 87, 87)' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(184, 232  , 63)' }}
                  iconStyle={{ background: 'rgb(184, 232  , 63)', color: '#fff' }}
                  icon={<img src={LogoMini} className="small-img" />}

                >
                  <h3 className="vertical-timeline-element-title">Presentaci??n del producto y evaluaci??n</h3>
                  <h4 className="vertical-timeline-element-subtitle">Clase 7</h4>
                  <p>
                    Entregar el producto final e incluir conclusiones. Preparar una presentaci??n oral y realizar la evaluaci??n
                  </p>
                  <div>  <Button disabled={this.state.disableButtonClass7} color="success" onClick={() => this.openModal(7)}>Activar Clase</Button>
                  </div>
                  <Modal isOpen={this.state.openModal && this.state.modalId === 7}>
                    <ModalHeader className="title">
                      <h3 className="title">Presentaci??n del producto</h3>
                    </ModalHeader>
                    <ModalBody>
                      <div>

                        Toda la clase se re??ne para que cada equipo presente sus productos. La idea es que se cree un proceso iterativo
                        que convierte al proyecto en un espiral de aprendizaje que puede no tener fin dado que a lo largo de la investigaci??n
                        o en la etapa de conclusiones suelen surgir nuevas preguntas que pueden resultar en un nuevo proyecto.

                        El docente deber?? dar lugar al debate disponibilizando una fecha en la que se realizar??
                        esta etapa y solicitar?? los entregables finales a los alumnos.



                      </div>
                      <div>
                        <h3>Ingresar t??tulo del tema </h3>
                        <Form>
                          <FormGroup>
                            <Label for="exampleText"><p>
                            </p></Label>
                            <Input type="textarea" name="textClass7" id="exampleText" onChange={this.handleChange} />
                          </FormGroup>
                        </Form>
                      </div>
                      <div>


                        <h3>Descripciones </h3>
                        <FormGroup>
                          <Input type="textarea" name="description7" id="exampleText" onChange={this.handleChange} />
                        </FormGroup>
                      </div>
                      <div>
                        <h3>Adjuntar documentaci??n con lineamientos</h3>
                        <FormGroup>
                          <input type="file" name="archivosClase7" onChange={(elem) => this.subirArchivos(elem.target.files, 'archivosClase7', this.state.lessonIds[6])} />
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
                        <DocenteProyectoQuizz lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[6] : -1} />
                      </div>
                      <div>
                        <h3>Crear Cuestionario</h3>
                        <DocenteProyectoCuestionario lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[6] : -1} />
                      </div>
                      <div>
                        <h3>Crear Entregable</h3>
                        <DocenteProyectoEntregable lessonId={this.state.lessonIds.length > 0 ? this.state.lessonIds[6] : -1} />
                      </div>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="primary" onClick={() => this.addSeventhLesson()}>Guardar y activar clase</Button>
                      <Button color="secondary" onClick={this.closeModal}>Cerrar</Button>
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