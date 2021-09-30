import React, { Component } from 'react';
//import React, { useMemo, useState, useEffect } from 'react';


import axios from 'axios';

import '../css/DocenteAbm.css';
import img from '../Images/account.png';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import HeaderAdmin from './HeaderAdmin';
import Cookies from 'universal-cookie/es6';
import { API_HOST } from "../constants";

const cookies = new Cookies();
//const data = [


// { NombreUsuario: "gsalem", password: "Gabriela",  rol: "docente", cursos: "2 A" },
// {NombreUsuario: "gsalem", password: "Gabriela",  rol: "docente", cursos: "2 A"},
// {NombreUsuario: "gsalem", password: "Gabriela",  rol: "docente", cursos: "2 A"},

//];

//create api 
//create table

class DocenteAbm extends React.Component {

  constructor(props) {        //constructor de mi clase
    super(props);
    this.state = {
      data: [],
      modalActualizar: false,
      modalInsertar: false,
      form: {
        NombreUsuario: "",
        password: "",
        rol: "",
        cursos: "",
      }
    }
  }

  componentDidMount(){
    let teacherAbmUrl = API_HOST + "users/teachers";
    axios.get(teacherAbmUrl, {
      headers: {
        'Authorization': cookies.get('token')
      }
    })
      .then(response => {
        console.log(response);
        const teachersAbm =
          response.data.map(teacher => ({ NombreUsuario: teacher.username, password: teacher.password, rol: teacher.role, cursos: teacher.classrooms }))
        this.setState({ data: teachersAbm })
      })
  }


  // state = {
  //   data: data,
  //   modalActualizar: false,
  //   modalInsertar: false,
  //   form: {
  //     Nombre: "",
  //     apellido: "",
  //     rol: "",
  //   },
  // };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.NombreUsuario == registro.NombreUsuario) {
        arreglo[contador].NombreUsuario = dato.NombreUsuario;
        arreglo[contador].password = dato.password;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {

    return (
      <div className="mainContainer">
        <HeaderAdmin />
        <div className="secContainer">
          <table>

            <Container>

              <br />
              <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
              <br />
              <br />
              <Table>
                <thead>
                  <tr>
                    <th>Nombre de Usuario</th>
                    {/* <th>Password</th> */}
                    <th>Rol</th>
                    <th>Cursos Asignados</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.data.map((dato) => (
                    <tr >
                      <td>{dato.NombreUsuario}</td>
                      {/* <td>{dato.password}</td> */}
                      <td>{dato.rol}</td>
                      <td>{dato.cursos}</td>

                      <td>
                        <Button
                          color="primary"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          Editar
                        </Button>{" "}
                        <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </Container>



            <Modal isOpen={this.state.modalActualizar}>
              <ModalHeader>
                <div><h3>Editar Registro</h3></div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label>
                    Nombre de Uusario
                  </label>

                  <input
                    className="form-control"
                    name="NombreUsuario"
                    type="text"
                    value={this.state.form.NombreUsuario}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Password:
                  </label>
                  <input
                    className="form-control"
                    name="password"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.password}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    rol:
                  </label>
                  <input
                    className="form-control"
                    name="rol"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.rol}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Cursos Asignados
                  </label>
                  <input
                    className="form-control"
                    name="cursos"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.cursos}
                  />
                </FormGroup>

              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.editar(this.state.form)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.cerrarModalActualizar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>



            <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader>
                <div><h3>Crear Nuevo Usuario</h3></div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label>
                    Nombre de usuario
                  </label>

                  <input
                    className="form-control"

                    type="text"
                    value={this.state.data.length + 1}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Password
                  </label>
                  <input
                    className="form-control"
                    name="personaje"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Rol:
                  </label>
                  <input
                    className="form-control"
                    name="anime"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Cursos Asignados:
                  </label>
                  <input
                    className="form-control"
                    name="anime"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.insertar()}
                >
                  Insertar
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => this.cerrarModalInsertar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </table>
        </div>
      </div>
    );
  }
}






/*function DocenteAbm() {
    // data state to store the TV Maze API data. Its initial value is an empty array
    const [data, setData] = useState([]);
  
    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
      (async () => {
        const result = await axios(""); //APi name
        setData(result.data);
      })();
    }, []);
    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "Datos Principales",
            // First group columns
            columns: [
              {
                Header: "Nombre",
                accessor: "show.name"
              },
              {
                Header: "Apellido",
                accessor: "show.type"
              }
            ]
          },
          {
            // Second group - Details
            Header: "Datos de Institución",
            // Second group columns
            columns: [
              {
                Header: "Materias",
                accessor: "show.materias"
                //sCell: ({ cell: { value } }) => <Materias values={value} />

              },
              {
                Header: "Cursos Asignados",
                accessor: "show.genres"
              }
            ]
          }
        ],
        []
      );


    /*const [data, setData] = useState([]);

      useEffect(() => {
        (async () => {
          const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
          setData(result.data);
        })();
      }, []);
    
    return (
      
            <div className="DocenteAbm">
            
        <Table columns={columns} data={data} />
            </div>
          

    );
  
  
    


}*/


export default DocenteAbm;











