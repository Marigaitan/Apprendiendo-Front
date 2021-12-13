import axios from "axios";
import React, { Component } from 'react';
import { Alert, Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import '../css/Global.css';
import '../css/ShowActivity.css';
import * as _ from "lodash";

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


    await axios.all(axiosActivities).then(responses => {
      let activities = responses.map(response => response.data);
      console.log(activities);
      activities = activities.filter(activityList => activityList.length > 0 && activityList[0].dataType !== "ENTREGABLE")
      console.log(activities);
      this.setState({
        activitiesAnswers: activities
      });
    }).catch(console.log)
  }


  openModal = (id) => {
    this.setState({ openModal: true, modalId: id });
  }

  closeModal() {
    this.setState({ openModal: false, modalId: -1 });
  }

  async calificar(activityId) {
    let body = {
      percentageCompleted: 100,
      dateCompleted: (new Date()).toISOString(),
      grade: this.state.selectGrade,
    }
    await axios.put("user/" + this.props.studentID + "/activity/" + activityId + "/progress", body)
      .then(response => {
        alert("Nota actualizada correctamente");
        window.location.reload();
      })
      .catch(response => {
        alert("Hubo un error en el envio de la nota");
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
    return (
      <div>
        {this.state.activitiesAnswers.map(activityList => {
          let activityAlumno = activityList[0];
          let actividadRespuestas = JSON.parse(activityAlumno.data);
          return (
            <div key={activityAlumno.id} id={activityAlumno.id} >
              <Button block onClick={() => this.openModal(activityAlumno.id)} color="warning" className="button-table">
                <h5>{activityAlumno.name}</h5>
              </Button>
              <Modal isOpen={this.state.openModal && this.state.modalId === activityAlumno.id}>
                <ModalHeader tag="h2">
                  {activityAlumno.name}
                </ModalHeader>
                <ModalBody>
                  {activityAlumno.dataType === "CUESTIONARIO"
                    ?
                    (<div>
                      {actividadRespuestas && actividadRespuestas.map((respuesta, index) =>
                        <div key={index} id={index} className="respuesta">
                          <Label><h5>{JSON.parse(_.find(this.props.activities, { id: activityAlumno.source.activityId }).documents[0].data)[index].question}</h5></Label>
                          <Label>{respuesta}</Label>
                        </div>
                      )}
                    </div>)
                    : activityAlumno.dataType === "QUIZZ"
                      ?
                      (<div>
                        {actividadRespuestas && actividadRespuestas.resultados.map((resultado, index) =>
                          <div key={index} id={index} className="respuesta">
                            <Label><h5>{resultado.pregunta}</h5></Label>
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
                  {activityAlumno.dataType === "CUESTIONARIO"
                    ?
                    (<div className="full-width">
                      {
                        activityAlumno.source.grade === null || activityAlumno.source.grade === -1
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
                                    value={this.state.selectGrade}
                                    type="select"
                                    className="selector"
                                    onChange={this.handleChange}
                                  >
                                    {Array.from({ length: 11 }, (x, i) =>
                                      <option key={i} id={i}>
                                        {i}
                                      </option>)}
                                  </Input>
                                </Col>
                              </FormGroup>
                            </div>
                            <div>
                              <Button block outline color="primary" onClick={() => this.calificar(activityAlumno.source.activityId)}>Calificar</Button>
                              <Button block outline color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                            </div>
                          </div>)
                          // ------------------------------------------------------------ YA CALIFICADO ------------------------------------------------------------------------------------------
                          : <div>
                            <Alert>Calificado con {activityAlumno.source.grade}</Alert>
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
                                      <option key={i} id={i}>
                                        {i}
                                      </option>)}
                                  </Input>
                                </Col>
                              </FormGroup>
                            </div>
                            <Button block color='warning' onClick={() => this.calificar(activityAlumno.source.activityId)}>Editar nota</Button>
                            <Button block color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                          </div>
                      }
                    </div>)
                    : activityAlumno.dataType === "QUIZZ"
                      ?
                      (<div>
                        <Alert>Calificado con {activityAlumno.source.grade}</Alert>
                        <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                      </div>)
                      : <div></div>
                  }
                </ModalFooter>
              </Modal>
            </div>
          )
        })}
      </div>
    );

  }

}