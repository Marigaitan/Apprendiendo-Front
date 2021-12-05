import React, { Component } from 'react';
import { Alert, Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import '../css/Global.css';
import '../css/ShowActivity.css';
import Cookies from 'universal-cookie/es6';
import axios from "axios";
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class ShowDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: [], selectGrade: 0, openModal: false, modalId: -1,
    };
  }

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;
    
       await axios.get("user/" + this.props.studentID + "/project/" + cookies.get("projectid") + "/documents")
       .then(response => {
         this.setState({docs: response.data})
        })
       .catch(console.log);

    console.log("documentos:")
    console.log(this.state.docs)

    // TODO este seria el uso cuando pudiera recibir los documentos
    // let axiosDocs = [];
    // this.props.activities.forEach(activity => {
    //   const request = axios.get("user/" + this.props.studentID + "/activity/" + activity.id + "/documents/summary");
    //   axiosDocs.push(request);
    // })


    // await axios.all(axiosDocs).then(responses => {
    //   let docs = responses.map(response => response.data);
    //   docs = docs.filter(activityList => activityList.length > 0 && activityList[0] === "FILE")
    //   console.log(docs);
    //   this.setState({
    //     docs: docs
    //   });
    // }).catch(console.log)
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
    alert("calificaste!");
    // let body = {
    //   percentageCompleted: 100,
    //   dateCompleted: (new Date()).toISOString(),
    //   grade: this.state.selectGrade,
    // }
    // axios.put("user/" + this.props.studentID + "/activity/" + activityId + "/progress", body)
    //   .then(response => {
    //     alert("Nota actualizada correctamente");
    //     window.location.reload();
    //   })
    //   .catch(response => {
    //     alert("Hubo un error en el envio de la nota");
    //   });
  }

  render() {

    return (
      <div>
        {this.state.docs.map((doc) => {
          return (
            <div key={doc.id} id={doc.id}>
              <Button block onClick={() => this.openModal(doc.id)} color="secondary">
                  <h5>{doc.name}</h5>
                </Button>
              <Modal isOpen={this.state.openModal && this.state.modalId === doc.id}>
                <ModalHeader size='lg'>
                  {doc.name}
                </ModalHeader>
                <ModalBody>
                  <h3><Label>Descargar archivo</Label></h3>
                  <Button color="secondary" onClick={() => this.docenteDescargaFile(API_HOST + "document/" + doc.id, doc.name)}>
                    <h5>{doc.name}</h5>
                  </Button>
                </ModalBody>
                <ModalFooter>
                  {/* CALIFACION DEL DOC */}
                {
                          doc.source.grade === null || doc.source.grade === -1
                            ?
                            (<div className="full-width">
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
                                <Button block outline color="primary" onClick={() => this.calificar(doc.source.activityId)}>Calificar</Button>
                                <Button block outline color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                              </div>
                            </div>)
                            // ------------------------------------------------------------ YA CALIFICADO ------------------------------------------------------------------------------------------
                            : <div>
                              <Alert>Calificado con {doc.source.grade}</Alert>
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
                              <Button block color='warning' onClick={() => this.calificar(doc.source.activityId)}>Editar nota</Button>
                              <Button block color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                            </div>
                        }
                </ModalFooter>
              </Modal>
              <h3>
              </h3>
            </div>
          );
        })}
      </div>
    );

  }

}