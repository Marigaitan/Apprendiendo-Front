import axios from "axios";
import React, { Component } from "react";
import { Alert, Label } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import HeaderTeacher from "./Header";
import '../css/DocenteEditLesson.css';

const cookies = new Cookies();

export default class CorregirActividades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: undefined
        };
    }

    async componentDidMount() {
        await axios.get(API_HOST + "lesson/" + cookies.get('lessonid'), { headers: { 'Authorization': cookies.get('token') } })
            .then(async response => {
                console.log(response.data);
                this.setState({
                    lesson: response.data
                });
            })
    }

    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div className='newClaseForm'>
                    <div className='whiteBox'>
                    {/* aca va el nombre de la clase */}
                        <div>
                            {this.state.lesson && <h1><Label>{this.state.lesson.name}</Label></h1>}
                        </div>
                        {/* aca va el enunciado */}
                        <div>
                            {this.state.lesson && <h1><Label>{this.state.lesson.description}</Label></h1>}
                        </div>
                    </div>
                    <div>
                        <Alert>Aca seria el lugar donde se listarian las actividades que el profesor pueda corregir</Alert>
                        <Alert>Como quizzes y cuestionarios</Alert>
                    </div>
                </div>
            </div>
        )
    }
}