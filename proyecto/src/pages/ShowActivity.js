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

  async componentDidMount() {
    axios.defaults.headers.common["Authorization"] = cookies.get("token");
    axios.defaults.baseURL = API_HOST;
    let axiosActivities = [];
    this.props.activities.forEach(activity => {
      const request = axios.get("user/" + this.props.studentID + "/activity/" + activity.id + "/documents");
      axiosActivities.push(request);
    })
    console.log(axiosActivities);


    await axios.all(axiosActivities).then(responses => {
      let activities = responses.map(response => response.data);
      console.log(activities);
      this.setState({
        activitiesAnswers: activities
      });
    }).catch(console.log)

    console.log("documentos:")
    console.log(this.state.activitiesAnswers)
  }
  // hay que hacer algun map con la lista de actividades para que me haga un get por activity id, ahora esta mal

  render() {

    return (
      <div>
        {this.state.activitiesAnswers.map((activityList) =>
          activityList.map(activity => {
            return (
              <div key={activity.id} id={activity.id}>
                <h3>
                  <li>
                    <Button
                      class="btn btn-link">
                      <h5>{activity.name}</h5>
                    </Button>
                  </li>
                </h3>
              </div>
            )
          })
        )}
      </div>
    );

  }

}