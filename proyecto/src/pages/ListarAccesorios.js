import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Cookies from "universal-cookie/es6";
import { API_HOST } from "../constants";
import HeaderStudent from "./HeaderAlumno";
//import { accesorios } from "../data/accesorios";
import { SeleccionarAccesorios } from "./SeleccionarAccesorios";

const cookies = new Cookies();
export const ListarAccesorios = (tipo) => {
  useEffect(() => {
    getAccesorios();
  }, []);
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [accesorios, setaccesorios] = useState([]);

  const getAccesorios = async () => {
    const url =
      API_HOST + "user/" + cookies.get("id") + "/avatar/parts/available";

    await axios
      .get(url, {
        headers: {
          Authorization: cookies.get("token"),
        },
      })
      .then((response) => {
        console.log("RTA", response);
        console.log("QS", q);
        setaccesorios(response.data.filter((name) => name.startsWith(q)));
      })
      .catch((error) => {
        console.log(error);
        alert("ERROR LIST PARTS");
      });
  };
  console.log("ACCESORIOS", accesorios);
  //const filtro = accesorios.filter((accesorio) => accesorio.tipo === q);
  return (
    <div className="fondo_general mainContainer">
      <HeaderStudent />
      <div className="ml-2 animate__animated animate__fadeInUp align-items-center text-center">
        <br />
        <h2> Haga click en un accesorio para seleccionarlo</h2>
        <div className="card-columns">
          {accesorios.map((acc) => (
            <SeleccionarAccesorios id={acc} />
          ))}
        </div>
      </div>
    </div>
  );
};
