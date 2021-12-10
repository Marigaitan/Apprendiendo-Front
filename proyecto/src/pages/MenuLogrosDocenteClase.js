import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Global.css";
import "../css/MenuLogrosDocente.css";
import axios from "axios";
import HeaderTeacher from "./Header";
import { API_HOST } from "../constants";
import { Alert, Badge, Button, Label } from "reactstrap";

const cookies = new Cookies();

export default class MenuLogrosDocenteClase extends Component {
  constructor(props) {
    //constructor de mi clase
    super(props);
    this.state = {
      errorRewards: false,
      noRewards: false,
      rewards: [],
      activity: {},
    };
  }
  async componentDidMount() {
    let activity = (
      await axios.get(
        API_HOST + "activity/" + this.props.location.state.activityId,
        { headers: { Authorization: cookies.get("token") } }
      )
    ).data;
    let rewards = (
      await axios.get(API_HOST + "activity/" + activity.id + "/rewards", {
        headers: { Authorization: cookies.get("token") },
      })
    ).data;
    
    (rewards === null || rewards === [])
    ? this.setState({
      activity: activity,
      rewards: rewards,
    })
    : this.setState({
      activity: activity,
      noRewards: true,
    })
  }

  //para que lo redirija al login si no hay token
  redirect = () => {
    if (!cookies.get("token") || cookies.get("role") !== "ROLE_TEACHER") {
      this.props.history.push("./");
    }
  };

  crearLogro = () => {
    this.props.history.push({
      pathname: "/menudocente_classroom_proyecto_actividad_logros_new",
      state: { activityId: this.state.activity.id },
    });
  };

  imageSource = (reward) => {
    if(reward === null || reward === undefined) return '';
    
    if(reward.rewardType === "AVATAR") {
      if (reward.data.startsWith("b")) return `./avatars/${reward.data}.png`;
      if (reward.data.startsWith("o")) return `./accesorios/${reward.data}.png`;
      if (reward.data.startsWith("l")) return `./accesorios/${reward.data}.png`;
      if (reward.data.startsWith("r")) return `./accesorios/${reward.data}.png`;
    }

    if (reward.imageData === null) return '';
    if (reward.imageData.startsWith("mc")) return `./medallas_cursos/${reward.imageData}.png`;
    else return `./medallas/${reward.imageData}.png`;
  }

  render() {
    this.redirect();

    return (
      <div className="mainContainer">
        <HeaderTeacher />
        <div className="full-width-div">
          <div className="navBarMenuLogrosDocente">
          <h1>{this.state.activity.name}</h1>
          </div>
          <div className="whiteBoxMenuLogrosDocente">
            {this.state.errorRewards ? (
                <Alert color="danger">
                  Hubo un error para cargar los logros de esta clase
                </Alert>
            ) : this.state.noRewards ? (
                <Alert color="warning">
                  Todavía no hay logros para esta clase :(
                </Alert>
            ) : (
              <div>
                {this.state.rewards.map((reward) => (
                  <div key={reward.id} className="flexCenterMenuLogrosDocente">
                    <div>
                      <img
                        src={this.imageSource(reward)}
                        alt={reward.imageData}
                        width="50"
                      />
                    </div>
                    <div>
                      <Badge>{reward.name}</Badge>
                    </div>
                    <div>
                      <Label>{reward.text}</Label>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button
            className="centerButtonMenuLogrosDocente"
              block
              color="primary"
              onClick={this.crearLogro}
            >
              Crear logro
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

//classrooms.map(classroom => "as")