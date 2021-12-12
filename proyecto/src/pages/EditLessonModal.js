import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button, Label, Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/DocenteEditLesson.css";
import "../css/Global.css";

const cookies = new Cookies();

export default class EditLessonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      modalId: -1,
      activeButton: false,
      formValues: [],
      name: "",
    };
  }

  componentDidMount() {
    let data = this.props.entregable
      ? this.props.entregable
      : JSON.parse(
          this.props.quizz
            ? this.props.quizz.data
            : this.props.cuestionario
            ? this.props.cuestionario.data
            : ""
        );
    console.log(data);
    this.setState({
      formValues: data,
      name: this.props.quizz
        ? this.props.quizz.name
        : this.props.cuestionario
        ? this.props.cuestionario.name
        : this.props.entregable
        ? this.props.entregable.name
        : "",
    });
  }

  openModal = (id) => {
    this.setState({ openModal: true, activeButton: false, modalId: id });
  };

  closeButton = () => {
    this.setState({ activeButton: true });
  };

  closeModal = () => {
    this.setState({ openModal: false, modalId: -1 });
  };

  buttonEditQuizzParams = (quizz) => {
    let pregunta = JSON.parse(quizz.data);
    console.log(pregunta);
    return (
      <div className="flex-start">
        <Label size="lg">{quizz.name}</Label>
        <Link>
          <Button
            key={quizz.position}
            outline
            block
            color="primary"
            onClick={() => this.openModal(quizz.position)}
          >
            Editar Quizz
          </Button>
        </Link>
        <Link
          to={{
            pathname: "/menudocente_classroom_proyecto_actividad_logros",
            state: { activityId: quizz.activityId },
          }}
        >
          <Button outline block color="primary">
            Logros
          </Button>
        </Link>
      </div>
    );
  };

  buttonEditCuestionarioParams = (cuestionario) => {
    let pregunta = JSON.parse(cuestionario.data);
    console.log(pregunta);
    return (
      <div className="flex-start">
        <Label size="lg">{cuestionario.name}</Label>
        <Link>
          <Button
            key={cuestionario.name}
            outline
            block
            color="primary"
            onClick={() => this.openModal(cuestionario.position)}
          >
            Editar Cuestionario
          </Button>
        </Link>
        <Link
          to={{
            pathname: "/menudocente_classroom_proyecto_actividad_logros",
            state: { activityId: cuestionario.activityId },
          }}
        >
          <Button key={cuestionario.position} outline block color="primary">
            Logros
          </Button>
        </Link>
      </div>
    );
  };

  buttonEditEntregableParams = (entregable) => {
    return (
      <div className="flex-start">
        <Label size="lg">{entregable.name}</Label>
        <Link>
          <Button
            key={entregable.id}
            outline
            block
            color="primary"
            onClick={() => this.openModal(entregable.id)}
          >
            Ver actividad entregable
          </Button>
        </Link>
        <Link
          to={{
            pathname: "/menudocente_classroom_proyecto_actividad_logros",
            state: { activityId: entregable.activityId },
          }}
        >
          <Button outline block color="primary">
            Logros (NO FUNCIONA TODAVIA, NO TOCAR)
          </Button>
        </Link>
      </div>
    );
  };

  removeFormFields = (i) => {
    let newFormValuesQ = [...this.state.formValues];
    newFormValuesQ.splice(i, 1);
    this.setState({ formValues: newFormValuesQ });
  };

  handleChange = (i, e) => {
    let newFormValuesQ = [...this.state.formValues];
    newFormValuesQ[i][e.target.name] = e.target.value;
    this.setState({ formValues: newFormValuesQ });
  };

  // -------------------------------------------------------------------------------- QUIZZ

  handleChangeAnswerText = (i, e, option) => {
    let newFormValuesQ = [...this.state.formValues];
    newFormValuesQ[i][e.target.name][option].answerText = e.target.value;
    this.setState({ formValues: newFormValuesQ });
  };

  addFormFieldsQ = () => {
    this.setState({
      formValues: [
        ...this.state.formValues,
        {
          questionText: "",
          answerOptions: [
            { answerText: "", isCorrect: true },
            { answerText: "", isCorrect: false },
            { answerText: "", isCorrect: false },
          ],
        },
      ],
    });
    console.log(this.state.formValues);
  };

  handleSubmitQ = async (event) => {
    console.log(this.props.quizz);
    event.preventDefault();
    let quizz = {
      id: this.props.quizz.id,
      sourceId: this.props.quizz.activityId,
      documentSourceType: "ACTIVITY",
      name: this.state.name,
      position: this.props.quizz.position,
      dataType: "QUIZZ",
      data: JSON.stringify(this.state.formValues),
    };
    await this.sendDocument(quizz);
  };

  // -------------------------------------------------------------------------------- CUESTIONARIO

  addFormFieldsC = () => {
    this.setState({
      formValues: [
        ...this.state.formValues,
        {
          question: "",
        },
      ],
    });
    console.log(this.state.formValues);
  };

  handleSubmitC = async (event) => {
    console.log(this.props.cuestionario);
    event.preventDefault();
    let cuestionario = {
      id: this.props.cuestionario.id,
      sourceId: this.props.cuestionario.activityId,
      documentSourceType: "ACTIVITY",
      name: this.state.name,
      position: this.props.cuestionario.position,
      dataType: "CUESTIONARIO",
      data: JSON.stringify(this.state.formValues),
    };
    await this.sendDocument(cuestionario);
  };

  // -------------------------------------------------------------------------------- ENVIAR DOCUMENTO

  sendDocument = async (document) => {
    await axios
      .put(API_HOST + "document", document, {
        headers: { Authorization: cookies.get("token") },
      })
      .then((response) => {
        alert("Actividad actualizada!");
        this.setState({ activeButton: true });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        alert("No se pudo actualizar la actividad :(");
      });
  };

  render() {
    return (
      <div>
        {this.props.quizz ? (
          // -------------------------------------------------------------------------------- QUIZZ
          <div key={this.props.quizz.id}>
            <div className="quizzData">
              <div className="quizzButton">
                {this.buttonEditQuizzParams(this.props.quizz)}
              </div>
            </div>
            <Modal
              isOpen={
                this.state.openModal &&
                this.state.modalId === this.props.quizz.position
              }
            >
              <ModalHeader size="lg">{this.props.quizz.name}</ModalHeader>
              <ModalBody>
                <form onSubmit={this.handleSubmitQ}>
                  <label>
                    {" "}
                    <h4>Título del quizz:</h4>{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    name="nameQuizz"
                    className="col-md-8"
                    value={this.state.name}
                    maxLength="30"
                    onChange={(n) => this.setState({ name: n.target.value })}
                  />
                  {this.state.formValues.map((element, index) => (
                    <div key={index} className="form-inline">
                      <div>
                        <label>
                          {" "}
                          <h5>Pregunta</h5>{" "}
                        </label>
                        <input
                          type="text"
                          name="questionText"
                          value={element.questionText || ""}
                          onChange={(e) => this.handleChange(index, e)}
                        />
                      </div>
                      <div>
                        <label>
                          {" "}
                          <h5>Opción Correcta</h5>{" "}
                        </label>
                        <input
                          type="text"
                          name="answerOptions"
                          placeholder="Ingrese la Opción Correcta"
                          value={element.answerOptions[0].answerText || ""}
                          onChange={(e) =>
                            this.handleChangeAnswerText(index, e, 0)
                          }
                          style={{ backgroundColor: "lightskyblue" }}
                        />
                      </div>
                      <div>
                        <label>
                          {" "}
                          <h5>Opción Incorrecta 1</h5>{" "}
                        </label>
                        <input
                          type="text"
                          name="answerOptions"
                          placeholder="Ingrese otra Opción"
                          value={element.answerOptions[1].answerText || ""}
                          onChange={(e) =>
                            this.handleChangeAnswerText(index, e, 1)
                          }
                        />
                      </div>
                      <div>
                        <label>
                          {" "}
                          <h5>Opción Incorrecta 2</h5>{" "}
                        </label>
                        <input
                          type="text"
                          name="answerOptions"
                          placeholder="Ingrese otra Opción"
                          value={element.answerOptions[2].answerText || ""}
                          onChange={(e) =>
                            this.handleChangeAnswerText(index, e, 2)
                          }
                        />
                        {index ? (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.removeFormFields(index)}
                          >
                            X
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  <div className="button-section">
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={() => this.addFormFieldsQ()}
                    >
                      + Pregunta
                    </button>
                    <br />
                    <Button
                      disabled={this.state.activeButton}
                      color="primary"
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      {" "}
                      Actualizar Actividad{" "}
                    </Button>
                    <br />
                    <br />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="modalFooter">
                <Button color="secondary" onClick={() => this.closeModal()}>
                  Cerrar
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        ) : this.props.cuestionario ? (
          // -------------------------------------------------------------------------------- CUESTIONARIO
          <div key={this.props.cuestionario.id}>
            <div className="quizzData">
              <div className="quizzButton">
                {this.buttonEditCuestionarioParams(this.props.cuestionario)}
              </div>
            </div>
            <Modal
              isOpen={
                this.state.openModal &&
                this.state.modalId === this.props.cuestionario.position
              }
            >
              <ModalHeader size="lg">{this.state.name}</ModalHeader>
              <ModalBody>
                <form onSubmit={this.handleSubmitC}>
                  <label>
                    {" "}
                    <h4>Título del cuestionario:</h4>{" "}
                  </label>
                  <br />
                  <input
                    type="text"
                    name="nameQuizz"
                    className="col-md-8"
                    value={this.state.name}
                    maxLength="30"
                    onChange={(n) => this.setState({ name: n.target.value })}
                  />
                  {this.state.formValues.map((element, index) => (
                    <div key={index} className="form-inline">
                      <label>
                        {" "}
                        <h5>Pregunta</h5>{" "}
                      </label>
                      <input
                        type="text"
                        name="question"
                        value={element.question || ""}
                        onChange={(e) => this.handleChange(index, e)}
                      />
                      {index ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.removeFormFields(index)}
                        >
                          X
                        </button>
                      ) : null}
                    </div>
                  ))}
                  <div className="button-section">
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={() => this.addFormFieldsC()}
                    >
                      + Pregunta
                    </button>
                    <br />
                    <Button
                      disabled={this.state.activeButton}
                      color="primary"
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      {" "}
                      Actualizar Actividad{" "}
                    </Button>
                    <br />
                    <br />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="modalFooter">
                <Button color="secondary" onClick={() => this.closeModal()}>
                  Cerrar
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        ) : this.props.entregable ? (
          // -------------------------------------------------------------------------------- ENTREGABLE
          <div className="quizzData">
            <div className="quizzButton">
              {this.buttonEditEntregableParams(this.props.entregable)}
            </div>
            <Modal
              isOpen={
                this.state.openModal &&
                this.state.modalId === this.props.entregable.id
              }
            >
              <ModalHeader size="lg">{this.state.name}</ModalHeader>
              <ModalBody>
                <h4>
                  <Label>Titulo</Label>
                </h4>
                <Label>{this.state.name}</Label>
                <h4>
                  <Label>Descripcion</Label>
                </h4>
                <Label>{this.props.entregable.description}</Label>
              </ModalBody>
              <ModalFooter className="modalFooter">
                <Button color="secondary" onClick={() => this.closeModal()}>
                  Cerrar
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
