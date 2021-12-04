import React, { Component } from "react";
import { Button, Label } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Global.css';
import '../css/DocenteEditLesson.css';
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import axios from "axios";
import HeaderTeacher from "./Header";
import NavDocenteClase from "./NavDocenteClase";
const cookies = new Cookies();

export default class DocenteLesson extends Component {
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

    corregirActividadesClase = () => {
        this.props.history.push("/menudocente/classroom/proyecto/clase/corregir");
    };

    editClase = () => {
        this.props.history.push("/menudocente/classroom/proyecto/clase/edit");
    };

    render() {
        return (
            <div className='mainContainer'>
                <HeaderTeacher />
                <div className='newClaseForm'>
                    <div className='whiteBox'>
                    {/* aca va el nombre de la clase */}
                        <div>
                            {this.state.lesson && <h1><Label>{this.state.lesson.name}</Label></h1>}
                            <NavDocenteClase />
                        </div>
                        {/* aca va el enunciado */}
                        <div>
                            {this.state.lesson && <h1><Label>{this.state.lesson.description}</Label></h1>}
                        </div>
                    </div>
                    <div className='whitebox'>
                        <Button className='buttonStyle' onClick={this.corregirActividadesClase}>Corregir actividades</Button>
                        <Button className='buttonStyle' onClick={this.editClase}>Editar clase</Button>
                    </div>
                </div>
            </div>
        )
    }
}