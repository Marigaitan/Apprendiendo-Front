//import React, { Component } from 'react';
import React, { useMemo, useState, useEffect } from 'react';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import Table from './Table';
import '../css/DocenteAbm.css';
import img from '../Images/account.png';





function DocenteAbm() {
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
                Header: "Check",
                id: "checkbox",
						accessor: "",
						Cell: ({ original }) => {
							return (
								<input
									type="checkbox"
									className="checkbox"
									checked={this.state.selected[original.firstName] === true}
									onChange={() => this.toggleRow(original.firstName)}
								/>
							);
						},
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
      }, []);*/
    
    return (
      
            <div className="DocenteAbm">
            
        <Table columns={columns} data={data} />
            </div>
          

    );
    


}

export default DocenteAbm;

   
    








