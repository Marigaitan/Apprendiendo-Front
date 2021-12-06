import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class DocenteProyectoCuestionario extends Component {


    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = {
            formValuesCuestionario: [],
            nameCuestionario: '',
        }
    }

    setCuestionario = async (cuestionario) => {
        if (this.props.lessonId !== -1) {
            await axios.post(API_HOST + "lesson/" + this.props.lessonId + "/activity/template", cuestionario, { headers: { Authorization: cookies.get("token"), }, })
                .then(response => { alert("Cuestionario creado correctamente"); console.log(response.data); this.setState({ formValuesCuestionario: [], nameCuestionario: '' }); })
                .catch(console.log)
        } else {
            console.log(this.props.lessonId)
        }
    }
    removeFormFieldsC = (i) => {
        let newFormValuesCuestionario = [...this.state.formValuesCuestionario];
        newFormValuesCuestionario.splice(i, 1);
        this.setState({ newFormValuesCuestionario: newFormValuesCuestionario });
    }
    handleChangeC = (i, e) => {
        let newFormValuesCuestionario = [...this.state.formValuesCuestionario];
        newFormValuesCuestionario[i][e.target.name] = e.target.value;
        this.setState({ newFormValuesCuestionario: newFormValuesCuestionario });
    }

    addFormFieldsC = () => {
        this.setState(prevState => ({ formValuesCuestionario: [...prevState.formValuesCuestionario, { question: "" }] }))
        console.log(this.state.formValuesCuestionario)
    }

    handleSubmitC = async (event) => {
        event.preventDefault();
        alert("Agregaste un nuevo cuestionario!");
        let cuestionario = {
            id: null,
            name: null,
            description: null,
            position: null,
            dueDate: null,
            startDate: null,
            rewards: null,
            lessonId: parseInt(cookies.get('lessonid'), 10),
            documents: [{
                activityId: null,
                name: this.state.nameCuestionario,
                position: 0,
                dataType: "CUESTIONARIO",
                data: JSON.stringify(this.state.formValuesCuestionario)
            }]
        }
        this.setCuestionario(cuestionario);
    }


    render() {
        return (
            <form onSubmit={this.handleSubmitC}>
                <label><h4>Título</h4></label><br />
                <input type="text" name="nameCuestionario" value={this.state.nameCuestionario} className="col-md-8" placeholder="Ingrese el título de la actividad" maxLength="30" onChange={(n) => { this.setState({ nameCuestionario: n.target.value }) }} />
                {this.state.formValuesCuestionario.map((element, index) => (
                    <div className="form-inline" key={index}>
                        <label><h5>Pregunta: </h5></label>
                        <input type="text" name="question" value={element.question || ""} onChange={e => this.handleChangeC(index, e)} />
                        {
                            index ?
                                <button type="button" className="btn btn-danger" onClick={() => this.removeFormFieldsC(index)}>X</button>
                                : null
                        }
                    </div>
                ))}
                <div className="button-section">
                    <button className="btn btn-warning" type="button" onClick={() => this.addFormFieldsC()}>+ Pregunta</button><br />
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Crear Actividad</button><br /><br />
                </div>
            </form>
        )
    }
}