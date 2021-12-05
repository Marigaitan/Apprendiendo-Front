import React, { Component, useState } from "react";
import "../css/Global.css";
import "../css/DocenteLogros.css";
import HeaderTeacher from "./Header";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Alert,
  Badge,
  DropdownToggle,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import NavDocente from "./NavDocente";
import { logrosPorCurso } from "../data/medallas";
import ListarLogrosPorCurso from "./ListarLogrosPorCurso";
import Conditions from "./Conditions";
import Accesorio from "./Accesorio";
import { accesorios } from "../data/accesorios";

const cookies = new Cookies();

class DocenteLessonLogros extends Component {
  constructor(props) {
    //constructor de mi clase
    super(props);
    this.state = {
      subject: "",
      year: "",
      division: "",
      selectedOptionA: "",
      selectedOptionB: "",
      selectedOptionC: "",
      selectedOptionImage: "",
      condiciones: [],
      condicionId: -1,
      realValue: "",
      congrats: "",
      rewardName: "",
      lesson: {}
    };
  }

  async componentDidMount() {
    let classparamUrl = API_HOST + "classroom/" + cookies.get("classid");

    await axios
      .get(classparamUrl, { headers: { Authorization: cookies.get("token") } })
      .then((response) => {
        const subject = response.data.subject;
        const year = response.data.year;
        const division = response.data.division;

        this.setState({
          subject: subject,
          year: year,
          division: division,
        });
      });


      // var ans = [];
      // for (let i = 210; i <= 230; i++) {
      //    + i, {
      //     headers: { Authorization: cookies.get("token") },
      //   });
      //     ans.push(request);
      // }

    await axios
      .get(API_HOST + "conditions", {headers: { Authorization: cookies.get("token") }})
      .then(response => {

          const conditions = response.data.filter(condition => condition.conditionType.includes("TARGET"));

          //SET STATE
          this.setState({
            condiciones: conditions,
          });
        })
      .catch((error) => console.log(error));
  }

  onValueChangeA = (event) => {
    this.setState({
      selectedOptionA: event.target.value,
    });
  };

  onValueChangeB = (event) => {
    this.setState({
      selectedOptionB: event.target.value,
    });
  };

  onValueChangeC = (event) => {
    this.setState({
      selectedOptionC: event.target.value,
    });
  };

  onValueChangeImage = (event) => {
    this.setState({
      selectedOptionImage: event.target.value,
    });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const optionA =
      this.state.selectedOptionA === "Predefinida"
        ? this.state.condicionId === -1
          ? "error"
          : this.state.condicionId.toString()
        : this.state.selectedOptionA === "Manual"
        ? "Manual"
        : "error";

    const optionB =
      this.state.selectedOptionB === "Virtual"
        ? this.state.selectedOptionImage === ""
          ? "error"
          : this.state.selectedOptionImage
        : this.state.selectedOptionB === "Real"
        ? this.state.realValue === ""
          ? "error"
          : this.state.realValue
        : "error";

    const optionC =
      this.state.selectedOptionC === "" ? "error" : this.state.selectedOptionC;

      const congrats = this.state.congrats === "" ? "error" : this.state.congrats;

      const rewardName = this.state.rewardName === "" ? "error" : this.state.rewardName;

    if (optionA === "error" || optionB === "error" || optionC === "error" || congrats === "error" || rewardName === "error") {
      alert("Completar todos los campos");
    } else {
      this.enviarLogro(optionA, optionB, optionC);
    }
  };

  async enviarLogro(optionA, optionB, optionC){
    let newAchievementUrl = API_HOST + "reward";
    let body = this.crearLogro(optionA, optionB, optionC);
    await axios
      .post(newAchievementUrl, body, {
        headers: { Authorization: cookies.get("token") },
      })
      .then((response) => {
        console.log(response.data);
        alert("Logro creado exitosamente");
        this.props.history.push("/menudocente/classroom/proyecto/clase/logros");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear el Logro");
      });
  };

  //optionA es para condicion automatica o manual
  //optionB es para recompensa de avatar o real
  //optionC es el icono del logro
  crearLogro = (optionA, optionB, optionC) => {
    let condition;
    if (this.state.selectedOptionA === "Predefinida") {
      condition = optionA;
    } else {
      condition = 213;
    }

    let data;
    let rewardType;
    if (this.state.selectedOptionB === "Virtual") {
      data = optionB;
      rewardType = "AVATAR";
    } else {
      data = "recompensa real";
      rewardType = "SOCIAL";
    }

    return {
      name: this.state.rewardName, // TODO ver como completar este campo
      conditionId: condition,
      text: this.state.congrats, 
      data: data,
      targetType: "ACTIVITY",
      targetId: this.props.location.state.activityId,
      imageData: optionC,
      rewardType: rewardType,
    };
  };

  handleCallbackCondition = (condicion) => {
    this.setState({ condicionId: condicion.id });
  };

  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
  };

  render() {
    return (
      <div className="mainContainer">
        <HeaderTeacher />
        <div className="navBar">
          <h1>
            Crear nuevo Logro para {this.state.lesson.name}
          </h1>
          <NavDocente activeBar="logros" />
          <div className="mi-form">
            <form onSubmit={this.formSubmit}>
            <div className="center-alert">
                <Alert color="info">
                  Nombre del logro! Usa tu imaginación!
                </Alert>
              </div>
              <div className="mi-flex">
                    <div className="input-flex">
                      <Input
                        type="textarea"
                        name="rewardName"
                        placeholder="Ingresá acá el nombre del logro!"
                        value={this.state.rewardName}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
            <div className="center-alert">
                <Alert color="info">
                  Dale una descripción interesante al logro!
                </Alert>
              </div>
              <div className="mi-flex">
                    <div className="input-flex">
                      <Input
                        type="textarea"
                        name="congrats"
                        placeholder="Dale una descripción interesante al logro!"
                        value={this.state.congrats}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
              <div className="center-alert">
                <Alert color="info">
                  Seleccionar condición para obtener el logro
                </Alert>
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
              {/* esto se puede pasar a un componente */}
              <div className="mi-flex">
                {this.state.selectedOptionA === "Predefinida" ? (
                  <div className="radio-flex">
                    <Conditions
                      condiciones={this.state.condiciones}
                      parentCallback={this.handleCallbackCondition}
                    />
                  </div>
                ) : this.state.selectedOptionA === "Manual" ? (
                  <div className="input-flex">
                    <Alert color="secondary">
                      Cuando llegue el momento que creas oportuno, otorgarás la
                      recompensa manualmente
                    </Alert>
                  </div>
                ) : (
                  <div></div>
                )}
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
              <div>
                {this.state.selectedOptionB === "Virtual" ? (
                  <div>
                    <div className="mi-alert-flex">
                      <div className="half-length">
                        <Alert color="secondary">
                          Selecciona la parte del avatar que otorgarás como
                          recompensa
                        </Alert>
                      </div>
                    </div>
                    <div className="mi-flex">
                      {accesorios.map((accesorio) => {
                        return (
                          <div
                            id={accesorio.id}
                            key={accesorio.id}
                            className="radio-flex"
                          >
                            <input
                              type="radio"
                              value={accesorio.id}
                              checked={
                                this.state.selectedOptionImage === accesorio.id
                              }
                              onChange={this.onValueChangeImage}
                            />
                            <Accesorio id={accesorio.id} {...accesorio} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : this.state.selectedOptionB === "Real" ? (
                  <div className="mi-flex">
                    <div className="input-flex">
                      <Input
                        type="textarea"
                        name="realValue"
                        placeholder="Describir el premio que le darás a los alumnos que ganen el logro"
                        value={this.state.realValue}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="center-alert">
                <Alert color="info">Seleccionar medalla</Alert>
              </div>
              <div className="mi-flex">
                {logrosPorCurso.map((logro) => (
                  <div id={logro.id} key={logro.id} className="radio-flex">
                    <input
                      type="radio"
                      value={logro.id}
                      checked={this.state.selectedOptionC === logro.id}
                      onChange={this.onValueChangeC}
                    />
                    <ListarLogrosPorCurso key={logro.id} {...logro} />
                  </div>
                ))}
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
    );
  }
}

export default DocenteLessonLogros;