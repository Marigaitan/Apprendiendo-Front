import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardText, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import '../css/Global.css';
import '../css/ShowActivity.css';
import Cookies from 'universal-cookie/es6';
import axios from "axios";
import { API_HOST } from "../constants";
import _ from 'lodash';

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
      activities = activities.filter(activityList => activityList.length > 0 && activityList[0] !== "FILE")
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

  calificar(activityId) {
    let body = {
      percentageCompleted: 100,
      dateCompleted: (new Date()).toISOString(),
      grade: this.state.selectGrade,
    }
    axios.put("user/" + this.props.studentID + "/activity/" + activityId + "/progress", body)
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
          let activity = activityList[0];
          let actividad = JSON.parse(activity.data);
          return (
            <div key={activity.id} id={activity.id} >
              <Button block onClick={() => this.openModal(activity.id)} color="warning" className="button-table">
                <h5>{activity.name}</h5>
              </Button>
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
                          <Card color="secondary" inverse>
                            <CardBody>
                              <CardTitle tag="h4">
                                <h4><Label>Pregunta {index + 1}</Label></h4>
                              </CardTitle>
                              <CardText>
                                {respuesta}
                              </CardText>
                            </CardBody>
                          </Card>
                          <br />
                          <br />
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
                                      <option key={i} id={i}>
                                        {i}
                                      </option>)}
                                  </Input>
                                </Col>
                              </FormGroup>
                            </div>
                            <Button block color='warning' onClick={() => this.calificar(activity.source.activityId)}>Editar nota</Button>
                            <Button block color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
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
        })}
      </div>
    );

  }

}