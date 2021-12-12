import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import Cookies from 'universal-cookie/es6';
import '../css/Global.css';

const cookies = new Cookies();

export default class DocenteProgresoGrupo extends Component {


    openModalStudent = (id) => {
        this.setState({ openModal: true, modalId: id })
    }

    closeModal = () => {
        this.setState({ openModal: false, modalId: -1 })
    }

    constructor(props) {
        super(props);
        this.state = {
            openModal: false, modalId: -1
        };
    }


    render() {


        const styleButton = {
            width: '50%',
            
        }
        
        const flexDivStyle = {
            display: 'flex',
            justifyContent: 'center',
        }

        return (
            this.props.studentGroups.map(studentGroup => {
                return (
                    <div key={studentGroup.group.id} style={flexDivStyle}>
                        <Button key={studentGroup.group.id} style={styleButton} onClick={() => this.openModalStudent(studentGroup.group.id)}>{studentGroup.group.name}</Button>
                        <Modal isOpen={this.state.openModal && this.state.modalId === studentGroup.group.id}>
                            <ModalHeader size='lg'>
                                {studentGroup.group.name}
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <h3>Progreso de la clase del equipo: </h3>
                                    <Progress value={studentGroup.progress}>{studentGroup.progress}%</Progress>
                                </div>
                                <br />
                                <div>
                                    <h3>Integrantes:</h3>
                                </div>
                                <ListGroup>
                                    {studentGroup.members.map(member => <ListGroupItem color="warning" key={member.user}>{member.user}</ListGroupItem>)}
                                </ListGroup>
                            </ModalBody>
                            <ModalFooter className="modalFooter">
                                <Button color="secondary" onClick={() => this.closeModal()}>Cerrar</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                )
            })
        )
    }
}