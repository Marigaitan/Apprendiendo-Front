import axios from "axios"; //para las peticiones a la API
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
//import md5 from 'md5'
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/Login.css";
import im from "../Images/logo-verde.png";

const baseUrl = API_HOST + "login"; //Url de la API
const cookies = new Cookies();

export default class Login extends Component {
  //Necesitamos un estado y un metodo para capturar lo que el usuario ingrese
  constructor(props) {
    super(props);
    this.userNameInput = React.createRef();
    this.state = {
      form: {
        username: "",
        password: "",
      },
    };
  }

  handleChange = async (e) => {
    //con este metodo guardamos en el estado el valor del imput de acuerdo
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  sendCredentials = async () => {
    let body = {
      username: this.state.form.username,
      password: this.state.form.password,
    };
    delete axios.defaults.headers.common["Authorization"];
    await axios
      .post(baseUrl, body) //aca podria usar MD5
      .then((response) => {
        //cookies.set('token', response.headers.Authentication, { path: "/" });  retomar cuando se solucione CORS
        return response.data; //aca retonamos la data que viene en el body
      })
      .then((response) => {
        //aca la podemos utilizar
        console.log(response);
        cookies.set("username", response.username, { path: "/" });
        cookies.set("role", response.role, { path: "/" });
        cookies.set("id", response.id, { path: "/" });
        cookies.set("token", response.token, { path: "/" });

        cookies.set("firstName", response.firstName, { path: "/" });
        cookies.set("lastName", response.lastName, { path: "/" });
        cookies.set("homePhone", response.homePhone, { path: "/" });
        cookies.set("mobilePhone", response.mobilePhone, { path: "/" });
        cookies.set("address", response.address, { path: "/" });

        cookies.set("avatarId", response.avatarId, { path: "/" });
        cookies.set("studentYear", response.studentYear, { path: "/" });
        cookies.set("studentDivision", response.studentDivision, { path: "/" });

        if (cookies.get("role") === "ROLE_STUDENT") {
          this.props.history.push("/menualumno");
        } else if (cookies.get("role") === "ROLE_TEACHER") {
          this.props.history.push("/menudocente");
        } else if (cookies.get("role") === "ROLE_ADMIN") {
          this.props.history.push("/menuadmin");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("El usuario o la contraseña no son correctos");
      });
  };

  componentDidMount() {
    this.userNameInput.current.focus();
  }

  render() {
    const handleEnter = (e) => {
      e.preventDefault();
      this.sendCredentials();
    };

    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <form onSubmit={handleEnter}>
            <img src={im} id="logo" alt="No se encuentra la imagen" />
            <br />

            <input
              ref={this.userNameInput}
              type="user"
              className="inputs"
              name="username"
              placeholder="Usuario"
              maxLength="30"
              onChange={this.handleChange}
            />
            <br />

            <input
              type="password"
              className="inputs"
              name="password"
              placeholder="Contraseña"
              maxLength="30"
              onChange={this.handleChange}
            />
            <br />
            <button
              type="submit"
              className="submit-button btn btn-outline-primary btn-lg "
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
