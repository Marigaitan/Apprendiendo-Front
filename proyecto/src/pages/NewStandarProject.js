import React, { Component } from "react";
import "../css/Global.css";
import "../css/DocenteEditLesson.css";
import HeaderTeacher from "./Header";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import axios from "axios";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";

const cookies = new Cookies();

export default class NewStandarProject extends Component {
  constructor(props) {
    //constructor de mi clase
    super(props);
    this.state = {
      subject: "",
      year: 0,
      division: "",
      teacherId: -1,
      teacherName: "",
      methodologies: [],
      methodologyId: -1,
      form: {
        projectName: "",
        description: "",
        startDate: "",
        startTime: "",
        dueDate: "",
        dueTime: "",
      },
    };
  }

  handleChange = async (e) => {
    //con este metodo guardamos en el estado el valor del input
    console.log(e.target.value);

    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  async newStandarProject() {
    let newProjectUrl = API_HOST + "project";
    await axios
      .post(
        newProjectUrl,
        {
          classroomId: cookies.get("classid"),
          methodologyId: 0,
          name: this.state.form.projectName,
          description: this.state.form.description,
          active: true, //Cambiarlo para que funcione con el switch y en default este en false
        },
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        cookies.set("projectid", response.data, { path: "/" });
        window.location.href = "/menudocente_classroom_proyecto";
      })
      .catch((error) => {
        console.log(error);
        alert(
          "No se pudo crear el Proyecto. Verifique que todos los campos esten completos"
        );
      })
      .then(this.goClassroom());
  }
  goClassroom() {
    window.location.href = "/menudocente_classroom";
  }

  render() {
    return (
      <div className="mainContainer">
        <HeaderTeacher />
        <div className="newClaseForm">
          <div className="whiteBox">
            <Form>
              <FormGroup>
                <h2>
                  <Label>Proyecto Estándar</Label>
                </h2>
              </FormGroup>
              <FormGroup>
                <Label for="projectName">
                  <h4>Ingrese el nombre del nuevo proyecto:</h4>
                </Label>
                <Input
                  type="textarea"
                  name="projectName" //Lo que se asigna a name, es el nombre de las variables que seteamos y a las que queremos vincular
                  id="projectName"
                  placeholder="Nombre"
                  maxLength="20"
                  onChange={this.handleChange}
                />
                <Label for="projectName">
                  <h4>Ingrese la descripción del nuevo proyecto:</h4>
                </Label>
                <Input
                  type="textarea"
                  name="description" //Lo que se asigna a name, es el nombre de las variables que seteamos y a las que queremos vincular
                  id="description"
                  placeholder="Agregar descripción al proyecto"
                  maxLength="20"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </div>
          <Button
            color="success"
            size="lg"
            onClick={() => this.newStandarProject()}
          >
            {" "}
            Crear Proyecto
          </Button>{" "}
          <br />
          <Button
            color="secondary"
            size="lg"
            onClick={() => this.goClassroom()}
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }
}
