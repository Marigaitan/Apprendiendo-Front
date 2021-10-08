import React, { Component } from 'react'
import '../css/Global.css';
import '../css/DocenteLogros.css';
import HeaderTeacher from "./Header";
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";
import axios from 'axios';
import { Form, FormGroup, Label, Input, FormText, Button, Alert, Badge } from 'reactstrap';
import NavDocente from './NavDocente';

//Prueba de imagenes
import logo from '../Images/account.png';
import campana from '../Images/campana.png';

const cookies = new Cookies();


class DocenteLogros extends Component {
    constructor(props) {        //constructor de mi clase
        super(props);
        this.state = { subject: '', year: '', division: '', selectedOptionA: '', selectedOptionB: '', selectedOptionC: '' };
    }

    async componentDidMount() {

        let classparamUrl = API_HOST + "classroom/" + cookies.get('classid');

        await axios.get(classparamUrl, { headers: { 'Authorization': cookies.get('token') } })
            .then(response => {

                const subject = response.data.subject;
                const year = response.data.year;
                const division = response.data.division;

                this.setState({
                    subject: subject,
                    year: year,
                    division: division,
                })
            })
    }

    onValueChangeA = (event) => {
        this.setState({
            selectedOptionA: event.target.value
        });
    }

    onValueChangeB = (event) => {
        this.setState({
            selectedOptionB: event.target.value
        });
    }

    onValueChangeC = (event) => {
        this.setState({
            selectedOptionC: event.target.value
        });
    }

    formSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.selectedOption)
    }

    render() {
        return (
            <div className="mainContainer">
                <HeaderTeacher />
                <div className="navBar">
                    <h1 >{this.state.subject + " " + this.state.year.toString() + "°" + this.state.division}</h1>
                    <NavDocente activeBar='logros' />
                    <div className="mi-form">
                        <form onSubmit={this.formSubmit}>
                            <div className="center-alert">
                                <Alert color="info">Seleccionar condición para obtener el logro</Alert>
                            </div>
                            <div className="mi-flex">
                                <div className="radio-flex">
                                    <Label>
                                        <input
                                            type="radio"
                                            value="Predefinida"
                                            checked={this.state.selectedOptionA === "Predefinida"}
                                            onChange={this.onValueChangeA}
                                        />
                                        Predefinida
                                    </Label>

                                </div>
                                <div className="radio-flex">
                                    <Label>
                                        <input
                                            type="radio"
                                            value="Manual"
                                            checked={this.state.selectedOptionA === "Manual"}
                                            onChange={this.onValueChangeA}
                                        />
                                        Manual
                                    </Label>
                                </div>
                            </div>
                            <div className="center-text">
                                Selected option is : {this.state.selectedOptionA}
                            </div>
                            <div className="center-alert">
                            <Alert color="info">Seleccionar tipo de recompensa</Alert>
                            </div>
                            <div className="mi-flex">
                                <div className="radio-flex">
                                    <Label>
                                        <input
                                            type="radio"
                                            value="Virtual"
                                            checked={this.state.selectedOptionB === "Virtual"}
                                            onChange={this.onValueChangeB}
                                        />
                                        Virtual
                                    </Label>

                                </div>
                                <div className="radio-flex">
                                    <Label>
                                        <input
                                            type="radio"
                                            value="Real"
                                            checked={this.state.selectedOptionB === "Real"}
                                            onChange={this.onValueChangeB}
                                        />
                                        Real
                                    </Label>

                                </div>
                            </div>
                            <div className="center-text">
                                Selected option is : {this.state.selectedOptionB}
                            </div>
                            <div className="center-alert">
                                <Alert color="info">Seleccionar medalla</Alert>
                            </div>
                            <div className="mi-flex">
                                <div className="radio-flex">
                                        <input
                                            type="radio"
                                            value="imagenA"
                                            checked={this.state.selectedOptionC === "imagenA"}
                                            onChange={this.onValueChangeC}
                                        />
                                        <img className="imagen" src={logo} id="logo" alt="logo" />
                                </div>
                                <div className="radio-flex">
                                        <input
                                            type="radio"
                                            value="imagenB"
                                            checked={this.state.selectedOptionC === "imagenB"}
                                            onChange={this.onValueChangeC}
                                        />
                                        
                                        <img className="imagen" src={campana} id="campana" alt="campana" />
                                </div>
                            </div>
                            <div className="center-text">
                                Selected option is : {this.state.selectedOptionC}
                            </div>
                            <div className="center-button">
                                <Button outline color="primary" type="submit" block>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default DocenteLogros;