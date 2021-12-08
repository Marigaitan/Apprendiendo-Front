import React, { Component } from 'react';
import { Alert, Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import '../css/Global.css';
import '../css/ShowActivity.css';
import Cookies from 'universal-cookie/es6';
import axios from "axios";
import { API_HOST } from "../constants";
import _ from 'lodash';

const cookies = new Cookies();

export default class ShowDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [], docs: [], selectGrade: 0, openModal: false, modalId: -1,
    };
  }

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;

    let activities = this.props.activities.filter(activity => activity.documents.length > 0 && activity.documents.every(document => document.dataType === "ENTREGABLE"))

    let axiosDocs = [];
    activities.forEach(activity => {
      const request = axios.get("user/" + this.props.studentID + "/activity/" + activity.id + "/documents/summary");
      axiosDocs.push(request);
    })


    await Promise.allSettled(axiosDocs).then(values => {
      console.log(values);
      let docs = values.map(value => value.value.data);
      console.log(docs);
      console.log(activities);
      this.setState({
        activities: activities,
        docs: docs
      });
    }).catch(console.log)
  }

  async docenteDescargaFile(url, fileName) {
    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        const buff = Buffer.from(response.data.data, "base64");
        const url = window.URL.createObjectURL(new Blob([buff]));
        const link = document.createElement("a");
        link.href = response.data.data;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      });
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
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


  render() {

    return (
      <div>
        {this.state.activities.map((activity) => {
          //tiene una lista de docs. Lo que tengo que hacer es juntar la actividad con los docs que el alumno subio de esa actividad y calificar
          let docList = _.find(this.state.docs, function (docList) { return docList.length > 0 && docList.every(doc => doc.source.activityId === activity.id); });
          console.log(docList);
          return (
            docList === undefined ? <div></div> :
              <div key={activity.id} id={activity.id}>
                <Button block onClick={() => this.openModal(activity.id)} color="secondary">
                  <h5>{activity.name}</h5>
                </Button>
                <Modal isOpen={this.state.openModal && this.state.modalId === activity.id}>
                  <ModalHeader size='lg'>
                    {activity.name}
                  </ModalHeader>
                  <ModalBody>
                    <h3><Label>Descargar archivos</Label></h3>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', }}>
                    {docList !== undefined
                      ? docList.map(doc => {
                        return (
                          <Button key={doc.id} color="secondary" onClick={() => this.docenteDescargaFile(API_HOST + "document/" + doc.id, doc.name)}>
                            <h5>{doc.name}</h5>
                          </Button>
                        )
                      })
                      : <div></div>}
                      </div>
                  </ModalBody>
                  <ModalFooter>
                    {/* CALIFACION DEL DOC */}
                    {
                      docList[0].source.grade === null || docList[0].source.grade === -1
                        ?
                        (<div className="full-width">
                          <Alert color='info'>Aun no se ha calificado</Alert>
                          <div className="flex-start">
                            <Label>Calificar:</Label>
                            <FormGroup row>
                              <Col sm={10}>
                                <Input name="selectGrade" value={this.state.selectGrade} type="select" className="selector" onChange={this.handleChange} >
                                  {Array.from({ length: 11 }, (x, i) =>
                                    <option key={i} id={i}>
                                      {i}
                                    </option>)}
                                </Input>
                              </Col>
                            </FormGroup>
                          </div>
                          <div>
                            <Button block outline color="primary" onClick={() => this.calificar(activity.id)}>Calificar</Button>
                            <Button block outline color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                          </div>
                        </div>)
                        // ------------------------------------------------------------ YA CALIFICADO ------------------------------------------------------------------------------------------
                        : <div className="full-width">
                          <Alert>Calificado con {docList[0].source.grade}</Alert>
                          <div className="flex-start">
                            <Label>Editar Calificacion:</Label>
                            <FormGroup row>
                              <Col sm={10}>
                                <Input name="selectGrade" value={this.state.selectGrade} type="select" className="selector" onChange={this.handleChange}>
                                  {Array.from({ length: 11 }, (x, i) =>
                                    <option key={i} id={i}>
                                      {i}
                                    </option>)}
                                </Input>
                              </Col>
                            </FormGroup>
                          </div>
                          <Button block color='warning' onClick={() => this.calificar(activity.id)}>Editar nota</Button>
                          <Button block color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                        </div>
                    }
                  </ModalFooter>
                </Modal>
                <h3>
                </h3>
              </div>
          )
        })}
      </div>
    );

  }

}