import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Button, Label } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/DocenteLesson.css";
import "../css/Global.css";
import HeaderTeacher from "./Header";
import Switch from "./Switch";

const cookies = new Cookies();

export default class DocenteLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: undefined,
    };
  }

  async componentDidMount() {
    await axios
      .get(API_HOST + "lesson/" + cookies.get("lessonid"), {
        headers: { Authorization: cookies.get("token") },
      })
      .then(async (response) => {
        console.log(response.data);
        this.setState({
          lesson: response.data,
        });
      });
  }

  corregirActividadesClase = () => {
    this.props.history.push("/menudocente_classroom_proyecto_clase_corregir");
  };

  editClase = () => {
    this.props.history.push("/menudocente_classroom_proyecto_clase_edit");
  };

  render() {
    return (
      <div className="mainContainer">
        <HeaderTeacher />
        <div className="newClaseFormDocenteLesson">
          <div className="whitebox">
            {/* aca va el nombre de la clase */}
            <div>
              {this.state.lesson && (
                <h1>
                  <Label>{this.state.lesson.name}</Label>
                </h1>
              )}
            </div>
            {/* aca va el enunciado */}
            <div>
              {this.state.lesson && (
                <h1>
                  <Label>{this.state.lesson.description}</Label>
                </h1>
              )}
            </div>
            <div className="whiteboxTitle">
              <Switch
                id={cookies.get("lessonid")}
                //status={this.state.status}
                type={"lesson"}
              />
            </div>
          </div>
          <div className="whitebox">
            <Button
              className="buttonStyle"
              onClick={this.corregirActividadesClase}
            >
              Corregir actividades
            </Button>
            <Button className="buttonStyle" onClick={this.editClase}>
              Editar clase
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
