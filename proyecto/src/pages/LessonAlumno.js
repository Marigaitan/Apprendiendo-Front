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
  Input,
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
      actEntregables: [],
      actFiles: [],
      answersQ: [],
      answersQizz: [],
      actGrades: [],
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

  insertarArchivos = async (activityId) => {
    console.log("archivos");
    console.log(this.state.archivos);

    if (this.state.archivos.length === 0) {
      alert("0 documentos cargados");
      return;
    }

    let archivosRequest = this.state.archivos.map((archivo, index) => {
      let documento = {
        position: index,
        name: archivo.name,
        dataType: archivo.dataType,
        data: archivo.data,
        sourceId: archivo.sourceId,
        documentSourceType: archivo.documentSourceType,
      };
      console.log("documento");
      console.log(documento);

      return axios.post(API_HOST + "user/" + cookies.get("id") + "/activity/" + activityId + "/document",
        documento,
        { headers: { Authorization: cookies.get("token") }, })
    })

    await Promise.allSettled(archivosRequest)
      .then((results) => {
        console.log(results);
        let sentDocs = results.filter(result => result.status === 'fulfilled')
        alert(sentDocs.length + " documentos cargados");
        results.forEach((failedDoc, index) => { if (failedDoc.status === 'rejected') alert("fallo la carga del archivo: " + this.state.archivos[index].name) })
        this.setState({ archivos: [] });
        window.location.reload(false)
      })
  }

  subirArchivos = async (elem, activityId) => {
    console.log("imprimiendo elem");
    console.log(elem);
    const base64 = await this.convertToBase64(elem[0]);
    console.log("imprimiendo base64");
    console.log(base64);
    let archivo = {
      name: elem[0].name,
      dataType: "ENTREGABLE",
      data: base64,
      documentSourceType: "STUDENT_ACTIVITY",
      sourceId: activityId,
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
          let actGrades = await this.getActivityGrades(activities);
          console.log("actDocuments");
          console.log(actDocuments);
          console.log("actGrades");
          console.log(actGrades);

          const actQuizz = actDocuments.filter(
            (actDocument) => actDocument.dataType === "QUIZZ"
          );
          const actCuestionario = actDocuments.filter(
            (actDocument) => actDocument.dataType === "CUESTIONARIO"
          );
          const actEntregables = actDocuments.filter(
            (actDocument) => actDocument.dataType === "ENTREGABLE"
          );

          console.log(actQuizz);
          console.log(actCuestionario);
          console.log(actEntregables);

          this.setState({
            lessonName: lessonName,
            lessonDescription: lessonDescription,
            files: files,
            activities: activities,
            actQuizz: actQuizz,
            actCuestionario: actCuestionario,
            actEntregables: actEntregables,
            actGrades: actGrades,
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
            activityDescription: activity.description,
          };
        });
        return documents === undefined || documents.size === 0
          ? []
          : documents[0];
      })
    );
  }

  async getActivityGrades(activities) {
    return Promise.all(
      activities.map(async (activity) => {
        const actData = (await axios.get("user/" + cookies.get("id") + "/activity/" + activity.id + "/progress")).data;
        console.log("actData")
        console.log(actData)
        let documents = (await axios.get("activity/" + activity.id + "/documents")).data
        if (documents.length > 0) {
          let document =
          {
            activityId: activity.id,
            name: (await axios.get("activity/" + activity.id + "/documents")).data[0].name,
            grade: actData.grade,
          };
          console.log("document");
          console.log(document);
          return document;
        }
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
  openModal = async (id) => {
    console.log("LOS CUESTIONARIOS", this.state.actCuestionario);
    console.log("LOS QUIZZ", this.state.actQuizz);
    let documents = (await axios.get("/user/" + cookies.get("id") + "/activity/" + id + "/documents", { headers: { Authorization: cookies.get("token") } })).data;
    if (documents.length > 0) {
      return alert("Ya resolviste esta actividad");
    }
    await this.setState({ openModal: true, modalId: id });
  };

  closeModalActivity = async (activityId, name, dataType, answer) => {
    let body = { sourceId: activityId, documentSourceType: "STUDENT_ACTIVITY", name: name, dataType: dataType, data: JSON.stringify(answer) };
    await axios.post("/user/" + cookies.get("id") + "/activity/" + activityId + "/document", body, { headers: { Authorization: cookies.get("token")}});
      
    await this.setState({ answersQ: [], answersQizz: [] });
    if (dataType === "QUIZZ") {
      let body = {
        grade: (answer.puntaje / answer.resultados.length) * 10,
        percentageCompleted: 100
      }
      await axios.put("/user/" + cookies.get("id") + "/activity/" + activityId + "/progress", body, { headers: { Authorization: cookies.get("token")}});
    }
    await this.closeModal();

    let activities = (await axios.get(API_HOST + "lesson/" + cookies.get("lessonid"), {headers: { Authorization: cookies.get("token") }})).data.activities;
    let actGrades = await this.getActivityGrades(activities);
    await this.setState({activities: activities, actGrades: actGrades});
    
  }

  closeModalDocuments = async () => {
    await this.setState({ archivos: [] });
    await this.closeModal();
  }

  closeModal = async () => {
    await this.setState({ openModal: false, modalId: -1 });
  }

  render() {
    return (
      <div className="mainContainer">
        <HeaderStudent />
        <div className="alumnoLesson">
          <div className="TituloLesson">
            <div>
              <h2>{this.state.lessonName}</h2>
            </div>
            <div className="enunciado">
              <h4>{this.state.lessonDescription}</h4>
            </div>
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
                        {this.state.answersQ.length === JSON.parse(actCuestionario.data).length
                          ? (
                            <Button
                              color="secondary"
                              onClick={() => this.closeModalActivity(actCuestionario.activityId, actCuestionario.name, "CUESTIONARIO", this.state.answersQ)}
                            >
                              Finalizar
                            </Button>
                          ) : <div></div>}
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
                          onClick={() => this.closeModalActivity(actQuizz.activityId, actQuizz.name, "QUIZZ", this.state.answersQizz)}
                        >
                          Finalizar
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                );
              })}
              <div><br />
                <h4>Material:</h4>
                {this.state.files.map((files) => {
                  return (
                    <div key={files.id} id={files.id}>
                      <h4>
                        <Button
                          size="lg"
                          color="warning"
                          onClick={() =>
                            this.alumnoDescargaFile(
                              API_HOST + "document/" + files.id,
                              files.name
                            )
                          }
                        >
                          {files.name}
                        </Button>
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="materialDocente">
              <h4>Notas:</h4>
              {this.state.actGrades.map((actGrade) => {
                return (
                  <div key={actGrade.activityId} id={actGrade.activityId}>
                    <h4>
                      <Alert color='info'>
                        {actGrade.name} {":  "}
                        {actGrade.grade}
                      </Alert>
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ------------------------------------------------------- ENTREGABLES ------------------------------------------------------- */}
          <div className="uploadDocStudent">
            <h3>Entregables</h3>
            <br />
            <div className="flex-start-upload-docs">
              {this.state.actEntregables.map(entregable =>
                <div>
                  <Button color="success" onClick={() => this.openModal(entregable.activityId)}>{entregable.name}</Button>
                  <Modal size="lg" isOpen={this.state.openModal && this.state.modalId === entregable.activityId} className="modalStyle">
                    <ModalHeader tag="h3">
                      <Label>{entregable.name}</Label>
                    </ModalHeader>
                    <ModalBody>
                      <h4><Label>{entregable.activityDescription}</Label></h4>
                      <br />
                      <h5>Cargar nueva tarea:</h5>
                      <Input type="file" name={"documents"} onChange={(elem) => this.subirArchivos(elem.target.files, entregable.activityId)} />
                      {this.state.archivos.map((document) => (
                        <div key={document.name}>
                          <Alert className="flexSpaceBetween">
                            <Label>{document.name}</Label>
                            <Button name={document.name} onClick={() => this.borrarArchivo(document)}>Borrar</Button>
                          </Alert>
                        </div>
                      ))}
                      <Button color="primary" block onClick={() => this.insertarArchivos(entregable.activityId)}>Insertar Archivos</Button>
                    </ModalBody>
                    <ModalFooter className="modalFooter">
                      <Button color="secondary" onClick={this.closeModalDocuments}>Cerrar sin guardar</Button>
                    </ModalFooter>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
