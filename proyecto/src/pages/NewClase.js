import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Global.css";
import "../css/NuevaClase.css";
import Cookies from "universal-cookie/es6";
import HeaderTeacher from "./Header";
import axios from "axios";
import { API_HOST } from "../constants";
import { Alert, Button, Input, Label } from "reactstrap";

const cookies = new Cookies();

export default function NewClase() {
  const [name, setName] = useState(null);
  const [enun, setEnun] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const [actividades, setActividades] = useState([]);
  //const [documents, setDocuments] = useState([]);
  const [nameEntregable, setNameEntregable] = useState(null);
  const [descEntregable, setDescEntregable] = useState(null);
  const [nameCuest, setNameCuest] = useState(null);
  const [formValuesCuest, setFormValuesCuest] = useState([{ question: "" }]);
  const [nameQuizz, setNameQuizz] = useState(null);
  const [formValuesQuizz, setFormValuesQuizz] = useState([
    {
      questionText: "",
      answerOptions: [
        { answerText: "", isCorrect: true },
        { answerText: "", isCorrect: false },
        { answerText: "", isCorrect: false },
      ],
    },
  ]);

  const actName = (v) => {
    setName(v);
    console.log(name);
  };

  const actEnun = (a) => {
    setEnun(a);
    console.log(enun);
  };
  //------------------------Files----------------------------------------------
  const subirArchivos = async (elem) => {
    console.log("imprimiendo elem");
    console.log(elem);
    const base64 = await convertToBase64(elem[0]);
    console.log("imprimiendo base64");
    console.log(base64);
    let archivo = {
      name: elem[0].name,
      dataType: "FILE",
      data: base64,
      documentSourceType: "LESSON",
    };
    if (archivos.filter((archivo) => archivo.name === elem.name).length === 0) setArchivos((oldArray) => [...oldArray, archivo])
  };

  const convertToBase64 = async (file) => {
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

  const borrarArchivo = (e) => {
    setArchivos((oldArray) =>
      oldArray.filter((archivo) => archivo.name !== e.name)
    );
  };


  //---------------------Cuestionario------------------------------------------
  let handleChangeC = (i, e) => {
    let newFormValuesCuest = [...formValuesCuest];
    newFormValuesCuest[i][e.target.name] = e.target.value;
    setFormValuesCuest(newFormValuesCuest);
  };

  let addFormFieldsC = () => {
    setFormValuesCuest([...formValuesCuest, { question: "" }]);
  };

  let removeFormFieldsC = (i) => {
    let newFormValuesCuest = [...formValuesCuest];
    newFormValuesCuest.splice(i, 1);
    setFormValuesCuest(newFormValuesCuest);
  };

  let handleSubmitC = (event) => {
    event.preventDefault();
    let cuestionario = {
      name: null,
      description: null,
      position: null,
      dueDate: null,
      startDate: null,
      rewards: null,
      documents: [
        {
          name: nameCuest,
          position: actividades.length,
          dataType: "CUESTIONARIO",
          data: JSON.stringify(formValuesCuest),
        },
      ],
    };
    setActividades(actividades.concat(cuestionario));
    console.log(actividades);
    alert("Agregaste un nuevo cuestionario!");
  };
  //------------------------Quizz-----------------------------------------------
  let handleChangeQ = (i, e) => {
    let newFormValuesQ = [...formValuesQuizz];
    newFormValuesQ[i][e.target.name] = e.target.value;
    setFormValuesQuizz(newFormValuesQ);
  };
  let handleChangeQ1 = (i, e) => {
    let newFormValuesQ = [...formValuesQuizz];
    newFormValuesQ[i][e.target.name][0].answerText = e.target.value;
    setFormValuesQuizz(newFormValuesQ);
  };
  let handleChangeQ2 = (i, e) => {
    let newFormValuesQ = [...formValuesQuizz];
    newFormValuesQ[i][e.target.name][1].answerText = e.target.value;
    setFormValuesQuizz(newFormValuesQ);
  };
  let handleChangeQ3 = (i, e) => {
    let newFormValuesQ = [...formValuesQuizz];
    newFormValuesQ[i][e.target.name][2].answerText = e.target.value;
    setFormValuesQuizz(newFormValuesQ);
  };

  let addFormFieldsQ = () => {
    setFormValuesQuizz([
      ...formValuesQuizz,
      {
        questionText: "",
        answerOptions: [
          { answerText: "", isCorrect: true },
          { answerText: "", isCorrect: false },
          { answerText: "", isCorrect: false },
        ],
      },
    ]);
  };

  let removeFormFieldsQ = (i) => {
    let newFormValuesQ = [...formValuesQuizz];
    newFormValuesQ.splice(i, 1);
    setFormValuesQuizz(newFormValuesQ);
  };

  let handleSubmitQ = (event) => {
    event.preventDefault();
    let quizz = {
      name: null,
      description: null,
      position: null,
      dueDate: null,
      startDate: null,
      rewards: null,
      documents: [
        {
          name: nameQuizz,
          position: actividades.length,
          dataType: "QUIZZ",
          data: JSON.stringify(formValuesQuizz),
        },
      ],
    };
    setActividades(actividades.concat(quizz));
    alert("Agregaste un nuevo Quizz!");
  };

  //--------------------------------------------------------------------------------------------- ENTREGABLE
  const handleSubmitEntregable = async (event) => {
    event.preventDefault();
    let entregable = {
      name: nameEntregable,
      description: descEntregable,
      position: null,
      dueDate: null,
      startDate: null,
      rewards: null,
      documents: [{
        name: nameEntregable,
        position: actividades.length,
        dataType: "ENTREGABLE",
        data: "",
      }]
    }
    setActividades(actividades.concat(entregable))
  }



  // -------------------------POST-------------------------------------------------------
  const newClase = async () => {
    let newClaseUrl =
      API_HOST + "project/" + cookies.get("projectid") + "/lesson/template";
    let newClase = {
      name: name,
      description: enun,
      position: null,
      dueDate: null,
      startDate: null,
      active: true, //Cambiarlo para que funcione con el switch y en default este en false
      activities: actividades,
      documents: archivos,
    };
    console.log(newClase);
    await axios
      .post(
        newClaseUrl,
        {
          name: name,
          description: enun,
          position: null,
          dueDate: null,
          startDate: null,
          active: true, //Cambiarlo para que funcione con el switch y en default este en false
          activities: actividades,
          documents: archivos,
        },
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        cookies.set("claseid", response.data, { path: "/" });
        goProject();
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear la Clase");
      });
  };

  let goProject = () => {
    window.location.href = "/menudocente/classroom/proyecto";
  };
  console.log("LISTA DE ACTIVIDADES BIS:", actividades);
  //console.log("ACTIVIDADES:", JSON.parse(actividades[0].documents.data));
  // if (actividades.length > 0) {
  //   console.log("ACTIVIDADES:", JSON.parse(actividades[0].documents[0].data));
  // }
  return (
    <div className="mainContainer">
      <HeaderTeacher />
      <div className="nuevaClaseForm">
        <div className="nameClase">
          <h2>Clase Nueva</h2>
          <label>
            <h4>Nombre de la Clase</h4>
          </label>
          <br />
          <input
            type="text"
            name="name"
            className="col-md-8"
            placeholder="Ingrese un nombre"
            maxLength="30"
            onChange={(v) => actName(v.target.value)}
          />
        </div>
        <div className="boxEnunciado">
          <label>
            <h4>
              Ingrese el enunciado de la clase que quiere compartir con los
              alumnos:
            </h4>
          </label>
          <br />
          <textarea
            className="col-md-8"
            rows="4"
            name="name"
            placeholder="Ingrese un enunciado"
            onChange={(a) => actEnun(a.target.value)}
          />
        </div>
        <div className="activities-new-clase">
          {/* //-----------------------Files------------------------------------------------ */}
          <div className="addFileNewClase">
            <label>
              <h4>Cargar Material</h4>
            </label>
            <br />
            <Input
              type="file"
              name="files"
              onChange={(elem) => subirArchivos(elem.target.files)}
            />
            <br />
            {/* <button className="btn btn-primary btn-lg btn-block" onClick={() => insertarArchivos()}>Insertar Archivos</button> */}
            {archivos.map((archivo) => (
              <div key={archivo.name}>
                <Alert className="flexSpaceBetween">
                  <Label>{archivo.name}</Label>
                  <Button
                    name={archivo.name}
                    onClick={() => borrarArchivo(archivo)}
                  >
                    Borrar
                  </Button>
                </Alert>
              </div>
            ))}
          </div>
          <br />
          {/* //---------------------Cuestionario------------------------------------------ */}
          <div className="addCuestionarioNewClase">
            <label>
              <h4>Agregar Cuestionario</h4>
            </label>
            <br />
            <form onSubmit={handleSubmitC}>
              <label>
                <h4>Título</h4>
              </label>
              <br />
              <Input
                type="text"
                name="nameCuest"
                size="lg"
                placeholder="Ingrese el título de la actividad"
                maxLength="30"
                onChange={(n) => setNameCuest(n.target.value)}
              />
              {formValuesCuest.map((element, index) => (
                <div className="formInlineNewClase" key={index}>
                  <label>
                    <h5>Pregunta: </h5>
                  </label>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', height: '40px', gap: '10px' }}>
                    <Input
                      type="text"
                      name="question"
                      value={element.question || ""}
                      onChange={(e) => handleChangeC(index, e)}
                    />
                    {index ? (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeFormFieldsC(index)}
                      >
                        X
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
              <br />
              <br />
              <div className="button-section">
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={() => addFormFieldsC()}
                >
                  + Pregunta
                </button>
                <br />
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  Crear Actividad
                </button>
                <br />
                <br />
              </div>
            </form>
          </div>
          {/* ---------------------------------------Quizz--------------------------------------- */}
          <div className="addQuizzNewClase">
            <label>
              <h4>Agregar Ejercicio de Selección Múltiple</h4>
            </label>
            <br />
            <form onSubmit={handleSubmitQ}>
              <label>
                <h4>Título</h4>
              </label>
              <br />
              <Input
                type="text"
                name="nameQuizz"
                size="lg"
                placeholder="Ingrese el título de la actividad"
                maxLength="30"
                onChange={(n) => setNameQuizz(n.target.value)}
              />
              {formValuesQuizz.map((element, index) => (
                <div className="formInlineNewClase" key={index}>
                  <div>
                    <label>
                      <h5>Pregunta</h5>
                    </label>
                    <Input
                      type="text"
                      name="questionText"
                      value={element.questionText || ""}
                      onChange={(e) => handleChangeQ(index, e)}
                    />
                  </div>
                  <div>
                    <label>
                      <h5>Opción Correcta</h5>
                    </label>
                    <Input
                      type="text"
                      name="answerOptions"
                      placeholder="Ingrese la Opción Correcta"
                      value={element.answerOptions[0].answerText || ""}
                      onChange={(e) => handleChangeQ1(index, e)}
                      style={{ backgroundColor: "lightskyblue" }}
                    />
                  </div>
                  <div>
                    <label>
                      <h5>Opción Incorrecta 1</h5>
                    </label>
                    <Input
                      type="text"
                      name="answerOptions"
                      placeholder="Ingrese otra Opción"
                      value={element.answerOptions[1].answerText || ""}
                      onChange={(e) => handleChangeQ2(index, e)}
                    />
                  </div>
                  <div>
                    <label>
                      <h5>Opción Incorrecta 2</h5>
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', height: '40px', gap: '10px' }}>
                      <Input
                        type="text"
                        name="answerOptions"
                        placeholder="Ingrese otra Opción"
                        value={element.answerOptions[2].answerText || ""}
                        onChange={(e) => handleChangeQ3(index, e)}
                      />
                      {index ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeFormFieldsQ(index)}
                        >
                          X
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              <br />
              <br />
              <div className="button-section">
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={() => addFormFieldsQ()}
                >
                  + Pregunta
                </button>
                <br />
                <br />
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  Crear Actividad
                </button>
                <br />
                <br />
              </div>
            </form>
          </div>
            {/* ------------------------------------ ENTREGABLE --------------------------------------  */}
            <div className='addEntregableNewClase'>
              <label><h4>Agregar Actividad Entregable</h4></label>
              <form onSubmit={handleSubmitEntregable}>
                <label><h4>Título</h4></label>
                <Input type="text" name="nameEntregable" value={nameEntregable} placeholder="Ingrese el título de la actividad" maxLength="30" onChange={(n) => setNameEntregable(n.target.value)} />
                <label><h4>Descripcion</h4></label>
                <Input type="text" name="descEntregable" value={descEntregable} placeholder="Ingrese la descripcion del entregable" maxLength="255" onChange={(n) => setDescEntregable(n.target.value)} />
                <Button color="primary" block size="lg" type="submit">Crear Actividad</Button>
              </form>
        </div>
        </div>
        {/* -------------------------------------------------------------------------- */}
        <div className="newClaseFotter">
          <button
            className="btn btn-success btn-lg btn-block"
            type="submit"
            onClick={() => newClase()}
          >
            Crear Clase
          </button>{" "}
          <button
            className="btn btn-secondary btn-lg btn-block"
            type="button"
            onClick={() => goProject()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
