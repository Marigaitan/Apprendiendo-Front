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
      openModal: false, modalId: -1,
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

  calificar() {
    alert("calificaste yay!");
  }


  render() {

    return (
      <div>
        {this.state.activitiesAnswers.map((activityList) =>
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
                        {actividad && actividad.map((respuesta, index) => <Label key={index} id={index}>{respuesta}</Label>)}
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
                  <ModalFooter className="modalFooter">
                    {activity.dataType === "CUESTIONARIO"
                      ?
                      (<div>
                        <Label>Calificar:</Label>
                        <FormGroup row>
                          <Label
                            for="exampleSelect"
                            sm={2}
                          >
                            Select
                          </Label>
                          <Col sm={10}>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                            >
                              {Array.from({ length: 11 }, (x, i) =>
                                <option>
                                  {i}
                                </option>)}
                            </Input>
                          </Col>
                        </FormGroup>
                        <Button color="secondary" onClick={() => this.calificar()}>Calificar</Button>
                      </div>)
                      : activity.dataType === "QUIZZ"
                        ?
                        (<div>
                          <Label>Calificacion:</Label>
                          <Label>{actividad.puntaje / actividad.resultados.length * 10}</Label>
                        </div>)
                        : <div></div>
                    }
                    <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
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