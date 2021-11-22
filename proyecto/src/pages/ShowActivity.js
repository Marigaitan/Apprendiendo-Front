import React, { Component } from 'react';
import { Alert, Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import '../css/Global.css';
import Cookies from 'universal-cookie/es6';
import axios from "axios";
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class ShowActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activitiesAnswers: []
        };
    }

    async componentDidMount(studentID, activities) {
        axios.defaults.headers.common["Authorization"] = cookies.get("token");
        axios.defaults.baseURL = API_HOST;
        this.setState({
            activitiesAnswers: (await axios.get("user​/" + studentID + "​/activity​/" + activities + "​/documents")).data.map(activity =>({ id: activity.id, name: activity.name, type: activity.dataType, answers: activity.data})),
        });
        console.log("documentos:")
        console.log(this.activitiesAnswers)
    }
    // hay que hacer algun map con la lista de actividades para que me haga un get por activity id, ahora esta mal

    render() {

        return (
            <div>
                {this.state.activitiesAnswers.map((activity) => {
                return (
                  <div key={activity.id} id={activity.id}>
                    <h3>
                      <li>
                        <button
                          class="btn btn-link">
                          <h5>{activity.name}</h5>
                        </button>
                      </li>
                    </h3>
                  </div>
                );
              })}
            </div>
        );

    }

}