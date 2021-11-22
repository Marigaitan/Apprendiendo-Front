import React, { Component } from 'react';
import { Alert, Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import '../css/Global.css';
import Cookies from 'universal-cookie/es6';
import axios from "axios";
import { API_HOST } from "../constants";

const cookies = new Cookies();

export default class ShowDocs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docs: []
        };
    }

    async componentDidMount(studentID) {
        axios.defaults.headers.common["Authorization"] = cookies.get("token");
        axios.defaults.baseURL = API_HOST;
        this.setState({
            docs: (await axios.get("user​/" + studentID + "​/project​/" + cookies.get("projectid") + "​/documents")).data,
        });
        console.log("documentos:")
        console.log(this.docs)
    }

    async docenteDescargaFile(url, fileName) {
        await axios
          .get(url, {
            headers: {
              Authorization: cookies.get("token"),
            },
          })
          .then((response) => {
            const buff = Buffer.from(response.data.data, "base64");
            const url = window.URL.createObjectURL(new Blob([buff]));
            const link = document.createElement("a");
            link.href = response.data.data;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
          });
      }

    render() {

        return (
            <div>
                {this.state.docs.map((doc) => {
                return (
                  <div key={doc.id} id={doc.id}>
                    <h3>
                      <li>
                        <button
                          class="btn btn-link"
                          onClick={() =>
                            this.docenteDescargaFile(
                              API_HOST + "document/" + doc.id,
                              doc.name
                            )
                          }
                        >
                          <h5>{doc.name}</h5>
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