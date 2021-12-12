import axios from "axios";
import * as _ from "lodash";
import React, { Component } from "react";
import { Alert, Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import "../css/DocenteEditGroups.css";
import "../css/Global.css";
import Background from '../Images/fondoLetras.png';
import HeaderTeacher from "./Header";

const cookies = new Cookies();

export default class DocenteEditGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            grupos: [],
            nameGrupo: '',
            grupoNuevoAlumnos: [],
            alumnosSinGrupo: [],
            grupoSeleccionado: [],
            alumnosSinGrupoSeleccionados: [],
            alumnosQuitadosDelGrupo: [],
            openModal: false,
            modalId: -1,
            disabledButton: false,
        };
    }

    async componentDidMount() {
        axios.defaults.headers.common["Authorization"] = cookies.get("token");
        axios.defaults.baseURL = API_HOST;

        let project = (await axios.get("project/" + cookies.get("projectid"))).data;
        console.log(project);

        let groups = (await axios.get("/project/" + cookies.get("projectid") + "/groups")).data;
        console.log(groups);
        groups.forEach(async group => {
            await axios.get("/group/" + group.id + "/students").then(response => group.members = response.data);
        });
        console.log(groups);


        let students = (await axios.get("/classroom/" + cookies.get("classid") + "/students")).data;
        console.log(students);

        let alumnosSinGrupo = this.getAlumnosSinGrupo(groups, students);
        console.log(alumnosSinGrupo);

        this.setState({
            project: project,
            grupos: groups,
            students: students,
            alumnosSinGrupo: alumnosSinGrupo,
        });
    }

    getAlumnosSinGrupo = (groups, students) => {
        let alumnosSinGrupo = [];
        console.log(students)
        console.log(groups)
        if (students === null || students === undefined) {
            console.log("no hay students")
            console.log(students)
            return [];
        } else if (groups === null || groups === undefined || groups.length === 0) {
            console.log("no hay grupos")
            console.log(students)
            return students;
        } else {
            console.log("fui por el else")
            students.forEach(student => {
                if (groups.every(group => group.members && group.members.every(studentInGroup => student && studentInGroup && studentInGroup.student.id !== student.id)))
                    alumnosSinGrupo.push(student)
                console.log(alumnosSinGrupo)
            });
        }
        return alumnosSinGrupo;
    }

    openModal = (id) => {
        this.setState({ openModal: true, modalId: id, disabledButton: true, });
    }

    closeModal() {
        this.setState({ openModal: false, modalId: -1, alumnosSinGrupoSeleccionados: [] });
    }

    closeModalNuevoGrupo() {
        this.setState({ grupoNuevoAlumnos: [], });
        this.closeModal();
    }

    isChecked = (idAlumno, event) => {
        if (event.target.checked) {
            //agregar
            this.setState(prevState => ({
                alumnosSinGrupoSeleccionados: [...prevState.alumnosSinGrupoSeleccionados, idAlumno],
                disabledButton: false
            }))
            console.log("agrego")
        } else {
            //quitar
            let alumnosSinGrupoSeleccionados = [...this.state.alumnosSinGrupoSeleccionados];
            const index = alumnosSinGrupoSeleccionados.indexOf(idAlumno);
            if (index > -1) alumnosSinGrupoSeleccionados.splice(index, 1)
            this.setState({ alumnosSinGrupoSeleccionados: alumnosSinGrupoSeleccionados, disabledButton: alumnosSinGrupoSeleccionados.length > 0 ? false : true })
            console.log("quito")
        }
        console.log(this.state.alumnosSinGrupoSeleccionados)
    }

    // ------------------------------------------------------------------------------ GRUPOS

    // ------------------------------------------------------------------------------ NUEVO GRUPO

    crearNuevoGrupo = () => {
        this.openModal(this.state.project.id);
    }

    agregarAlumnosAGrupoNuevo = async () => {
        //solo tengo los ids de grupoNuevoAlumnos
        let alumnosSinGrupo = [...this.state.alumnosSinGrupo];
        console.log(alumnosSinGrupo);
        console.log(this.state.alumnosSinGrupoSeleccionados);
        let newGroupStudents = this.state.alumnosSinGrupoSeleccionados.map(alumno => _.remove(alumnosSinGrupo, { id: alumno })[0]); //esto es una lista de listas
        console.log("quito")
        console.log(newGroupStudents)
        this.setState({ alumnosSinGrupo: alumnosSinGrupo })

        let group = {
            id: null,
            projectId: this.state.project.id,
            name: this.state.nameGrupo,
            progress: 0,
        }
        console.log(group);

        //AXIOS
        const newGroup = await axios.post("/group", group);
        console.log(newGroup.data);
        group.id = newGroup.data;
        console.log(group);

        this.setState({ nameGrupo: '' })
        console.log(this.state.grupos)

        let addStudentsToNewGroup = newGroupStudents.map((student, index) => {
            let body = { studentId: student.id, role: (index + 1).toString(), }
            return axios.post("/group/" + group.id + "/student/" + student.id, body)
        })
        await axios.all(addStudentsToNewGroup)
            .then(axios.spread((...res) => {
                window.location.reload(false);
            })).catch(err => { console.log(err); alert("hubo un error al enviar el grupo") })
    }

    // ------------------------------------------------------------------------------ EDITAR GRUPO

    abrirModalEditarGrupo = (group) => {
        this.setState({ grupoSeleccionado: group })
        this.openModal(group.id);
    }

    quitarAlumnoGrupo = (studentId, event) => {
        console.log(this.state.grupoSeleccionado);
        console.log(studentId);

        if (event.target.checked) {
            //agregar
            let grupoAlumnosSeleccionado = [...this.state.grupoSeleccionado.members];
            console.log(grupoAlumnosSeleccionado);

            let studentRemovedFromGroup = _.find((grupoAlumnosSeleccionado), { studentId });
            console.log(studentRemovedFromGroup)

            this.setState(prevState => ({
                alumnosQuitadosDelGrupo: [...prevState.alumnosQuitadosDelGrupo, studentRemovedFromGroup],
            }))
            console.log(this.state.alumnosQuitadosDelGrupo)

        } else {
            //quitar
            let alumnosQuitadosDelGrupo = [...this.state.alumnosQuitadosDelGrupo];
            _.remove((alumnosQuitadosDelGrupo), { studentId });
            this.setState({ alumnosQuitadosDelGrupo: alumnosQuitadosDelGrupo, })
            console.log(this.state.alumnosQuitadosDelGrupo)
        }
    }


    modificarGrupoExistente = async (groupId) => {
        let alumnosSinGrupoSeleccionados = [...this.state.alumnosSinGrupoSeleccionados];
        let alumnosQuitadosDelGrupo = [...this.state.alumnosQuitadosDelGrupo];
        console.log(alumnosSinGrupoSeleccionados);
        console.log(alumnosQuitadosDelGrupo);


        // todo enviar a axioss
        let addStudentsToNewGroup = []
        alumnosSinGrupoSeleccionados.forEach((student, index) => {
            let body = { studentId: student, role: (index + 1).toString(), }
            addStudentsToNewGroup.push(axios.post("/group/" + groupId + "/student/" + student, body))
        })
        alumnosQuitadosDelGrupo.forEach(student => {
            addStudentsToNewGroup.push(axios.delete("/group/" + groupId + "/student/" + student.student.id))
        })
        await axios.all(addStudentsToNewGroup)
            .then(axios.spread((...res) => {
                console.log(res.map(response => response.data))
                window.location.reload(false);
            }))
            .catch(err => { console.log(err); alert("hubo un error al enviar el grupo") })
    }

    getStudentsInGroupByGroupId = (groupId) => {
        let grupos = [...this.state.grupos];
        let group = _.find(grupos, { id: groupId });
        console.log(group);
        return group ? (group.members ? group.members : []) : [];
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }


    render() {

        const mainStyle = {
            backgroundImage: "url(" + Background + ")",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        };

        return (
            <div className="mainContainer" style={mainStyle}>
                <HeaderTeacher />
                <div className="secContainer">
                    <div className="flex-center">
                        <div className="whitebox">
                            <h2>{this.state.project.name}</h2>
                        </div>
                        <div className="whiteboxButtons">

                            <Button className="bigButtons" onClick={() => this.props.history.goBack()}>Volver</Button>
                            <Button className="bigButtons" onClick={this.crearNuevoGrupo}>Nuevo grupo</Button>

                            <Modal isOpen={this.state.openModal && this.state.modalId === this.state.project.id}>
                                <ModalHeader>
                                    Nuevo grupo
                                </ModalHeader>
                                <ModalBody>
                                    <Label>Nombre del grupo:</Label>
                                    <Input type="text" name="nameGrupo" value={this.state.nameGrupo} onChange={this.handleChange}/>
                                    <Label>Crear un nuevo grupo seleccionando a todos los integrantes sin grupo listados a continuacion:</Label>
                                    {this.state.alumnosSinGrupo.map((alumno, index) =>
                                        <div key={alumno.id}>
                                            <Alert>
                                                <FormGroup check>
                                                    <Input type="checkbox" id={"myinput" + index + alumno.id} onChange={(e) => this.isChecked(alumno.id, e)} />
                                                    <Label for={"myinput" + index + alumno.id}>{alumno.username}</Label>
                                                </FormGroup>
                                            </Alert>
                                        </div>
                                    )
                                    }
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.agregarAlumnosAGrupoNuevo} disabled={this.state.disabledButton}>Agregar grupo nuevo</Button>
                                    <Button onClick={() => this.closeModalNuevoGrupo()}>Cerrar</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div className="whiteboxButtons">
                            {this.state.grupos.map(grupo =>
                                <div key={grupo.id}>

                                    <Label><h3>Grupo {grupo.name}</h3></Label>
                                    <Button className="bigButtons" onClick={() => this.abrirModalEditarGrupo(grupo)}>Editar</Button>

                                    <Modal isOpen={this.state.openModal && this.state.modalId === grupo.id}>
                                        <ModalHeader>
                                            Editar grupo {grupo.name}
                                        </ModalHeader>
                                        <ModalBody>
                                            <div>
                                                <div>
                                                    <h3>Alumnos en el grupo</h3>
                                                </div>
                                                <div>
                                                    <h5>Estos son los alumnos del grupo. Para quitar alguno seleccionarlo y luego pulsar "Guardar cambios"</h5>
                                                    {this.getStudentsInGroupByGroupId(grupo.id).map((student, index) =>
                                                        <div key={student.student.id}>
                                                            <Alert>
                                                                <FormGroup check>
                                                                    <Input type="checkbox" id={"myinput" + index + student.studentId} onChange={(e) => this.quitarAlumnoGrupo(student.studentId, e)} />
                                                                    <Label for={"myinput" + index + student.studentId}>{student.student.firstName + " " + student.student.lastName}</Label>
                                                                </FormGroup >
                                                            </Alert>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h3>Alumnos sin grupo</h3>
                                                </div>
                                                <div>
                                                    <h5>A continuación se listan los alumnos sin grupo. Seleccionar los alumnos para agregar a todos los seleccionados</h5>
                                                    {this.state.alumnosSinGrupo.map((alumno, index) =>
                                                        <div>
                                                            <Alert color="info">
                                                                <FormGroup check>
                                                                    <Input type="checkbox" id={"myinput" + index + alumno.id} onChange={(e) => this.isChecked(alumno.id, e)} />
                                                                    <Label for={"myinput" + index + alumno.id}>{alumno.firstName + " " + alumno.lastName}</Label>
                                                                </FormGroup>
                                                            </Alert>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={() => this.modificarGrupoExistente(grupo.id)}>Guardar cambios</Button>
                                            <Button onClick={() => this.closeModal()}>Cerrar</Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}