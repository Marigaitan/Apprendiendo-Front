import React, { Component } from 'react';
import { Alert, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import '../css/Global.css';
import '../css/ShowActivity.css';
import Cookies from 'universal-cookie/es6';
import axios from "axios";
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class ShowActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activitiesAnswers: [],
      openModal: false, modalId: -1, selectGrade: 0
    };
  }

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;
    let axiosActivities = [];
    this.props.activities.forEach(activity => {
      const request = axios.get("user/" + this.props.studentID + "/activity/" + activity.id + "/documents");
      axiosActivities.push(request);
    })
    console.log(axiosActivities);


    await axios.all(axiosActivities).then(responses => {
      let activities = responses.map(response => response.data);
      console.log(activities);
      this.setState({
        activitiesAnswers: activities
      });
    }).catch(console.log)

    console.log("documentos:")
    console.log(this.state.activitiesAnswers)
  }


  openModal = (id) => {
    this.setState({ openModal: true, modalId: id });
  }

  closeModal() {
    this.setState({ openModal: false, modalId: -1 });
  }

  calificar(activityId) {
    let body = {
      percentageCompleted: 100,
      dateCompleted: (new Date()).toISOString(),
      grade: this.state.selectGrade,
    }
    axios.put("user/" + this.props.studentID + "/activity/" + activityId + "/progress", body)
    .then(response => {
      console.log(response.data);
      alert("Nota actualizada correctamente");
      window.location.reload();
    })
    .catch(response => {
      alert("Hubo un error en el envio de la nota");
      console.log(response)
    });
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    console.log(this.state.activitiesAnswers);
    return (
      <div>
        {this.state.activitiesAnswers.map(activityList =>
          activityList.map(activity => {
            let actividad = JSON.parse(activity.data);
            console.log(actividad);
            return (
              <div key={activity.id} id={activity.id}>
                <h3>
                  <li>
                    <Button onClick={() => this.openModal(activity.id)}
                      class="btn btn-link">
                      <h5>{activity.name}</h5>
                    </Button>
                  </li>
                </h3>
                <Modal isOpen={this.state.openModal && this.state.modalId === activity.id}>
                  <ModalHeader size='lg'>
                    {activity.name}
                  </ModalHeader>
                  <ModalBody>
                    {activity.dataType === "CUESTIONARIO"
                      ?
                      (<div>
                        {actividad && actividad.map((respuesta, index) =>
                          <div key={index} id={index}>
                            <h4><Label>Pregunta {index + 1}</Label></h4>
                            <Label >{respuesta}</Label>
                            <br/>
                            <br/>
                          </div>
                        )}
                      </div>)
                      : activity.dataType === "QUIZZ"
                        ?
                        (<div>
                          {actividad && actividad.resultados.map((resultado, index) =>
                            <div key={index} id={index} className="respuesta">
                              <Label>{resultado.pregunta}</Label>
                              <Label>{resultado.respuesta}</Label>
                            </div>
                          )
                          }
                        </div>)
                        : <div></div>
                    }
                  </ModalBody>
                  <ModalFooter className="footer">
                    {/* ------------------------------ CALIFICACION ------------------------------ */}
                    {/* ------------------------------ CUESTIONARIO ------------------------------ */}
                    {/* ------------------------------ SIN CALIFAR TODAVIA ------------------------------ */}
                    {activity.dataType === "CUESTIONARIO"
                      ?
                      (<div className="full-width">
                        {
                          activity.source.grade === null || activity.source.grade === -1
                            ?
                            (<div>
                              <Alert color='info'>Aun no se ha calificado</Alert>
                              <div className="flex-start">
                                <Label>Calificar:</Label>
                                <FormGroup row>
                                  <Col sm={10}>
                                    <Input
                                      id="exampleSelect"
                                      name="selectGrade"
                                      type="select"
                                      className="selector"
                                    >
                                      {Array.from({ length: 11 }, (x, i) =>
                                        <option>
                                          {i}
                                        </option>)}
                                    </Input>
                                  </Col>
                                </FormGroup>
                              </div>
                              <div>
                                <Button block outline color="primary" onClick={() => this.calificar(activity.source.activityId)}>Calificar</Button>
                                <Button block outline color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                              </div>
                            </div>)
                              // ------------------------------------------------------------ YA CALIFICADO ------------------------------------------------------------------------------------------
                            : <div>
                              <Alert>Calificado con {activity.source.grade}</Alert>
                              <div className="flex-start">
                              <Label>Editar Calificacion:</Label>
                              <FormGroup row>
                                  <Col sm={10}>
                                    <Input
                                      id="exampleSelect"
                                      name="selectGrade"
                                      value={this.state.selectGrade}
                                      type="select"
                                      className="selector"
                                      onChange={this.handleChange}
                                    >
                                      {Array.from({ length: 11 }, (x, i) =>
                                        <option>
                                          {i}
                                        </option>)}
                                    </Input>
                                  </Col>
                                </FormGroup>
                                </div>
                              <Button block color='warning' onClick={() => this.calificar(activity.source.activityId)}>Editar nota</Button>
                              </div>
                        }
                      </div>)
                      : activity.dataType === "QUIZZ"
                        ?
                        (<div>
                          <Alert>Calificado con {actividad.puntaje / actividad.resultados.length * 10}</Alert>
                          <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                        </div>)
                        : <div></div>
                    }
                  </ModalFooter>
                </Modal>
              </div>
            )
          })
        )}
      </div>
    );

  }

}