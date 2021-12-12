import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Rating, RatingView } from 'react-simple-star-rating';
import {
  Alert,
  Button,
  Modal, ModalBody,
  ModalFooter, ModalHeader
} from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/Global.css";
import HeaderTeacher from "./Header";

const cookies = new Cookies();

class Repositorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher : null,
      templates : [],
      selectedTemplate : null,
      
      openCalificarModal : false,
      myReview : "",
      myScore : 0,

      openVerReviewsModal : false,

      openVerTemplateModal : false,

      updated: true
    };
  }

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;
    
    let teacher = (await axios.get("user/" + cookies.get("id"))).data;

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

    this.setState({ templates: templates, teacher: teacher, updated: true });
  }

  async componentDidUpdate() {
    if (!this.state.updated) await this.componentDidMount();
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



//revisar estetica modal
  verReviewsModal (template) {
    if (template != null) {
      return (
        <Modal isOpen={this.state.openVerReviewsModal} className="modalStyle">
          <ModalHeader size="lg">{template.name}</ModalHeader>
          <ModalBody>
            {template.reviews.map((review) => (
              <Alert color="info"><div>
                <td><h5>{review.reviewer.username}</h5></td>             
                <td>
                  <RatingView ratingValue={review.score} size={20}/>
                </td> 
                <div>
                  <td>{review.review}</td>
                </div> <br />
              </div>
              </Alert>
            ))}
          </ModalBody>
          <ModalFooter className="modalFooter">
          <Button color="primary" onClick={() => {this.openCalificarModal(template)}}> Calificar </Button>
            <Button color="secondary" onClick={() => this.closeVerReviewsModal()}> Cerrar </Button>
          </ModalFooter>
        </Modal>
      )
  }

}

  async openVerReviewsModal (template) {  
    template.reviews = (await axios.get("template/" + template.id + "/reviews")).data;
    this.setState({ openVerReviewsModal: true, selectedTemplate: template});
  }

  closeVerReviewsModal () {
    this.setState({ openVerReviewsModal: false});
  }




  calificarModal (template) {
    if (template != null)
    return (
      <Modal isOpen={this.state.openCalificarModal} className="modalStyle">
        <ModalHeader size="lg">{template.name}</ModalHeader>
        <ModalBody>
          <form>
            <label><h4>{template.name}</h4></label>
            <br />
            <Rating onClick={(rating) => this.setState({ myScore: rating})} ratingValue={this.state.myScore}/>
            <textarea class="form-control" id="calificarTextArea1" rows="3"onChange={(n) => this.setState({ myReview: n.target.value})}></textarea>
          </form>
        </ModalBody>
        <ModalFooter className="modalFooter">
        <Button color="primary" onClick={() => this.submitReview(template)}> Calificar </Button>
        <Button color="secondary" onClick={() => this.closeCalificarModal(template)}> Cerrar </Button>
        </ModalFooter>
      </Modal>
    )
  }

  openCalificarModal (template) {
    this.closeVerReviewsModal(); 
    this.setState({ openCalificarModal: true, selectedTemplate: template});
  };

  closeCalificarModal (template) {
    this.setState({ openCalificarModal: false});
    this.openVerReviewsModal(template);
  };

  async submitReview (template) {
    let reviewDTO = {
      review: this.state.myReview,
      score: this.state.myScore,
      templateId: template.id,
      reviewerId: this.state.teacher.id
    }
    
    await axios.post("template/review", reviewDTO);
    this.setState({ updated: false});
    this.closeCalificarModal(template);
  }




  verTemplateModal (template) {
    if (template != null)
    return (
      <Modal isOpen={this.state.openVerTemplateModal} className="modalStyle">
        <ModalHeader size="lg">{template.name}</ModalHeader>
        <ModalBody>
        </ModalBody>
        <ModalFooter className="modalFooter">
          <Button color="secondary" onClick={() => this.closeVerTemplateModal()}> Cerrar </Button>
        </ModalFooter>
      </Modal>
    )
  }

  openVerTemplateModal (template) {
    this.setState({ openVerTemplateModal: true, selectedTemplate: template});
  }

  closeVerTemplateModal () {
    this.setState({ openVerTemplateModal: false});
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
                    
                    <Link to={'#'} onClick={() => this.openVerReviewsModal(template)} activeClassName="active">
                      <div className="annotation"> {"(" + template.reviewCount + " reseñas)"} </div>
                    </Link>
                  </td>

                  <td>
                    <Button color="primary" onClick={() => this.openVerTemplateModal(template)}> Usar </Button>{" "}  
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          {this.calificarModal(this.state.selectedTemplate)}
          {this.verReviewsModal(this.state.selectedTemplate)}
          {this.verTemplateModal(this.state.selectedTemplate)}
        </div>

      
    );
  }

}
export default Repositorio;
