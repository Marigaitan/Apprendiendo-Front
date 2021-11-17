import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno";
import "../css/Global.css";
import "../css/LessonAlumno.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Label,
} from "reactstrap";
import Cuestionario from "./Cuestionario";
import Quizz from "./Quizz";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const cookies = new Cookies();

export default class LessonAlumno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: "",
      activities: [],
      files: [],
      archivos: [],
      documents: [],
      lessonName: "",
      lessonDescription: "",
      openModal: false,
      modalId: -1,
      actDocuments: [],
      actQuizz: [],
      actCuestionario: [],
      actFiles: [],
      answersQ: [],
      answersQizz: [],
    };
  }
  //------------------------Files----------------------------------------------
  // subirArchivos = async (elem) => {
  //   console.log("imprimiendo elem");
  //   console.log(elem);
  //   const base64 = await this.convertToBase64(elem[0]);
  //   console.log("imprimiendo base64");
  //   console.log(base64);
  //   let archivos = {
  //     name: elem.name,
  //     dataType: elem.type,
  //     data: base64,
  //   };
  //   this.setState(archivos);
  // };

  convertToBase64 = async (fileUpload) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileUpload);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  insertarArchivos = async () => {
    console.log("archivos");
    console.log(this.state.archivos);

    if (this.state.archivos.length === 0) {
      alert("0 documentos cargados");
      return;
    }

    Promise.all(
      this.state.archivos.map(async (archivo) => {
        let documento = {
          position: 0,
          name: archivo.name,
          dataType: archivo.dataType,
          data: archivo.data,
          sourceId: archivo.sourceId,
        };
        console.log("documento");
        console.log(documento);

        return await axios
          .post(API_HOST + "document", documento, {
            headers: { Authorization: cookies.get("token") },
          })
          .then((response) => console.log(response.data))
          .catch((error) => {
            console.log(error);
          });
      })
    ).then((values) => {
      alert(values.length + " documentos cargados");
      this.setState({ archivos: [] });
    });
  };

  subirArchivos = async (elem) => {
    console.log("imprimiendo elem");
    console.log(elem);
    const base64 = await this.convertToBase64(elem[0]);
    console.log("imprimiendo base64");
    console.log(base64);
    let archivo = {
      name: elem[0].name,
      dataType: "STUDENT",
      data: base64,
      documentSourceType: "LESSON",
      sourceId: cookies.get("lessonid"),
    };
    this.setState((prevState) => ({
      archivos: prevState.archivos.concat(archivo),
    }));
  };

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

  borrarArchivo = (e) => {
    this.setState((prevState) => ({
      archivos: prevState.archivos.filter((archivo) => archivo.name !== e.name),
    }));
  };

  //---------------------------------------------------------------------------
  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;

    let getLessonUrl = API_HOST + "lesson/" + cookies.get("lessonid"); //+ "/template";
    let getDocumentsSummUrl =
      API_HOST + "lesson/" + cookies.get("lessonid") + "/documents/summary";
    let getDocumentsSelUrl =
      API_HOST + "lesson/" + cookies.get("lessonid") + "/documents/selective";

    const requestOne = axios.get(getLessonUrl, {
      headers: { Authorization: cookies.get("token") },
    });
    const requestTwo = axios.get(getDocumentsSummUrl, {
      headers: { Authorization: cookies.get("token") },
    });

    await axios.all([requestOne, requestTwo]).then(
      axios.spread(
        async (lesson, file) => {
          console.log(lesson.data, file.data);
          const lessonName = lesson.data.name;
          const lessonDescription = lesson.data.description;
          const activities = lesson.data.activities;
          const files = file.data;
          let actDocuments = await this.getActivityDocs(activities);
          console.log("actDocuments");
          console.log(actDocuments);

          const actQuizz = actDocuments.filter(
            (actDocument) => actDocument.dataType === "QUIZZ"
          );
          const actCuestionario = actDocuments.filter(
            (actDocument) => actDocument.dataType === "CUESTIONARIO"
          );

          console.log(actQuizz);
          console.log(actCuestionario);

          this.setState({
            lessonName: lessonName,
            lessonDescription: lessonDescription,
            files: files,
            activities: activities,
            actQuizz: actQuizz,
            actCuestionario: actCuestionario,
          });
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  async getActivityDocs(activities) {
    return Promise.all(
      activities.map(async (activity) => {
        const activityData = (await axios.get("activity/" + activity.id)).data;
        let documents = activityData.documents.map((document) => {
          console.log(document);
          return {
            id: document.id,
            name: document.name,
            position: document.position,
            dataType: document.dataType,
            data: document.data,
            activityId: activity.id,
          };
        });
        return documents === undefined || documents.size === 0
          ? []
          : documents[0];
      })
    );
  }

  //-------------------------Respuestas Alumno--------------------------------------
  handleCallbackCondition = (answers) => {
    this.setState({ answersQ: answers });
  };

  handleCallbackQuizz = (answers, puntaje) => {
    const temporal = {
      puntaje: puntaje,
      resultados: answers.resultados,
    };
    this.setState({ answersQizz: temporal });
  };

  //---------------------------Descargar Documentos -------------------------------

  async alumnoDescargaFile(url, fileName) {
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

  //----------------------POPup-Actividades---------------------------------------
  openModal = (id) => {
    console.log("LOS CUESTIONARIOS", this.state.actCuestionario);
    console.log("LOS QUIZZ", this.state.actQuizz);

    this.setState({ openModal: true, modalId: id });
  };

  closeModal() {
    this.setState({ openModal: false, modalId: -1 });
    console.log("RESPUESTAS CUESTIONARIO:", this.state.answersQ);
    console.log("RESPUESTAS QUIZZ:", this.state.answersQizz);
  }

  render() {
    return (
      <div className="mainContainer">
        <HeaderStudent />
        <div className="alumnoLesson">
          <div>
            <h2>{this.state.lessonName}</h2>
          </div>
          <div className="enunciado">
            <h4>{this.state.lessonDescription}</h4>
          </div>
          <div className="lessonActivities">
            <div className="quizzCuestionario">
              <h4>Actividades:</h4>
              {this.state.actCuestionario.map((actCuestionario) => {
                return (
                  <div
                    key={actCuestionario.activityId}
                    id={actCuestionario.activityId}
                  >
                    <h4>
                      <Button
                        color="success"
                        onClick={() =>
                          this.openModal(actCuestionario.activityId)
                        }
                      >
                        {actCuestionario.name}
                      </Button>
                    </h4>
                    <Modal
                      isOpen={
                        this.state.openModal &&
                        this.state.modalId === actCuestionario.activityId
                      }
                      className="modalStyle"
                    >
                      <ModalHeader size="lg">
                        {actCuestionario.name}
                      </ModalHeader>
                      <ModalBody>
                        {/* <h4>{actCuestionario.data}</h4>  ver lo de usar JSON.parse() */}

                        <Cuestionario
                          handleAnswers={this.handleCallbackCondition}
                          work={actCuestionario}
                        />
                      </ModalBody>
                      <ModalFooter className="modalFooter">
                        {this.state.answersQ.length ===
                          JSON.parse(actCuestionario.data).length && (
                          <Button
                            color="secondary"
                            onClick={() => this.closeModal()}
                          >
                            Finalizar
                          </Button>
                        )}
                      </ModalFooter>
                    </Modal>
                  </div>
                );
              })}
              {this.state.actQuizz.map((actQuizz) => {
                return (
                  <div key={actQuizz.activityId} id={actQuizz.activityId}>
                    <h4>
                      <Button
                        color="success"
                        onClick={() => this.openModal(actQuizz.activityId)}
                      >
                        {actQuizz.name}
                      </Button>
                    </h4>
                    <Modal
                      isOpen={
                        this.state.openModal &&
                        this.state.modalId === actQuizz.activityId
                      }
                      className="modalStyle"
                    >
                      <ModalHeader size="lg">{actQuizz.name}</ModalHeader>
                      <ModalBody>
                        {/* <h4>{actQuizz.data}</h4> */}
                        <Quizz
                          handleQuizz={this.handleCallbackQuizz}
                          workquizz={actQuizz}
                        />
                      </ModalBody>
                      <ModalFooter className="modalFooter">
                        <Button
                          color="secondary"
                          onClick={() => this.closeModal()}
                        >
                          Finalizar
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                );
              })}
            </div>
            <div className="materialDocente">
              <h4>Material:</h4>
              {this.state.files.map((files) => {
                return (
                  <div key={files.id} id={files.id}>
                    <h3>
                      <li>
                        <button
                          class="btn btn-link"
                          onClick={() =>
                            this.alumnoDescargaFile(
                              API_HOST + "document/" + files.id,
                              files.name
                            )
                          }
                        >
                          <h5>{files.name}</h5>
                        </button>
                      </li>
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="uploadDocStudent">
            <h4>Cargar Nueva Tarea:</h4>
            <input
              type="file"
              name="documents"
              //multiple
              onChange={(elem) => this.subirArchivos(elem.target.files)}
            />
            <br />
            {this.state.archivos.map((document) => (
              <div key={document.name}>
                <Alert className="flexSpaceBetween">
                  <Label>{document.name}</Label>
                  <Button
                    name={document.name}
                    onClick={() => this.borrarArchivo(document)}
                  >
                    Borrar
                  </Button>
                </Alert>
              </div>
            ))}
            <button
              className="btn btn-primary"
              onClick={() => this.insertarArchivos()}
            >
              Insertar Archivos
            </button>
          </div>
        </div>
      </div>
    );
  }
}
