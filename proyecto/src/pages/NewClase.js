import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import '../css/NuevaClase.css';
import Cookies from "universal-cookie/es6";
import HeaderTeacher from './Header';
import axios from 'axios';
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default function NewClase() {
    const [name, setName] = useState(null);
    const [Enun, setEnun] = useState(null);
    const [archivos, setArchivos] = useState(null);
    const [formValuesCuest, setFormValuesCuest] = useState([{ question: "" }]);
    const [formValuesQuizz, setFormValuesQuizz] = useState([{ questionText: "", answerOptions: [] }])


    const actName = v => {
        setName(v);
        console.log(name);
    }

    const actEnun = a => {
        setEnun(a);
        console.log(Enun);
    }
    //------------------------Files----------------------------------------------
    const subirArchivos = elem => {
        setArchivos(elem);
    }
    const insertarArchivos = async () => {
        const f = new FormData();

        for (let index = 0; index < archivos.length; index++) {
            f.append("documents", archivos[index]);
        }
        console.log(f);
    }


    //---------------------Cuestionario------------------------------------------
    let handleChangeC = (i, e) => {
        let newFormValuesCuest = [...formValuesCuest];
        newFormValuesCuest[i][e.target.name] = e.target.value;
        setFormValuesCuest(newFormValuesCuest);
    }

    let addFormFieldsC = () => {
        setFormValuesCuest([...formValuesCuest, { question: "" }])
    }

    let removeFormFieldsC = (i) => {
        let newFormValuesCuest = [...formValuesCuest];
        newFormValuesCuest.splice(i, 1);
        setFormValuesCuest(newFormValuesCuest)
    }

    let handleSubmitC = (event) => {
        event.preventDefault();
        alert("Agregaste un nuevo cuestionario!");
        console.log(JSON.stringify(formValuesCuest));
    }
    //------------------------Quizz-----------------------------------------------
    let handleChangeQ = (i, e) => {
        let newFormValuesQ = [...formValuesQuizz];
        newFormValuesQ[i][e.target.name] = e.target.value;
        setFormValuesQuizz(newFormValuesQ);
    }

    let addFormFieldsQ = () => {
        setFormValuesQuizz([...formValuesQuizz, { questionText: "", answerOptions: [] }])
    }

    let removeFormFieldsQ = (i) => {
        let newFormValuesQ = [...formValuesQuizz];
        newFormValuesQ.splice(i, 1);
        setFormValuesQuizz(newFormValuesQ)
    }

    let handleSubmitQ = (event) => {
        event.preventDefault();
        alert("Agregaste un nuevo Quizz!");
        console.log(JSON.stringify(formValuesQuizz));
    }
    // -------------------------POST-------------------------------------------------------
    const newClase = async () => {
        let newClaseUrl = API_HOST + "project/" + cookies.get('projectid') + "/lesson/template";
        await axios.post(newClaseUrl,
            {
                name: "String",
                position: "0",
                dueDate: "0",
                startDate: "0",
                active: "True", //Cambiarlo para que funcione con el switch y en default este en false
                activities: "Armar JSON"
            },
            {
                headers: {
                    'Authorization': cookies.get('token')
                }
            }
        )
            .then(response => {
                console.log(response);
                cookies.set('claseid', response.data, { path: "/menudocente/classroom" });
                window.location.href = "/menudocente/classroom/proyecto" + cookies.get('projectid');
            })
            .catch(error => {
                console.log(error);
                alert('No se pudo crear la Clase')
            }).then(this.goProject());
    }

    let goProject = () => {
        window.location.href = "/menudocente/classroom/proyecto";
    }
    return (
        <div className='mainContainer'>
            <HeaderTeacher />
            <div className='newClaseForm'>
                <h2>Clase Nueva</h2>
                <div className='nameClase'>
                    <label><h4>Nombre de la Clase</h4></label><br />
                    <input type="text" name="name" className="col-md-8" placeholder="Ingrese un nombre" maxLength="20" onChange={(v) => actName(v.target.value)} />
                </div>
                <div className='boxEnunciado'>
                    <label><h4>Ingrese el enunciado de la clase que quiere compartir con los alumnos:</h4></label><br />
                    <textarea className="col-md-8" rows="4" name="name" placeholder="Ingrese un enunciado" onChange={(a) => actEnun(a.target.value)} />
                </div>
                {/* //-----------------------Files------------------------------------------------ */}
                <div className='boxActiv'>
                    <div className='newFile'>
                        <label><h4>Cargar Material</h4></label><br />
                        <input type="file" name="files" multiple onChange={(elem) => subirArchivos(elem.target.files)} />
                        <br />
                        <button className="btn btn-primary btn-lg btn-block" onClick={() => insertarArchivos()}>Insertar Archivos</button>
                    </div>
                    <br />
                    {/* //---------------------Cuestionario------------------------------------------ */}
                    <div className='setCuestionario'>
                        <label><h4>Agregar Cuestionario</h4></label><br />
                        <form onSubmit={handleSubmitC}>
                            {formValuesCuest.map((element, index) => (
                                <div className="form-inline" key={index}>

                                    <label><h5>Pregunta: </h5></label>
                                    <input type="text" name="question" value={element.question || ""} onChange={e => handleChangeC(index, e)} />
                                    {
                                        index ?
                                            <button type="button" className="btn btn-danger" onClick={() => removeFormFieldsC(index)}>X</button>
                                            : null
                                    }

                                </div>
                            ))}
                            <div className="button-section">
                                <button className="btn btn-warning" type="button" onClick={() => addFormFieldsC()}>+ Pregunta</button><br />
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Crear Actividad</button><br /><br />
                            </div>
                        </form>
                    </div>
                    {/* ---------------------------------------Quizz--------------------------------------- */}
                    <div className='setQuizz'>
                        <label><h4>Agregar Ejercicio de Selección Múltiple</h4></label><br />
                        <form onSubmit={handleSubmitQ}>
                            {formValuesQuizz.map((element, index) => (
                                <div className="form-inline" key={index}>
                                    <div>
                                        <label><h5>Pregunta</h5></label>
                                        <input type="text" name="questionText" value={element.questionText || ""} onChange={e => handleChangeQ(index, e)} />
                                    </div>
                                    <div>
                                        <label><h5>Opción</h5></label>
                                        <input type="text" name="answerOptions" value={element.answerOptions || ""} onChange={e => handleChangeQ(index, e)} />
                                        {
                                            index ?
                                                <button type="button" className="btn btn-danger" onClick={() => removeFormFieldsQ(index)}>X</button>
                                                : null
                                        }
                                    </ div>
                                </div>
                            ))}
                            <div className="button-section">
                                <button className="btn btn-warning" type="button" onClick={() => addFormFieldsQ()}>+ Pregunta</button><br />
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Crear Actividad</button><br /><br />
                            </div>
                        </form>

                    </div>
                </div>
                {/* -------------------------------------------------------------------------- */}
                <div className='newClaseFotter'>
                    <button className="btn btn-success btn-lg btn-block" type="submit" onClick={() => newClase()}>Crear Clase</button>{' '}
                    <button className="btn btn-secondary btn-lg btn-block" type="button" onClick={() => goProject()} >Cancelar</button>
                </div>
            </div>
        </div>
    )
}
