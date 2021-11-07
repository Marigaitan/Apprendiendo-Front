import React, { Component, useState } from "react";
import "../css/Global.css";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import axios from "axios";
import {
  Table,
  Button,
} from "reactstrap";
import HeaderTeacher from "./Header";
import { Rating, RatingView } from 'react-simple-star-rating'
import { Link } from 'react-router-dom';

const cookies = new Cookies();

class Repositorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates : []
    };
  }

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;
    
    let templates = [];
    templates.push(...(await axios.get("templates/projects")).data);
    templates.push(...(await axios.get("templates/activities")).data);
    templates.push(...(await axios.get("templates/lessons")).data);
    console.log(templates);
    templates = templates.map(template => ({
      id: template.id,
      name: template.name,
      type: this.parseTemplateType(template.templateType),
      methodology: this.parseMethodology(template.methodology),
      owner: template.owner.username,
      score: template.score,
      reviewCount: template.reviewCount
    }));

    this.setState({ templates: templates });
  }

  parseTemplateType(templateType) {
    if(templateType == "PROJECT") return "Proyecto";
    if(templateType == "LESSON") return "Clase";
    if(templateType == "ACTIVITY") return "Actividad";
    else return "";
  }

  parseMethodology(methodology) {
    if(methodology == null) return "Ninguna";
    else return methodology.name;
  }

  calificar(template){
    //formulario para calificar y dejar reseña
  }

  verReviews(template){
    //lista de reseñas
  }

  usar(template){
    //reusar interfaz para nuevo proyecto/clase/actividad
    //o bien, eliminar boton y agregar seleccion de templates en las paginas de creacion de proyecto/clase/actividad
  }

  ver (template){
    //reusar interfaz para visualizacion de proyecto/clase/actividad
  }

  render() {
    return (
      <div className="mainContainer">
        <HeaderTeacher />
        <div className="secContainer">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Metodologia</th>
                <th>Creador</th>
                <th>Reseñas</th>
              </tr>
            </thead>       
            <tbody>
              {this.state.templates.map((template) => (
                <tr>
                  <td>{template.name}</td>
                  <td>{template.type}</td>
                  <td>{template.methodology}</td>
                  <td>{template.owner}</td>
                  <td>
                    <RatingView ratingValue={template.score} size={20}/>
                    <Link to={``} activeClassName="active"><div className="annotation"><ln>{"(" + template.reviewCount + " reseñas)"}</ln></div></Link>
                    <Button color="primary" onClick={() => this.calificar(template)}> Calificar </Button>{" "}
                  </td>
                  <td>
                    <Button color="primary" onClick={() => this.calificar(template)}> Ver </Button>{" "}  
                    <Button color="primary" onClick={() => this.calificar(template)}> Usar </Button>{" "}
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}
export default Repositorio;
