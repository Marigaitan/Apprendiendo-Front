import axios from "axios";
import React, { Component } from "react";
import {
  Alert, Button, Input, Label
} from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/DocenteLogros.css";
import "../css/Global.css";
import { accesorios } from "../data/accesorios";
import { logrosPorCurso } from "../data/medallas";
import Accesorio from "./Accesorio";
import Conditions from "./Conditions";
import HeaderTeacher from "./Header";
import ListarLogrosPorCurso from "./ListarLogrosPorCurso";
import NavDocente from "./NavDocente";

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
      lesson: {},
      activity: {},
    };
  }

  async componentDidMount() {
    let activity = (
      await axios.get("activity/" + this.props.location.state.activityId, {
        headers: { Authorization: cookies.get("token") },
      })
    ).data;
    this.setState({ activity: activity });

    await axios
      .get(API_HOST + "conditions", {
        headers: { Authorization: cookies.get("token") },
      })
      .then((response) => {
        let conditions = response.data
        .filter((condition) => condition.conditionType.includes("TARGET"));
        conditions.forEach(condition => condition.text = condition.text.replaceAll('la tarea', 'la actividad'));
        
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
      this.state.condicionId === -1
        ? "error"
        : this.state.condicionId.toString();

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

    const rewardName =
      this.state.rewardName === "" ? "error" : this.state.rewardName;

    if (
      optionA === "error" ||
      optionB === "error" ||
      optionC === "error" ||
      congrats === "error" ||
      rewardName === "error"
    ) {
      alert("Completar todos los campos");
    } else {
      this.enviarLogro(optionA, optionB, optionC);
    }
  };

  async enviarLogro(optionA, optionB, optionC) {
    let newAchievementUrl = API_HOST + "reward";
    let body = this.crearLogro(optionA, optionB, optionC);
    await axios
      .post(newAchievementUrl, body, {
        headers: { Authorization: cookies.get("token") },
      })
      .then((response) => {
        console.log(response.data);
        alert("Logro creado exitosamente");
        this.props.history.push({
          pathname: "/menudocente_classroom_proyecto_actividad_logros",
          state: { activityId: this.state.activity.id },
        });
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear el Logro");
      });
  }

  //optionA es para condicion automatica o manual
  //optionB es para recompensa de avatar o real
  //optionC es el icono del logro
  crearLogro = (optionA, optionB, optionC) => {
    let condition = optionA;

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
        <div className="containerDocenteLogros">
          <div className="navBarDocenteLogros">
            <h1>Crear nuevo Logro para {this.state.activity.name}</h1>
            <NavDocente activeBar="logros" />
          </div>
          <div className="mi-form">
            <form onSubmit={this.formSubmit}>
              <div className="center-alert">
                <Alert color="info">
                  Nombre del logro! Usa tu imaginación!
                </Alert>
                <Input
                  type="textarea"
                  name="rewardName"
                  placeholder="Ingresá acá el nombre del logro!"
                  value={this.state.rewardName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="center-alert">
                <Alert color="info">
                  Dale una descripción interesante al logro!
                </Alert>
                <Input
                  type="textarea"
                  name="congrats"
                  placeholder="Dale una descripción interesante al logro!"
                  value={this.state.congrats}
                  onChange={this.handleChange}
                />
              </div>
              <div className="center-alert">
                <Alert color="info">
                  Seleccionar condición para obtener el logro
                </Alert>
              </div>
              {/* esto se puede pasar a un componente */}
              <div className="mi-flex">
                <Conditions
                  condiciones={this.state.condiciones}
                  parentCallback={this.handleCallbackCondition}
                />
              </div>

              <div className="center-alert">
                <Alert color="info">Seleccionar tipo de recompensa</Alert>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div>
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
                  <div>
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
              </div>
              <div className="mi-flex">
                {this.state.selectedOptionB === "Virtual" ? (
                  <div className="widthAlmostFullDocenteLogros">
                    <Alert color="secondary">
                      Selecciona la parte del avatar que otorgarás como
                      recompensa
                    </Alert>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
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
                  <Input
                    type="textarea"
                    name="realValue"
                    placeholder="Describir el premio que le darás a los alumnos que ganen el logro"
                    value={this.state.realValue}
                    onChange={this.handleChange}
                    className="widthAlmostFullDocenteLogros"
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div className="center-alert">
                <Alert color="info">Seleccionar medalla</Alert>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    gap: "40px",
                    padding: "15px",
                  }}
                >
                  {logrosPorCurso.map((logro) => (
                    <div style={{ margin: "5px" }}>
                      <Input
                        type="radio"
                        value={logro.id}
                        checked={this.state.selectedOptionC === logro.id}
                        onChange={this.onValueChangeC}
                      />
                      <ListarLogrosPorCurso key={logro.id} {...logro} />
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <Button color="primary" type="submit" block>
                {" "}
                Crear Logro{" "}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DocenteLessonLogros;
